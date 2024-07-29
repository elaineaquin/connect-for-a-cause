import { PrivateMessage, SpaceMessage } from "@prisma/client";

export type ServerActionResponse<T> = {
  success: boolean;
  data: T | string;
};

export type UploadedFile = {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
};

export type SessionPayload = {
  userId: string | number;
  expiresAt: Date;
};

export type ClientProfile = {
  id: number;
  name: string;
  email: string;
  profilePicture?: string;
};

export type UserProfile = {
  id: number;
  name: string;
  email: string;
  profilePicture?: string;
};

export type Participant = {
  id: number;
  name: string;
  email: string;
  profilePicture?: string;
};

export type PrivateRoom = {
  id: string;
  participants: Array<Participant>;
  other: number;
  messages: Array<PrivateMessage & { timestamp: number }>;
};

export type Project = {
  photos: string[];
  isAuthor: boolean;
  id: string;
  userId: number;
  title: string;
  content: string;
  location: string;
  sdg: string;
  status: string;
  endDate: Date;
  name: string;
  phone: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ProfileIntro = {
  primaryEducation: string | null;
  lowerSecondaryEducation: string | null;
  upperSecondaryEducation: string | null;
  higherEducation: string | null;
  currentCity: string | null;
  hometown: string | null;
  instagram: string | null;
  linkedIn: string | null;
  facebook: string | null;
};

export type SpaceRoom = {
  ownerName: string;
  membersCount: number;
  spaceProfile?: string;
  id: string;
  name: string;
  ownerId: number;
  privacy: string;
  purpose: string;
  projectId: string | null;
  users: {
    id: number;
    name: string;
    profilePicture?: string;
  }[];
  messages: Array<SpaceMessage & { timestamp: number }>;
};
