import { parse } from "date-fns";
import { Event } from "../context/events";
import { cc } from "../utils.js/cc";
import { formatDate } from "../utils.js/utils";

export default function CalendarEvents({ event }: { event: Event }) {
  return (
    <>
      <button
        className={cc("event", event.color, event.allDays && "all-day-event")}
      >
        {event.allDays ? (
          <div className="event-name">{event.name}</div>
        ) : (
          <>
            <div className={`color-dot ${event.color}`}></div>
            <div className="event-time">
              {formatDate(parse(event.startTime, "HH:mm", event.date), {
                timeStyle: "short",
              })}
            </div>
            <div className="event-name">{event.name}</div>
          </>
        )}
      </button>
    </>
  );
}
