import { Document, DocumentType, Requirement, ValidationStatus } from "./types";

export function isRequirementFullfilled(requirement: Requirement) {
  const { requiredDocuments } = requirement;
  if (!requiredDocuments) return true;

  return requiredDocuments.every((rd) => isDocumentTypeFullFilled(rd));
}

export function isDocumentTypeFullFilled(documentType: DocumentType) {
  const hasDocument = documentType.documents?.length > 0;
  if (!hasDocument) return false;
  const latestDoc = documentType.documents.find((d) => d.isLatest);

  if (!latestDoc) return false;

  return isDocumentValid(latestDoc);
}

export function isDocumentValid(document: Document) {
  return (
    document.validationStatus === ValidationStatus.Validated &&
    document.expirationDate > new Date()
  );
}
