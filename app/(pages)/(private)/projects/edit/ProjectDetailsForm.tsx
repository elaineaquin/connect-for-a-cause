"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUploadFile } from "@/store/use-upload-file";
import React from "react";
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { editProject, uploadProject } from "@/server/project";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CreateProjectValidationSchema } from "@/server/project/validations";
import RichTextEditor from "@/components/customs/rich-text-editor";
import { FileUploader } from "@/components/customs/file-uploader";
import { UploadedFilesCard } from "../_components/ui/UploadedFilesCard";
import { Textarea } from "@/components/ui/textarea";
import { DatePickerWithPresets } from "../_components/ui/DatePicker";
import { Project } from "@/server/definitions";

interface DisplayProjectProps {
  project: Project;
}

const ProjectDetailsForm = ({ project }: DisplayProjectProps) => {
  const router = useRouter();
  const {
    uploadFiles,
    progresses,
    uploadedFiles,
    isUploading,
    setUploadedFiles,
  } = useUploadFile({
    defaultUploadedFiles: project.photos.map((photo) => ({
      id: `${Date.now()}`,
      name: `${Date.now()}`,
      url: photo,
      type: "jpg",
      size: 1000,
    })),
  });

  const { mutate: upload, isPending } = useMutation({
    mutationFn: editProject,
    onSuccess: () => {
      form.reset();
      setUploadedFiles([]);
      toast.success(`Project updated 🎉`);
      router.push("/projects");
    },
    onError: (err) => {
      toast.error(`Something went wrong ${err}`);
    },
  });

  const form = useForm<z.infer<typeof CreateProjectValidationSchema>>({
    resolver: zodResolver(CreateProjectValidationSchema),
    defaultValues: {
      title: project.title,
      location: project.location,
      end_date: project.endDate.toString(),
      content: project.content,
      sdg: project.sdg,
      name: project.name,
      phone: project.phone,
      description: project.description,
      status: project.status,
    },
  });

  const handleOnClear = () => {
    form.reset();
    setUploadedFiles([]);
  };

  const handleOnSubmit = async (
    data: z.infer<typeof CreateProjectValidationSchema>
  ) => {
    try {
      upload({
        ...data,
        photos: uploadedFiles.map((s) => s.url),
        projectId: project.id,
      });
    } catch (error) {
      toast.error(`Something went wrong ${error}`);
    }
  };

  return (
    <Form {...form}>
      <form
        className="space-y-4 p-6 rounded shadow-md"
        onSubmit={form.handleSubmit(handleOnSubmit)}
      >
        <h3 className="text-lg font-semibold mb-4">Project Details</h3>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Title</FormLabel>
              <FormControl>
                <Input placeholder="Give your idea a great name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Update Project Status</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Project Status" {...field} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="started">Started</SelectItem>
                    <SelectItem value="in progress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                    <SelectItem value="canceled">Canceled</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Give your idea a description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Where will this project begin" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sdg"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Goals</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select SDG" {...field} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SDG_1">No Poverty</SelectItem>
                    <SelectItem value="SDG_2">Zero Hunger</SelectItem>
                    <SelectItem value="SDG_3">
                      Good Health and Well-being
                    </SelectItem>
                    <SelectItem value="SDG_4">Quality Education</SelectItem>
                    <SelectItem value="SDG_5">Gender Equality</SelectItem>
                    <SelectItem value="SDG_6">
                      Clean Water and Sanitation
                    </SelectItem>
                    <SelectItem value="SDG_7">
                      Affordable and Clean Energy
                    </SelectItem>
                    <SelectItem value="SDG_8">
                      Decent Work and Economic Growth
                    </SelectItem>
                    <SelectItem value="SDG_9">
                      Industry, Innovation, and Infrastructure
                    </SelectItem>
                    <SelectItem value="SDG_10">Reduced Inequalities</SelectItem>
                    <SelectItem value="SDG_11">
                      Sustainable Cities and Communities
                    </SelectItem>
                    <SelectItem value="SDG_12">
                      Responsible Consumption and Production
                    </SelectItem>
                    <SelectItem value="SDG_13">Climate Action</SelectItem>
                    <SelectItem value="SDG_14">Life Below Water</SelectItem>
                    <SelectItem value="SDG_15">Life on Land</SelectItem>
                    <SelectItem value="SDG_16">
                      Peace, Justice, and Strong Institutions
                    </SelectItem>
                    <SelectItem value="SDG_17">
                      Partnerships for the Goals
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="end_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Deadline</FormLabel>
              <FormControl>
                <DatePickerWithPresets {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Content</FormLabel>
              <FormControl>
                <RichTextEditor {...field} />
              </FormControl>
              <FormDescription className="mt-1">
                Share us about your project
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <h3 className="text-lg font-semibold mb-4">Contact</h3>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Tell us your name or name of your organization
              </FormLabel>
              <FormControl>
                <Input placeholder="My name is..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact No.</FormLabel>
              <FormControl>
                <Input placeholder="XXXXXXXXXXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator className="my-4" />

        <h3 className="text-lg font-semibold mb-4">Photos</h3>

        <FileUploader
          maxFiles={4}
          maxSize={4 * 1024 * 1024}
          progresses={progresses}
          onUpload={uploadFiles}
          disabled={isUploading}
        />

        <UploadedFilesCard uploadedFiles={uploadedFiles} />

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => handleOnClear()}>
            Reset
          </Button>
          <Button disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProjectDetailsForm;
