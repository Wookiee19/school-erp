import React from "react";

import { NavSidebar } from "./NavSidebar";
import BodyWrapper from "./BodyWrapper";

export const DashboardLayout = ({ children }) => {
  return (
    <BodyWrapper>
     
        <NavSidebar />
        {children}
   
    </BodyWrapper>
  );
};
