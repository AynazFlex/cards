import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ICard {
  title: string;
  text: string;
}

interface IInitialState {
  cards: ICard[];
  loading: boolean;
  error: string | null;
  isCooldown: boolean;
}

const initialState: IInitialState = {
  cards: [],
  loading: true,
  error: null,
  isCooldown: false,
};

export const getCards = createAsyncThunk<{
  cards: ICard[];
}>("get/cards", async (_, { rejectWithValue, dispatch }) => {
  const response = await fetch(
    "https://node-test-server-production.up.railway.app/api/cards"
  );

  if (response.status !== 200) {
    const data = await response.json();
    return rejectWithValue(data?.error || `Статус ошибки ${response.status}`);
  }
  dispatch(startCooldown());

  setTimeout(() => {
    dispatch(endCooldown());
  }, 3000);

  return await response.json();
});

export interface ICard {
  title: string;
  text: string;
}

const processCards = (cards: ICard[]): ICard[] => {
  const sorted = cards.slice().sort((a, b) => {
    const isEmptyA = a.title.trim() === "";
    const isEmptyB = b.title.trim() === "";

    if (isEmptyA && !isEmptyB) return 1;
    if (!isEmptyA && isEmptyB) return -1;

    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();

    if (titleA < titleB) return -1;
    if (titleA > titleB) return 1;

    return a.text.length - b.text.length;
  });

  const result = sorted.slice(0, 7);

  while (result.length < 7) {
    result.push({ title: "", text: "" });
  }

  return result;
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    startCooldown(state) {
      state.isCooldown = true;
    },
    endCooldown(state) {
      state.isCooldown = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCards.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCards.fulfilled, (state, action) => {
      state.loading = false;
      state.cards = processCards(action.payload.cards);
    });
    builder.addCase(getCards.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

const { startCooldown, endCooldown } = cardsSlice.actions;
export default cardsSlice.reducer;
