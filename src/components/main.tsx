import {
  Box,
  Skeleton,
  Card,
  Title,
  Text,
  Stack,
  Button,
  Flex,
} from "@mantine/core";
import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getCards } from "../store/reducers/card-reducer";
import CardsWrapper from "./cards-wrapper";

const Main: FC = () => {
  const { cards, loading, error } = useAppSelector((state) => state.cards);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCards());
  }, []);

  return (
    <Box component="main">
      {error ? (
        <Flex mt={40} direction="column" align="center" justify="center" gap="xs">
          <Text>{error}</Text>
          <Button disabled={loading} onClick={() => dispatch(getCards())}>
            Повторить
          </Button>
        </Flex>
      ) : (
        <CardsWrapper>
          {loading
            ? new Array(7)
                .fill(0)
                .map((_, index) => <Skeleton key={index} h={100} radius="md" />)
            : cards.map((card, index) => (
                <Card key={index} p="md" bg="gray.1" shadow="sm">
                  <Stack gap="xs">
                    <Title order={3}>{card.title}</Title>
                    <Text>{card.text}</Text>
                  </Stack>
                </Card>
              ))}
        </CardsWrapper>
      )}
    </Box>
  );
};

export default Main;
