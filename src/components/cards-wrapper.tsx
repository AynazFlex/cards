import { SimpleGrid } from "@mantine/core";
import { FC, PropsWithChildren } from "react";

const CardsWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SimpleGrid
      mx="auto"
      maw={1280}
      px={40}
      cols={{
        base: 1,
        md: 3,
        lg: 4,
        sm: 2,
      }}
      spacing="xs"
      verticalSpacing="xs"
    >
      {children}
    </SimpleGrid>
  );
};

export default CardsWrapper;
