import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { columns } from "@/components/courses/columns";
import { CourseTable } from "@/components/courses/course-table";
import { courses } from "@/data/mock-data";

export default function Courses() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground">
            Manage your course offerings and content.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Course
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <CourseTable columns={columns} data={courses} />
        </CardContent>
      </Card>
    </div>
  );
} 