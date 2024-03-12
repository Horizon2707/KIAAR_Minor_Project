import React from "react";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Box,
} from "@chakra-ui/react";
import "../Styles/Login.css";
function Login() {
  const { handleSubmit, register, formState } = useForm(); // Destructure formState
  const { errors } = formState; // Destructure errors from formState

  function validateLogin(value) {
    if (!value) {
      return "Username is required";
    } else {
      return true;
    }
  }

  function onSubmit(values) {
    console.log(values);
  }

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const result = await response.json();
      console.log("Login successful:", result);
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <>
      <div className="login">
        <Box my={8} textAlign="left">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.username}>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                id="username"
                name="username"
                size="sm"
                {...register("username", {
                  validate: validateLogin,
                })}
              />
              <FormErrorMessage>
                {errors.username && errors.username.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isInvalid={errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                name="password"
                type="password"
                size={"sm"}
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <Button
              mt={4}
              colorScheme="teal"
              isLoading={formState.isSubmitting}
              type="submit"
              size="sm"
            >
              Login
            </Button>
          </form>
        </Box>
      </div>
    </>
  );
}

export default Login;
