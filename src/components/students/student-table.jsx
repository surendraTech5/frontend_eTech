import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, PlusCircle, Search } from "lucide-react";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Spinner from "@/components/common/Spinner";
import StudentFormModal from "./student-form-modal";
import { columns as baseColumns } from "./columns";
import { deleteStudent } from "@/config/liveapi";

export function StudentTable({ data, refreshStudents, loading,page,setPage,totalPages,searchInput,setSearchInput }) {
  const token = localStorage.getItem("authToken");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [expandedRowId, setExpandedRowId] = useState(null);

  const handleEdit = (student) => {
    setEditingStudent(student);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    await deleteStudent(id, token);
    refreshStudents();
  };

  const toggleExpand = (rowId) => {
    setExpandedRowId(expandedRowId === rowId ? null : rowId);
  };

  const table = useReactTable({
   data,
  columns: baseColumns(handleEdit, handleDelete),
  state: {
    pagination: {
      pageIndex: page - 1,
      pageSize: 20,
    },
  },
   onPaginationChange: (updater) => {
    const newState =
      typeof updater === "function"
        ? updater({ pageIndex: page - 1, pageSize: 20 })
        : updater;
    setPage(newState.pageIndex + 1);
  },
  manualPagination: true,
  pageCount: totalPages,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getSortedRowModel: getSortedRowModel(),
});

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-primary">
            List of Students
          </h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Students</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Button
          variant="default"
          onClick={() => {
            setEditingStudent(null);
            setModalOpen(true);
          }}
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Add Student
        </Button>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-primary">Students</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between pb-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full md:max-w-sm pl-9"
              />
            </div>
          </div>

          <div className="rounded-md border overflow-auto">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                    <TableHead>Enrolled Courses</TableHead>
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={baseColumns().length + 1}
                      className="text-center h-24"
                    >
                      <Spinner size="lg" />
                    </TableCell>
                  </TableRow>
                ) : table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => {
                    const student = row.original;
                    const isExpanded = expandedRowId === student._id;

                    return (
                      <React.Fragment key={row.id}>
                        <TableRow>
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleExpand(student._id)}
                              className="text-xs text-muted-foreground"
                            >
                              {isExpanded ? "Hide" : "View"}
                            </Button>
                          </TableCell>
                        </TableRow>

                        {isExpanded && student.enrolledCourses.length > 0 && (
                          <TableRow>
                            <TableCell colSpan={baseColumns().length + 1}>
                              <div className="bg-muted/40 p-5 rounded-lg space-y-4">
                                <h3 className="text-lg font-semibold text-foreground">
                                  Enrolled Courses
                                </h3>

                                <Table className="bg-background rounded-md border">
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Course Name</TableHead>
                                      <TableHead>Price</TableHead>
                                      <TableHead>Discount</TableHead>
                                      <TableHead>Class</TableHead>
                                      <TableHead>Medium</TableHead>
                                      <TableHead>Board</TableHead>
                                      <TableHead>Duration</TableHead>
                                      <TableHead>Free</TableHead>
                                      <TableHead>Active</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {student.enrolledCourses.map((course) => (
                                      <TableRow key={course._id}>
                                        <TableCell>
                                          {course.courseName}
                                        </TableCell>
                                        <TableCell>₹{course.price}</TableCell>
                                        <TableCell>
                                          {course.discount}%
                                        </TableCell>
                                        <TableCell>{course.classes}</TableCell>
                                        <TableCell>{course.medium}</TableCell>
                                        <TableCell>{course.board}</TableCell>
                                        <TableCell>{course.duration}</TableCell>
                                        <TableCell>
                                          {course.isFree ? "Yes" : "No"}
                                        </TableCell>
                                        <TableCell>
                                          {course.isActive ? "Yes" : "No"}
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={baseColumns().length + 1}
                      className="text-center h-24"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-center space-x-2 py-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-8 w-8 text-primary"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium px-3 py-1.5 rounded-md bg-primary text-primary-foreground">
              {table.getState().pagination.pageIndex + 1}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-8 w-8 text-primary"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <StudentFormModal
        open={modalOpen}
        setOpen={setModalOpen}
        student={editingStudent}
        refresh={refreshStudents}
      />
    </div>
  );
}
