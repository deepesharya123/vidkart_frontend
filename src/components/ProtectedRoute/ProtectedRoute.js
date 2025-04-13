import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../AuthContext/AuthContext";
import { Box, Center, Spinner, Text } from "@chakra-ui/react";

const ProtectedRoute = ({ component: Component, ...otherProps }) => {
  const userContext = useContext(AuthContext);
  const { isLoading } = userContext;

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  console.log("isLoggedIn ", isLoggedIn);

  return (
    <Box>
      {isLoading ? (
        <Spinner />
      ) : isLoggedIn ? (
        <Component otherProps={{ ...otherProps }} />
      ) : (
        <Center>
          <Text>Please Authenticate</Text>
        </Center>
      )}
    </Box>
  );
};

export default ProtectedRoute;
