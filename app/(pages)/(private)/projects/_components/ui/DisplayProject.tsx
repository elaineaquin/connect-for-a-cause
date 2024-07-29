"use client";
import React from "react";
import { TypographyH2, TypographyP } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Delete, Hand, Mail, NotebookPen } from "lucide-react";
import { Project } from "@/server/definitions";
import Autoplay from "embla-carousel-autoplay";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import DeleteProjectButton from "./DeleteProjectButton";

interface DisplayProjectProps {
  project: Project;
}

const DisplayProject = ({ project }: DisplayProjectProps) => {
  const getBadgeClass = (status: string) => {
    switch (status) {
      case "started":
        return "bg-green-500 text-white"; // Green badge
      case "pending":
        return "bg-blue-500 text-white"; // Blue badge
      case "aborted":
        return "bg-red-500 text-white"; // Red badge
      default:
        return "bg-gray-500 text-white"; // Default badge
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <TypographyH2>{project.title}</TypographyH2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Project Location:</p>{" "}
              <Badge className={cn(getBadgeClass(project.status))}>
                {project.status}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <TypographyP>{project.location}</TypographyP>
              <TypographyP>
                {new Date(project.endDate).toDateString()}
              </TypographyP>
            </div>
          </div>
          {project.photos.length > 0 && (
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 4000,
                }),
              ]}
            >
              <CarouselContent>
                {project.photos.map((photo, index) => (
                  <CarouselItem
                    key={index}
                    className="flex items-center justify-center"
                  >
                    <img
                      src={photo}
                      alt={`Project Photo ${index + 1}`}
                      width={400}
                      height={120}
                      className="object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          )}
          <Separator className="my-2" />
          <p className="text-sm text-muted-foreground">Content:</p>
          <p dangerouslySetInnerHTML={{ __html: project.content }} />

          {!project.isAuthor ? (
            <div className="flex justify-end w-full space-x-4">
              <Button variant={"secondary"} className="w-full">
                <Hand className="me-2" /> Support
              </Button>
              <Button variant={"secondary"} className="w-full">
                <Mail className="me-2" /> Contact
              </Button>
            </div>
          ) : (
            <div className="flex justify-end w-full space-x-4">
              <Link href={`/projects/edit/${project.id}`} className="w-full">
                <Button variant={"default"} className="w-full">
                  <NotebookPen className="me-2" /> Edit
                </Button>
              </Link>
              <DeleteProjectButton projectId={project.id} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DisplayProject;
