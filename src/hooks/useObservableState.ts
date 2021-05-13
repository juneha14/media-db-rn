import { useCallback, useEffect, useState } from "react";
import { NotificationCenter } from "../utils";

export function useObservableState<T>(
  id: string,
  defaultValue?: T
): [value: T | undefined, setValue: (value: T) => void] {
  const [value, setValue] = useState(defaultValue);

  const postAndSetValue = useCallback(
    (value: T) => {
      setValue(value);
      NotificationCenter.instance().postNotification(id, value);
    },
    [id]
  );

  useEffect(() => {
    const observer = (observedValue: T) => setValue(observedValue);
    NotificationCenter.instance().addObserver(id, observer);

    return NotificationCenter.instance().removeObserver(id, observer);
  }, [id, postAndSetValue]);

  return [value, postAndSetValue];
}
