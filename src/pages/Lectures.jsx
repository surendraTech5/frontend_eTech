import { columns } from "@/components/lectures/columns";
import { LectureTable } from "@/components/lectures/lecture-table";
import { lectures } from "@/data/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getAllAdmin,
  getAllSubjects,
  getLectureFilter,
  getListOfCourses,
} from "../config/liveapi";
import { useEffect, useState } from "react";

export default function Lectures() {
  const token = localStorage.getItem("authToken");
  const [lecture, setLecture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [creatorOptions, setCreatorOptions] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);

  const [selectedCreatedBy, setSelectedCreatedBy] = useState("All");
  const [selectedSubjectId, setSelectedSubjectId] = useState("All");
  const [selectedCourseId, setSelectedCourseId] = useState("All");

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchInput), 2000);
    return () => clearTimeout(handler);
  }, [searchInput]);

  const refreshLecture = async () => {
    setLoading(true);
    try {
      const resp = await getLectureFilter(
        token,
        currentPage,
        debouncedSearch,
        selectedCreatedBy !== "All" ? selectedCreatedBy : "",
        selectedSubjectId !== "All" ? selectedSubjectId : "",
        selectedCourseId !== "All" ? selectedCourseId : ""
      );
      if (resp.success) {
        setLecture(resp.lectures);
        setTotalPages(resp.totalPages);
      }
    } catch (err) {
      console.error("Unable to fetch:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    refreshLecture();
  }, [
    token,
    currentPage,
    debouncedSearch,
    selectedCreatedBy,
    selectedSubjectId,
    selectedCourseId,
  ]);

  useEffect(() => {
    async function fetchOptions() {
      try {
        const [subjectRes, adminRes, courseRes] = await Promise.all([
          getAllSubjects(token),
          getAllAdmin(),
          getListOfCourses(token),
        ]);

        if (subjectRes.success) {
          setSubjectOptions(
            subjectRes.subjects.map((s) => ({
              _id: s._id,
              name: s.subjectName,
            }))
          );
        }

        if (adminRes.success) {
          setCreatorOptions(
            adminRes.users.map((u) => ({
              _id: u._id,
              name: `${u.firstName} ${u.lastName}`,
            }))
          );
        }
        if (courseRes.success) {
          setCourseOptions(
            courseRes.courses.map((s) => ({
              _id: s._id,
              name: s.courseName,
            }))
          );
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
          <LectureTable
            columns={columns}
            data={lecture}
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
            selectedCourseId={selectedCourseId}
            setSelectedCourseId={setSelectedCourseId}
            subjectOptions={subjectOptions}
            courseOptions={courseOptions}
            creatorOptions={creatorOptions}
            refreshLecture={refreshLecture}
          />
        </CardContent>
      </Card>
    </div>
  );
}
