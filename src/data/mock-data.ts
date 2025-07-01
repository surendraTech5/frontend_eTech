export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "Admin" | "Teacher" | "Student";
  status: "Active" | "Deactivated";
  lastLogin: string;
};

export type Course = {
  id: string;
  courseName: string;
  description: string;
  price: string;
  discount: string;
  courseDuration: string;
  medium: string;
  board: string;
  class: string;
  subjects: string;
  createdBy: string;
  active: boolean;
};

export type ModerationItem = {
    id: string;
    content: string;
    contentType: 'Post' | 'Comment' | 'Material';
    author: string;
    authorAvatar: string;
    flaggedBy: string;
    reason: string;
    date: string;
    status: 'Pending' | 'Approved' | 'Removed';
};

export type Notification = {
    id: string;
    title: string;
    message: string;
    audience: 'All' | 'Teachers' | 'Students';
    date: string;
};

export type Subject = {
  id: string;
  subjectName: string;
  description: string;
  createdBy: string;
  active: boolean;
};

export type Lecture = {
  id: string;
  lectureTitle: string;
  courseName: string;
  instructor: string;
  date: string;
  duration: string;
  status: 'Upcoming' | 'Live' | 'Completed';
};


export const users: User[] = [
  { id: "USR001", name: "John Doe", email: "john.d@example.com", avatar: "/avatars/01.png", role: "Student", status: "Active", lastLogin: "2024-05-20" },
  { id: "USR002", name: "Jane Smith", email: "jane.s@example.com", avatar: "/avatars/02.png", role: "Teacher", status: "Active", lastLogin: "2024-05-21" },
  { id: "USR003", name: "Admin User", email: "admin@example.com", avatar: "/avatars/03.png", role: "Admin", status: "Active", lastLogin: "2024-05-22" },
  { id: "USR004", name: "Peter Jones", email: "peter.j@example.com", avatar: "/avatars/04.png", role: "Student", status: "Deactivated", lastLogin: "2024-04-10" },
  { id: "USR005", name: "Mary Johnson", email: "mary.j@example.com", avatar: "/avatars/05.png", role: "Teacher", status: "Active", lastLogin: "2024-05-19" },
  { id: "USR006", name: "Chris Lee", email: "chris.l@example.com", avatar: "/avatars/06.png", role: "Student", status: "Active", lastLogin: "2024-05-22" },
  { id: "USR007", name: "Patricia Williams", email: "patricia.w@example.com", avatar: "/avatars/07.png", role: "Student", status: "Active", lastLogin: "2024-05-21" },
];

export const courses: Course[] = [
  { id: "CRS001", courseName: "Introduction to Python", description: "Learn the fundamentals of Python programming.", price: "$49.99", discount: "10%", courseDuration: "8 Weeks", medium: "English", board: "CBSE", class: "10", subjects: "Computer Science", createdBy: "Jane Smith", active: true },
  { id: "CRS002", courseName: "Advanced Calculus", description: "Master advanced topics in calculus.", price: "$99.99", discount: "15%", courseDuration: "12 Weeks", medium: "English", board: "ICSE", class: "12", subjects: "Mathematics", createdBy: "Mary Johnson", active: true },
  { id: "CRS003", courseName: "World History", description: "A comprehensive overview of world history.", price: "$79.99", discount: "20%", courseDuration: "10 Weeks", medium: "Hindi", board: "State Board", class: "11", subjects: "History", createdBy: "Admin User", active: false },
  { id: "CRS004", courseName: "Creative Writing", description: "Unlock your creative writing potential.", price: "$59.99", discount: "5%", courseDuration: "6 Weeks", medium: "English", board: "CBSE", class: "9", subjects: "English", createdBy: "Jane Smith", active: true },
  { id: "CRS005", courseName: "Physics for Beginners", description: "An introduction to the world of physics.", price: "$69.99", discount: "10%", courseDuration: "8 Weeks", medium: "English", board: "ICSE", class: "11", subjects: "Science", createdBy: "Mary Johnson", active: true },
];

