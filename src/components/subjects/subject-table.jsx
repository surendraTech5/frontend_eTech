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
import EditSubjectModal from "./EditSubjectModal"

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
import Spinner from "../common/Spinner";
import { Textarea } from "../ui/textarea";
import { createSubject } from "../../config/liveapi";
import { toast } from "react-toastify";

export function SubjectTable({
  columns,
  data,
  creatorOptions,
  setSelectedCreatedBy,
  loading,
  page,
  setPage,
  totalPages,
  searchInput,
  setSearchInput,
  selectedCreatedBy,
  refreshSubject,
}) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [subjectName, setSubjectName] = useState("");
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("authToken");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    pageCount: totalPages,
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize: 20,
      },
      sorting,
      columnFilters,
      globalFilter,
    },
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === "function"
          ? updater({ pageIndex: page - 1, pageSize: 20 })
          : updater;
      setPage(newState.pageIndex + 1);
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    meta: {
      setSelectedCreatedBy,
      creatorOptions,
    },
  });
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    setPage(1);
  };
    const handleSubmit = async (e) => {
    e.preventDefault()
    if (!subjectName.trim() || !description.trim()) {
      return toast.error("All fields are required");
    }
    const payload = {
      subjectName,
      description,
    };
    try {
      const res=await createSubject(token, payload);
      console.log("res",res)
       if (res.status) {
      console.log("res",res)
      toast.success("Subject Created Successfully!");
      setSubjectName("");
      setDescription("");
      setDialogOpen(false);
      refreshSubject();
}
else {
      toast.error(res?.message || "Failed to create subject.");
    }
    } catch (err) {
    console.log("err",err)
      toast.error(err.message );
    }
  };

    useEffect(() => {
    const handler = (e) => {
      setSelectedSubject(e.detail);
      setEditDialogOpen(true);
    };
    window.addEventListener("openEditCourseModal", handler);
    return () => window.removeEventListener("openEditCourseModal", handler);
  }, []);
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            List Of Subjects
          </h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>List Of Subjects</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="w-full md:w-auto"  onClick={() => setDialogOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Subject
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Subject</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new subject.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-8 px-4 sm:px-6 max-h-[60vh] overflow-y-auto">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <span className="text-red-500">*</span>
                <Input
                id="subjectName"
                placeholder="e.g. Mathematics"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
               />
              </div>
              <div className="space-y-2 ">
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
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="active" />
                <label
                  htmlFor="active"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Active
                </label>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" variant="default"  onClick={handleSubmit}>
                Create Subject
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader>
          <CardTitle className="text-primary">Subjects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between pb-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search subjects..."
                value={searchInput}
                onChange={handleSearchChange}
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
                {loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      <Spinner size="lg" />
                    </TableCell>
                  </TableRow>
                ) : table.getRowModel().rows?.length ? (
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
      <EditSubjectModal
        open={editDialogOpen}
        setOpen={setEditDialogOpen}
        subjectData={selectedSubject}
        refreshSubject={refreshSubject}
      />
    </div>
  );
}
