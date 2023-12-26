import { useState } from 'react';

let timer: NodeJS.Timeout;

export const useDebounce = (
  delay: number,
): [string | null, (text: string) => void] => {
  const [debouncedValue, setDebouncedValue] = useState<string | null>(null);

  const setDebounce = (text: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setDebouncedValue(text);
    }, delay);
  };

  return [debouncedValue, setDebounce];
};
