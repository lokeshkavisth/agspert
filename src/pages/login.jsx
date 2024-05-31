import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../hooks/useAuth";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email cannot be empty" })
    .email({ message: "Must be a valid email" }),
  password: z
    .string()
    .min(1, { message: "Password cannot be empty" })
    .min(8, { message: "Minimum length should be 8" })
    .max(32, { message: "Password cannot be longer than 32 characters" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      }
    ),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values) {
    login(values);
    navigate("/active-sales");
    reset();
  }

  return (
    <Center h={"100vh"}>
      <Card maxW="sm">
        <CardHeader>
          <Heading size="md" as={"h2"}>
            Login.
          </Heading>
          <Text>Please enter your email and password to login.</Text>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                placeholder="email"
                type="email"
                {...register("email")}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.password}>
              <FormLabel htmlFor="name">Password</FormLabel>
              <Input
                id="password"
                type="password"
                placeholder="password"
                {...register("password")}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <Button
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
              w={"full"}
            >
              Submit
            </Button>
          </form>
        </CardBody>
      </Card>
    </Center>
  );
};

export default Login;
