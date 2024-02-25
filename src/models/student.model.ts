import { CoachStudentBookings } from "./coachStudentBookings.model";

export type StudentModel = {
  id: number;
  first_name: string;
  last_name: string;
  slug: string;
  coach_student_bookings: CoachStudentBookings[];
  created_at: Date;
  updated_at: Date;
};
