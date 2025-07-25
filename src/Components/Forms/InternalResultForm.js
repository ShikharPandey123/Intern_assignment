import { useState, useContext } from "react";
import UserContext from "../../Hooks/UserContext";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { TableHeader } from "../Table";
import ErrorStrip from "../ErrorStrip";
import { dummyInternalResults } from "../../data/internalResults";
import { dummyPapers } from "../../data/papers";

const InternalResultForm = () => {
  const useDummyData = true;
  const { paperList: contextPaperList } = useContext(UserContext) || {};
  const paperList = useDummyData ? dummyPapers : contextPaperList;
  
  const [paper, setPaper] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [internal, setInternal] = useState([]);
  const [id, setId] = useState([]);
  const [error, setError] = useState("");

  const fetchInternal = async (e) => {
    setInternal([]);
    setError("");
    e.preventDefault();
    
    if (useDummyData) {
      // Use dummy data instead of API call
      const internalResult = dummyInternalResults.find(result => result.paper === paper);
      if (internalResult) {
        setId(internalResult._id);
        setInternal(internalResult.marks);
        setDisabled(true);
        setError("");
      } else {
        // If no record exists, create blank records for students
        const selectedPaper = dummyPapers.find(p => p._id === paper);
        if (selectedPaper && selectedPaper.students) {
          const students = selectedPaper.students.map(student => ({
            ...student,
            test: 0,
            seminar: 0,
            assignment: 0,
            attendance: 0,
            total: 0
          }));
          setInternal(students);
          setDisabled(false);
        }
      }
    } else {
      try {
        // This would be used in a real API environment
        // const response = await axios.get("/internal/" + paper);
        // setId(response.data._id);
        // setInternal(response.data.marks);
        setDisabled(true);
        setError("");
      } catch (err) {
        setError(err);
        // incase no record exists
        if (err.response && err.response.status === 404) {
          // This would fetch students in real API environment
          // const response = await axios.get("paper/" + paper);
          // const students = response.data.students;
          setDisabled(false);
        }
      }
    }
  };

  const addInternalMark = async (e) => {
    e.preventDefault();
    
    if (useDummyData) {
      // Use dummy data - simulate successful save
      toast.success("Internal marks saved successfully");
      setDisabled(true);
      setError("");
      // You could update the dummyInternalResults here if needed
    } else {
      const marks = { id, paper, marks: internal };
      console.log("Would save marks:", marks); // Use the variable to avoid lint error
      try {
        // This would be used in a real API environment
        // const response = await axios.post("internal/" + paper, marks);
        // toast.success(response.data.message);
        toast.success("Internal marks saved successfully");
        setDisabled(true);
        setError("");
        fetchInternal(e);
      } catch (err) {
        // conflict, record already exists
        if (err.response && err.response.status === 409) {
          try {
            // This would update in real API environment
            // const response = await axios.patch("internal/" + paper, marks);
            // toast.success(response.data.message);
            toast.success("Internal marks updated successfully");
            setDisabled(true);
            setError("");
          } catch (err) {
            setError(err);
          }
        } else setError(err);
      }
    }
  };

  const deleteInternalMark = async (e) => {
    e.preventDefault();
    
    if (useDummyData) {
      // Use dummy data - simulate successful delete
      toast.success("Internal marks deleted successfully", {
        icon: ({ theme, type }) => <FaTrash />,
      });
      setInternal([]);
    } else {
      try {
        // This would be used in a real API environment
        // const response = await axios.delete("internal/" + id);
        // toast.success(response.data.message, {
        //   icon: ({ theme, type }) => <FaTrash />,
        // });
        toast.success("Internal marks deleted successfully", {
          icon: ({ theme, type }) => <FaTrash />,
        });
        setInternal([]);
      } catch (err) {
        setError(err);
      }
    }
  };

  // updating internal state on "onChange" event.
  const handleFormChange = (e) => {
    // the whole thing is a convoluted mess, but it works.
    // if you have an alternative, DM ;).
    const index = parseInt(e.target.id);
    const value = e.target.value;
    const key = e.target.name;
    const newStudent = internal[index];
    newStudent[key] = value;
    const newInternal = internal.map((student, index) => {
      if (index === e.target.id) {
        return newStudent;
      } else return student;
    });
    setInternal(newInternal);
  };

  return (
    <main className="internal">
      <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
        Internal Mark
      </h2>
      <section className="form__head">
        <form className="w-full gap-4 accent-violet-900 md:flex">
          <select
            className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400 md:w-1/3"
            placeholder="select paper"
            name="paper"
            id="paper"
            value={paper}
            required
            onChange={(e) => setPaper(e.target.value)}
          >
            <option defaultValue hidden>
              Select Paper
            </option>
            {paperList.map((paper) => (
              <option key={paper._id} value={paper._id}>
                {paper.paper}
              </option>
            ))}
          </select>
          <button
            className="mb-4 h-10 w-auto rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-8 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 disabled:cursor-not-allowed dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900"
            type="submit"
            onClick={(e) => fetchInternal(e)}
          >
            Fetch
          </button>
        </form>
      </section>
      <div>{error ? <ErrorStrip error={error} /> : ""}</div>
      <section className="internal__body">
        <form className="internal__body__form group">
          {internal.length ? (
            
            <div className="my-4 w-full overflow-auto rounded-md border-2 border-slate-900 dark:border-slate-500 dark:p-[1px]">
              <table className="w-full">
                <TableHeader
                  AdditionalHeaderClasses={"first:text-left"}
                  Headers={[
                    "Student",
                    "Test",
                    "Seminar",
                    "Assignment",
                    "Attendance",
                    "Total",
                  ]}
                />
                <tbody className="">
                  {internal?.map((student, index) => (
                    <tr
                      key={index}
                      className={
                        // checking whether the student passed (total mark is above 12), bgcolor to represent it.
                        parseInt(student?.test) +
                          parseInt(student?.seminar) +
                          parseInt(student?.assignment) +
                          parseInt(student?.attendance) >
                        12
                          ? "border-t-[1px] border-slate-400 bg-violet-900/50 first:border-none"
                          : "border-t-[1px] border-slate-400 first:border-none"
                      }
                    >
                      <td className="p-2 text-left">{student.name}</td>
                      <td className="p-2 text-center">
                        <input
                          className="w-full pl-3 "
                          type="number"
                          required
                          min="0"
                          max="5"
                          disabled={disabled}
                          id={index}
                          name="test"
                          value={student.test}
                          onChange={(e) => handleFormChange(e)}
                        />
                      </td>
                      <td className="p-2 text-center">
                        <input
                          className="w-full pl-3 "
                          type="number"
                          required
                          min="0"
                          max="5"
                          disabled={disabled}
                          id={index}
                          name="seminar"
                          value={student.seminar}
                          onChange={(e) => handleFormChange(e)}
                        />
                      </td>
                      <td className="p-2 text-center">
                        <input
                          className="w-full pl-3 "
                          type="number"
                          required
                          min="0"
                          max="5"
                          disabled={disabled}
                          id={index}
                          name="assignment"
                          value={student.assignment}
                          onChange={(e) => handleFormChange(e)}
                        />
                      </td>
                      <td className="p-2 text-center">
                        <input
                          className="w-full pl-3 "
                          type="number"
                          required
                          min="0"
                          max="5"
                          disabled={disabled}
                          id={index}
                          name="attendance"
                          value={student.attendance}
                          onChange={(e) => handleFormChange(e)}
                        />
                      </td>
                      <td className="p-2 text-center">
                        <input
                          className="w-full pl-3 "
                          type="number"
                          required
                          min="0"
                          max="5"
                          disabled
                          id={index}
                          name="total"
                          value={
                            parseInt(student?.test) +
                            parseInt(student?.seminar) +
                            parseInt(student?.assignment) +
                            parseInt(student?.attendance)
                          }
                          onChange={(e) => handleFormChange(e)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            ""
          )}
          {internal.length && disabled ? (
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
                className="mb-4 flex h-10 w-auto items-center gap-2 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-6 py-2 font-semibold tracking-wide text-slate-200 hover:bg-red-700 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-red-700"
                onClick={(e) => deleteInternalMark(e)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          ) : (
            ""
          )}
          {internal.length && !disabled ? (
            <button
              type="submit"
              className="mb-4 flex h-10 group-invalid:hidden w-auto items-center gap-2 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-6 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900"
              onClick={(e) => addInternalMark(e)}
            >
              <FaPlus /> Save
            </button>
          ) : (
            ""
          )}
          <p className="text-balance m-2 overflow-hidden text-ellipsis whitespace-break-spaces rounded bg-red-300/50 p-1 text-center font-medium text-red-700 dark:bg-transparent group-invalid:block hidden">invalid Data</p>
        </form>
      </section>
    </main>
  );
};

export default InternalResultForm;
