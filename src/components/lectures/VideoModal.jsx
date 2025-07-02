import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function VideoModal({ open, onClose, videoUrl }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Lecture Preview</DialogTitle>
        </DialogHeader>
        <div className="w-full h-[360px]">
          <video
            src={videoUrl}
            controls
            autoPlay
            className="w-full h-full rounded-lg bg-black"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
