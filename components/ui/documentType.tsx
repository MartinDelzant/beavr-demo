import { DocumentType, ValidationStatus } from "@/lib/types";
import DocumentUI from "./document";
import { isDocumentTypeFullFilled } from "@/lib/utils";

export interface DocumentTypeProps extends React.PropsWithChildren {
  documentType: DocumentType;
  onlyLatestDocument: boolean;
}

// TODO : change naming
export default function DocumentTypeUI({
  documentType,
  onlyLatestDocument,
  children,
}: DocumentTypeProps) {
  const hasDocument = documentType.documents?.length > 0;
  const isValidated = isDocumentTypeFullFilled(documentType);
  return (
    <div className="border rounded flex flex-col hover:bg-gray-100 m-2 p-3">
      <h2 className="font-semibold">
        {documentType.name}
        {isValidated ? " ✓" : " ✗"}
      </h2>
      <div className="flex flex-col">
        {documentType.description.split("\n").map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
      {hasDocument ? (
        <>
          <div className="mt-2 underline">
            {onlyLatestDocument ? "Latest Document" : "Documents"}
          </div>
          {documentType.documents
            .filter((d) => !onlyLatestDocument || d.isLatest)
            .sort((d) => -d.version)
            .map((d) => (
              <DocumentUI key={d.id} document={d} />
            ))}
        </>
      ) : null}
      {children}
    </div>
  );
}
