import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { AiFillBook } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { dummyPapers } from "../../data/papers";

const Paper = () => {
  const navigate = useNavigate();
  // Use dummy data instead of context for development/testing
  const useDummyData = true; // Set to false to use real data
  const { setPaper, paperList: contextPaperList } = useContext(UserContext) || {};
  const paperList = useDummyData ? dummyPapers : contextPaperList;

  return (
    <main className="paper">
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
        Papers
      </h2>
      {paperList?.length ? (
        <section className="pt-4 lg:columns-2">
          {paperList.map((paper, index) => (
            useDummyData ? (
              // In dummy mode, render as div instead of Link to prevent navigation
              <div 
                key={index} 
                className="cursor-pointer"
                onClick={() => {
                  console.log("Selected paper:", paper);
                  alert(`You clicked on: ${paper.paper}\n(Navigation disabled in dummy mode)`);
                }}
              >
                <article className="mb-4 flex items-center whitespace-break-spaces rounded-md  bg-violet-300 p-2 hover:bg-violet-400 duration-200 dark:bg-slate-950/80 dark:hover:bg-slate-950/50 dark:hover:text-slate-300 lg:p-4 ">
                  <AiFillBook className="text-[3rem] lg:text-[4rem]" />
                  <div className="">
                    <h3 className="px-1 text-xl line-clamp-1 font-semibold lg:px-2 lg:text-2xl">
                      {paper.paper}
                    </h3>
                    <hr className="border border-violet-500 dark:border-slate-400" />
                    <p className="px-2 text-sm font-medium lg:text-base ">
                      {paper.year}
                    </p>
                  </div>
                </article>
              </div>
            ) : (
              // In real mode, use Link for navigation
              <Link 
                to={paper.paper} 
                key={index} 
                onClick={() => setPaper(paper)}
              >
                <article className="mb-4 flex items-center whitespace-break-spaces rounded-md  bg-violet-300 p-2 hover:bg-violet-400 duration-200 dark:bg-slate-950/80 dark:hover:bg-slate-950/50 dark:hover:text-slate-300 lg:p-4 ">
                  <AiFillBook className="text-[3rem] lg:text-[4rem]" />
                  <div className="">
                    <h3 className="px-1 text-xl line-clamp-1 font-semibold lg:px-2 lg:text-2xl">
                      {paper.paper}
                    </h3>
                    <hr className="border border-violet-500 dark:border-slate-400" />
                    <p className="px-2 text-sm font-medium lg:text-base ">
                      {paper.year}
                    </p>
                  </div>
                </article>
              </Link>
            )
          ))}
        </section>
      ) : (
        <p className="text-lg">No Papers Found.</p>
      )}
    </main>
  );
};

export default Paper;
