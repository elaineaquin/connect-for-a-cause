import { DataTableColumnHeader } from "@/components/customs/table/_components/data-table-column-header";
import { DataTableRowActions } from "@/components/customs/table/_components/data-table-row-actions";
import { TypographyP } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { SpaceRoom } from "@/server/definitions";
import { joinSpace } from "@/server/space";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<SpaceRoom>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return <div>{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "purpose",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Purpose" />
    ),
    cell: ({ row }) => {
      return <div>{row.getValue("purpose")}</div>;
    },
  },
  {
    accessorKey: "ownerName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner" />
    ),
    cell: ({ row }) => {
      return <div>{row.getValue("ownerName")}</div>;
    },
  },
  {
    accessorKey: "privacy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Privacy" />
    ),
    cell: ({ row }) => {
      return <div>{row.getValue("privacy")}</div>;
    },
  },
  {
    accessorKey: "membersCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Members" />
    ),
    cell: ({ row }) => {
      return <div>{row.getValue("membersCount")}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        row.getValue("projectId") && (
          <Link href={`/projects/read/${row.getValue("projectId")}`}>
            View Project
          </Link>
        )
      );
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Join" />
    ),
    cell: ({ row }) => {
      const router = useRouter();
      return row.getValue("privacy") === "public" ? (
        <Button
          onClick={async () => {
            const response = await joinSpace({ spaceId: row.getValue("id") });
            if (response.data?.id) {
              router.push("/messages/group");
            }
          }}
        >
          Join Group
        </Button>
      ) : (
        <TypographyP>Private space</TypographyP>
      );
    },
  },
];
