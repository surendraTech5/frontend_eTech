import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
  createStudent,
  updateStudent,
  getListOfCourses,
} from "../../config/liveapi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const StudentFormModal = ({ open, setOpen, student, refresh }) => {
  const isEdit = !!student;
  const token = localStorage.getItem("authToken");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "male",
    password: "",
    enrolledCourses: [],
  });

  const [courses, setCourses] = useState([]);
  const [popoverOpen, setPopoverOpen] = useState(false);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await getListOfCourses(token);
        if (res.success) setCourses(res.courses);
      } catch {
        toast.error("Failed to load courses");
      }
    }

    fetchCourses();
  }, [token]);

  useEffect(() => {
    if (isEdit) {
      setForm({
        firstName: student.firstName || "",
        lastName: student.lastName || "",
        email: student.email || "",
        phone: student.phone || "",
        gender: student.gender || "male",
        password: "",
        enrolledCourses: student.enrolledCourses?.map((c) => c._id) || [],
      });
    } else {
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "male",
        password: "",
        enrolledCourses: [],
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleCourse = (id) => {
    setForm((prev) => {
      const already = prev.enrolledCourses.includes(id);
      return {
        ...prev,
        enrolledCourses: already
          ? prev.enrolledCourses.filter((cid) => cid !== id)
          : [...prev.enrolledCourses, id],
      };
    });
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await updateStudent(student._id, form, token);
        toast.success("Student updated successfully");
      } else {
        await createStudent(form, token);
        toast.success("Student created successfully");
      }
      setOpen(false);
      refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const selectedCourseNames = form.enrolledCourses
    .map((id) => courses.find((c) => c._id === id)?.courseName)
    .filter(Boolean)
    .join(", ");

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val) {
          setForm((f) => ({
            ...f,
            password: "",
            enrolledCourses: [],
          }));
        }
        setOpen(val);
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Student" : "Add Student"}</DialogTitle>
          <DialogDescription>Fill the form and click save.</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 max-h-[60vh] overflow-y-auto px-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="John"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Doe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              disabled={isEdit}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="9876543210"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select
              value={form.gender}
              onValueChange={(val) =>
                setForm((prev) => ({ ...prev, gender: val }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {!isEdit && (
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="space-y-2 md:col-span-2">
            <Label>Enrolled Courses</Label>
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {selectedCourseNames || "Select courses"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[500px] p-0 max-h-[300px] overflow-y-auto">
                <Command>
                  <CommandInput placeholder="Search courses..." />
                  <CommandEmpty>No course found.</CommandEmpty>
                  <CommandGroup>
                    {courses.map((course) => {
                      const selected = form.enrolledCourses.includes(
                        course._id
                      );
                      return (
                        <CommandItem
                          key={course._id}
                          onMouseDown={(e) => {
                            e.preventDefault(); // prevent focus loss
                            toggleCourse(course._id);
                          }}
                          className="cursor-pointer"
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selected ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {course.courseName}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>
            {isEdit ? "Update Student" : "Create Student"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudentFormModal;
