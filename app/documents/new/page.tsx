import DocumentCreator from "@/components/ui/documentCreator";
import DocumentTypeUI from "@/components/ui/documentType";
import { getDocumentType } from "@/lib/db";

export default async function DocumentCreation({
  searchParams,
}: {
  searchParams: { documentTypeId: string };
}) {
  const documentType = await getDocumentType(searchParams?.documentTypeId);
  if (!documentType) {
    return <div>Cannot create unknown document</div>;
  }
  return (
    <div className="mt-3">
      <a href="/documents" className="ml-3 hover:underline hover:bg-gray-100">
        Back to Documents →
      </a>
      <div className="mt-3 p-3">
        <h1 className="font-bold">Create a new document : </h1>
        <DocumentTypeUI
          documentType={documentType}
          onlyLatestDocument={false}
        ></DocumentTypeUI>
        <DocumentCreator documentTypeId={documentType.id} />
      </div>
    </div>
  );
}
