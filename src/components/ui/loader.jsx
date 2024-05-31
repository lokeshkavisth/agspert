import { Center, Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Center h={"100vh"}>
      <Spinner color="teal.500" size={"lg"} />
    </Center>
  );
};

export default Loader;
