import { columns } from "@/components/lectures/columns";
import { LectureTable } from "@/components/lectures/lecture-table";
import { lectures } from "@/data/mock-data";

export default function Lectures() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 pt-6">
      <LectureTable columns={columns} data={lectures} />
    </div>
  );
} 