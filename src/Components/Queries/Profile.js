import React from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import Loading from "../Layouts/Loading";
import { PiUserThin, PiStudentThin } from "react-icons/pi";
import { FaArrowLeft } from "react-icons/fa";
import { dummyUsers } from "../../data/users";

const Profile = () => {
  const navigate = useNavigate();
  // Use dummy data instead of context for development/testing
  const useDummyData = true; // Set to false to use real data
  const { user: contextUser } = React.useContext(UserContext) || {};
  const user = useDummyData ? dummyUsers.student : contextUser;
  const [profile, setProfile] = React.useState({});

  React.useEffect(() => {
    const getProfile = async () => {
      if (useDummyData) {
        // Use dummy data for development/testing
        setProfile(user);
        return;
      }

      // Original API call logic would go here when useDummyData is false
      setProfile({});
    };
    getProfile();
  }, [user, useDummyData]);

  return (
    <main className="flex w-full flex-col justify-center md:w-fit">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-200 rounded-md border border-violet-900 hover:bg-violet-900 transition-colors duration-200 dark:bg-violet-900 dark:border-violet-300 dark:hover:bg-slate-900"
        >
          <FaArrowLeft className="text-sm" />
          Back
        </button>
      </div>
      {profile.name ? (
        <>
          <div className=" my-4 flex w-full justify-center overflow-auto dark:border-slate-500 dark:p-[1px]">
            {user.userType === "staff" ? (
              <PiUserThin className="m-2 rounded-full border-2 border-slate-900 p-1 text-6xl dark:border-slate-300 md:p-2 md:text-9xl lg:text-[12rem]" />
            ) : (
              <PiStudentThin className="m-2 rounded-full border-2 border-slate-900 p-1 text-6xl font-light dark:border-slate-300 md:p-2 md:text-9xl lg:text-[12rem]" />
            )}
            <div className="flex flex-col items-start justify-center">
              <h2 className=" whitespace-break-spaces text-3xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
                {user?.name}
              </h2>
              <p className="text-lg capitalize sm:text-xl md:text-2xl">
                {user?.role}
              </p>
            </div>
          </div>
          <div className=" w-full overflow-auto rounded-md border-2 border-slate-900 dark:border-slate-500 dark:p-[1px]">
            <table className="w-full ">
              <tbody>
                {Object.keys(profile).map((key, index) => (
                  <tr
                    key={index}
                    className="border-t first:border-t-0 border-slate-400 last:border-b-0 "
                  >
                    <th className="bg-slate-900 p-4 text-base capitalize text-slate-100">
                      {key}
                    </th>
                    <td className="px-4 py-2">{profile[key]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default Profile;
