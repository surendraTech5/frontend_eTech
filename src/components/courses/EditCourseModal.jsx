import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-toastify";
import { CLASS_OPTIONS, MEDIUM_OPTIONS, BOARD_OPTIONS } from "../common/CourseConstant";
import { updateCourseDetails } from "../../config/liveapi";

const EditCourseModal = ({ open, setOpen, courseData, refreshCourses, subjectsList }) => {
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [duration, setDuration] = useState("");
  const [classes, setClasses] = useState("");
  const [activeDiscount, setActiveDiscount] = useState(false);
  const [free, setFree] = useState(false);
  const [paid, setPaid] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [subject, setSubject] = useState("");

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (courseData) {
      setCourseName(courseData.courseName || "");
      setDescription(courseData.description || "");
      setPrice(courseData.price || "");
      setDiscount(courseData.discount || "");
      setDuration(courseData.duration || "");
      setClasses(courseData.classes || "");
      setActiveDiscount(courseData.isActiveDiscount || false);
      setFree(courseData.isFree || false);
      setPaid(courseData.isPaid || false);
      setIsActive(courseData.isActive ?? true);
      setSubject(courseData.subjects?.[0]?._id || "");
    }
  }, [courseData]);

  const handleUpdate = async () => {
    try {
      const payload = {
        courseName,
        description,
        price,
        discount,
        isActiveDiscount: activeDiscount,
        isFree: free,
        isPaid: paid,
        duration,
        classes,
        isActive,
      };

      const res = await updateCourseDetails(token, courseData._id, payload);
      if (res.status) {
        toast.success("Course updated successfully!");
        setOpen(false);
        refreshCourses();
      } else {
        toast.error(res.message || "Failed to update course");
      }
    } catch (err) {
      toast.error("Something went wrong during update");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Course</DialogTitle>
          <DialogDescription>Update the details and click save.</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-h-[60vh] overflow-y-auto px-4">
          <div className="space-y-2 md:col-span-2">
            <Label>Course Name</Label>
            <Input value={courseName} onChange={(e) => setCourseName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Price</Label>
            <Input value={price} type="number" onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Discount (%)</Label>
            <Input value={discount} type="number" onChange={(e) => setDiscount(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Duration</Label>
            <Input value={duration} onChange={(e) => setDuration(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Class</Label>
            <Select onValueChange={setClasses} value={classes}>
              <SelectTrigger>
                <SelectValue placeholder="Select a class" />
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
          <div className="space-y-2 md:col-span-2">
            <Label>Description</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Free Course</Label>
            <RadioGroup value={free ? "yes" : "no"} onValueChange={(val) => {
              const isYes = val === "yes";
              setFree(isYes);
              if (isYes) setPaid(false);
            }}>
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
            <RadioGroup value={paid ? "yes" : "no"} onValueChange={(val) => {
              const isYes = val === "yes";
              setPaid(isYes);
              if (isYes) setFree(false);
            }}>
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
            <RadioGroup value={activeDiscount ? "yes" : "no"} onValueChange={(val) => setActiveDiscount(val === "yes")}>
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
          <div className="flex items-center space-x-2">
            <Checkbox checked={isActive} onCheckedChange={setIsActive} />
            <Label>Active</Label>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleUpdate}>Update Course</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCourseModal;
