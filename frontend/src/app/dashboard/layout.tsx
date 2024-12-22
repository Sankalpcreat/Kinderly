import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import ContentWrapper from "@/components/layout/ContentWrapper";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-white">
          <Sidebar />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">
          <ContentWrapper
            maxWidth="xl"
            padding="p-8"
            background="bg-white"
            container={true}
            centered={false}
            className="shadow-md rounded-lg"
          >
            {children}
          </ContentWrapper>
        </main>
      </div>
    </div>
  );
}