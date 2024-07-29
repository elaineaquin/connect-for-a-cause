import {
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const statuses = [
  {
    value: "started",
    label: "Started",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
];

export type SDGKey = keyof typeof SDGMapping;

export const SDGMapping = {
  SDG_1: "No Poverty",
  SDG_2: "Zero Hunger",
  SDG_3: "Good Health and Well-being",
  SDG_4: "Quality Education",
  SDG_5: "Gender Equality",
  SDG_6: "Clean Water and Sanitation",
  SDG_7: "Affordable and Clean Energy",
  SDG_8: "Decent Work and Economic Growth",
  SDG_9: "Industry, Innovation, and Infrastructure",
  SDG_10: "Reduced Inequalities",
  SDG_11: "Sustainable Cities and Communities",
  SDG_12: "Responsible Consumption and Production",
  SDG_13: "Climate Action",
  SDG_14: "Life Below Water",
  SDG_15: "Life on Land",
  SDG_16: "Peace, Justice, and Strong Institutions",
  SDG_17: "Partnerships for the Goals",
};
