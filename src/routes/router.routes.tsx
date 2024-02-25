import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/ErrorPage/error-page";
import Layout from "../components/Layout";
import CoachView from "../components/CoachView";
import { loadCoachInfo } from "../loaders/coachView";
import CoachingSlot from "../components/CoachingSlot";
import StudentView from "../components/StudentView";
import { loadStudentInfo } from "../loaders/studentView";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/students/:studentId",
        element: <StudentView />,
        loader: loadStudentInfo,
      },
      {
        path: "/coaches/:coachId",
        element: <CoachView />,
        loader: loadCoachInfo,
      },
      {
        path: "/coaches/:coachId/new",
        element: <CoachingSlot />,
        loader: loadCoachInfo,
      },
    ],
  },
]);
