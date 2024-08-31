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
  Link,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

function Sign() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      // Reset previous errors
      setNameError("");
      setPasswordError("");

      // Validation
      if (!username.trim()) {
        setNameError("Username cannot be empty");
        return;
      }

      if (!password.trim()) {
        setPasswordError("Password cannot be empty");
        return;
      } else if (password !== confirmPassword) {
        setPasswordError("Passwords do not match");
        return;
      } else if (password.length < 6) {
        setPasswordError("Password must be at least 6 characters long");
        return;
      }
      const response = await fetch("http://localhost:5000/signUp", {
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

      if (response.ok) {
        setSuccessAlert(true);
        setTimeout(() => {
          navigate("/");
        }, 500);
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
    }
  };

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <>
      {successAlert && (
        <Alert status="success" position="fixed" bottom="2rem" right="2rem">
          <AlertIcon />
          <AlertTitle mr={2}>Signup successful!</AlertTitle>
          <CloseButton
            onClick={() => setSuccessAlert(false)}
            position="absolute"
            right="8px"
            top="8px"
          />
        </Alert>
      )}
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
            <form onSubmit={handleSignup}>
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
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setNameError("");
                      }}
                    />
                  </InputGroup>
                  {nameError && (
                    <FormHelperText color="red.500">{nameError}</FormHelperText>
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
                        setPasswordError("");
                      }}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
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
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setPasswordError("");
                      }}
                    />
                  </InputGroup>
                </FormControl>
                {passwordError && (
                  <FormControl>
                    <FormHelperText color="red.500">
                      {passwordError}
                    </FormHelperText>
                  </FormControl>
                )}
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                >
                  Sign Up
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Box>
          Already have an account?{" "}
          <Link color="teal.500" href="/">
            Login
          </Link>
        </Box>
      </Flex>
    </>
  );
}

export default Sign;
