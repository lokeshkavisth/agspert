import { Button, useColorMode } from "@chakra-ui/react";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";

const ToggleMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button onClick={toggleColorMode} colorScheme="teal">
      {colorMode === "dark" ? <RiSunFill /> : <RiMoonClearFill />}
    </Button>
  );
};

export default ToggleMode;
