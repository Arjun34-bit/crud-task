import React, { createContext, useContext, useEffect, useState } from "react";
import { getAllEmpRecords } from "../api/empApi";

export const EmployeeContext = createContext();

const EmpProvider = ({ children }) => {
  const [trigger, setTrigger] = useState(false);
  const [empData, setEmpData] = useState([]);

  useEffect(() => {
    const fetchAllEmpData = async () => {
      try {
        const result = await getAllEmpRecords();
        setEmpData(result.data);
      } catch (error) {
        throw error;
      }
    };

    fetchAllEmpData();
  }, [trigger]);

  const value = {
    empData,
    setEmpData,
    trigger,
    setTrigger,
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmpState = () => {
  const context = useContext(EmployeeContext);

  if (!context) {
    throw new Error("Context Error");
  }

  return context;
};

export default EmpProvider;
