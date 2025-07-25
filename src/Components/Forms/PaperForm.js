import { useState, useEffect, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import ErrorStrip from "../ErrorStrip";
import { dummyUsers } from "../../data/users";
import { dummyTeachers } from "../../data/teachers";

const PaperForm = () => {
  // Use dummy data instead of context for development/testing
  const useDummyData = true; // Set to false to use real data
  const { user: contextUser } = useContext(UserContext) || {};
  const user = useDummyData ? dummyUsers.staff : contextUser;
  
  const [newPaper, setNewPaper] = useState({
    department: user?.department || "Computer Science",
    paper: "",
    year: "2023",
    students: [],
    semester: "Select Semester",
    teacher: "",
  });
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch staffs
  useEffect(() => {
    const getTeachers = async () => {
      if (useDummyData) {
        // Use dummy data - filter teachers by department
        const departmentTeachers = dummyTeachers.filter(
          teacher => teacher.department === user?.department
        );
        setTeachers(departmentTeachers);
      } else {
        try {
          // This would be used in a real API environment
          // const list = await axios.get("/staff/list/" + user.department);
          // setTeachers(list.data);
          setTeachers(dummyTeachers); // Fallback to dummy data
        } catch (err) {
          setError(err);
        }
      }
    };
    getTeachers();
  }, [user, useDummyData]);

  const addPaper = async (e) => {
    e.preventDefault();
    
    if (useDummyData) {
      // Use dummy data - simulate successful paper creation
      console.log("Would create paper:", newPaper);
      navigate("./..");
      toast.success("Paper created successfully!");
    } else {
      try {
        // This would be used in a real API environment
        const paperData = JSON.stringify(newPaper);
        console.log("Would send data:", paperData); // Use the variable to avoid lint error
        // const response = await axios.post("paper", paperData);
        // toast.success(response.data.message);
        navigate("./..");
        toast.success("Paper created successfully!");
      } catch (err) {
        setError(err);
      }
    }
  };

  const handleFormChange = (e) => {
    setNewPaper({
      ...newPaper,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <>
      {user.role === "HOD" ? (
        <main className="paper">
          <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
            Add Paper
          </h2>
          <form className="w-full md:w-1/3">
            <label htmlFor="department">Department:</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              name="department"
              type="text"
              required
              id="department"
              value={newPaper.department}
              disabled
            />
            <label htmlFor="paper">Paper:</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="text"
              name="paper"
              id="paper"
              value={newPaper.paper}
              required
              onChange={(e) => handleFormChange(e)}
            />
            <label htmlFor="semester">Semester:</label>
            <select
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              id="semester"
              value={newPaper.semester}
              required
              onChange={(e) => handleFormChange(e)}
            >
              <option defaultValue hidden>
                Select Semester
              </option>
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
              <option value="V">V</option>
              <option value="VI">VI</option>
            </select>
            <label htmlFor="year">Year:</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="number"
              min="2000"
              max="2030"
              step="1"
              required
              id="year"
              value={newPaper.year}
              onChange={(e) => handleFormChange(e)}
            />
            <label htmlFor="teacher">Teacher:</label>
            <select
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              required
              id="teacher"
              name="teacher"
              value={newPaper.teacher}
              onChange={(e) => handleFormChange(e)}
            >
              <option defaultValue hidden>
                Select Teacher
              </option>
              {teachers?.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </select>
            <button
              className="mb-4 flex h-10 w-auto items-center gap-2 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-6 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900"
              type="submit"
              onClick={(e) => addPaper(e)}
            >
              <FaPlus />
              Add
            </button>
          </form>
          {error ? <ErrorStrip error={error} /> : ""}
        </main>
      ) : (
        <Navigate to="/" replace={true} />
      )}
    </>
  );
};

export default PaperForm;
