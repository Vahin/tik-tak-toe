import { useEffect, useState } from "react";

export const useEventsSource = <T>(url: string) => {
  const [isPending, setIsPending] = useState<boolean>(true);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<unknown | undefined>();

  useEffect(() => {
    const gameEvents = new EventSource(url);

    gameEvents.addEventListener("message", (message) => {
      try {
        setIsPending(false);
        setError(undefined);
        setData(JSON.parse(message.data));
      } catch (e) {
        setError(e);
      }
    });

    gameEvents.addEventListener("error", (e) => {
      setIsPending(false);
      setError(e);
    });

    return () => gameEvents.close();
  }, [url]);

  return {
    dataStream: data,
    error,
    isPending,
  };
};
