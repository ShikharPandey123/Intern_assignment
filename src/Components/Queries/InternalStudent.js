import React from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { TableHeader } from "../Table";
import axios from "../../config/api/axios";
import Loading from "../Layouts/Loading";
import ErrorStrip from "../ErrorStrip";
import { FaArrowLeft } from "react-icons/fa";

// Dummy data for testing
const dummyUser = {
  _id: "dummy-student-id",
  name: "Test Student"
};

const dummyInternalData = [
  {
    paper: { paper: "Mathematics" },
    marks: {
      test: 8,
      seminar: 9,
      assignment: 7,
      attendance: 8
    }
  },
  {
    paper: { paper: "Physics" },
    marks: {
      test: 6,
      seminar: 7,
      assignment: 8,
      attendance: 9
    }
  },
  {
    paper: { paper: "Chemistry" },
    marks: {
      test: 9,
      seminar: 8,
      assignment: 9,
      attendance: 7
    }
  },
  {
    paper: { paper: "Biology" },
    marks: {
      test: 7,
      seminar: 6,
      assignment: 8,
      attendance: 8
    }
  },
  {
    paper: { paper: "English" },
    marks: {
      test: 5,
      seminar: 6,
      assignment: 7,
      attendance: 6
    }
  },
  {
    paper: { paper: "History" },
    marks: {
      test: 8,
      seminar: 9,
      assignment: 8,
      attendance: 9
    }
  }
];

const InternalStudent = () => {
  const navigate = useNavigate();
  // Use dummy data instead of context for development/testing
  const useDummyData = true; // Set to false to use real data
  const { user: contextUser } = React.useContext(UserContext) || {};
  const user = useDummyData ? dummyUser : contextUser;
  
  const [internal, setInternal] = React.useState([]);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const fetchInternal = async () => {
      if (useDummyData) {
        // Use dummy data for development/testing
        console.log("Loading dummy internal marks data");
        setInternal(dummyInternalData);
        return;
      }

      // Original API call logic
      try {
        const response = await axios.get("/internal/student/" + user._id);
        setInternal(response.data);
      } catch (err) {
        setError(err);
      }
    };
    fetchInternal();
  }, [user, useDummyData]);

  return (
    <main className="internal">
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
        Internal Mark
      </h2>
      <div>{error ? <ErrorStrip error={error} /> : ""}</div>
      {internal.length ? (
        <section className="my-4 w-full overflow-auto rounded-md border-2 border-slate-900 dark:border-slate-500 dark:p-[1px]">
          <table className="w-full ">
            <TableHeader
              AdditionalHeaderClasses={"first:text-left"}
              Headers={[
                "Paper",
                "Test",
                "Seminar",
                "Assignment",
                "Attendance",
                "Total",
              ]}
            />
            <tbody className="text-left">
              {internal?.map((paper, index) => (
                <tr
                  key={index}
                  className={
                    parseInt(paper?.marks.test) +
                      parseInt(paper?.marks.seminar) +
                      parseInt(paper?.marks.assignment) +
                      parseInt(paper?.marks.attendance) >
                    7
                      ? "border-t-[1px] border-violet-500 bg-violet-900/50 first:border-none"
                      : "border-t-[1px] border-violet-500 first:border-none"
                  }
                >
                  <td className="p-2 text-left">{paper.paper.paper}</td>
                  <td className="p-2 text-center">{paper.marks.test}</td>
                  <td className="p-2 text-center">{paper.marks.seminar}</td>
                  <td className="p-2 text-center">{paper.marks.assignment}</td>
                  <td className="p-2 text-center">{paper.marks.attendance}</td>
                  <td className="p-2 text-center">
                    {paper.marks.test +
                      paper.marks.seminar +
                      paper.marks.assignment +
                      paper.marks.attendance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default InternalStudent;
