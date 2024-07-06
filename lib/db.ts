"use server";

import { QueryResultRow, sql } from "@vercel/postgres";
import { z } from "zod";
import { Requirement, Document, DocumentType, ValidationStatus } from "./types";
import { revalidatePath } from "next/cache";

export async function getRequirements(): Promise<Requirement[]> {
  const sqlResult = await sql`
  SELECT r.id as r_id,
    r.name as r_name,
    r.description as r_description,
    dt.id as dt_id, 
    dt.name as dt_name,
    dt.description as dt_description,
    d.id as d_id,
    d.content as d_content,
    d.version as d_version,
    d.is_latest as d_isLatest,
    d.validation_status as d_validationStatus,
    d.expiration_date as d_expirationDate
  FROM requirements r
  LEFT JOIN requirement_document_types rdt ON rdt.requirement_id = r.id
  LEFT JOIN document_types dt ON dt.id = rdt.document_type_id
  LEFT JOIN documents d on d.document_type_id = dt.id`;

  const requirements: { [requirementId: string]: Requirement } = {};
  for (let i = 0; i < sqlResult.rows.length; i++) {
    const sqlRow = sqlResult.rows[i];
    const requirementId = sqlRow.r_id;
    if (!requirements[requirementId]) {
      requirements[requirementId] = buildRequirement(sqlRow);
    }

    const requirement = requirements[requirementId];
    const documentTypeId = sqlRow.dt_id;
    if (!documentTypeId) continue;

    let documentType = requirement.requiredDocuments.find(
      (rd) => rd.id === documentTypeId
    );
    if (!documentType) {
      documentType = buildDocumentType(sqlRow);
      requirement.requiredDocuments.push(documentType);
    }

    const documentId = sqlRow.d_id;
    if (!documentId) continue;

    const document = documentType.documents.find((d) => d.id === documentId);
    if (!document) {
      documentType.documents.push(buildDocument(sqlRow));
    }
  }

  return Object.values(requirements);
}

// TODO : We should not filter on the server side, but rather on the DB side.
// Neon does not like when we dynamically build sql queries ... So we'll stick to that for now.
export async function getDocumentTypes(
  id?: string,
  latestOnly = false
): Promise<DocumentType[]> {
  const rawSqlResult = await sql`
  SELECT dt.id as dt_id, 
    dt.name as dt_name,
    dt.description as dt_description,
    d.id as d_id,
    d.content as d_content,
    d.version as d_version,
    d.is_latest as d_isLatest,
    d.validation_status as d_validationStatus,
    d.expiration_date as d_expirationDate
  FROM document_types dt
  LEFT JOIN documents d ON dt.id = d.document_type_id`;

  const documentTypes: { [documentTypeId: string]: DocumentType } = {};

  for (let i = 0; i < rawSqlResult.rows.length; i++) {
    const row = rawSqlResult.rows[i];
    const documentTypeId = row.dt_id;

    if (id && documentTypeId !== id) continue;

    if (!documentTypes[documentTypeId]) {
      documentTypes[documentTypeId] = buildDocumentType(row);
    }

    const document: Document = buildDocument(row);

    if (latestOnly && !document.isLatest) continue;
    if (!row.d_id) continue;

    documentTypes[documentTypeId].documents.push(document);
  }

  return Object.values(documentTypes);
}

export async function getDocumentType(id: string, latestOnly = false) {
  return (await getDocumentTypes(id, latestOnly))[0];
}

export async function addDocument(
  prevState: { message: string },
  formData: FormData,
  documentTypeId: string
) {
  const parse = parseFormData(prevState, formData);

  if (!parse.success) {
    return { message: "Failed to create document" };
  }

  const { content, validationStatus, expirationDate } = parse.data;

  const documentType = await getDocumentType(documentTypeId, true);
  let document =
    documentType.documents?.length > 0 &&
    documentType.documents.find((d) => d.isLatest);
  const newVersion = document ? document.version + 1 : 0;

  if (document) {
    await sql`UPDATE documents
    SET is_latest = '0'
    WHERE id = ${document.id}`;
  }

  await sql`INSERT INTO documents (document_type_id, content, version, is_latest, validation_status, expiration_date)
  VALUES (${documentTypeId}, ${content}, ${newVersion}, '1', ${validationStatus}, ${expirationDate})`;
  revalidatePath("/documents");
}

export async function updateValidationStatus(
  validationStatus: ValidationStatus,
  documentId: string
) {
  const schema = z.object({
    validationStatus: z.nativeEnum(ValidationStatus),
  });
  const parse = schema.safeParse({
    validationStatus: validationStatus,
  });

  if (!parse.success) {
    return { message: "Could not parse validationStatus !" };
  }

  await sql`UPDATE documents
    SET validation_status = ${parse.data.validationStatus}
    WHERE id = ${documentId}`;

  revalidatePath("/documents");
}

function parseFormData(prevState: { message: string }, formData: FormData) {
  const schema = z.object({
    content: z.string().min(1),
    validationStatus: z.nativeEnum(ValidationStatus),
    expirationDate: z.string().date(),
  });
  const parse = schema.safeParse({
    content: formData.get("content"),
    validationStatus: formData.get("validationStatus"),
    expirationDate: formData.get("expirationDate"),
  });

  return parse;
}

function buildRequirement(sqlRow: QueryResultRow): Requirement {
  return {
    id: sqlRow.r_id,
    name: sqlRow.r_name,
    description: sqlRow.r_description,
    requiredDocuments: [],
  };
}

function buildDocumentType(sqlRow: QueryResultRow): DocumentType {
  return {
    id: sqlRow.dt_id,
    name: sqlRow.dt_name,
    description: sqlRow.dt_description,
    documents: [],
  };
}

function buildDocument(sqlRow: QueryResultRow): Document {
  return {
    id: sqlRow.d_id,
    documentTypeId: sqlRow.dt_id,
    content: sqlRow.d_content,
    version: parseInt(sqlRow.d_version),
    isLatest: Boolean(sqlRow.d_islatest),
    validationStatus: sqlRow.d_validationstatus,
    expirationDate: new Date(sqlRow.d_expirationdate),
  };
}
