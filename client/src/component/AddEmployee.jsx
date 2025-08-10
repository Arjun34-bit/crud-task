import React from "react";
import { useForm } from "react-hook-form";

const AddEmployee = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="mt-3 w-full p-3">
      <h1 className="text-lg font-semibold mb-3">Add Employee Data</h1>{" "}
      <div className="w-full flex justify-around items-center p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap md:flex-nowrap gap-3 h-12">
            <div className="bg-white py-2 px-3 w-[250px] border border-red-500 rounded-lg relative">
              <label className="bg-white absolute top-[-11px] left-3">
                Name
              </label>
              <input
                {...register("name")}
                type="text"
                className="w-full p-1 focus:outline-none focus:ring-0"
              />
            </div>

            <div className="bg-white p-3 w-[250px] border border-red-500 rounded-lg relative">
              <label className="bg-white absolute top-[-11px] left-3">
                Department
              </label>
              <input
                {...register("department")}
                type="text"
                className="w-full p-1 focus:outline-none focus:ring-0"
              />
            </div>

            <div className="bg-white p-3 w-[250px] border border-red-500 rounded-lg relative">
              <label className="bg-white absolute top-[-11px] left-3">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                className="w-full p-1 focus:outline-none focus:ring-0"
              />
            </div>

            <div className="bg-white p-3 w-[250px] border border-red-500 rounded-lg relative">
              <label className="bg-white absolute top-[-11px] left-3">
                Role
              </label>
              <input
                {...register("role")}
                type="text"
                className="w-full p-1 focus:outline-none focus:ring-0"
              />
            </div>

            <div className="bg-white p-3 p-3 flex items-center justify-center">
              <button className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-300 transition duration-300">
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
