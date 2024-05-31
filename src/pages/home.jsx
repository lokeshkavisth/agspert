import {
  Box,
  Button,
  Link as ChakraLink,
  Container,
  Flex,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { Outlet, Link as ReactRouterLink, useLocation } from "react-router-dom";
import Navbar from "../components/navbar";
import { GoPlus } from "react-icons/go";
import SaleOrder from "../components/sale-order";

const Home = () => {
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <>
      <Navbar />

      <Container maxW={"container.xl"} py={28}>
        <Flex py={4} alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={4}>
            <ChakraLink
              as={ReactRouterLink}
              to="/active-sales"
              color="teal.500"
              borderBottom={pathname === "/active-sales" && "2px"}
              borderColor={pathname === "/active-sales" && "teal.300"}
              // bg={pathname === "/active-sales" && "blue.100"}
              _hover={{ textDecoration: "none" }}
            >
              Active Sale Orders
            </ChakraLink>

            <ChakraLink
              as={ReactRouterLink}
              to="/completed-sales"
              color="teal.500"
              borderBottom={pathname === "/completed-sales" && "2px"}
              borderColor={pathname === "/completed-sales" && "teal.300"}
              // bg={pathname === "/completed-sales" && "blue.100"}
              _hover={{ textDecoration: "none" }}
            >
              Completed Sale Orders
            </ChakraLink>
          </Stack>

          <Box>
            <SaleOrder />
          </Box>
        </Flex>

        <Box>
          <Outlet />
        </Box>
      </Container>
    </>
  );
};

export default Home;
