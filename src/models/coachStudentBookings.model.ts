import { StudentModel } from "./student.model";

type StudentName = {
  first_name: string;
  last_name: string;
};

type CoachName = {
  first_name: string;
  last_name: string;
};

export type CoachStudentBookings = {
  id: number;
  coach_id: number;
  student_id: number;
  date: string;
  start_at: string;
  end_at: string;
  completed: boolean;
  student?: StudentName;
  coach?: CoachName;
};

export type CoachStudentBookingsWithStudent = {
  availableSessions: CoachStudentBookings[];
  studentInfo: StudentModel;
};
