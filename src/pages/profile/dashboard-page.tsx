import React from "react";
import DashboardLayout from "../../layouts/dashboard-layout";

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
