import React, { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  Link
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent form submission
    try {
      // Check if email is empty
      if (!username.trim()) {
        setEmailError("Email cannot be empty");
        return; // Prevent further execution
      }
  
      // Check if password is empty
      if (!password.trim()) {
        setPasswordError("Password cannot be empty");
        return; // Prevent further execution
      }
  
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const result = await response.json();
      console.log("Login successful:", result);
      sessionStorage.setItem("user", JSON.stringify(result));  
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };
  

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleLogin}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="email"
                    placeholder="email address"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setEmailError(""); // Clear error message when typing
                    }}
                  />
                </InputGroup>
                {emailError && (
                  <FormHelperText color="red.500">
                    {emailError}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError(""); // Clear error message when typing
                    }}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {passwordError && (
                  <FormHelperText color="red.500">
                    {passwordError}
                  </FormHelperText>
                )}
                <FormHelperText textAlign="right">
                  <Link color="teal.500">forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New?{" "}
        <Link color="teal.500" href="/signUp">
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
};

export default Login;