export const moderationItems: ModerationItem[] = [
    { id: 'MOD001', content: 'This is not a helpful comment and contains spam.', contentType: 'Comment', author: 'SpamBot9000', authorAvatar: '/avatars/08.png', flaggedBy: 'AI System', reason: 'Potential Spam', date: '2024-05-22', status: 'Pending' },
    { id: 'MOD002', content: 'An inappropriate image was uploaded to the course materials.', contentType: 'Material', author: 'TroubleMaker', authorAvatar: '/avatars/09.png', flaggedBy: 'Jane Smith', reason: 'Inappropriate Content', date: '2024-05-21', status: 'Pending' },
    { id: 'MOD003', content: 'The forum post contains offensive language.', contentType: 'Post', author: 'RudeUser', authorAvatar: '/avatars/10.png', flaggedBy: 'John Doe', reason: 'Offensive Language', date: '2024-05-20', status: 'Pending' },
    { id: 'MOD004', content: 'This comment is off-topic and political.', contentType: 'Comment', author: 'PoliticalPete', authorAvatar: '/avatars/11.png', flaggedBy: 'AI System', reason: 'Off-Topic', date: '2024-05-22', status: 'Pending' },
];

export const notifications: Notification[] = [
    { id: 'NOTIF001', title: 'Scheduled Maintenance', message: 'The platform will be down for scheduled maintenance on May 25th from 2-4 AM UTC.', audience: 'All', date: '2024-05-20' },
    { id: 'NOTIF002', title: 'New Grading Policy', message: 'Please review the new grading policy for all courses, effective June 1st.', audience: 'Teachers', date: '2024-05-18' },
    { id: 'NOTIF003', title: 'Final Exams Schedule', message: 'The final exams schedule for the current semester has been posted.', audience: 'Students', date: '2024-05-15' },
];

export const subjects: Subject[] = [
  { id: "SUB001", subjectName: "dsdsdsq1l", description: "ds43345", createdBy: "sk test", active: true },
  { id: "SUB002", subjectName: "dsdsds", description: "ddsdsds", createdBy: "sk test", active: true },
  { id: "SUB003", subjectName: "dsdsdsds", description: "ddssdds", createdBy: "meggi k", active: true },
  { id: "SUB004", subjectName: "dsdsds", description: "dsdsds", createdBy: "sk test", active: true },
  { id: "SUB005", subjectName: "dsds", description: "dsdsds", createdBy: "sk test", active: true },
  { id: "SUB006", subjectName: "Advanced Math", description: "Calculus and Linear Algebra", createdBy: "Jane Smith", active: true },
  { id: "SUB007", subjectName: "History of Arts", description: "From Renaissance to Modernism", createdBy: "Mary Johnson", active: false },
];

export const lectures: Lecture[] = [
  { id: "LEC001", lectureTitle: "Python Basics", courseName: "Introduction to Python", instructor: "Jane Smith", date: "2024-07-01", duration: "60 mins", status: "Upcoming" },
  { id: "LEC002", lectureTitle: "Derivatives", courseName: "Advanced Calculus", instructor: "Mary Johnson", date: "2024-06-28", duration: "90 mins", status: "Completed" },
  { id: "LEC003", lectureTitle: "The Roman Empire", courseName: "World History", instructor: "Admin User", date: "2024-07-05", duration: "75 mins", status: "Upcoming" },
  { id: "LEC004", lectureTitle: "Character Development", courseName: "Creative Writing", instructor: "Jane Smith", date: "2024-06-25", duration: "45 mins", status: "Live" },
  { id: "LEC005", lectureTitle: "Newton's Laws", courseName: "Physics for Beginners", instructor: "Mary Johnson", date: "2024-07-02", duration: "60 mins", status: "Upcoming" },
];
