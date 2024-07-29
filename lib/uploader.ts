import { type UploadedFile } from "@/server/definitions";
import { toBase64 } from "./image";

export const uploadFiles = async (
  files: File[],
  onUploadProgress?: (params: { file: string; progress: number }) => void
): Promise<UploadedFile[]> => {
  const uploadedFiles: UploadedFile[] = [];

  await Promise.all(
    files.map(async (file) => {
      const uploadProgress = (progress: number) => {
        if (onUploadProgress) {
          onUploadProgress({ file: file.name, progress });
        }
      };

      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        uploadProgress(progress);
      }

      const uploadedFile: UploadedFile = {
        id: `file-${Date.now()}`,
        name: file.name,
        size: file.size,
        type: file.type,
        url: await toBase64(file),
      };

      uploadedFiles.push(uploadedFile);
    })
  );

  return uploadedFiles;
};
