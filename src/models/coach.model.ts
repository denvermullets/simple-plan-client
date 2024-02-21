import { CoachStudentBookingReviews } from "./coachStudentBookingReviews.model";
import { CoachStudentBookings } from "./coachStudentBookings.model";

export type CoachModel = {
  id: number;
  first_name: string;
  last_name: string;
  slug: string;
  coach_student_bookings: CoachStudentBookings[];
  coach_student_booking_reviews: CoachStudentBookingReviews[];
  created_at?: Date;
  updated_at?: Date;
};
