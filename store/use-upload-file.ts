"use client";
import { uploadFiles } from "@/lib/uploader";
import { getErrorMessage } from "@/lib/utils";
import { UploadedFile } from "@/server/definitions";
import React from "react";
import { toast } from "sonner";

type UseUploadFileProps = {
  defaultUploadedFiles?: UploadedFile[];
};

export function useUploadFile({
  defaultUploadedFiles = [],
}: UseUploadFileProps = {}) {
  const [uploadedFiles, setUploadedFiles] =
    React.useState<UploadedFile[]>(defaultUploadedFiles);

  const [progresses, setProgresses] = React.useState<Record<string, number>>(
    {}
  );
  const [isUploading, setIsUploading] = React.useState(false);

  async function uploadThings(files: File[]) {
    setIsUploading(true);
    try {
      const res = await uploadFiles(files, ({ file, progress }) => {
        setProgresses((prev) => ({
          ...prev,
          [file]: progress,
        }));
      });
      setUploadedFiles((prev) => (prev ? [...prev, ...res] : res));
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setProgresses({});
      setIsUploading(false);
    }
  }

  return {
    uploadedFiles,
    progresses,
    uploadFiles: uploadThings,
    isUploading,
    setUploadedFiles,
  };
}
