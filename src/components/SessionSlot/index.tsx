import { Avatar, Box, Button, HStack, Heading, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";

type SessionSlotProps = {
  coachName: string;
  sessionTime: string;
};

const SessionSlot: React.FC<SessionSlotProps> = ({ coachName, sessionTime }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" width="26rem" borderColor="simpleBorder.50">
      <HStack padding="2rem">
        <Avatar />
        <VStack align="left" marginLeft=".5rem">
          <Heading variant="h2">{coachName}</Heading>
          <Heading variant="h4" marginTop="-.5rem">
            {dayjs(sessionTime).format("MMMM D, YYYY h:mm a")}
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
        <Button background="none">Delete</Button>
      </Box>
    </Box>
  );
};

export default SessionSlot;
