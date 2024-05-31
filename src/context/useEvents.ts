import { useContext } from "react";
import { Context } from "./events";

export const EVENTS_COLOR = ["red", "green", "blue"] as const;

export function useEvents() {
  const value = useContext(Context);
  if (value === null)
    throw new Error("useEvents must be used within a EventsProvider");
  return value;
}
