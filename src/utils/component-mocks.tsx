import MockAdapter from 'axios-mock-adapter';
import type { ReactElement, ReactNode } from 'react';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { Provider } from 'react-redux';

import { createApi } from '../services/api.ts';
import type { State } from '../types/state.ts';

type ComponentWithStore = {
  withStoreComponent: ReactElement;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
}

export function withStore(component: ReactNode, initialState: Partial<State>): ComponentWithStore {
  const axios = createApi();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, ReturnType<typeof createApi>, Action>
  >(middleware);
  const mockStore = mockStoreCreator(initialState);
  return ({
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter
  });
}
