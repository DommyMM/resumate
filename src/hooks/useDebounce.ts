import { useState, useEffect, useRef } from 'react';

/**
 * Hook that returns a debounced value after the specified delay
 * @param value The value to debounce
 * @param delay Delay in ms (default: 500ms)
 */
export function useDebounce<T>(value: T, delay = 500): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    const previousValueRef = useRef<T>(value);

    useEffect(() => {
        // Skip debouncing if value hasn't changed
        if (JSON.stringify(previousValueRef.current) === JSON.stringify(value)) {
            return;
        }

        // Update previous value
        previousValueRef.current = value;
        
        // Set a timeout to update the debounced value after delay
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Clean up the timeout if value changes or component unmounts
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}