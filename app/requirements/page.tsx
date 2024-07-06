import RequirementUI from "@/components/ui/requirement";
import { getRequirements } from "@/lib/db";

export default async function Requirements() {
  const requirements = await getRequirements();
  return (
    <div className="m-3 ">
      <h1 className="font-semibold text-2xl p-1 m-1">Requirements</h1>
      <div className="m-2">
        <a href="/documents" className="hover:underline hover:bg-gray-100">
          See All Document →
        </a>
      </div>
      {requirements.map((r) => (
        <RequirementUI key={r.id} requirement={r}></RequirementUI>
      ))}
    </div>
  );
}
