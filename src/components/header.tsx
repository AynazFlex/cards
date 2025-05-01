import { Box, Title, Button, Stack } from "@mantine/core";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getCards } from "../store/reducers/card-reducer";

const Header: FC = () => {
  const { loading, error, isCooldown } = useAppSelector((state) => state.cards);
  const dispatch = useAppDispatch();

  return (
    <Box component="header">
      <Stack p="md" align="center" gap="md">
        <Title order={1}>Карточки</Title>
        {!error && (
          <Button disabled={isCooldown || loading} onClick={() => dispatch(getCards())}>
            {isCooldown ? "Подождите 3 сек" : "Обновить"}
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default Header;
