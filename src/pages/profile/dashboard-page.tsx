import React from "react";
import DashboardLayout from "../../layouts/dashboard-layout";
const navigation = [
  { name: "Dashboard", href: "/dashboard", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Sign in", href: "/api/auth/login", current: false },
];
const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(" ");
};
const buttonClasses = classNames("btn", "btn-primary", "active");



const DashboardPageContent: React.FC = () => {
  return <div>dashboard-page</div>;
};

const DashboardPage: React.FC = () => {
  return (
    <DashboardLayout>
      <DashboardPageContent />
    </DashboardLayout>
  );
};

export default DashboardPage;
