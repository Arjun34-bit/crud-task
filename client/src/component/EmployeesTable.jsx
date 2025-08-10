import React, { useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast, ToastContainer } from "react-toastify";

import {
  ModuleRegistry,
  AllCommunityModule,
  themeQuartz,
} from "ag-grid-community";

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

  const [filterText, setFilterText] = useState("");

  const [selectedRows, setSelectedRows] = useState([]);

  const [actionType, setActionType] = useState(false);

  const [loading, setLoading] = useState(false);

  const [rowData, setRowData] = useState([
    {
      Name: "Arjun",
      Department: "Developer",
      Email: "arjun@gmail.com",
      Role: "Full Stack Developer",
    },
    {
      Name: "Karan",
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

  const handleDeleteSelected = () => {
    const remainingRows = rowData.filter((row) => !selectedRows.includes(row));
    setRowData(remainingRows);
    setSelectedRows([]);

    // try {
    //   toast.success("Selected rows deleted successfully");
    // } catch (error) {
    //   toast.error("Error deleting selected rows");
    //   console.error("Error deleting selected rows:", error);
    // }
  };

  const handleUpdateRow = () => {
    setActionType(true);
    const selected = gridRef.current.api.getSelectedRows();
    console.log("Selected Row for Update:", selected);
    setSelectedRows(selected);

    // try {
    //   toast.success("Row Updated successfully");
    // } catch (error) {
    //   toast.error("Error updating row");
    //   console.error("Error updating row:", error);
    // }
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
    gridRef.current.api.setQuickFilter(e.target.value);
  };

  return (
    <div className="w-full p-3 mt-3">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="flex justify-between items-center mb-4">
        <div className="flex justify-start items-center gap-2">
          <h1 className="text-lg font-semibold mb-3">EmployeesTable</h1>
          <div className="mb-3">
            <input
              placeholder="Filter by Name..."
              value={filterText}
              onChange={handleFilterChange}
              className="rounded-lg border p-2 w-64"
            />
          </div>
        </div>

        <div className="flex justify-center items-center gap-2">
          <div className="mb-3 flex gap-3">
            <button
              onClick={handleDeleteSelected}
              disabled={selectedRows.length === 0}
              className="bg-red-500 text-white px-3 py-1 rounded disabled:opacity-50"
            >
              Delete Selected ({selectedRows.length})
            </button>
          </div>
          <div className="mb-3 flex gap-3">
            <button
              onClick={handleUpdateRow}
              disabled={selectedRows.length !== 1}
              className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
            >
              Update Selected Row
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <Skeleton count={10} />
      ) : (
        <div style={{ height: "400px", width: "100%" }}>
          <AgGridReact
            ref={gridRef}
            theme={myTheme}
            rowData={rowData}
            columnDefs={colDefs}
            rowSelection={actionType ? "single" : "multiple"}
            onSelectionChanged={onSelectionChanged}
          />
        </div>
      )}
    </div>
  );
};

export default EmployeesTable;
