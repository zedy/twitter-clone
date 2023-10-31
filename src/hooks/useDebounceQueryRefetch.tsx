import type { RefetchPageFilters } from '@tanstack/react-query';
import { useRef } from 'react';

function useDebounceQueryRefetch(
  fn: () => Promise<unknown>,
  delay: number
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    timeoutRef.current = setTimeout(async () => {
      await fn();
    }, delay);
  };
}

export default useDebounceQueryRefetch;


