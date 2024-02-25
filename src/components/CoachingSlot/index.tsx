import { useContext, useEffect, useState } from "react";
import { DatePicker } from "../DatePickerCustom";
import { Button, Divider, HStack, Heading, Select, Spacer, VStack } from "@chakra-ui/react";
import axios from "axios";
import config from "../../config";
import { UserContext, UserContextType } from "../../providers/UserProvider";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const CoachingSlot: React.FC = () => {
  const { currentUser } = useContext<UserContextType>(UserContext);
  const [sessionDate, setSessionDate] = useState<Date>(new Date());
  const [availableTimes, setAvailableTimes] = useState<Date[]>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // we'll need to query the API to get dates
    const getAvailableTimes = async () => {
      if (!currentUser || currentUser.slug !== "coaches") return;

      const response = await axios.get(
        `${config.API_URL}/api/v1/coaches/available-session-slots/`,
        {
          params: {
            coach_id: currentUser.id,
            date: dayjs(sessionDate).format("YYYY-MM-DD"),
            time_zone: timeZone,
          },
        }
      );

      if (response.status === 200) {
        setAvailableTimes(response.data.available_start_times);
      }
    };

    getAvailableTimes();
  }, [sessionDate, currentUser]);

  const handleSubmit = async () => {
    if (!currentUser || !selectedTime) return;

    // dayjs automatically converts utc to local time, we're storing in utc in the db
    const startAt = `${dayjs(sessionDate).format("YYYY-MM-DD")} ${selectedTime}`;
    const convertedTime = dayjs(startAt).utc().format();
    const utcDate = dayjs(sessionDate).utc().format("YYYY-MM-DD");

    const response = await axios.post(`${config.API_URL}/api/v1/coach_student_bookings`, {
      coach_id: currentUser.id,
      date: utcDate,
      start_at: convertedTime,
    });

    if (response.status === 201) {
      navigate(`/${currentUser.slug}/${currentUser.id}`);
    }
  };

  return (
    <VStack align="left" paddingX="7.5rem">
      <Heading as="h3" variant="h3">
        Create a new session slot
      </Heading>
      <Divider />
      <HStack width="100%" paddingY={4}>
        <Heading as="h5" variant="h5">
          Select session date
        </Heading>
        <Spacer />
        <DatePicker value={sessionDate} onChange={(date) => setSessionDate(date || sessionDate)} />
      </HStack>
      <Divider />
      <HStack width="100%" paddingY={4}>
        <Heading as="h5" variant="h5">
          Select session time
        </Heading>
        <Spacer />
        {availableTimes?.length ? (
          <Select
            width="auto"
            onChange={(e) => setSelectedTime(e.target.value)}
            value={selectedTime}
          >
            {availableTimes.map((time, index) => (
              <option value={dayjs(time).format("hh:mm a")} key={index}>
                {dayjs(time).format("hh:mm a")}
              </option>
            ))}
          </Select>
        ) : (
          <Heading as="h5" variant="h5">
            No possible slots available for this day
          </Heading>
        )}
      </HStack>
      <Divider />
      <HStack width="100%" paddingY={4}>
        <Spacer />
        <HStack>
          <Button onClick={() => navigate(`/${currentUser?.slug}/${currentUser?.id}`)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </HStack>
      </HStack>
    </VStack>
  );
};

export default CoachingSlot;
