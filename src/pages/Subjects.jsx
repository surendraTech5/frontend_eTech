import { columns } from "@/components/subjects/columns";
import { SubjectTable } from "@/components/subjects/subject-table";
import { subjects } from "@/data/mock-data";

export default function Subjects() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 pt-6">
      <SubjectTable columns={columns} data={subjects} />
    </div>
  );
} 