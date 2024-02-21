import { HStack, Heading, Select, Spacer } from "@chakra-ui/react";
import { ChangeEvent, useContext, useState } from "react";
import { UserContext, UserContextType } from "../../providers/UserProvider";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const { currentUser, users } = useContext<UserContextType>(UserContext);
  const navigate = useNavigate();

  if (!users) return;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
    navigate(e.target.value);
  };

  return (
    <HStack paddingTop="2rem">
      <Heading variant="h1" as="h1">
        {`Welcome back ${currentUser?.first_name ? `, ${currentUser.first_name}` : ""}`}
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
            {`${user.first_name} ${user.last_name}`}
          </option>
        ))}
      </Select>
    </HStack>
  );
};

export default Header;
