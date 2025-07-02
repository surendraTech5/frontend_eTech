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
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-toastify";
import { updateSubjectDetails } from "../../config/liveapi";


const EditCourseModal = ({ open, setOpen, subjectData, refreshSubject }) => {
   const [subjectName, setSubjectName] = useState("");
   const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);


  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (subjectData) {
      setSubjectName(subjectData.subjectName || "");
      setDescription(subjectData.description || "");
      setIsActive(subjectData.isActive ?? true);
    }
  }, [subjectData]);

  const handleUpdate = async () => {
    try {
      const payload = {
        subjectName,
        description,
        isActive,
      };

      const res = await updateSubjectDetails(subjectData._id,payload,token);
      if (res.status) {
        toast.success("Subject updated successfully!");
        setOpen(false);
        refreshSubject();
      } else {
        toast.error(res.message || "Failed to update subject");
      }
    } catch (err) {
      toast.error("Something went wrong during update");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Subject</DialogTitle>
          <DialogDescription>Update the details and click save.</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-h-[60vh] overflow-y-auto px-4">
          <div className="space-y-2 md:col-span-2">
            <Label>Subject Name</Label>
            <Input value={subjectName} onChange={(e) => setSubjectName(e.target.value)} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Description</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox checked={isActive} onCheckedChange={setIsActive} />
            <Label>Active</Label>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleUpdate}>Update Subject</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCourseModal;
