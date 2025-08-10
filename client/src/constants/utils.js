export const transformDataToLower = (empData) => {
  const dataArray = Array.isArray(empData) ? empData : [empData];

  return dataArray.map((emp) => ({
    name: emp.Name,
    department: emp.Department,
    email: emp.Email,
    role: emp.Role,
  }));
};
