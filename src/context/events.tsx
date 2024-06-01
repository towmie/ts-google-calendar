import { ReactNode, createContext, useState } from "react";
import { UnionOmit } from "../utils.js/types";
import { EVENTS_COLOR } from "./useEvents";

export type Event = {
  id: string;
  name: string;
  color: (typeof EVENTS_COLOR)[number];
  date: Date;
} & (
  | { allDays: false; startTime: string; endTime: string }
  | { allDays: true; startTime?: never; endTime?: never }
);

export type EventsContext = {
  events: Event[];
  addEvent: (event: UnionOmit<Event, "id">) => void;
  updateEvent: (eventDetails: UnionOmit<Event, "id">, id: string) => void;
  deleteEvent: (id: string) => void;
};

export type EventProviderProps = {
  children: ReactNode;
};

export const Context = createContext<EventsContext | null>(null);

export function EventsProvider({ children }: EventProviderProps) {
  const [events, setEvents] = useState<Event[]>([]);

  function addEvent(event: UnionOmit<Event, "id">) {
    setEvents((e) => [...e, { ...event, id: crypto.randomUUID() }]);
  }
  function updateEvent(eventDetails: UnionOmit<Event, "id">, id: string) {
    setEvents((e) => {
      return e.map((event) =>
        event.id === id ? { ...eventDetails, id } : event
      );
    });
  }
  function deleteEvent(id: string) {
    setEvents((e) => e.filter((event) => event.id !== id));
  }

  return (
    <Context.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </Context.Provider>
  );
}
