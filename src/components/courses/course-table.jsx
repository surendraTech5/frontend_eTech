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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

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
}) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

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
  
  const handleSearchChange = e => {
    setSearchInput(e.target.value);
    setPage(1);
  };
  console.log("Filters:", {
  createdBy: selectedCreatedBy,
  subjectId: selectedSubjectId,
});

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
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" className="w-full md:w-auto">
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
                  <Label htmlFor="courseName">Course Name</Label>
                  <Input
                    id="courseName"
                    placeholder="e.g. Intro to AI"
                    className="bg-background"
                  />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" placeholder="e.g. 99.99" className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input id="discount" placeholder="e.g. 10" className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="courseDuration">Duration</Label>
                  <Input id="courseDuration" placeholder="e.g. 8 Weeks" className="bg-background"/>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="createdBy">Created By</Label>
                  <Input id="createdBy" placeholder="e.g. John Doe" className="bg-background"/>
                </div>

                <div className="space-y-3 md:col-span-2">
                  <Label>Medium</Label>
                  <RadioGroup defaultValue="english" className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="english" id="english" />
                        <Label htmlFor="english">English</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="hindi" id="hindi" />
                        <Label htmlFor="hindi">Hindi</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                 <div className="space-y-3 md:col-span-2">
                  <Label>Board</Label>
                  <RadioGroup defaultValue="cbse" className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cbse" id="cbse" />
                        <Label htmlFor="cbse">CBSE</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="icse" id="icse" />
                        <Label htmlFor="icse">ICSE</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                        <RadioGroupItem value="state" id="state" />
                        <Label htmlFor="state">State Board</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subjects">Subjects</Label>
                   <Select>
                    <SelectTrigger id="subjects" className="bg-background">
                        <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="math">Mathematics</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="cs">Computer Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="class">Class</Label>
                  <Select>
                    <SelectTrigger id="class" className="bg-background">
                        <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                    <SelectContent>
                        {[...Array(12).keys()].map(i => (
                            <SelectItem key={i+1} value={`${i+1}`}>{`Class ${i+1}`}</SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="e.g. Learn the basics of AI and its applications."
                    className="bg-background"
                  />
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
                <Button type="submit" variant="default">
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
                <TableCell colSpan={columns.length} className="text-center py-6">
                  Loading...
                </TableCell>
              </TableRow>
                ) : data.length ? (
                   table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id} >
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