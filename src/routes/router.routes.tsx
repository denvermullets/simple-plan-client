import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/ErrorPage/error-page";
import Layout from "../components/Layout";
import CoachView from "../components/CoachView";
import { loadCoachInfo } from "../loaders/coachView";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/students/:studentId",
      },
      {
        path: "/coaches/:coachId",
        element: <CoachView />,
        loader: loadCoachInfo,
      },
    ],
  },
]);
