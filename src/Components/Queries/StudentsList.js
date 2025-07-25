import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import Loading from "../Layouts/Loading";
import ErrorStrip from "../ErrorStrip";
import { FaArrowLeft } from "react-icons/fa";
import { dummyStudents } from "../../data/students";
import { dummyPapers } from "../../data/papers";

const StudentsList = () => {
  const navigate = useNavigate();
  // Use dummy data instead of context for development/testing
  const useDummyData = true; // Set to false to use real data
  const { paper: contextPaper } = useContext(UserContext) || {};
  const paper = useDummyData ? dummyPapers[0] : contextPaper; // Use first paper as default
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getStudentsList = async (e) => {
      if (useDummyData) {
        // Use dummy data for development/testing
        console.log("Loading dummy students list for paper:", paper?.paper);
        setStudents(dummyStudents);
        return;
      }

      // Original API call logic would go here when useDummyData is false
      setStudents([]);
      setError({ message: "API calls disabled - using dummy data only" });
    };
    getStudentsList();
  }, [paper, useDummyData]);
  return (
    <main className="student">
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
        Students List
      </h2>
      <p className="text-2xl font-bold">{paper?.paper}</p>
      {students.length ? (
        <ol className="student__table mt-2 list-decimal pl-8 text-lg font-medium">
          {students?.map((student, index) => (
            <li key={index}>{student.name}</li>
          ))}
        </ol>
      ) : (
        ""
      )}
      {!students.length && !error && <Loading />}

      <div>{error ? <ErrorStrip error={error} /> : ""}</div>
    </main>
  );
};

export default StudentsList;
