export type CoachStudentBookings = {
  id: number;
  coach_id: number;
  student_id: number;
  date: string;
  start_at: string;
  end_at: string;
  completed: boolean;
  student?: Student;
};

type Student = {
  first_name: string;
  last_name: string;
};
