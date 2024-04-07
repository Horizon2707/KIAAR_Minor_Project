import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Select,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [greetingName, setGreetingName] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [Seasons, setSeasons] = useState([]);

  const fetchSeasons = async () => {
    try {
      const response = await fetch("http://localhost:5000/season");
      if (response.ok) {
        console.log("season received");
        const data = await response.json();
        setSeasons(data);
      }
    } catch (error) {
      console.error("Error fetching seasons:", error);
    }
  };

  useEffect(() => {
    if (Seasons.length !== 0) {
      return;
    } else {
      fetchSeasons();
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!username.trim() || !password.trim()) {
      setUsernameError("Username and password cannot be empty");
      setPasswordError("Username and password cannot be empty");
      return;
    }

    try {
      setUsernameError("");
      setPasswordError("");
      setShowErrorAlert(false); // Reset error alert

      // Validation passed, proceed with login
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          season: selectedSeason,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setShowErrorAlert(true); // Display validation alert
          return; // Exit function to prevent further execution
        } else {
          const error = await response.json();
          throw new Error(error.message);
        }
      } else {
        let result = await response.json();
        result = { ...result, season: selectedSeason };
        if (response.status === 200) {
          const { name } = result;
          setGreetingName(name);
          setTimeout(() => {
            navigate("/form");
            sessionStorage.setItem("user", JSON.stringify(result));
            window.location.reload();
          }, 400);
        }
      }
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
              {showErrorAlert && (
                <Alert status="error" borderRadius="md">
                  <AlertIcon />
                  <AlertTitle mr={2}>Invalid username or password</AlertTitle>
                  <CloseButton
                    onClick={() => setShowErrorAlert(false)}
                    position="absolute"
                    right="8px"
                    top="8px"
                  />
                </Alert>
              )}
              {greetingName && (
                <Alert status="success">
                  <AlertIcon />
                  <AlertTitle mr={2}>Welcome, {greetingName}</AlertTitle>
                </Alert>
              )}
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
                      setUsernameError("");
                    }}
                  />
                </InputGroup>
                {usernameError && (
                  <FormHelperText color="red.500">
                    {usernameError}
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
                {passwordError && (
                  <FormHelperText color="red.500">
                    {passwordError}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl>
                <Select
                  placeholder="Select season"
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(e.target.value)}
                >
                  {Seasons.map((season) => (
                    <option key={season} value={season}>
                      {season}
                    </option>
                  ))}
                </Select>
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
