import { useLoaderData, useNavigate } from "react-router-dom";
import { Box, Divider, Flex, Heading, VStack } from "@chakra-ui/react";
import CoachSessions from "../CoachSessions";
import SessionSlot from "../SessionSlot";
import { useContext, useEffect } from "react";
import { UserContext, UserContextType } from "../../providers/UserProvider";
import { CoachStudentBookingsWithStudent } from "../../models/coachStudentBookings.model";

const StudentView: React.FC = () => {
  const { currentUser } = useContext<UserContextType>(UserContext);
  const { studentInfo, availableSessions } = useLoaderData() as CoachStudentBookingsWithStudent;
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [navigate, currentUser]);

  const upcomingSessions = studentInfo.coach_student_bookings.filter(
    (booking) => booking.completed === false && booking.student_id
  );

  const completedSessions = studentInfo.coach_student_bookings.filter(
    (booking) => booking.completed === true
  );

  if (!currentUser) return;

  return (
    <Flex height="100vh">
      <Box w="auto">
        <Heading variant="h2" as="h2" marginBottom="1rem">
          Upcoming Sessions
        </Heading>
        <CoachSessions sessions={upcomingSessions} coach={false} />
        <Heading
          variant="h2"
          as="h2"
          marginBottom="1rem"
          paddingTop="1rem"
          borderTop="1px"
          borderColor="simpleBorder.50"
        >
          Recent Sessions
        </Heading>
        <CoachSessions sessions={completedSessions} coach={false} />
      </Box>
      <Box w="auto" paddingX="2rem">
        <Divider orientation="vertical" />
      </Box>
      <Box w="auto">
        <Heading variant="h2" as="h2" marginBottom="1rem">
          Available Sessions
        </Heading>
        <VStack gap="1rem">
          {availableSessions.map((slot) => (
            <SessionSlot
              key={`available-${slot.id}`}
              sessionTime={slot.start_at}
              coachName={`${slot.coach?.first_name} ${slot.coach?.last_name}`}
              sessionId={slot.id}
            />
          ))}
        </VStack>
      </Box>
    </Flex>
  );
};

export default StudentView;
