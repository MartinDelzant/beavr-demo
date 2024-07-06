import DocumentTypeUI from "@/components/ui/documentType";
import { getDocumentTypes } from "@/lib/db";

const buildHref = (documentTypeId: string) =>
  `/documents/new?documentTypeId=${documentTypeId}`;

export default async function Documents() {
  const documentTypes = await getDocumentTypes();

  return (
    <div className="m-3">
      <h1 className="font-semibold text-2xl p-1 m-1">Documents</h1>
      <div className="m-2">
        <a href="/requirements" className="hover:underline hover:bg-gray-100">
          See All Requirements →
        </a>
      </div>
      {documentTypes.map((d) => (
        <DocumentTypeUI key={d.id} documentType={d} onlyLatestDocument={false}>
          <button
            className="mt-2 p-2 round border-2 hover:bg-gray-300"
            style={{ maxWidth: 300 }}
          >
            <a href={buildHref(d.id)}>Create new document</a>
          </button>
        </DocumentTypeUI>
      ))}
    </div>
  );
}
