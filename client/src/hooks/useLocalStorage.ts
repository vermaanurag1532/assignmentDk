import { useState } from "react";

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    if (value instanceof Function) {
      const newValue = value(storedValue);
      setStoredValue(newValue);
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } else {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  };

  return [storedValue, setValue] as const;
}
