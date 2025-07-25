import { useContext, useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { FaUniversity } from "react-icons/fa";
import { PiStudentThin, PiUserThin, PiSpinnerGapBold } from "react-icons/pi";
import CircleDesign from "../Layouts/CircleDesign";
import ErrorStrip from "../ErrorStrip";
import { dummyLoginCredentials } from "../../data/users";

const Login = () => {
  const navigate = useNavigate();
  // Use dummy data instead of context for development/testing
  const useDummyData = true; // Set to false to use real data
  const { user, setUser, loading } = useContext(UserContext) || {};
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [error, setError] = useState("");
  const [buttonText, setButtonText] = useState("Login");
  const [message, setMessage] = useState("");

  const slowLoadingIndicator = () => {
    setTimeout(() => {
      setMessage(
        "NOTE:Web Services on the free instance type are automatically spun down after 15 minutes of inactivity. When a new request for a free service comes in, Render spins it up again so it can process the request. This will cause a delay in the response of the first request after a period of inactivity while the instance spins up."
      );
    }, 4000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (userType === "") {
      setError({
        response: {
          data: "Select User Type",
        },
      });
    } else {
      setButtonText("Loading...");
      
      if (useDummyData) {
        // Use dummy data for login
        // Simulate a brief delay for loading
        setTimeout(() => {
          let loginUser = null;
          // Check against flexible login credentials
          const validCredential = dummyLoginCredentials.find(
            cred => cred.username === username && 
                   cred.password === password && 
                   cred.userType === userType
          );
          if (validCredential) {
            loginUser = { ...validCredential.userData, userType };
            setUser(loginUser); // Always set context user
            localStorage.setItem("userDetails", JSON.stringify(loginUser));
            setButtonText("Login");
            // Force navigation after a short delay to ensure state is updated
            setTimeout(() => {
              navigate("/dash");
            }, 100);
          } else {
            setError({
              response: {
                data: "Invalid credentials. Try: student/password, shikhar/password, staff/password, or admin/password",
              },
            });
            setButtonText("Login");
          }
        }, 1000);
      } else {
        slowLoadingIndicator();
        try {
          // This would be used in a real API environment
          // const response = await axios.post("/auth/login/" + userType, {
          //   username,
          //   password,
          // });
          // await setUser({ ...response.data, userType });
          // localStorage.setItem("userDetails", JSON.stringify({ ...response.data, userType }));
          setButtonText("Login");
        } catch (err) {
          setError(err);
          setButtonText("Login");
        }
      }
    }
  };

 useEffect(() => {
  // Always restore user from localStorage into context
  if ("userDetails" in localStorage) {
    const storedUser = JSON.parse(localStorage.getItem("userDetails"));
    setUser(storedUser);
  }
  // Only clear userType and message on mount
  setUserType("");
  setMessage("");
  // Only run this effect once on mount!
  // eslint-disable-next-line
}, []);

  if (loading) {
    // Show a loading spinner or blank screen while restoring user
    return (
      <main className="flex h-screen items-center justify-center bg-gradient-to-b from-slate-400 to-slate-300 dark:from-slate-800 dark:to-slate-950">
        <PiSpinnerGapBold className="animate-spin text-6xl text-violet-700 dark:text-violet-400" />
      </main>
    );
  }
  return (
    <>
      {!user?._id ? (
        // ...existing code...
        <main className="relative z-0 flex h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-400 to-slate-300 text-slate-950 dark:from-slate-800 dark:to-slate-950 dark:text-slate-300">
          {message && !error && (
            <header className="absolute top-0 w-full bg-violet-500/50 p-2 text-xs dark:bg-slate-700/50 lg:text-base">
              {message}
            </header>
          )}
          <CircleDesign />
          <section className="z-0 mb-4 flex items-center duration-200 gap-2 whitespace-nowrap text-6xl md:text-8xl lg:gap-4">
            <FaUniversity />
            <h1 className="font-spectral font-semibold  text-slate-900  dark:text-slate-300 ">
              K
              <span className="inline-block h-10 w-10 rounded-full bg-violet-900 dark:bg-violet-600 md:h-14 md:w-14 xl:h-14 xl:w-14"></span>
              llege
            </h1>
          </section>
          <section className="z-0 w-[65%] justify-self-center rounded-lg bg-slate-100 opacity-80 hover:opacity-100 focus:opacity-100 duration-200 dark:bg-[#060913] sm:w-[min(50%,360px)] md:w-[min(40%,360px)] xl:w-[min(23%,360px)] ">
            <form
              className="tracking-wide placeholder:text-slate-200 dark:placeholder:text-violet-200 "
              onSubmit={(e) => handleLogin(e)}
            >
              <section className="flex flex-col items-center justify-start ">
                <div className="flex w-full text-lg ">
                  <label
                    className="radio relative flex w-1/2 cursor-pointer flex-col items-center rounded-tl-lg p-4 dark:border-l-[1.5px] dark:border-t-[1.5px]  dark:border-solid dark:border-violet-900"
                    htmlFor="staff"
                  >
                    Staff
                    <input
                      className="absolute opacity-0"
                      type="radio"
                      value="staff"
                      id="staff"
                      name="userType"
                      onClick={() => setUserType("staff")}
                    />
                  </label>
                  <label
                    className="radio relative flex w-1/2 cursor-pointer flex-col items-center rounded-tr-lg p-4 dark:border-r-[1.5px] dark:border-t-[1.5px] dark:border-solid dark:border-violet-900"
                    htmlFor="student"
                  >
                    Student
                    <input
                      className="absolute opacity-0"
                      type="radio"
                      value="student"
                      id="student"
                      name="userType"
                      onClick={() => setUserType("student")}
                    />
                  </label>
                </div>
                <div className="flex duration-200 w-full justify-center p-1 pt-0 text-8xl dark:border-x-[1.5px] dark:border-solid dark:border-violet-900 md:p-3 md:pt-0">
                  {userType === "student" ? (
                    <PiStudentThin className="animate-slide rounded-full border-2 border-slate-900 p-1 font-light dark:border-slate-300 md:p-2" />
                    ) : userType === "staff" ? (
                      <PiUserThin className="animate-slide rounded-full border-2 border-slate-900 p-1 font-light dark:border-slate-300 md:p-2" />
                      ) : (
                        <FaUniversity className="animate-fadeIn rounded-lg border-2 border-slate-900 p-1 font-light dark:border-slate-300 md:p-2" />
                        )}
                </div>
              </section>
              <section className="rounded-b-lg px-4 pb-4 dark:border-x-[1.5px] dark:border-b-[1.5px] dark:border-solid dark:border-violet-900">
              {userType?
              <>
                <input
                  className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
                  placeholder="username"
                  id="username"
                  type="text"
                  required
                  autoComplete="off"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  />
                <input
                  className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
                  placeholder="password"
                  id="password"
                  type="password"
                  required
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  />
                <button
                  className="mb-1 flex h-10 w-full items-center justify-center gap-1 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 p-1 font-bold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 disabled:cursor-wait dark:border-violet-300 dark:bg-violet-600 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus:bg-slate-900 lg:mb-2 "
                  type="submit"
                  value="Login"
                  disabled={buttonText !== "Login"}
                  onClick={(e) => handleLogin(e)}
                  >
                  {!(buttonText === "Login") && (
                    <PiSpinnerGapBold className="animate-spin" />
                    )}
                  {buttonText}
                </button>
                </>
                : <p className="w-full bg-violet-300 dark:bg-violet-950/90 duration-200 rounded p-4 my-12 text-center">Select User Type</p>  }
                {error ? <ErrorStrip error={error} /> : ""}
                <p className="inline text-slate-600 dark:text-violet-200">
                  Click to{" "}
                </p>
                <button
                  type="button"
                  className="font-semibold text-violet-600 decoration-2 hover:underline focus:underline   dark:text-violet-400"
                  onClick={() => navigate("./register/reg_student")}
                  >
                  Register
                </button>
              </section>
            </form>
            {/* Dummy credentials info */}
            <section className="mt-4 p-3 rounded bg-violet-100 dark:bg-violet-900/60 text-sm text-slate-700 dark:text-violet-200">
              <div className="mb-2 font-semibold">Demo Credentials:</div>
              <div className="mb-1">
                <span className="font-semibold">Student:</span> <span className="font-mono">student / password</span> or <span className="font-mono">shikhar / password</span>
              </div>
              <div>
                <span className="font-semibold">Staff:</span> <span className="font-mono">staff / password</span> or <span className="font-mono">admin / password</span>
              </div>
            </section>
          </section>
        </main>
        // ...existing code end...
      ) : (
        <Navigate to="/dash" />
      )}
    </>
  );
};

export default Login;
