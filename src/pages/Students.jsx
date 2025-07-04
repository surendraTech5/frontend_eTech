import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StudentTable } from "@/components/students/student-table";
import { columns } from "@/components/students/columns";
import { getAllStudents } from "../config/liveapi";

export default function Students() {
  const token = localStorage.getItem("authToken");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchInput), 2000);
    return () => clearTimeout(handler);
  }, [searchInput]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await getAllStudents(token,currentPage,
        debouncedSearch);
      if (res.status) {
        setStudents(res.data);
       setTotalPages(res.totalPages);
      }
    } catch (err) {
      console.error("Failed to fetch students", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, [debouncedSearch, currentPage]);

  return (
     <div className="flex-1 space-y-6 p-4 md:p-6 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Students Management</h1>
          <p className="text-muted-foreground">
             Manage your enrolled students. 
          </p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Students</CardTitle>
        </CardHeader>
        <CardContent>
          <StudentTable
            columns={columns}
            data={students}
            refreshStudents={fetchStudents}
            loading={loading}
            page={currentPage}
            setPage={setCurrentPage}
            totalPages={totalPages}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
        </CardContent>
      </Card>
    </div>
  );
}
