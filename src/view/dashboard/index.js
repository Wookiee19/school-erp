import React from "react";

const DashboardView = (props) => {
  const logout = () => {
    props.logout();
    props.history.push("/");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={logout}>Log Out</button>
    </div>
  );
};

export default DashboardView;
