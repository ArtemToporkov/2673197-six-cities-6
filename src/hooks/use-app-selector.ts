import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { State } from '../types/state.ts';

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
