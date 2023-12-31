import { useEffect, useState } from 'react';

const useDebounceValue = (value: string, delay = 250) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const id = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(id);
        }
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounceValue;