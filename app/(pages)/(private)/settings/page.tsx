import LazyBreadCrumb from "@/components/customs/lazy-breadcrumb";
import ContentLayout from "@/components/layouts/ContentLayout";
import React from "react";
import AccountSettings from "./_components/AccountSettings";
import { cn } from "@/lib/utils";
import CollaborationSettings from "./_components/CollaborationSettings";
import NotificationSettings from "./_components/NotificationSettings";
import NewMessagesSettings from "./_components/NewMessagesSettings";
import LanguageSettings from "./_components/LanguageSettings";
import SupportAndFeedback from "./_components/SupportAndFeedback";

function DemoContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-center [&>div]:w-full",
        className
      )}
      {...props}
    />
  );
}

const SettingsPage = () => {
  return (
    <ContentLayout title="Settings">
      <LazyBreadCrumb
        items={[
          { href: "#", label: "Home" },
          { href: "/dashboard", label: "Dashboard" },
          { label: "Settings" },
        ]}
        display={2}
      />
      <div className="items-start justify-center gap-6 rounded-lg p-2 md:grid lg:grid-cols-2">
        <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
          <DemoContainer>
            <AccountSettings />
          </DemoContainer>
          <DemoContainer>
            <CollaborationSettings />
          </DemoContainer>
          <DemoContainer>
            <NotificationSettings />
          </DemoContainer>
          <DemoContainer>
            <NewMessagesSettings />
          </DemoContainer>
        </div>
        <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
          <DemoContainer>
            <LanguageSettings />
          </DemoContainer>
          <DemoContainer>
            <SupportAndFeedback />
          </DemoContainer>
        </div>
      </div>
    </ContentLayout>
  );
};

export default SettingsPage;
