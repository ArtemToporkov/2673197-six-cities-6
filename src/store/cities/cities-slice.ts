import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ActionNamespace } from '../../enums/action-namespace.ts';
import { getOffers } from '../api-actions.ts';
import type { City } from '../../types/city.ts';

type CitiesState = {
  city: City | null;
  cities: City[];
};

const initialState: CitiesState = {
  city: null,
  cities: []
};

export const citiesSlice = createSlice({
  name: ActionNamespace.Cities,
  initialState,
  reducers: {
    switchCity(state, action: PayloadAction<City>) {
      state.city = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(getOffers.fulfilled, (state, action) => {
      const cities = action.payload
        .map((o) => o.city)
        .filter((city, index, self) =>
          index === self.findIndex((c) => c.name === city.name)
        );
      state.cities = cities;
      if (cities.length > 0) {
        state.city = cities[0];
      }
    });
  }
});

export const { switchCity } = citiesSlice.actions;
