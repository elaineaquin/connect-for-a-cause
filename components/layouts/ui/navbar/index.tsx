"use client";

import { ClientProfile } from "@/server/definitions";
import { SheetMenu } from "./SheetMenu";
import { UserNav } from "./UserNav";
import { ModeToggle } from "@/components/customs/mode-toggle";
import { useClient } from "@/store/use-client";

interface NavbarProps {
  title: string;
}

function N({ title, data }: { title: string; data: ClientProfile }) {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <ModeToggle />
          <UserNav user={data} />
        </div>
      </div>
    </header>
  );
}

export default function Navbar({ title }: NavbarProps) {
  const { client, isLoading } = useClient();

  if (isLoading) {
    return (
      <N
        title="Loading"
        data={{ email: "placeholder@gmail.com", name: "Jhon Doe", id: 0 }}
      />
    );
  }
  if (client) return <N title={title} data={client} />;
}
