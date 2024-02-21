import { Box, Heading, VStack } from "@chakra-ui/react";
import { CoachStudentBookings } from "../../models/coachStudentBookings.model";
import dayjs from "dayjs";

type CoachSessionsProps = {
  sessions: CoachStudentBookings[];
};

const CoachSessions: React.FC<CoachSessionsProps> = ({ sessions }) => {
  return (
    <Box maxH="18.75rem" overflowY="auto">
      {sessions.map((booking) => (
        <VStack
          align="left"
          key={booking.id}
          width="21.75rem"
          paddingY="1rem"
          paddingX="1.75rem"
          borderTop="1px"
          borderColor="#F1F1F3"
        >
          <Heading variant="h3" as="h3">
            {`${booking.student?.first_name} ${booking.student?.last_name}`}
          </Heading>

          <Heading variant="h4" as="h4">
            {dayjs(booking.start_at).format("MMMM D, YYYY h:mm a")}
          </Heading>
        </VStack>
      ))}
    </Box>
  );
};

export default CoachSessions;
