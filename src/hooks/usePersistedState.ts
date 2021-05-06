import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PersistenceKeys: Readonly<Record<string, string>> = {
  LikedMedia: "liked-media",
};

export function usePersistedState<Value>(
  key: keyof typeof PersistenceKeys,
  defaultValue?: Value
): [
  value: Value | undefined,
  setPersistedValue: (value: Value | undefined) => void,
  clearPersistedValue: () => void
] {
  const [value, setValue] = useState<Value | undefined>(defaultValue);
  const defaultValueJson = JSON.stringify(defaultValue);

  useEffect(() => {
    const getPersistedValue = async () => {
      try {
        const defaultValue = JSON.parse(defaultValueJson);
        const stored = await AsyncStorage.getItem(key);
        setValue(stored === null ? defaultValue : JSON.parse(stored));
        if (stored === null && defaultValue !== undefined) {
          AsyncStorage.setItem(key, JSON.stringify(defaultValue));
        }
      } catch (error) {
        console.error(
          `[usePersistedState] Failed to getItem with key: ${key} due to error: ${error}`
        );
      }
    };

    if (defaultValueJson !== undefined) getPersistedValue();
  }, [key, defaultValueJson]);

  // TODO: think of a way to expose `prev` value
  const setPersistedValue = useCallback(
    (newValue: Value | undefined) => {
      const json = JSON.stringify(newValue);
      AsyncStorage.setItem(key, json);
      setValue(newValue);
    },
    [key]
  );

  const clearPersistedValue = useCallback(() => {
    AsyncStorage.removeItem(key);
  }, [key]);

  return [value, setPersistedValue, clearPersistedValue];
}
