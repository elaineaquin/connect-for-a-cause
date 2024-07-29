"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useClient } from "@/store/use-client";
import { RecentCollaborators } from "./RecentCollaborators";
import ProjectStats from "./ProjectStats";
import FundInsights from "./FundInsights";
import CountUp from "react-countup";

const Prototype = () => {
  const { client } = useClient();

  return (
    <div className="space-y-2">
      <Card>
        <CardContent className="p-6">Welcome User: {client?.name} </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Funds</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <CountUp
                start={0}
                end={43262.32}
                useEasing={true}
                decimals={2}
                prefix="₱"
                duration={2.75}
                useGrouping={true}
                decimal="."
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {" "}
              <CountUp
                start={0}
                end={93}
                useEasing={true}
                duration={2.75}
                useGrouping={true}
                suffix="%"
              />{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collaborators</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {" "}
              <CountUp
                start={0}
                end={2}
                useEasing={true}
                duration={2.75}
                useGrouping={true}
              />{" "}
            </div>
            <p className="text-xs text-muted-foreground">
              <CountUp
                start={0}
                end={100}
                useEasing={true}
                duration={2.75}
                useGrouping={true}
                suffix="%"
              />{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <ProjectStats />
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Message Requests
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">0</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <FundInsights />
        <RecentCollaborators />
      </div>
    </div>
  );
};

export default Prototype;
