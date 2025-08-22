import { Box, Checkbox, Flex, Stack, Text } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import TextField from "@/components/ui/TextField";
import PasswordField from "@/components/ui/PasswordField";
import PrimaryButton from "@/components/ui/PrimaryButton";

const Login = () => {
  return (
    <Box>
      <p>Not your first Time on Plug?</p>
      <h1 className="mb-5">Sign in to your account</h1>
      <Stack>
        <TextField
          name="email"
          isRequired={true}
          label="Enter your email"
          placeholder="me@example.com"
        />
        <PasswordField
          name="password"
          isRequired={true}
          label="Type your password"
        />
        <Flex justifyContent="flex-end" w="100%">
          <Link href="/forgot-password">
            <Text className="forgot-password">Forgot password?</Text>
          </Link>
        </Flex>
      </Stack>
      <Stack mt="30px">
        <Checkbox.Root
          variant="solid"
          size="xs"
          className="remember-me"
          defaultChecked
          colorPalette="blue"
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label>Remember me</Checkbox.Label>
        </Checkbox.Root>
        <PrimaryButton name="Sign in" bgColor="#006BFF" />
        <PrimaryButton
          name="Continue with Google"
          icon={<FcGoogle />}
          bgColor={"#fff"}
          color="#011948"
          border="1px solid #E5E7EB"
        />
        <Text
          className="already-have-account-text"
          mt={{ base: "50px", md: "20px", lg: "10px" }}
        >
          Dont have an account?{"  "}
          <Link href="/register" className="link-text">
            Sign up
          </Link>
        </Text>
      </Stack>
    </Box>
  );
};

export default Login;
