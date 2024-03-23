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
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      // Reset previous errors
      setNameError("");
      setEmailError("");
      setPasswordError("");

      // Validation
      if (!fullName.trim()) {
        setNameError("Full name cannot be empty");
        return;
      }

      if (!email.trim()) {
        setEmailError("Email cannot be empty");
        return;
      } else if (!validateEmail(email.trim())) {
        setEmailError("Email is not valid");
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

      // Form data is valid, proceed with signup
      const response = await fetch("http://localhost:5000/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      // Signup successful
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
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
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
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError("");
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
      {/* Success Alert */}
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
    </>
  );
}

export default Sign;
