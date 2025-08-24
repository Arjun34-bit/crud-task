import React, { useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast, ToastContainer } from "react-toastify";

import {
  ModuleRegistry,
  AllCommunityModule,
  themeQuartz,
} from "ag-grid-community";
import { useEmpState } from "../context/EmpProvider";
import { deleteEmployeeRecord, updateEmployeeRecord } from "../api/empApi";
import { transformDataToLower } from "../constants/utils";

ModuleRegistry.registerModules([AllCommunityModule]);

const InputCellRenderer = (props) => {
  const [value, setValue] = useState(props.value);

  const handleChange = (e) => {
    setValue(e.target.value);
    props.setValue(e.target.value);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      className="w-full"
      style={{
        color: "black",
      }}
    />
  );
};

const EmployeesTable = () => {
  const gridRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [filterText, setFilterText] = useState("");

  const [selectedRows, setSelectedRows] = useState([]);
  const [actionType, setActionType] = useState(false);

  const { trigger, setTrigger, empData } = useEmpState();

  const transformData = useMemo(() => {
    return empData.map((emp) => ({
      id: emp.id,
      Name: emp.name,
      Department: emp.department,
      Email: emp.email,
      Role: emp.role,
    }));
  }, [empData]);

  const [rowData, setRowData] = useState([
    {
      Name: "Arjun Devendra",
      Department: "Developer",
      Email: "arjun@gmail.com",
      Role: "Full Stack Developer",
    },
    {
      Name: "Karan Devendra",
      Department: "Developer",
      Email: "karan@gmail.com",
      Role: "Backend Developer",
    },
    {
      Name: "Julie",
      Department: "Sales",
      Email: "julie@gmail.com",
      Role: "Sales Executive",
    },
  ]);

  const [colDefs] = useState([
    {
      headerName: "",
      checkboxSelection: true,
      headerCheckboxSelection: false,
      width: 50,
    },
    { headerName: "Sr. No", valueGetter: "node.rowIndex + 1", flex: 1 },
    { field: "Name", flex: 1, cellRenderer: InputCellRenderer },
    { field: "Department", flex: 1, cellRenderer: InputCellRenderer },
    { field: "Email", flex: 1, cellRenderer: InputCellRenderer },
    { field: "Role", flex: 1, cellRenderer: InputCellRenderer },
  ]);

  const myTheme = themeQuartz.withParams({
    inputIconColor: "purple",
    inputTextColor: "black",
    inputInvalidBackgroundColor: "purple",
    inputInvalidBorder: "darkred",
    inputInvalidTextColor: "white",
  });

  const onSelectionChanged = () => {
    const selected = gridRef.current.api.getSelectedRows();
    setSelectedRows(selected);
  };

  const handleDeleteSelected = async () => {
    const selected = gridRef.current.api.getSelectedRows();

    const selectedIds = selected.map((emp) => emp.id);
    console.log("Selected IDs for deletion:", selectedIds);

    try {
      const response = await deleteEmployeeRecord(selectedIds);
      if (response.status === 201) {
        toast.success(
          `${selectedRows.length} Employee Records has been deleted successfully`
        );
        setTrigger(!trigger);
      }
    } catch (error) {
      toast.error("Error deleting selected rows");
      console.error("Error deleting selected rows:", error);
    }
  };

  const handleUpdateRow = async () => {
    setActionType(true);
    const selected = gridRef.current.api.getSelectedRows();
    const payload = transformDataToLower(selected);

    try {
      const res = await updateEmployeeRecord(selected[0]?.id, payload[0]);
      if (res.status === 200) {
        toast.success("Employee Record Updated Successfully");
      }
      setTrigger(!trigger);
    } catch (error) {
      toast.error("Error updating row");
      console.error("Error updating row:", error);
    }
  };

  const handleExternalFilterChange = (e) => {
    const value = e.target.value;

    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.setFilterModel({
        Name: {
          type: "contains",
          filter: value,
        },
      });
      gridRef.current.api.onFilterChanged();
    }
  };

  return (
    <div className="w-full p-3 mt-3">
      <h1 className="text-lg font-semibold mb-3">Employees Table</h1>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <input
            placeholder="Search by Name..."
            onChange={handleExternalFilterChange}
            className="rounded-lg border-2 border-blue-300 p-2 w-64"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <button
            onClick={handleDeleteSelected}
            disabled={selectedRows.length === 0}
            className="bg-red-500 text-white px-3 py-1 rounded disabled:opacity-50 w-full sm:w-auto"
          >
            Delete Selected ({selectedRows.length})
          </button>

          <div className="relative group w-full sm:w-auto">
            <button
              onClick={handleUpdateRow}
              disabled={selectedRows.length !== 1}
              className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50 w-full sm:w-auto"
            >
              Update Selected Row
            </button>
            <span
              className={`absolute -top-8 left-1/2 -translate-x-1/2 text-sm px-2 py-1 rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            >
              Double Click the field to update
            </span>
          </div>
        </div>
      </div>
      {loading ? (
        <Skeleton count={10} />
      ) : (
        <div
          className="overflow-x-auto"
          style={{ height: `${50 * 8}px`, width: "100%" }}
        >
          <AgGridReact
            ref={gridRef}
            theme={myTheme}
            rowData={transformData}
            columnDefs={colDefs}
            rowSelection={actionType ? "single" : "multiple"}
            onSelectionChanged={onSelectionChanged}
            defaultColDef={{ filter: true }}
          />
        </div>
      )}
    </div>
  );
};

export default EmployeesTable;
