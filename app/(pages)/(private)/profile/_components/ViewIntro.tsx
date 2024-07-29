"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Edit } from "lucide-react";
import { useState } from "react";
import DisplayIntro from "./DisplayIntro";
import EditIntroForm from "./EditIntroForm";

export interface ViewIntroProps {
  currentCity: string | null;
  hometown: string | null;
  instagram: string | null;
  facebook: string | null;
  linkedIn: string | null;
  primaryEducation: string | null;
  lowerSecondaryEducation: string | null;
  upperSecondaryEducation: string | null;
  higherEducation: string | null;
}

const ViewIntro = (profile: ViewIntroProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onSubmit = () => {
    setIsDialogOpen(false);
  };

  const onClear = () => {
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <div className="relative flex items-center px-4 py-2">
        <div className="absolute bottom-0 right-0 z-20">
          <TooltipProvider disableHoverableContent>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button
                    className="rounded-md h-8"
                    variant="outline"
                    size="default"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    <Edit color="green" className="h-4 w-4 lg:me-2" />
                    <span className="hidden lg:block">EDIT</span>
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent side="right">Edit Introduction</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Intro</DialogTitle>
            </DialogHeader>
            <DialogDescription>Fill in the blanks</DialogDescription>
            <EditIntroForm
              {...profile!}
              onSubmit={onSubmit}
              onClear={onClear}
            />
          </DialogContent>
        </div>
        <h2>Personal Introduction</h2>
      </div>
      <DisplayIntro isPending={isDialogOpen} {...profile!} />
    </Dialog>
  );
};

export default ViewIntro;
