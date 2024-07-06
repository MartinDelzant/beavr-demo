import { Document, ValidationStatus } from "@/lib/types";
import ValidationStatusSelector from "./validationStatusSelector";
import { isDocumentValid } from "@/lib/utils";

export interface DocumentProps {
  document: Document;
}

// TODO : change naming
export default function DocumentUI({ document }: DocumentProps) {
  return (
    <div className="flex flex-row space-x-6 mt-3 mb-3 border-2 p-3">
      <div>{isDocumentValid(document) ? "✓" : "✗"}</div>
      <div>Document:</div>
      <div>{document.content}</div>
      <div>Expiration: {document.expirationDate.toLocaleDateString()}</div>
      <ValidationStatusSelector
        documentId={document.id}
        validationStatus={document.validationStatus}
      />
      <div>Version: {document.version}</div>
    </div>
  );
}
