import axios from "axios";
import config from "../config";
import { CoachModel } from "../models/coach.model";
import { LoaderFunction } from "react-router-dom";

export const loadCoachInfo: LoaderFunction = async ({ params }) => {
  const coachInfo = await axios.get<CoachModel[]>(
    `${config.API_URL}/api/v1/coaches/${params.coachId}`
  );

  return coachInfo.data;
};
