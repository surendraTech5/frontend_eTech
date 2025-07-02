import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import VideoModal from "./VideoModal";
import { useState } from "react";
import LectureDetailModal from "./LectureDetailModal";

export const columns = [
  {
    accessorKey: "lectureName",
    header: "Lecture Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "subjectId",
    header: ({ table }) => {
      const subjectOptions = table.options.meta?.subjectOptions || [];
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex justify-start -ml-4 data-[state=open]:bg-accent"
            >
              <span>Subjects</span>
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className={
              subjectOptions.length > 4 ? "max-h-[180px] overflow-y-auto" : ""
            }
          >
            <DropdownMenuLabel>Filter by Subject</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => table.options.meta?.setSelectedSubjectId("All")}
            >
              All
            </DropdownMenuItem>
            {subjectOptions.map((subject) => (
              <DropdownMenuItem
                key={subject._id}
                onClick={() =>
                  table.options.meta?.setSelectedSubjectId(subject._id)
                }
              >
                {subject.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    cell: ({ row }) => {
      const subject = row.original.subjectId;
      return subject?.subjectName || "—";
    },
  },

  {
    accessorKey: "courseId",
    header: ({ table }) => {
      const coursesOptions = table.options.meta?.coursesOptions || [];
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex justify-start -ml-4 data-[state=open]:bg-accent"
            >
              <span>Courses</span>
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className={
              coursesOptions.length > 4 ? "max-h-[180px] overflow-y-auto" : ""
            }
          >
            <DropdownMenuLabel>Filter by Course</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => table.options.meta?.setSelectedCourseId("All")}
            >
              All
            </DropdownMenuItem>
            {coursesOptions.map((course) => (
              <DropdownMenuItem
                key={course._id}
                onClick={() =>
                  table.options.meta?.setSelectedCourseId(course._id)
                }
              >
                {course.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    cell: ({ row }) => {
      const course = row.original.courseId;
      return course?.courseName || "—";
    },
  },

  // ✅ VIDEO COLUMN
//   {
//   accessorKey: "videoUrl",
//   header: "Video",
//   cell: ({ row }) => {
//     const videoUrl = row.getValue("videoUrl");

//     return videoUrl ? (
//       <div className="group relative w-20 h-10 overflow-hidden rounded border bg-black shadow-sm">
//         <video
//           src={videoUrl}
//           className="w-full h-full object-cover"
//           muted
//           preload="metadata"
//         />
//         <div className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-black/50">
//           <a
//             href={videoUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-[10px] px-1 py-0.5 rounded bg-white text-black font-semibold shadow-sm"
//           >
//             Watch
//           </a>
//         </div>
//       </div>
//     ) : (
//       <span className="text-muted-foreground text-xs">—</span>
//     );
//   },
// }

{
  accessorKey: "videoUrl",
  header: "Video",
  cell: ({ row }) => {
    const videoUrl = row.getValue("videoUrl");
    const [open, setOpen] = useState(false);

    return videoUrl ? (
      <>
        <div className="group relative w-20 h-10 overflow-hidden rounded border bg-black shadow-sm">
          <video
            src={videoUrl}
            className="w-full h-full object-cover"
            muted
            preload="metadata"
          />
          <div className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-black/50">
            <button
              onClick={() => setOpen(true)}
              className="text-[10px] px-1 py-0.5 rounded bg-white text-black font-semibold shadow-sm"
            >
              Watch
            </button>
          </div>
        </div>

        {/* Modal Component */}
        <VideoModal open={open} onClose={setOpen} videoUrl={videoUrl} />
      </>
    ) : (
      <span className="text-muted-foreground text-xs">—</span>
    );
  },
}




//video
,
  {
    accessorKey: "createdBy",
    header: ({ table }) => {
      const creatorOptions = table.options.meta?.creatorOptions || [];

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex justify-start -ml-4 data-[state=open]:bg-accent"
            >
              <span>Created By</span>
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className={
              creatorOptions.length > 4 ? "max-h-[180px] overflow-y-auto" : ""
            }
          >
            <DropdownMenuLabel>Filter by Creator</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => table.options.meta?.setSelectedCreatedBy("All")}
            >
              All
            </DropdownMenuItem>
            {creatorOptions.map((creator) => (
              <DropdownMenuItem
                key={creator._id}
                onClick={() =>
                  table.options.meta?.setSelectedCreatedBy(creator._id)
                }
              >
                {creator.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    cell: ({ row }) => {
      const creator = row.getValue("createdBy");
      if (typeof creator === "object" && creator !== null) {
        return (
          `${creator.firstName ?? ""} ${creator.lastName ?? ""}`.trim() || "—"
        );
      }
      return creator ?? "—";
    },
  },
  {
  accessorKey: "isActive",
  header: "Status",
  cell: ({ row }) => {
    const value = row.getValue("isActive");
    const active = value === true || value === "true"; // handles both boolean and string

    return (
      <Badge
        className={cn(
          "border-transparent font-medium",
          active
            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400 hover:bg-emerald-200"
            : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 hover:bg-red-200"
        )}
      >
        {active ? "Active" : "Inactive"}
      </Badge>
    );
  },
}
,

//action
{
  id: "actions",
  header: "Actions",
  cell: ({ row }) => {
    const [open, setOpen] = useState(false);
    const lecture = row.original;

    return (
      <>
        <Button
          variant="outline"
          className="h-7 px-2 text-xs border border-primary text-primary hover:bg-primary/10"
          onClick={() => setOpen(true)}
        >
          View
        </Button>
        <LectureDetailModal open={open} onClose={setOpen} lecture={lecture} />
      </>
    );
  },
}
,

  //edit action
  {
    id: "update",
    header: "Update",
    cell: ({ row }) => {
      return (
        <Button variant="link" className="text-primary p-0 text-xs">
          Edit
        </Button>
      );
    },
  },
];
