import { useDispatch } from 'react-redux';

import { AppDispatch } from '../types/app-dispatch.ts';

export const useAppDispatch = () => useDispatch<AppDispatch>();
