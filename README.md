# Univ – College Data Management System

A modern, React application for managing college data, including students, staff, papers, attendance, internal marks, notes, and more.  
**Deployed Demo:** [https://intern-assignment-six-ruby.vercel.app/](https://intern-assignment-six-ruby.vercel.app/)

---

## 🚀 Features

- **Role-based Login:** Staff (including HOD) and Student logins with demo credentials.
- **Dashboard:** Quick access to Papers, Attendance, Internal Marks, Time Schedule, Notes, and Profile.
- **Paper Management:** Add, join, or leave papers (subjects) as staff or student.
- **Attendance Tracking:** Mark and view attendance for each paper and student.
- **Internal Marks:** View and manage internal marks for each paper.
- **Notes:** Upload and view notes for each subject.
- **Staff Approval:** HOD can approve pending staff registrations.
- **Student & Staff Management:** Add, edit, and view student and staff details.
- **Time Schedule:** View weekly timetable.
- **Modern UI:** Built with React, Tailwind CSS, and React Icons.

---

## 🧑‍💻 Demo Login Credentials

| Role    | Username  | Password  | User Type |
|---------|-----------|-----------|-----------|
| Student | student   | password  | student   |
| Student | shikhar   | password  | student   |
| Staff   | staff     | password  | staff     |
| HOD     | admin     | password  | staff     |

---

## 🛠️ Tech Stack

- **Frontend:** React 18, React Router 6, Tailwind CSS, React Icons, React Toastify
- **State Management:** React Context API
- **Build Tools:** Create React App, react-scripts
- **Other:** ESLint, Prettier

---

## 📁 Project Structure

```
src/
  Components/
    Forms/         # All forms (Login, Paper, Staff, Student, etc.)
    Queries/       # Data display/query components (Attendance, Internal, Notes, etc.)
    Layouts/       # Layout and navigation components
    Table.js       # Table rendering
    ErrorStrip.js  # Error display
  data/            # All dummy data (students, staff, papers, attendance, etc.)
  Hooks/           # UserContext for global state
  config/          # Axios config (not used in dummy mode)
  index.js, App.js # App entry and routing
  index.css        # Tailwind and global styles
public/
  index.html, favicon.ico
```

---

## 🏁 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ShikharPandey123/Intern_assignment.git
cd Intern_assignment
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

The app will run at [http://localhost:3000](http://localhost:3000).

---

## 📝 Usage

1. **Login** using one of the demo credentials above.
2. **Navigate** using the sidebar to Papers, Attendance, Internal Mark, Time Schedule, etc.
3. **Add/Join Papers:** Staff (HOD) can add papers; students can join/leave papers.
4. **Mark/View Attendance:** Staff can mark attendance; students can view their attendance.
5. **View Internal Marks:** Students can view their marks; staff can manage marks.
6. **Notes:** Staff can upload notes; students can view/download notes.
7. **Profile:** View and edit your profile.
8. **Logout** using the top-right button.

---

## 🌐 Deployment

This app is deployed on Vercel:  
[https://intern-assignment-six-ruby.vercel.app/](https://intern-assignment-six-ruby.vercel.app/)

---
