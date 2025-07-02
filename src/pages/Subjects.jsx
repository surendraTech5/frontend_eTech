import { columns } from "@/components/subjects/columns";
import { SubjectTable } from "@/components/subjects/subject-table";
import { subjects } from "@/data/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllAdmin, getSubjectsFilter } from "../config/liveapi";
import { useEffect, useState } from "react";

export default function Subjects() {
  const token = localStorage.getItem("authToken");
  const [subject, setSubject] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [creatorOptions, setCreatorOptions] = useState([]);
  const [selectedCreatedBy, setSelectedCreatedBy] = useState("All");

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchInput), 2000);
    return () => clearTimeout(handler);
  }, [searchInput]);

  const refreshSubject = async () => {
    setLoading(true);
    try {
      const resp = await getSubjectsFilter(
        token,
        currentPage,
        debouncedSearch,
        selectedCreatedBy !== "All" ? selectedCreatedBy : ""
      );
      if (resp.success) {
        setSubject(resp.subjects);
        setTotalPages(resp.totalPages);
      }
    } catch (err) {
      console.error("Unable to fetch:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    refreshSubject();
  }, [debouncedSearch, currentPage, selectedCreatedBy]);

  useEffect(() => {
    async function fetchOptions() {
      try {
        const [adminRes] = await Promise.all([getAllAdmin()]);
        if (adminRes.success) {
          setCreatorOptions(
            adminRes.users.map((u) => ({
              _id: u._id,
              name: `${u.firstName} ${u.lastName}`,
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
          <h1 className="text-3xl font-bold tracking-tight">Subjects</h1>
          <p className="text-muted-foreground">
            Manage your subjects offerings and content.
          </p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Subjects</CardTitle>
        </CardHeader>
        <CardContent>
          <SubjectTable
            columns={columns}
            data={subject}
            creatorOptions={creatorOptions}
            setSelectedCreatedBy={setSelectedCreatedBy}
            loading={loading}
            page={currentPage}
            setPage={setCurrentPage}
            totalPages={totalPages}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            selectedCreatedBy={selectedCreatedBy}
            refreshSubject={refreshSubject}
          />
        </CardContent>
      </Card>
    </div>
  );
}
