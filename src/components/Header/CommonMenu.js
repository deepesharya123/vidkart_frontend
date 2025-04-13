import React from "react";
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
} from "@chakra-ui/react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const CommonMenu = (props) => {
  const { action, users } = props;
  const navigate = useNavigate();
  return (
    <Menu>
      <MenuButton
        as={Button}
        px={4}
        py={2}
        transition="all 0.2s"
        borderRadius="md"
        borderWidth="1px"
        rightIcon={<IoMdArrowDropdown />}
        variant="outline"
      >
        <Flex alignContent="center">
          <Text textTransform="capitalize">{action}</Text>
        </Flex>
      </MenuButton>{" "}
      <MenuList>
        {users.map((user) => (
          <MenuItem
            key={user}
            onClick={(e) => {
              console.log({ action, user });
              navigate(`/${user}/${action}`);
            }}
          >
            <Text textTransform="capitalize">{user}</Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default CommonMenu;
