import React from "react";
import { useParams } from "react-router-dom";
import EnhancedTable from "../components/enhancedTable";

export const Dashboard = ({ bookings }) => {
  let { username } = useParams();
  console.log(useParams);
  return (
    <div>
      <h1>User/Host Bookings Dashboard</h1>
      <h3>Username: {username}</h3>
      <EnhancedTable />
    </div>
  );
};
