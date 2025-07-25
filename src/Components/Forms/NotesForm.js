import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";
import ErrorStrip from "../ErrorStrip";
import { dummyPapers } from "../../data/papers";
import { dummyNotes } from "../../data/notes";

const NotesForm = () => {
  // Use dummy data instead of context for development/testing
  const useDummyData = true; // Set to false to use real data
  const { paper: contextPaper, notes: contextNotes } = useContext(UserContext) || {};
  const paper = useDummyData ? dummyPapers[0] : contextPaper;
  const notes = useDummyData ? dummyNotes : contextNotes;
  
  const [note, setNote] = useState({
    paper: paper?._id || "paper_001",
    title: "",
    body: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const noteId = useParams()?.note;
  
  useEffect(() => {
    console.log("mounting");
    if (noteId && notes) {
      setNote(notes[noteId]);
    }
  }, [noteId, notes]);

  const handleFormChange = (e) => {
    setNote({
      ...note,
      [e.target.id]: e.target.value,
    });
  };

  const addNote = async (e) => {
    e.preventDefault();
    
    if (useDummyData) {
      // Use dummy data - simulate successful note creation
      console.log("Would create note:", note);
      setError("");
      navigate(-1, { replace: true });
      toast.success("Note created successfully!");
    } else {
      try {
        // This would be used in a real API environment
        // const response = await axios.post("notes/paper/" + paper._id, note);
        // toast.success(response.data.message);
        setError("");
        navigate(-1, { replace: true });
        toast.success("Note created successfully!");
      } catch (err) {
        setError(err);
      }
    }
  };

  const updateNote = async (e) => {
    e.preventDefault();
    console.log(noteId, note);
    
    if (useDummyData) {
      // Use dummy data - simulate successful note update
      console.log("Would update note:", note);
      navigate(-1, { replace: true });
      setError("");
      toast.success("Note updated successfully!");
    } else {
      try {
        // This would be used in a real API environment
        // const response = await axios.patch("notes/" + note._id, note);
        // toast.success(response.data.message);
        navigate(-1, { replace: true });
        setError("");
        toast.success("Note updated successfully!");
      } catch (err) {
        setError(err);
      }
    }
  };

  return (
    <main className="notes">
      <h2 className="mb-2 mt-3 text-6xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400">
        {paper?.paper}
      </h2>
      <h3 className="text-2xl font-medium">
        {noteId !== undefined ? "Edit Note" : "Add New Note"}
      </h3>
      <form>
        <label htmlFor="title" className="block text-lg font-medium">
          Title:
        </label>
        <input
          className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
          type="text"
          id="title"
          required
          value={note?.title}
          onChange={(e) => handleFormChange(e)}
        />
        <label htmlFor="body" className="block text-lg font-medium">
          Body:
        </label>
        <textarea
          className="mb-4 block w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
          rows="12"
          type="text"
          id="body"
          required
          value={note?.body}
          onChange={(e) => handleFormChange(e)}
        />
        {noteId !== undefined ? (
          <button
            className="mb-4 flex h-10 w-auto items-center gap-2 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-4 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900 "
            type="submit"
            onClick={(e) => updateNote(e)}
          >
            <RxUpdate />
            Update Note
          </button>
        ) : (
          <button
            className="mb-4 flex h-10 w-auto items-center gap-2 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-4 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900"
            type="submit"
            onClick={(e) => addNote(e)}
          >
            <FaPlus />
            Add Note
          </button>
        )}
      </form>
      {error ? <ErrorStrip error={error} /> : ""}
    </main>
  );
};

export default NotesForm;
