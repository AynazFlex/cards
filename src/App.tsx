import { Flex } from "@mantine/core";
import Footer from "./components/footer";
import Header from "./components/header";
import Main from "./components/main";

const App = () => {
  return (
    <Flex direction="column" mih="100vh">
      <Header />
      <Main />
      <Footer />
    </Flex>
  );
};

export default App;
