import { TypedUseSelectorHook, useSelector } from 'react-redux';

import type { State } from '../types/state.ts';

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
