import { ChakraProvider } from "@chakra-ui/react";
import Router from "./routes/route.jsx";
import { AuthProvider } from "./context/authContext.jsx";

const App = () => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
