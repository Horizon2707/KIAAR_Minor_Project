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

  return (
    <>
      <div className="login">
        <h3>Log in</h3>
        <Box my={8} textAlign="left">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.username}>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                id="username"
                name="username"
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
