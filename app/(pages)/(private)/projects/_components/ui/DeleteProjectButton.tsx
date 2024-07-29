"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteProject } from "@/server/project";
import { Delete } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const DeleteProjectButton = ({ projectId }: { projectId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"destructive"} onClick={openDialog}>
          <Delete className="me-2" /> Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            project and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant={"outline"} onClick={closeDialog}>
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            onClick={async () => {
              await deleteProject({ projectId });
              router.push("/projects/all");
              closeDialog();
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProjectButton;
