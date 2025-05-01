import { Box, Center, Text } from "@mantine/core";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <Box component="footer" mt="auto">
      <Center>
        <Text my="md" size="sm">&copy; 2025 Test Project</Text>
      </Center>
    </Box>
  );
};

export default Footer;
