import React from "react";
import PublicLayout from '../../layouts/public-layout'

const AboutUsPageContent: React.FC = () => {
  return <div>About-us-page</div>;
};


const AboutUsPage: React.FC = () => {
  return (
    <PublicLayout>
      <AboutUsPageContent />
    </PublicLayout>
  );
};

export default AboutUsPage;
