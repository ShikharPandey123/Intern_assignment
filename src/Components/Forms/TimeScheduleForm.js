import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { FaPlus, FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import { TableHeader } from "../Table";
import Loading from "../Layouts/Loading";
import ErrorStrip from "../ErrorStrip";
import { dummyUsers } from "../../data/users";
import { dummyPapers } from "../../data/papers";
import { dummyTimeSchedule } from "../../data/timeSchedule";

const TimeScheduleForm = () => {
  const navigate = useNavigate();
  // Use dummy data instead of context for development/testing
  const useDummyData = true; // Set to false to use real data
  const { user: contextUser, paperList: contextPaperList } = useContext(UserContext) || {};
  const user = useDummyData ? dummyUsers.staff : contextUser;
  const paperList = useDummyData ? dummyPapers : contextPaperList;
  
  const [timeSchedule, setTimeSchedule] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [id, setId] = useState("");
  const [error, setError] = useState("");

  // updating attendance state on "onChange" event.
  const handleFormChange = (e) => {
    // the whole thing is a convoluted mess, but it WORKS.
    // if you have an alternative, DM ;).
    const index = parseInt(e.target.id);
    const day = e.target.name;
    const value = e.target.value;
    const newDay = timeSchedule[day].map((val, ind) => {
      if (ind === index) {
        return value;
      } else return val;
    });
    setTimeSchedule({
      ...timeSchedule,
      [e.target.name]: newDay,
    });
  };

  useEffect(() => {
    const fetchTimeSchedule = async () => {
      if (useDummyData) {
        // Use dummy data for development/testing
        setDisabled(false);
        setTimeSchedule(dummyTimeSchedule);
        setId("dummy-schedule-id");
        return;
      }

      // Original API call logic would go here when useDummyData is false
      // For now, just use empty schedule
      setDisabled(false);
      setTimeSchedule({
        monday: ["--", "--", "--", "--", "--"],
        tuesday: ["--", "--", "--", "--", "--"],
        wednesday: ["--", "--", "--", "--", "--"],
        thursday: ["--", "--", "--", "--", "--"],
        friday: ["--", "--", "--", "--", "--"],
      });
    };
    fetchTimeSchedule();
  }, [user, useDummyData]);

  const addTimeSchedule = async (e) => {
    e.preventDefault();
    const data = {
      user: user._id,
      schedule: timeSchedule,
    };

    if (useDummyData) {
      // Simulate API success for dummy data
      console.log("Dummy data saved:", data);
      toast.success("Time schedule saved successfully (dummy mode)!");
      setDisabled(true);
      return;
    }

    // Original API call logic would go here when useDummyData is false
    toast.success("Time schedule saved!");
    setDisabled(true);
  };

  const deleteTimeSchedule = async (e) => {
    e.preventDefault();

    if (useDummyData) {
      // Simulate deletion for dummy data
      console.log("Dummy data deleted");
      toast.success("Time schedule deleted successfully (dummy mode)!", {
        icon: ({ theme, type }) => <FaTrash />,
      });
      setTimeSchedule({
        monday: ["--", "--", "--", "--", "--"],
        tuesday: ["--", "--", "--", "--", "--"],
        wednesday: ["--", "--", "--", "--", "--"],
        thursday: ["--", "--", "--", "--", "--"],
        friday: ["--", "--", "--", "--", "--"],
      });
      setDisabled(false);
      return;
    }

    // Original API call logic would go here when useDummyData is false
    toast.success("Time schedule deleted!", {
      icon: ({ theme, type }) => <FaTrash />,
    });
    setTimeSchedule({
      monday: ["--", "--", "--", "--", "--"],
      tuesday: ["--", "--", "--", "--", "--"],
      wednesday: ["--", "--", "--", "--", "--"],
      thursday: ["--", "--", "--", "--", "--"],
      friday: ["--", "--", "--", "--", "--"],
    });
    setDisabled(false);
  };

  return (
    <main className="time_schedule">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-200 rounded-md border border-violet-900 hover:bg-violet-900 transition-colors duration-200 dark:bg-violet-900 dark:border-violet-300 dark:hover:bg-slate-900"
        >
          <FaArrowLeft className="text-sm" />
          Back
        </button>
      </div>
      <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
        Time Schedule
      </h2>
      <form>
        {timeSchedule.monday ? (
          <div className="my-4 w-full overflow-auto rounded-md border-2 border-slate-900 dark:border-slate-500 dark:p-[1px]">
            <table className=" w-full text-center">
              <TableHeader
                AdditionalHeaderClasses={"h-[3rem]"}
                Headers={["Day/Hour", "I", "II", "III", "IV", "V"]}
              />
              <tbody>
                {Object.entries(timeSchedule)?.map(([key, value]) => {
                  return (
                    <tr key={key}>
                      <th className="border-none bg-slate-900 px-4 py-4 text-base capitalize text-slate-100">
                        {key}
                      </th>
                      {value.map((day, index) => (
                        <td
                          className="min-w-[180px] border-l-[1px]  border-t-[1px] border-slate-400 p-1 first:border-none"
                          id="table__td"
                          key={index}
                        >
                          <select
                            className="select-img h-[3rem] focus:outline-none dark:text-violet-50 w-full appearance-none text-center leading-6 focus:border-0 disabled:opacity-100"
                            value={day}
                            name={key}
                            id={index}
                            disabled={disabled}
                            onChange={(e) => handleFormChange(e)}
                          >
                            <option defaultValue>--</option>
                            {paperList?.map((paper) => (
                              <option key={paper._id} value={paper.name}>
                                {paper.paper}
                              </option>
                            ))}
                          </select>
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <Loading />
        )}

        {timeSchedule.monday && disabled && (
          <div className="flex gap-4">
            <button
              type="submit"
              className="mb-4 flex h-10 w-auto items-center gap-2 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-6 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900"
              onClick={() => setDisabled(false)}
            >
              <FaEdit /> Edit
            </button>
            <button
              type="submit"
              className="mb-4 flex h-10 w-auto items-center gap-2 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-6 py-2 font-semibold tracking-wide text-slate-200 hover:bg-red-700 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-red-700"
              onClick={(e) => deleteTimeSchedule(e)}
            >
              <FaTrash /> Delete
            </button>
          </div>
        )}
        {!disabled && (
          <button
            type="submit"
            className="mb-4 flex h-10 w-auto items-center gap-2 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-6 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900"
            onClick={(e) => addTimeSchedule(e)}
          >
            <FaPlus /> Save
          </button>
        )}
      </form>
      {error ? <ErrorStrip error={error} /> : ""}
    </main>
  );
};

export default TimeScheduleForm;
