//App.jsx
import { useEffect, useState } from "react";

const DEPARTMENTS = [
  "Engineering",
  "Marketing",
  "Sales",
  "Human Resources",
  "Finance",
  "Operations",
  "Design",
  "Legal",
  "Customer Support",
  "Product Management",
];

function App() {
  const [employees, setEmployees] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchDept, setSearchDept] = useState(""); // "" = All
  const [sortBy, setSortBy] = useState("none");     // "none|name|department|salary"
  const [sortOrder, setSortOrder] = useState("asc");
  const [formError, setFormError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Apply theme to root
  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
  };

  const [formData, setFormData] = useState({
    name: "",
    department: "",
    salary: "",
  });

  const API_URL = `${import.meta.env.VITE_API_URL || ""}/employees`;

  // FETCH EMPLOYEES
  const getEmployees = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setEmployees(data);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formError) setFormError("");
  };

  // ADD EMPLOYEE
  const addEmployee = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.department || !formData.salary.toString().trim()) {
      setFormError("All fields are required. Please fill in name, department, and salary.");
      return;
    }

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setFormData({ name: "", department: "", salary: "" });
    setFormError("");
    setSearchName("");
    setSearchDept("");
    setSortBy("none");

    getEmployees();
  };

  // DELETE EMPLOYEE
  const deleteEmployee = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    getEmployees();
  };

  // FILTER + SORT
  const processedEmployees = employees
    .filter((emp) => {
      const nameMatch = emp.name.toLowerCase().includes(searchName.toLowerCase());
      const deptMatch = searchDept === "" || emp.department === searchDept;
      return nameMatch && deptMatch;
    })
    .sort((a, b) => {
      if (sortBy === "none") return 0;
      if (sortBy === "salary") {
        return sortOrder === "asc"
          ? Number(a.salary) - Number(b.salary)
          : Number(b.salary) - Number(a.salary);
      }
      const valA = a[sortBy]?.toString().toLowerCase();
      const valB = b[sortBy]?.toString().toLowerCase();
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const isSearching = searchName.trim() !== "" || searchDept !== "";

  return (
    <div className="container">
      <div className="header">
        <div style={{ width: "120px" }} />
        <h1>Employee Management System</h1>
        <button className="theme-toggle" onClick={toggleTheme} title={darkMode ? "Switch to Light" : "Switch to Dark"}>
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      {/* ADD FORM */}
      <form onSubmit={addEmployee} className="form">
        <input
          type="text"
          name="name"
          placeholder="Employee Name"
          value={formData.name}
          onChange={handleChange}
        />

        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Select Department</option>
          {DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
        />

        <button type="submit">Add Employee</button>
      </form>

      {/* VALIDATION ERROR */}
      {formError && <p className="form-error">{formError}</p>}

      {/* SEARCH + SORT BAR */}
      <div className="controls-bar">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="search-input"
        />

        <select
          value={searchDept}
          onChange={(e) => setSearchDept(e.target.value)}
          className="form-select"
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>

        <div className="sort-group">
          <select
            value={sortBy}
            onChange={(e) => { setSortBy(e.target.value); setSortOrder("asc"); }}
            className="form-select"
          >
            <option value="none">Sort by...</option>
            <option value="name">Name</option>
            <option value="department">Department</option>
            <option value="salary">Salary</option>
          </select>

          {sortBy !== "none" && (
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="form-select sort-order-select"
            >
              <option value="asc">↑ Asc</option>
              <option value="desc">↓ Desc</option>
            </select>
          )}
        </div>

        {isSearching && (
          <button
            className="clear-btn"
            onClick={() => { setSearchName(""); setSearchDept(""); }}
          >
            ✕ Clear
          </button>
        )}
      </div>

      {/* RESULT COUNT */}
      {isSearching && (
        <p className="search-info">
          {processedEmployees.length === 0
            ? "No employees found."
            : `${processedEmployees.length} result${processedEmployees.length > 1 ? "s" : ""} found`}
        </p>
      )}

      {/* EMPLOYEE CARDS */}
      <div className="employee-grid">
        {processedEmployees.map((employee) => (
          <div key={employee.id} className="card">
            <h3>{employee.name}</h3>
            <p>Department: {employee.department}</p>
            <p>Salary: Rs. {employee.salary}</p>
            <button className="delete-btn" onClick={() => deleteEmployee(employee.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;
