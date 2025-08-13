import React from "react";
import { useForm } from "react-hook-form";
import { addEmployeeRecord } from "../api/empApi";
import { useEmpState } from "../context/EmpProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddEmployee = () => {
  const { register, handleSubmit, reset } = useForm();
  const { trigger, setTrigger } = useEmpState();

  const onSubmit = async (data) => {
    try {
      const response = await addEmployeeRecord(data);
      setTrigger(!trigger);
      if (response.status === 201) {
        toast.success("Employee Added Successfully", {
          toastId: "emp-added",
        });
      }
      reset();
    } catch (error) {
      toast.error("Failed to Add Employee Record");
      console.error("Error adding employee record:", error);
    }
  };

  return (
    <div className="mt-3 w-full p-3">
      <ToastContainer position="top-center" autoClose={2000} />
      <h1 className="text-lg font-semibold mb-3">Add Employee</h1>

      <div className="w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row md:flex-wrap gap-3">
            <div className="bg-white py-2 px-3 w-full sm:w-[250px] border border-red-500 rounded-lg relative">
              <label className="bg-white absolute -top-3 left-3 text-sm">
                Name
              </label>
              <input
                {...register("name")}
                type="text"
                className="w-full p-1 focus:outline-none"
              />
            </div>

            <div className="bg-white py-2 px-3 w-full sm:w-[250px] border border-red-500 rounded-lg relative">
              <label className="bg-white absolute -top-3 left-3 text-sm">
                Department
              </label>
              <input
                {...register("department")}
                type="text"
                className="w-full p-1 focus:outline-none"
              />
            </div>

            <div className="bg-white py-2 px-3 w-full sm:w-[250px] border border-red-500 rounded-lg relative">
              <label className="bg-white absolute -top-3 left-3 text-sm">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                className="w-full p-1 focus:outline-none"
              />
            </div>

            <div className="bg-white py-2 px-3 w-full sm:w-[250px] border border-red-500 rounded-lg relative">
              <label className="bg-white absolute -top-3 left-3 text-sm">
                Role
              </label>
              <input
                {...register("role")}
                type="text"
                className="w-full p-1 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-center w-full sm:w-auto">
              <button className="bg-red-500 text-white w-full sm:w-auto px-4 py-2 rounded-lg hover:bg-red-300 transition duration-300">
                Add Employee
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
