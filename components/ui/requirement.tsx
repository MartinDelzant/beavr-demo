import { Requirement } from "@/lib/types";
import DocumentTypeUI from "./documentType";
import { isRequirementFullfilled } from "@/lib/utils";

export interface RequirementProps extends React.PropsWithChildren {
  requirement: Requirement;
}

// TODO : change naming
export default function RequirementUI({
  requirement,
  children,
}: RequirementProps) {
  const { name, description, requiredDocuments } = requirement;
  const isValidated = isRequirementFullfilled(requirement);
  return (
    <div className="border rounded flex flex-col hover:bg-gray-100 m-2 p-3">
      <h2 className="font-semibold">
        {name}
        {isValidated ? " ✓" : " ✗"}
      </h2>
      <div className="flex flex-col">
        {description.split("\\n").map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
      <div className="mt-3 italic">Required Documents :</div>
      {requiredDocuments.map((rd) => (
        <DocumentTypeUI
          key={rd.id}
          documentType={rd}
          onlyLatestDocument={true}
        />
      ))}
    </div>
  );
}
