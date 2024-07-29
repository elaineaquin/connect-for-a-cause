import {
  Users,
  Settings,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  MessageCircle,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: "",
          label: "Projects",
          active: pathname.includes("/projects"),
          icon: SquarePen,
          submenus: [
            {
              href: "/projects",
              label: "My Projects",
              active: pathname === "/projects",
            },
            {
              href: "/projects/all",
              label: "Browse Projects",
              active: pathname === "/projects/all",
            },
          ],
        },
        {
          href: "",
          label: "Messages",
          active: pathname.includes("/messages"),
          icon: MessageCircle,
          submenus: [
            {
              href: "/messages",
              label: "Direct Messages",
              active: pathname === "/messages",
            },
            {
              href: "/messages/group",
              label: "Group Space",
              active: pathname === "/messages/group",
            },
          ],
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/profile",
          label: "Profile",
          active: pathname.includes("/profile"),
          icon: Users,
          submenus: [],
        },
        {
          href: "/settings",
          label: "Settings",
          active: pathname.includes("/settings"),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
