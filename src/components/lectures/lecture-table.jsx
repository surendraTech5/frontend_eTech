import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { PlusCircle, Search, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { courses, users } from "@/data/mock-data";
import { Textarea } from "../ui/textarea";
import {
  craeteLecture,
  getAllSubjects,
  getListOfCourses,
} from "../../config/liveapi";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner";

export function LectureTable({ columns, data }) {
  const [sorting, setSorting] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [lectureName, setLectureName] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState(null);
  const [test, setTest] = useState("");
  const [additionalDocuments, setAdditionalDocuments] = useState(null);
  const [subjectId, setSubjectId] = useState("");
  const [subjectsList, setSubjectsList] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [courseList, setCourseList] = useState([]);
  const token = localStorage.getItem("authToken");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  useEffect(() => {
    if (isOpen) {
      getAllSubjects(token)
        .then((res) => {
          setSubjectsList(res.subjects || []);
        })
        .catch(() => setSubjectsList([]));
    }
  }, [isOpen, token]);

  useEffect(() => {
    if (isOpen) {
      getListOfCourses(token)
        .then((res) => {
          setCourseList(res.courses || []);
        })
        .catch(() => setCourseList([]));
    }
  }, [isOpen, token]);

  const handleSubmit = async (e) => {
    if (
      !lectureName.trim() ||
      !description.trim() ||
      !courseId ||
      !subjectId.trim() ||
      !videoUrl
    ) {
      return toast.error("All fields are required");
    }
    const formData = new FormData();
    formData.append("lectureName", lectureName);
    formData.append("description", description);
    formData.append("test", test);
    formData.append("courseId", courseId);
    formData.append("subjectId", subjectId);

    if (videoUrl) formData.append("videoUrl", videoUrl);
    if (additionalDocuments)
      formData.append("additionalDocuments", additionalDocuments);
    if (notes) formData.append("notes", notes);

    try {
      setLoading(true);
      const res = await craeteLecture(token, formData);
      if (res?.status) {
        toast.success(res.message || "Lecture Added Successfully!");
        setLectureName("");
        setVideoUrl(null);
        setDescription("");
        setAdditionalDocuments(null);
        setNotes(null);
        setSubjectId("");
        setCourseId("");
        setTest("");
        setIsOpen(false);
        // refreshLecture();
      } else {
        toast.error(res?.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("err", err);
      toast.error(err?.response?.data?.message || "Failed to add lecture");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            List Of Lectures
          </h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>All Lectures</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="w-full md:w-auto">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Lecture
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Lecture</DialogTitle>
              <DialogDescription>
                Fill in the details for the new lecture.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-8 px-4 sm:px-6 max-h-[60vh] overflow-y-auto">
              <div className="space-y-2">
                <Label htmlFor="lectureTitle">Lecture Title</Label>
                <span className="text-red-500">*</span>
                <Input
                  id="lectureTitle"
                  placeholder="e.g. Introduction to AI"
                  value={lectureName}
                  required
                  onChange={(e) => setLectureName(e.target.value)}
                />
              </div>
              <div className="space-y-2 ">
                <Label htmlFor="description">Description</Label>
                <span className="text-red-500">*</span>
                <Textarea
                  id="description"
                  placeholder="e.g. Learn the basics of AI and its applications."
                  className="bg-background"
                  value={description}
                  reqired
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2 ">
                <Label htmlFor="description">Upload Video</Label>
                <span className="text-red-500">*</span>

                {videoUrl ? (
                  <div className="flex items-center gap-3 rounded-lg border p-3 w-full shadow-sm bg-white dark:bg-gray-800 h-[60px] overflow-hidden">
                    <div className="text-3xl">🎬</div>
                    <div className="flex flex-col">
                      <div className="font-medium text-gray-700 dark:text-white truncate max-w-[200px]">
                        {videoUrl.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-300">
                        Video •{" "}
                        <span
                          className="underline cursor-pointer"
                          onClick={() => setVideoUrl(null)}
                        >
                          Remove
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div
                      onClick={() =>
                        document.getElementById("video-upload").click()
                      }
                      className="flex items-center justify-center rounded-lg border border-dashed p-6 w-full cursor-pointer text-gray-400 hover:text-indigo-500 hover:border-indigo-300 dark:border-gray-700 dark:hover:border-indigo-500"
                    >
                      + Upload a video file
                    </div>
                    <input
                      required
                      id="video-upload"
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) => setVideoUrl(e.target.files[0])}
                    />
                  </>
                )}
              </div>
              <div className="space-y-2 ">
                <Label htmlFor="selectCourse">Select Course</Label>
                <span className="text-red-500">*</span>
                <Select value={courseId} onValueChange={setCourseId}>
                  <SelectTrigger id="courseId">
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courseList.map((course) => (
                      <SelectItem key={course._id} value={course._id}>
                        {course.courseName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 ">
                <Label htmlFor="selectSubj">Select Subject</Label>
                <span className="text-red-500">*</span>
                <Select value={subjectId} onValueChange={setSubjectId}>
                  <SelectTrigger id="subjectId">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjectsList.map((subj) => (
                      <SelectItem key={subj._id} value={subj._id}>
                        {subj.subjectName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 p-1">
                  Upload Notes
                </label>

                {notes ? (
                  <div className="flex items-center gap-3 rounded-lg border p-3 w-full shadow-sm bg-white dark:bg-gray-800">
                    <div className="text-3xl">
                      {notes.type.includes("pdf") ? "📄" : "🖼️"}
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="font-medium text-gray-700 dark:text-white truncate">
                        {notes.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-300">
                        {notes.type.includes("pdf") ? "PDF" : "Image"} •{" "}
                        <span
                          className="underline cursor-pointer"
                          onClick={() => setNotes(null)}
                        >
                          Remove
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div
                      onClick={() =>
                        document.getElementById("notes-upload").click()
                      }
                      className="flex items-center justify-center rounded-lg border border-dashed p-6 w-full cursor-pointer text-gray-400 hover:text-indigo-500 hover:border-indigo-300 dark:border-gray-700 dark:hover:border-indigo-500"
                    >
                      + Upload Image or PDF file
                    </div>
                    <input
                      id="notes-upload"
                      type="file"
                      accept=".pdf,image/*"
                      className="hidden"
                      onChange={(e) => setNotes(e.target.files[0])}
                    />
                  </>
                )}
              </div>
              <div className="space-y-2">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 p-1">
                  Upload Additional Documents
                </label>

                {additionalDocuments ? (
                  <div className="flex items-center gap-3 rounded-lg border p-3 w-full shadow-sm bg-white dark:bg-gray-800">
                    <div className="text-3xl">
                      {additionalDocuments.type.includes("pdf") ? "📄" : "🖼️"}
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="font-medium text-gray-700 dark:text-white truncate">
                        {additionalDocuments.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-300">
                        {additionalDocuments.type.includes("pdf")
                          ? "PDF"
                          : "Image"}{" "}
                        •{" "}
                        <span
                          className="underline cursor-pointer"
                          onClick={() => setAdditionalDocuments(null)}
                        >
                          Remove
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div
                      onClick={() =>
                        document.getElementById("documents-upload").click()
                      }
                      className="flex items-center justify-center rounded-lg border border-dashed p-6 w-full cursor-pointer text-gray-400 hover:text-indigo-500 hover:border-indigo-300 dark:border-gray-700 dark:hover:border-indigo-500"
                    >
                      + Upload Image or PDF file
                    </div>
                    <input
                      id="documents-upload"
                      type="file"
                      accept=".pdf,image/*"
                      className="hidden"
                      onChange={(e) =>
                        setAdditionalDocuments(e.target.files[0])
                      }
                    />
                  </>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lectureTitle">Test</Label>
                <Input
                  id="test"
                  placeholder="e.g. Introduction to AI"
                  value={test}
                  onChange={(e) => setTest(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                variant="default"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Loading.." : "Create Lecture"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader>
          <CardTitle className="text-primary">Lectures</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between pb-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search lectures..."
                value={globalFilter ?? ""}
                onChange={(event) =>
                  setGlobalFilter(String(event.target.value))
                }
                className="w-full md:max-w-sm pl-9"
              />
            </div>
          </div>
          <div className="rounded-md border overflow-auto">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No lectures found.
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
              className="h-8 w-8 text-primary"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium px-3 py-1.5 rounded-md bg-primary text-primary-foreground">
              {table.getState().pagination.pageIndex + 1}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
