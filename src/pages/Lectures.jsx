import { columns } from "@/components/lectures/columns";
import { LectureTable } from "@/components/lectures/lecture-table";
import { lectures } from "@/data/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Lectures() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 pt-6">
       <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lectures</h1>
          <p className="text-muted-foreground">
            Manage your lectures offerings and content.
          </p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Courses</CardTitle>
        </CardHeader>
        <CardContent>
      <LectureTable columns={columns} data={lectures} />
      </CardContent>
      </Card>
    </div>
  );
} 