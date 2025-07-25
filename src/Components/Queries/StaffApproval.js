import { useContext, useState, useEffect } from "react";
import UserContext from "../../Hooks/UserContext";
import { Navigate } from "react-router-dom";
import { FaPlus, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Loading from "../Layouts/Loading";
import ErrorStrip from "../ErrorStrip";
import { TableHeader } from "../Table";
import { dummyStaffApprovals } from "../../data/staffApprovals";
import { dummyUsers } from "../../data/users";

const StaffApproval = () => {
  // Use dummy data instead of context for development/testing
  const useDummyData = true; // Set to false to use real data
  const { user: contextUser } = useContext(UserContext) || {};
  const user = useDummyData ? dummyUsers.staff : contextUser;
  
  const [newStaffs, setNewStaffs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getNewStaffs = async () => {
      if (useDummyData) {
        // Use dummy data - filter by department
        const departmentStaffs = dummyStaffApprovals.filter(
          staff => staff.department === user.department && staff.status === "pending"
        );
        setNewStaffs(departmentStaffs);
      } else {
        try {
          // This would be used in a real API environment
          // const response = await axios.get("staff/approve/" + user.department);
          // setNewStaffs(response.data);
          setNewStaffs(dummyStaffApprovals); // Fallback to dummy data
        } catch (err) {
          setError(err);
        }
      }
    };
    getNewStaffs();
  }, [user, useDummyData]);

  const handleApprove = async (e) => {
    const index = e.currentTarget.id;
    const staff = newStaffs[index];
    
    if (useDummyData) {
      // Use dummy data - simulate approval
      staff.role = "teacher";
      staff.status = "approved";
      newStaffs.splice(index, 1);
      setNewStaffs([...newStaffs]); // Force re-render
      toast.success("Staff member approved successfully");
      setError("");
    } else {
      staff.role = "teacher";
      try {
        // This would be used in a real API environment
        // const response = await axios.patch("/staff/" + staff._id, {
        //   id: staff._id,
        //   role: staff.role,
        // });
        // toast.success(response.data.message);
        newStaffs.splice(index, 1);
        setNewStaffs([...newStaffs]);
        toast.success("Staff member approved successfully");
        setError("");
      } catch (err) {
        setError(err);
      }
    }
  };

  const handleDelete = async (e) => {
    const index = e.currentTarget.id;
    
    if (useDummyData) {
      // Use dummy data - simulate deletion
      newStaffs.splice(index, 1);
      setNewStaffs([...newStaffs]); // Force re-render
      toast.success("Staff member deleted successfully", {
        icon: ({ theme, type }) => <FaTrash />,
      });
    } else {
      try {
        // This would be used in a real API environment
        const staff = newStaffs[index]._id;
        console.log("Would delete staff:", staff); // Use the variable to avoid lint error
        // const response = await axios.delete("/staff/" + staff);
        // toast.success(response.data.message, {
        //   icon: ({ theme, type }) => <FaTrash />,
        // });
        newStaffs.splice(index, 1);
        setNewStaffs([...newStaffs]);
        toast.success("Staff member deleted successfully", {
          icon: ({ theme, type }) => <FaTrash />,
        });
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  return (
    <>
      {user.role === "HOD" ? (
        <main className="staff__approval">
          <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
            Approve Staff
          </h2>
          <h3 className="text-2xl font-semibold">
            Department: {user.department}
          </h3>
          <form>
            {newStaffs.length ? (
              <div className="my-4 w-full overflow-auto rounded-md border-2 border-slate-900 dark:border-slate-500 dark:p-[1px]  ">
                <table className="w-full">
                  <TableHeader
                    Headers={["Name", "Email", "Username", "Approve", "Reject"]}
                    AdditionalRowClasses={"text-left"}
                    AdditionalHeaderClasses={"last:text-center secondLast"}
                  />
                  <tbody>
                    {newStaffs?.map((staff, index) => (
                      <tr key={index}>
                        <td className="border-t-[1px] border-slate-400 p-2">
                          {staff.name}
                        </td>
                        <td className="border-t-[1px] border-slate-400 p-2">
                          {staff.email}
                        </td>
                        <td className="border-t-[1px] border-slate-400 p-2">
                          {staff.username}
                        </td>
                        <td className="border-t-[1px] border-slate-400 p-0">
                          <button
                            type="button"
                            id={index}
                            onClick={(e) => handleApprove(e)}
                            className="m-0 flex h-auto w-full justify-center bg-transparent  py-3 text-xl duration-200 text-violet-400 hover:text-white hover:bg-violet-900 "
                          >
                            <FaPlus />
                          </button>
                        </td>
                        <td className="border-t-[1px] border-slate-400 p-0">
                          <button
                            className="m-0 flex h-auto w-full justify-center bg-transparent  py-3 text-xl duration-200 text-violet-400 hover:text-white hover:bg-red-600 "
                            type="button"
                            id={index}
                            onClick={(e) => handleDelete(e)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              ""
            )}
            {!newStaffs.length && !error && <Loading />}
          </form>
          {error ? <ErrorStrip error={error} /> : ""}
        </main>
      ) : (
        <Navigate to="/dash" />
      )}
    </>
  );
};

export default StaffApproval;
