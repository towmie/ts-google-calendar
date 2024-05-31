import { ReactNode, createContext, useState } from "react";
import { UnionOmit } from "../utils.js/types";
import { EVENTS_COLOR } from "./useEvents";

type Event = {
  id: string;
  name: string;
  color: (typeof EVENTS_COLOR)[number];
  date: Date;
} & (
  | { allDays: false; startTime: string; endTime: string }
  | { allDays: true; startTime?: never; endTime?: never }
);

type EventsContext = {
  events: Event[];
  addEvent: (event: UnionOmit<Event, "id">) => void;
};

type EventProviderProps = {
  children: ReactNode;
};

export const Context = createContext<EventsContext | null>(null);

export function EventsProvider({ children }: EventProviderProps) {
  const [events, setEvents] = useState<Event[]>([]);

  function addEvent(event: UnionOmit<Event, "id">) {
    setEvents((e) => [...e, { ...event, id: crypto.randomUUID() }]);
  }

  return (
    <Context.Provider value={{ events, addEvent }}>{children}</Context.Provider>
  );
}
