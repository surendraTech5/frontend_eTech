import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, FileText } from "lucide-react";

export default function LectureDetailModal({ open, onClose, lecture }) {
  if (!lecture) return null;

  const { lectureName, description, notes, additionalDocuments } = lecture;

  const renderFile = (label, url) => {
    if (!url) return null;
    const filename = decodeURIComponent(url.split("/").pop().split("?")[0]);

    return (
      <div className="flex items-start justify-between bg-muted/40 border p-4 rounded-lg mb-3">
        <div className="flex gap-2 items-center">
          <FileText className="w-4 h-4 text-muted-foreground" />
          <div>
            <div className="text-sm font-medium">{label}</div>
            <div className="text-xs text-muted-foreground truncate max-w-[220px]">
              {filename}
            </div>
          </div>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          <Download className="w-4 h-4" />
          Download
        </a>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{lectureName} - Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[400px] pr-2 mt-2">
          <div className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground font-medium mb-1">
                Description
              </div>
              <p className="text-sm">{description || "—"}</p>
            </div>
            {renderFile("Notes", notes)}
            {renderFile("Additional Documents", additionalDocuments)}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
