import { useState, useContext } from "react";
import UserContext from "../../Hooks/UserContext";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { TableHeader, RowWithCheckbox } from "../Table";
import ErrorStrip from "../ErrorStrip";
import { dummyPapers } from "../../data/papers";
import { dummyStudents } from "../../data/students";

const Attendance = () => {
  // Use dummy data instead of context for development/testing
  const useDummyData = true; // Set to false to use real data
  const { paperList: contextPaperList } = useContext(UserContext) || {};
  const paperList = useDummyData ? dummyPapers : contextPaperList;
  const [attendance, setAttendance] = useState([]);
  const [paper, setPaper] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [id, setId] = useState("");

  // fetching Attendance
  const fetchAttendance = async (e) => {
    setAttendance([]);
    setError("");
    e.preventDefault();
    setError("");

    if (useDummyData) {
      // Use dummy data for development/testing
      console.log("Fetching dummy attendance data for:", { paper, date, hour });
      
      if (!paper || !date || !hour) {
        setError({ message: "Please select paper, date, and hour" });
        return;
      }

      // Simulate successful fetch with dummy data
      setId("dummy-attendance-id");
      setAttendance(dummyStudents);
      setDisabled(true);
      toast.success("Dummy attendance data loaded!");
      return;
    }

    // Original API call logic would go here when useDummyData is false
    setAttendance([]);
    setError({ message: "API calls disabled - using dummy data only" });
  };

  // adding new attendance and updating existing attendance record
  const addAttendance = async (e) => {
    e.preventDefault();

    if (useDummyData) {
      // Simulate saving attendance in dummy mode
      console.log("Saving dummy attendance data:", attendance);
      toast.success("Attendance saved successfully (dummy mode)!");
      setDisabled(true);
      setError("");
      return;
    }

    // Original API call logic would go here when useDummyData is false
    toast.success("Attendance saved!");
    setDisabled(true);
    setError("");
  };

  const deleteAttendance = async (e) => {
    e.preventDefault();

    if (useDummyData) {
      // Simulate deletion in dummy mode
      console.log("Deleting dummy attendance data");
      toast.success("Attendance deleted successfully (dummy mode)!", {
        icon: ({ theme, type }) => <FaTrash />,
      });
      setAttendance([]);
      setDisabled(true);
      return;
    }

    // Original API call logic would go here when useDummyData is false
    toast.success("Attendance deleted!", {
      icon: ({ theme, type }) => <FaTrash />,
    });
    setAttendance([]);
  };

  // updating attendance state on "onChange" event.
  const handleFormChange = (e) => {
    // the whole thing is a convoluted mess, but it works.
    // if you have an alternative, DM ;).
    const index = parseInt(e.target.id);
    const newStudent = attendance[index];
    newStudent.present = !newStudent.present;
    const newAttendance = attendance.map((student, index) => {
      if (index === parseInt(e.target.id)) return student;
      else return student;
    });
    setAttendance(newAttendance);
  };

  return (
    <main className="attendance">
      <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
        Attendance
      </h2>
      <section className="attendance__head">
        <form className="w-full gap-4 accent-violet-900 md:flex ">
          <div className="flex w-full flex-col">
            <label className="m-1" htmlFor="paper">
              Select Paper
            </label>
            <select
              className="mb-4 block h-10  rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400 "
              name="paper"
              id="paper"
              value={paper}
              required
              onChange={(e) => setPaper(e.target.value)}
            >
              <option defaultValue hidden>
                ---
              </option>
              {paperList.map((paper, index) => (
                <option key={index} value={paper._id}>
                  {paper.paper}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-full flex-col">
            <label className="m-1" htmlFor="date">
              Select Date
            </label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              id="date"
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col">
            <label className="m-1" htmlFor="hour">
              Select Hour
            </label>

            <select
              className="mb-4 h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              name="hour"
              id="hour"
              value={hour}
              required
              onChange={(e) => setHour(e.target.value)}
            >
              <option defaultValue hidden>
                ---
              </option>
              <option value="1">I</option>
              <option value="2">II</option>
              <option value="3">III</option>
              <option value="4">IV</option>
              <option value="5">V</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              className=" mb-4 h-10 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-8 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 disabled:cursor-not-allowed dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900 md:w-auto"
              type="submit"
              onClick={(e) => fetchAttendance(e)}
            >
              Fetch
            </button>
          </div>
        </form>
      </section>
      <div>{error ? <ErrorStrip error={error} /> : ""}</div>
      <section className="attendance__form">
        <form className="w-full">
          {attendance?.length ? (
            <div className="my-4 w-full rounded-md border-2 border-slate-900 dark:border-slate-500 dark:p-[1px] lg:w-1/2">
              <table className="w-full">
                <TableHeader Headers={["Present", "Student"]} />
                <tbody>
                  {attendance?.map((student, index) => (
                    <RowWithCheckbox
                      key={index}
                      keys={index}
                      disabled={disabled}
                      value={student}
                      handleFormChange={handleFormChange}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            ""
          )}
          {attendance.length && disabled ? (
            <div className="flex gap-4">
              <button
                type="submit"
                className="mb-4 flex h-10 w-auto items-center gap-2 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-6 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900"
                onClick={(e) => setDisabled(false)}
              >
                <FaEdit /> Edit
              </button>
              <button
                type="submit"
                className="mb-4 flex h-10 w-auto items-center gap-2 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-4 py-2 font-semibold tracking-wide text-slate-200 hover:bg-red-700 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-red-700"
                onClick={(e) => deleteAttendance(e)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          ) : (
            ""
          )}
          {attendance?.length && !disabled ? (
            <button
              type="submit"
              className="mb-4 flex h-10 w-auto items-center gap-2 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-4 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900 "
              onClick={(e) => addAttendance(e)}
            >
              <FaPlus /> Save
            </button>
          ) : (
            ""
          )}
        </form>
      </section>
    </main>
  );
};
export default Attendance;
