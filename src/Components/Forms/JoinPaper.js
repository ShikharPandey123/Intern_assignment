import { useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../../Hooks/UserContext";
import { TableHeader } from "../Table";
import Loading from "../Layouts/Loading";
import ErrorStrip from "../ErrorStrip";
import { dummyPapers } from "../../data/papers";
import { dummyUsers } from "../../data/users";
import { FaArrowLeft } from "react-icons/fa";

const JoinPaper = () => {
  const navigate = useNavigate();
  // Use dummy data instead of context for development/testing
  const useDummyData = true; // Set to false to use real data
  const { user: contextUser, setPaperList } = useContext(UserContext) || {};
  const user = useDummyData ? dummyUsers.student : contextUser;
  
  const [error, setError] = useState("");
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    const getallPapers = async () => {
      if (useDummyData) {
        // Use dummy data - filter papers that user hasn't joined yet
        const availablePapers = dummyPapers.filter(paper => 
          !paper.students || !paper.students.some(student => student._id === user._id)
        );
        setPapers(availablePapers);
      } else {
        try {
          // This would be used in a real API environment
          // const response = await axios.get("paper/manage/" + user._id);
          // setPapers(response.data);
          setPapers(dummyPapers); // Fallback to dummy data
        } catch (err) {
          setError(err);
        }
      }
    };
    getallPapers();

    const updatePapers = async () => {
      if (useDummyData) {
        // Use dummy data for joined papers
        const joinedPapers = dummyPapers.filter(paper => 
          paper.students && paper.students.some(student => student._id === user._id)
        );
        if (setPaperList) setPaperList(joinedPapers);
      } else {
        // This would be used in a real API environment
        // const response = await axios.get(`paper/student/${user._id}`);
        // setPaperList(response.data);
        if (setPaperList) setPaperList([]);
      }
    };
    // updating paperList while component unmounts
    return () => updatePapers();
  }, [user, setPaperList, useDummyData]);

  const handleJoin = async (e) => {
    const paperId = e.currentTarget.id;
    const index = e.target.name;
    const students = papers[index].students;
    students.push(user._id);
    updateStudents(paperId, students, index);
  };

  const handleLeave = async (e) => {
    const paperId = e.currentTarget.id;
    const index = e.target.name;
    const students = papers[index].students;
    const updatedStudents = students.filter((student) => student !== user._id);
    updateStudents(paperId, updatedStudents, index);
  };

  const updateStudents = async (paperId, studentsObj, paperIndex) => {
    setError("");
    
    if (useDummyData) {
      // Use dummy data - simulate successful join/leave
      toast.success("Operation completed successfully");
      const updatedPaper = papers.map((paper, index) => {
        if (index === parseInt(paperIndex)) {
          paper.joined = !paper.joined;
          return paper;
        } else return paper;
      });
      setPapers(updatedPaper);
    } else {
      try {
        // This would be used in a real API environment
        // const response = await axios.patch("/paper/" + paperId, {
        //   students: studentsObj,
        //   id: paperId,
        // });
        // toast.success(response.data.message);
        toast.success("Operation completed successfully");
        const updatedPaper = papers.map((paper, index) => {
          if (index === parseInt(paperIndex)) {
            paper.joined = !paper.joined;
            return paper;
          } else return paper;
        });
        setPapers(updatedPaper);
      } catch (err) {
        setError(err);
      }
    }
  };

  return (
    <>
      {user.role === "student" ? (
        <main>
          <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 rounded-md border-2 border-violet-900 bg-transparent px-4 py-2 font-semibold text-violet-900 transition-colors hover:bg-violet-900 hover:text-white dark:border-violet-400 dark:text-violet-400 dark:hover:bg-violet-400 dark:hover:text-slate-900"
          >
            <FaArrowLeft />
            Back
          </button>
          <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
            Manage Paper
          </h2>
          <form>
            {papers.length ? (
              <>
                <div className="my-4 w-full overflow-auto rounded-md border-2 border-slate-900 dark:border-slate-500 dark:p-[1px]">
                  <table className="w-full text-left">
                    <TableHeader
                      AdditionalRowClasses={"rounded-t-xl text-left"}
                      AdditionalHeaderClasses={'last:text-center'}
                      Headers={[
                        "Paper",
                        "Department",
                        "Year",
                        "Semester",
                        "Teacher",
                        "Manage",
                      ]}
                    />
                    <tbody>
                      {papers?.map((paper, index) => (
                        <tr key={index}>
                          <td className="border-t-[1px] border-violet-400 dark:border-slate-400 px-4 py-2">
                            {paper.paper}
                          </td>
                          <td className="border-t-[1px] border-violet-400 dark:border-slate-400 px-4 py-2">
                            {paper.department}
                          </td>
                          <td className="border-t-[1px] border-violet-400 dark:border-slate-400 px-4 py-2">
                            {paper.year}
                          </td>
                          <td className="border-t-[1px] border-violet-400 dark:border-slate-400 px-4 py-2">
                            {paper.semester}
                          </td>
                          <td className="border-t-[1px] border-violet-400 dark:border-slate-400 px-4 py-2">
                            {paper?.teacher?.name || "No Teacher Assigned"}
                          </td>
                          <td className="border-t-[1px] border-violet-400 dark:border-slate-400 p-0">
                            {!paper.joined ? (
                              <button
                                type="button"
                                id={paper._id}
                                name={index}
                                onClick={(e) => handleJoin(e)}
                                className="m-0 flex h-auto w-full justify-center bg-transparent py-3  text-lg  hover:bg-violet-900 hover:text-slate-100 dark:text-slate-100 "
                              >
                                Join
                              </button>
                            ) : (
                              <button
                                className="m-0 flex h-auto w-full justify-center bg-transparent py-3  text-lg  hover:bg-red-600 hover:text-slate-100 dark:text-slate-100 "
                                type="button"
                                id={paper._id}
                                name={index}
                                onClick={(e) => handleLeave(e)}
                              >
                                Leave
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <Loading />
            )}
          </form>
          {error ? <ErrorStrip error={error} /> : ""}
        </main>
      ) : (
        <Navigate to="/dash" />
      )}
    </>
  );
};

export default JoinPaper;
