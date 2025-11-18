import { useCallback, useState } from 'react';

export function useToggle(initialState: boolean): [boolean, () => void] {
  const [flag, setFlag] = useState(initialState);
  const toggleFlag = useCallback(() => setFlag((f) => !f), []);
  return [flag, toggleFlag];
}
