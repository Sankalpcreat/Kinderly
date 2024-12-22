import React from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import ContentWrapper from "@/components/layout/ContentWrapper";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <ContentWrapper
        className="flex-grow"
        padding="p-8"
        centered
        maxWidth="xl"
        background="bg-gray-50"
      >
        <h1 className="text-4xl font-bold text-gray-800 text-center">
          Welcome to Kinderly!
        </h1>
        <p className="mt-4 text-lg text-gray-600 text-center">
          Track your child’s milestones, discover engaging activities, and create
          magical bedtime stories.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <PrimaryButton
            label="Get Started"
            onClick={() => window.location.href = "/auth/signup"}
          />
          <PrimaryButton
            label="Learn More"
            color="secondary"
            onClick={() => window.location.href = "/about"}
          />
        </div>
      </ContentWrapper>

      {/* Footer */}
      <Footer
        companyName="Kinderly"
        copyrightYear={new Date().getFullYear()}
        socialLinks={{
          facebook: "https://facebook.com/kinderly",
          twitter: "https://twitter.com/kinderly",
          instagram: "https://instagram.com/kinderly",
        }}
        links={[
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Service", href: "/terms" },
        ]}
      />
    </div>
  );
}