import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ActionNamespace } from '../../enums/action-namespace.ts';
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
    loadCities(state, action: PayloadAction<City[]>) {
      state.cities = action.payload;
    },
    switchCity(state, action: PayloadAction<City>) {
      state.city = action.payload;
    }
  }
});

export const { loadCities, switchCity } = citiesSlice.actions;

