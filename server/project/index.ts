"use server";

import { z } from "zod";
import { CreateProjectValidationSchema } from "./validations";
import { verifySession } from "../session";
import { decodeBase64, encodeBase64 } from "@/lib/image";
import prisma from "@/lib/prisma";

const uploadProject = async (
  project: z.infer<typeof CreateProjectValidationSchema>
) => {
  try {
    const { userId } = await verifySession();
    const endDate = new Date(project.end_date);

    if (isNaN(endDate.getTime())) {
      throw new Error("Invalid Date Format");
    }

    const photoBuffers = project.photos?.map(encodeBase64) ?? [];

    const newProject = await prisma.project.create({
      data: {
        content: project.content,
        location: project.location,
        name: project.name,
        phone: project.phone,
        sdg: project.sdg,
        title: project.title,
        description: project.description,
        endDate,
        status: "started",
        photos: { set: photoBuffers },
        userId,
      },
    });
    return { data: newProject };
  } catch (error) {
    console.error(error);
    return { error: `${error}` };
  }
};

const getProjectsByAuthor = async ({
  userId,
  option = { take: 10 },
}: {
  option?: { take: number };
  userId: number;
}) => {
  try {
    const projects = await prisma.project.findMany({
      where: { userId },
      ...option,
    });
    const projectByAuthor = projects.map((project) => ({
      ...project,
      photos: project.photos.map(decodeBase64),
      isAuthor: project.userId === userId,
    }));
    return { data: projectByAuthor ?? [] };
  } catch (error) {
    console.error(error);
    return { error: `${error}` };
  }
};

const getAllProjects = async ({
  option = { take: 10 },
}: {
  option?: { take: number };
}) => {
  try {
    const { userId } = await verifySession();
    const projects = await prisma.project.findMany({ ...option });
    const projectsFound = projects.map((project) => ({
      ...project,
      photos: project.photos.map(decodeBase64),
      isAuthor: project.userId === userId,
    }));
    return { data: projectsFound ?? [] };
  } catch (error) {
    console.error(error);
    return { error: `${error}` };
  }
};

const findProject = async ({ projectId }: { projectId: string }) => {
  try {
    const { userId } = await verifySession();
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) return { data: null };
    const projectFound = {
      ...project,
      photos: project.photos.map(decodeBase64) ?? [],
      isAuthor: project.userId === userId,
    };
    return { data: projectFound };
  } catch (error) {
    console.error(error);
    return { error: `${error}` };
  }
};

const deleteProject = async ({ projectId }: { projectId: string }) => {
  try {
    await verifySession();
    await prisma.project.delete({
      where: { id: projectId },
    });
  } catch (error) {
    console.error(error);
    return { error: `${error}` };
  }
};

const editProject = async (
  projectUpdates: z.infer<typeof CreateProjectValidationSchema> & {
    projectId: string;
  }
) => {
  try {
    await verifySession();
    const endDate = new Date(projectUpdates.end_date);

    if (isNaN(endDate.getTime())) {
      throw new Error("Invalid Date Format");
    }

    // Get the existing project
    const existingProject = await prisma.project.findUnique({
      where: { id: projectUpdates.projectId },
    });

    if (!existingProject) {
      throw new Error("Project not found");
    }

    // Encode new photos
    const newPhotoBuffers = projectUpdates.photos?.map(encodeBase64) ?? [];

    // Update the project
    const updatedProject = await prisma.project.update({
      where: { id: projectUpdates.projectId },
      data: {
        content: projectUpdates.content,
        location: projectUpdates.location,
        name: projectUpdates.name,
        phone: projectUpdates.phone,
        sdg: projectUpdates.sdg,
        title: projectUpdates.title,
        description: projectUpdates.description,
        endDate,
        status: projectUpdates.status,
        photos: { set: newPhotoBuffers },
      },
    });

    console.log(updatedProject);
    return { data: updatedProject };
  } catch (error) {
    console.error(error);
    return { error: `${error}` };
  }
};

export {
  uploadProject,
  getAllProjects,
  getProjectsByAuthor,
  findProject,
  deleteProject,
  editProject,
};
