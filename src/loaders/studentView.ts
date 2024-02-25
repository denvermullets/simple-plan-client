import axios from "axios";
import config from "../config";
import { LoaderFunction } from "react-router-dom";
import { CoachStudentBookings } from "../models/coachStudentBookings.model";
import { StudentModel } from "../models/student.model";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const loadStudentInfo: LoaderFunction = async ({ params }) => {
  const utcDate = dayjs(new Date()).utc();

  const studentInfo = await axios.get<StudentModel[]>(
    `${config.API_URL}/api/v1/students/${params.studentId}`
  );

  const availableSessions = await axios.get<CoachStudentBookings[]>(
    `${config.API_URL}/api/v1/coach-student-bookings/available`,
    { params: { date: dayjs(utcDate).utc().format("YYYY-MM-DD") } }
  );

  return { studentInfo: studentInfo.data, availableSessions: availableSessions.data };
};
