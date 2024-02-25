import { Avatar, Box, Button, HStack, Heading, VStack } from "@chakra-ui/react";
import axios from "axios";
import dayjs from "dayjs";
import config from "../../config";
import { useContext } from "react";
import { UserContext, UserContextType } from "../../providers/UserProvider";
import { useNavigate } from "react-router";

type SessionSlotProps = {
  coachName: string;
  sessionTime: string;
  sessionId: number;
};

const SessionSlot: React.FC<SessionSlotProps> = ({ coachName, sessionTime, sessionId }) => {
  const { currentUser } = useContext<UserContextType>(UserContext);
  const localTime = dayjs(sessionTime).format("MMMM D, YYYY h:mm a");
  const navigate = useNavigate();

  const reserveSession = async () => {
    if (!currentUser) return;

    const response = await axios.patch(
      `${config.API_URL}/api/v1/coach-student-bookings/${sessionId}`,
      {
        coach_student_booking: { student_id: currentUser.id },
      }
    );

    if (response.status === 200) {
      // force the state to reload w/react router
      navigate(`/students/${currentUser.id}`);
    }
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" width="26rem" borderColor="simpleBorder.50">
      <HStack padding="2rem">
        <Avatar />
        <VStack align="left" marginLeft=".5rem">
          <Heading variant="h2">{coachName}</Heading>
          <Heading variant="h4" marginTop="-.5rem">
            {localTime}
          </Heading>
        </VStack>
      </HStack>
      <Box
        borderTop="1px"
        borderColor="simpleBorder.50"
        padding="1rem"
        display="flex"
        justifyContent="flex-end"
      >
        {currentUser?.slug === "students" && (
          <Button background="none" onClick={reserveSession}>
            Reserve Session
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default SessionSlot;
