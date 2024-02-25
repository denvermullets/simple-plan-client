import { useLoaderData, useNavigate } from "react-router-dom";
import { CoachModel } from "../../models/coach.model";
import { Box, Button, Divider, Flex, HStack, Heading, Spacer, VStack } from "@chakra-ui/react";
import CoachSessions from "../CoachSessions";
import SessionSlot from "../SessionSlot";
import { useContext, useEffect } from "react";
import { UserContext, UserContextType } from "../../providers/UserProvider";

const CoachView: React.FC = () => {
  const { currentUser } = useContext<UserContextType>(UserContext);
  const coachInfo = useLoaderData() as CoachModel;
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [navigate, currentUser]);

  const upcomingSessions = coachInfo.coach_student_bookings.filter(
    (booking) => booking.completed === false && booking.student
  );
  const completedSessions = coachInfo.coach_student_bookings.filter(
    (booking) => booking.completed === true
  );
  const availableTimeSlots = coachInfo.coach_student_bookings.filter((booking) => !booking.student);

  if (!currentUser) return;

  return (
    <Flex height="100vh">
      <Box w="auto">
        <Heading variant="h2" as="h2" marginBottom="1rem">
          Upcoming Sessions
        </Heading>
        <CoachSessions sessions={upcomingSessions} />
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
        <CoachSessions sessions={completedSessions} />
      </Box>
      <Box w="auto" paddingX="2rem">
        <Divider orientation="vertical" />
      </Box>
      <Box w="auto">
        <HStack marginBottom="1rem">
          <Heading variant="h2" as="h2" marginBottom="1rem">
            Available Sessions
          </Heading>
          <Spacer />
          <Button onClick={() => navigate(`/coaches/${currentUser.id}/new`)}>Add new</Button>
        </HStack>
        <VStack gap="1rem">
          {availableTimeSlots.map((slot) => (
            <SessionSlot
              key={`available-${slot.id}`}
              sessionTime={slot.start_at}
              coachName={`${currentUser.first_name} ${currentUser.last_name}`}
            />
          ))}
        </VStack>
      </Box>
    </Flex>
  );
};

export default CoachView;
