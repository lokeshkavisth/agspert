import { TriangleUpIcon } from "@chakra-ui/icons";
import { Box, Button, Container, Flex, Stack } from "@chakra-ui/react";
import { IoLogOut } from "react-icons/io5";
import { useAuth } from "../hooks/useAuth";
import ToggleMode from "./toggle-mode";

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <Box bg="gray.900" px={4}>
      <Container maxW={"container.2xl"}>
        {/* right side */}
        <Flex py={4} alignItems="center" justifyContent="space-between">
          <Box>
            <TriangleUpIcon color="teal.500" fontSize={"4xl"} />
          </Box>

          {/* left side */}
          <Stack direction="row" spacing={4}>
            <Button
              onClick={() => logout()}
              rightIcon={<IoLogOut />}
              colorScheme="teal"
            >
              Logout
            </Button>
            <ToggleMode />
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
