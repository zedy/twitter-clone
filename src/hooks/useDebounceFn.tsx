import { useRef } from 'react';

type PayloadType = Record<string, string | number | boolean>;

function useDebounceFn<P extends PayloadType>(
    fn: (payload: P) => void,
    delay: number
  ) {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
    return (...args: [P]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }

export default useDebounceFn;


