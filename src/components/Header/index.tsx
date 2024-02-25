import { Divider, HStack, Heading, Select, Spacer, VStack } from "@chakra-ui/react";
import { ChangeEvent, useContext, useState } from "react";
import { UserContext, UserContextType } from "../../providers/UserProvider";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const { currentUser, users, setCurrentUser } = useContext<UserContextType>(UserContext);
  const navigate = useNavigate();

  if (!users) return;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const currentUserData = e.target.value.split("/");
    const newCurrentUser = users.filter(
      (user) => user.slug === currentUserData[0] && user.id === Number(currentUserData[1])
    )[0];

    setSelectedOption(e.target.value);
    setCurrentUser(newCurrentUser);
    navigate(e.target.value);
  };

  return (
    <VStack paddingY="2rem">
      <HStack width="100%" paddingBottom="2rem">
        <Heading variant="h1" as="h1">
          {`Welcome back${currentUser?.first_name ? `, ${currentUser.first_name}` : ""}`}
        </Heading>
        <Spacer />
        <Select
          maxWidth="250px"
          onChange={(e) => handleChange(e)}
          value={selectedOption}
          placeholder={selectedOption ? undefined : "Select a User"}
        >
          {users.map((user) => (
            <option value={`${user.slug}/${user.id}`} key={user.slug + user.id}>
              {`${user.first_name} ${user.last_name} ${user.slug === "coaches" ? "(c)" : "(s)"}`}
            </option>
          ))}
        </Select>
      </HStack>
      <Divider />
    </VStack>
  );
};

export default Header;
