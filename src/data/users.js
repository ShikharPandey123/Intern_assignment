// Dummy data for users (staff and students)
export const dummyUsers = {
  student: {
    _id: "dummy-student-id",
    name: "Test Student",
    email: "student@example.com",
    username: "student",
    password: "password",
    userType: "student",
    role: "student",
    studentId: "ST001",
    department: "Computer Science",
    year: "2024-2025",
    phone: "+1234567890",
    address: "123 Student St, City"
  },
  staff: {
    _id: "dummy-staff-id",
    name: "Test Staff",
    email: "staff@example.com",
    username: "staff",
    password: "password",
    userType: "staff", 
    role: "professor",
    staffId: "SF001",
    department: "Computer Science",
    phone: "+1234567800",
    address: "456 Staff Ave, City"
  }
};

// Alternative login credentials for flexibility
export const dummyLoginCredentials = [
  // Student logins
  { username: "student", password: "password", userType: "student", userData: dummyUsers.student },
  { username: "shikhar", password: "password", userType: "student", userData: { ...dummyUsers.student, name: "Shikhar Pandey", username: "shikhar" } },
  
  // Staff logins  
  { username: "staff", password: "password", userType: "staff", userData: dummyUsers.staff },
  { username: "admin", password: "password", userType: "staff", userData: { ...dummyUsers.staff, name: "Admin User", username: "admin", role: "HOD" } }
];

export default dummyUsers;
