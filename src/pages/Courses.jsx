import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { columns } from "@/components/courses/columns";
import { CourseTable } from "@/components/courses/course-table";
import { useEffect, useState } from "react";
import { getAllAdmin, getAllSubjects, getCourseFilter } from "../config/liveapi";


export default function Courses() {
  const token = localStorage.getItem("authToken");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [creatorOptions, setCreatorOptions] = useState([]);

  const [selectedCreatedBy, setSelectedCreatedBy] = useState("All");
  const [selectedSubjectId, setSelectedSubjectId] = useState("All");


  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchInput), 2000);
    return () => clearTimeout(handler);
  }, [searchInput]);

    useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const resp = await getCourseFilter(
          token,
          currentPage,
          debouncedSearch,
          selectedCreatedBy !== "All" ? selectedCreatedBy : "",
          selectedSubjectId !== "All" ? selectedSubjectId : ""
        );
        if (resp.success) {
          setCourses(resp.courses);
          setTotalPages(resp.totalPages);
        }
      } catch (err) {
        console.error("Unable to fetch:", err);
      }
      setLoading(false);
    }
    fetch();
  }, [token, currentPage, debouncedSearch, selectedCreatedBy, selectedSubjectId]);

  useEffect(() => {
  async function fetchOptions() {
    try {
      const [subjectRes, adminRes] = await Promise.all([
        getAllSubjects(token),
        getAllAdmin(),
      ]);

      if (subjectRes.success) {
        setSubjectOptions(subjectRes.subjects.map((s) => ({
          _id: s._id,
          name: s.subjectName,
        })));
      }

      if (adminRes.success) {
        setCreatorOptions(adminRes.users.map((u) => ({
          _id: u._id,
          name: `${u.firstName} ${u.lastName}`,
        })));
      }

    } catch (err) {
      console.error("Error fetching options", err);
    }
  }

  fetchOptions();
}, []);


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
          <CourseTable
   columns={columns}
            data={courses}
            loading={loading}
            page={currentPage}
            setPage={setCurrentPage}
            totalPages={totalPages}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            selectedCreatedBy={selectedCreatedBy}
            setSelectedCreatedBy={setSelectedCreatedBy}
            selectedSubjectId={selectedSubjectId}
            setSelectedSubjectId={setSelectedSubjectId}
              subjectOptions={subjectOptions}
  creatorOptions={creatorOptions}
               />
        </CardContent>
      </Card>
    </div>
  );
} 