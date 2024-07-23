// hooks/useTypedDispatch.ts
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';

export const useTypedDispatch = () => useDispatch<AppDispatch>();

// hooks/useTypedSelector.ts
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState } from '../redux/store';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
