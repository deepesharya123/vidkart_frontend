import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { FaCartFlatbedSuitcase } from "react-icons/fa6";
import { GrInfo } from "react-icons/gr";
import { MdOutlineContacts } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import CommonMenu from "./CommonMenu";

function Header() {
  const users = ["admin", "seller", "customer"];
  const actions = ["register", "login"];
  const navigate = useNavigate();

  const navItems = [
    { title: "vidkart", navigateTo: "/", icon: FaCartFlatbedSuitcase },
    { title: "contact", navigateTo: "/", icon: MdOutlineContacts },
    { title: "about", navigateTo: "/", icon: GrInfo },
  ];

  return (
    <Box py={5} px={20}>
      <Flex justifyContent="space-between">
        <Flex alignContent="center" flexWrap="wrap" gap={2}>
          {navItems.map((navItem) => {
            const { title, icon: Icon, navigateTo } = navItem;
            return (
              <Button
                as={Text}
                variant="outline"
                rightIcon={<Icon />}
                onClick={(e) => {
                  navigate(`${navigateTo}`);
                }}
                textTransform="capitalize"
              >
                {title}
              </Button>
            );
          })}
        </Flex>
        <Flex gap={2}>
          {actions.map((action) => (
            <CommonMenu users={users} action={action} />
          ))}
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;
