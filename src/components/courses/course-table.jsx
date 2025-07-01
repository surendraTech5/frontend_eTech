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
  MEDIUM_OPTIONS,
  BOARD_OPTIONS,
  CLASS_OPTIONS,
} from "../common/CourseConstant";

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
import { Checkbox } from "../ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { addNewCourses, getAllSubjects } from "../../config/liveapi";
import { toast } from "react-toastify";

export function CourseTable({
  columns,
  data,
  loading,
  page,
  setPage,
  totalPages,
  searchInput,
  setSearchInput,
  selectedCreatedBy,
  setSelectedCreatedBy,
  selectedSubjectId,
  subjectOptions,
  creatorOptions,
  setSelectedSubjectId,
  refreshCourses,
}) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [duration, setDuration] = useState("");
  const [medium, setMedium] = useState("");
  const [board, setBoard] = useState("");
  const [classes, setClasses] = useState("");
  const [activeDiscount, setActiveDiscount] = useState(false);
  const [free, setFree] = useState(false);
  const [paid, setPaid] = useState(false);
  const [subject, setSubject] = useState("");
  const [subjectsList, setSubjectsList] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    async function fetchSubjects() {
      try {
        const res = await getAllSubjects(token);
        setSubjectsList(res.subjects || []);
      } catch (err) {
        console.error("Failed to fetch subjects:", err);
      }
    }
    if (token) fetchSubjects();
  }, [token]);

  const handleSubmit = async () => {
    if (
      !courseName ||
      !price ||
      !duration ||
      !medium ||
      !board ||
      !classes ||
      !subject ||
      !description
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    const payload = {
      courseName,
      description,
      price: Number(price),
      discount: Number(discount),
      isActiveDiscount: activeDiscount,
      isFree: free,
      isPaid: paid,
      duration,
      medium,
      board,
      classes,
      subjects: [subject],
    };

    try {
      const res = await addNewCourses(token, payload);
      if (res.success) {
        toast.success("Course Created Successfully!");
        setCourseName("");
        setDescription("");
        setPrice("");
        setDiscount("");
        setDuration("");
        setMedium("");
        setBoard("");
        setClasses("");
        setActiveDiscount(false);
        setFree(false);
        setPaid(false);
        setSubject("");
        setDialogOpen(false);
        refreshCourses();
      } else {
        toast.error(res.message || "Failed to create course");
      }
    } catch (err) {
      toast.error("Failed to add course");
    }
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    meta: {
      setSelectedCreatedBy,
      setSelectedSubjectId,
      subjectOptions,
      creatorOptions,
    },
  });

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    setPage(1);
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            List Of Courses
          </h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>List Of Courses</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Enter Course Name!"
              value={searchInput}
              onChange={handleSearchChange}
              className="w-full md:w-80 pl-9"
            />
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="default"
                className="w-full md:w-auto"
                onClick={() => setDialogOpen(true)}
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add Course
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Course</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new course. Click create when
                  you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 py-8 px-4 sm:px-6 max-h-[60vh] overflow-y-auto">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="courseName">Course Name</Label>{" "}
                  <span className="text-red-500">*</span>
                  <Input
                    reqired
                    id="courseName"
                    placeholder="e.g. Intro to AI"
                    className="bg-background"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>{" "}
                  <span className="text-red-500">*</span>
                  <Input
                    reqired
                    id="price"
                    type="number"
                    placeholder="e.g. 99.99"
                    className="bg-background"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input
                    id="discount"
                    type="number"
                    placeholder="e.g. 10"
                    className="bg-background"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="courseDuration">Duration</Label>{" "}
                  <span className="text-red-500">*</span>
                  <Input
                    id="courseDuration"
                    placeholder="e.g. 8 Weeks"
                    className="bg-background"
                    value={duration}
                    reqired
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="class">Class</Label>{" "}
                  <span className="text-red-500">*</span>
                  <Select
                    onValueChange={(val) => setClasses(val)}
                    value={classes}
                  >
                    <SelectTrigger id="class" className="bg-background">
                      <SelectValue placeholder="Select a class" reqired />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(CLASS_OPTIONS).map(([label, value]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3 md:col-span-2">
                  <Label>Medium</Label> <span className="text-red-500">*</span>
                  <RadioGroup
                    value={medium}
                    reqired
                    onValueChange={(val) => setMedium(val)}
                    className="flex flex-wrap items-center gap-4"
                  >
                    {MEDIUM_OPTIONS.map((m) => (
                      <div key={m} className="flex items-center space-x-2">
                        <RadioGroupItem value={m} id={m} />
                        <Label htmlFor={m}>
                          {m.charAt(0).toUpperCase() + m.slice(1)}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-3 md:col-span-2">
                  <Label>Board</Label> <span className="text-red-500">*</span>
                  <RadioGroup
                    value={board}
                    reqired
                    onValueChange={(val) => setBoard(val)}
                    className="flex flex-wrap items-center gap-4"
                  >
                    {BOARD_OPTIONS.map((b) => (
                      <div key={b} className="flex items-center space-x-2">
                        <RadioGroupItem value={b} id={b} />
                        <Label htmlFor={b}>{b.toUpperCase()}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="subjects">Subjects</Label>{" "}
                  <span className="text-red-500">*</span>
                  <Select
                    onValueChange={(val) => setSubject(val)}
                    value={subject}
                  >
                    <SelectTrigger id="subjects" className="bg-background">
                      <SelectValue placeholder="Select a subject" reqired />
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

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>{" "}
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

                <div className="space-y-2">
                  <Label>Free Course</Label>
                  <RadioGroup
                    value={free ? "yes" : "no"}
                    onValueChange={(val) => {
                      const isYes = val === "yes";
                      setFree(isYes);
                      if (isYes) setPaid(false); // disable Paid if Free is yes
                    }}
                    className="flex flex-wrap items-center gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="free-yes" />
                      <Label htmlFor="free-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="free-no" />
                      <Label htmlFor="free-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Paid Course</Label>
                  <RadioGroup
                    value={paid ? "yes" : "no"}
                    onValueChange={(val) => {
                      const isYes = val === "yes";
                      setPaid(isYes);
                      if (isYes) setFree(false);
                    }}
                    className="flex flex-wrap items-center gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="paid-yes" />
                      <Label htmlFor="paid-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="paid-no" />
                      <Label htmlFor="paid-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Active Discount</Label>
                  <RadioGroup
                    value={activeDiscount ? "yes" : "no"}
                    onValueChange={(val) => setActiveDiscount(val === "yes")}
                    className="flex flex-wrap items-center gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="active-discount-yes" />
                      <Label htmlFor="active-discount-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="active-discount-no" />
                      <Label htmlFor="active-discount-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-center space-x-2 md:col-span-2">
                  <Checkbox id="active" defaultChecked />
                  <label
                    htmlFor="active"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Active
                  </label>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" variant="default" onClick={handleSubmit}>
                  Create Course
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader>
          <CardTitle className="text-primary">Courses</CardTitle>
        </CardHeader>
        <CardContent>
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
                {loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="text-center py-6"
                    >
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : data.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
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
                      No Data Found!..
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
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
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
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
