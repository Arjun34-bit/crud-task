import React from "react";
import AddEmployee from "../component/AddEmployee";
import EmployeesTable from "../component/EmployeesTable";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-200 w-full">
      <div className="text-black">
        <div className="bg-white w-full max-w-none p-2 lg:p-4 lg:rounded-none shadow-md mb-4">
          <AddEmployee />
        </div>

        <div className="bg-white w-full max-w-none p-2 lg:p-4 lg:rounded-none shadow-md mb-4">
          <EmployeesTable />
        </div>
      </div>
    </div>
  );
};

export default Home;
