export interface Requirement {
  id: string;
  name: string;
  description: string;
  requiredDocuments: DocumentType[];
}

export interface DocumentType {
  id: string;
  name: string;
  description: string;
  documents: Document[];
}

export enum ValidationStatus {
  ToReview = "ToReview",
  Validated = "Validated",
}

export interface Document {
  id: string;
  documentTypeId: string;
  content: string;
  version: number;
  isLatest: boolean;
  validationStatus: ValidationStatus;
  expirationDate: Date;
}
