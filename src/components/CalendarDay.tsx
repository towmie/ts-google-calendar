import { endOfDay, isBefore, isSameMonth, isToday } from "date-fns";
import { cc } from "../utils.js/cc";
import { formatDate } from "../utils.js/utils";
import { useEvents } from "../context/useEvents";
import { useMemo, useState } from "react";
import EventModal from "./EventModal";
import { Event } from "../context/events";
import CalendarEvents from "./CalendarEvents";

export type CalendarDayProps = {
  day: Date;
  showWeekName: boolean;
  selectedMonth: Date;
  events: Event[];
};

export default function CalendarDay({
  day,
  showWeekName,
  selectedMonth,
  events,
}: CalendarDayProps) {
  const [isNewEventModalOpen, setNewEventModalOpen] = useState(false);
  const { addEvent } = useEvents();

  const sortedEvents = useMemo(() => {
    const timeToNumber = (time: string) => parseFloat(time.replace(":", "."));

    return [...events].sort((a, b) => {
      if (a.allDays && b.allDays) {
        return 0;
      } else if (a.allDays) {
        return -1;
      } else if (b.allDays) {
        return 1;
      } else {
        return timeToNumber(a.startTime) - timeToNumber(b.startTime);
      }
    });
  }, [events]);

  return (
    <div
      className={cc(
        "day",
        !isSameMonth(day, selectedMonth) && "non-month-day",
        isBefore(endOfDay(day), new Date()) && "old-month-day"
      )}
    >
      <div className="day-header">
        {showWeekName && (
          <div className="week-name">
            {formatDate(day, { weekday: "short" })}
          </div>
        )}
        <div className={cc("day-number", isToday(day) && "today")}>
          {formatDate(day, { day: "numeric" })}
        </div>
        <button
          className="add-event-btn"
          onClick={() => setNewEventModalOpen(true)}
        >
          +
        </button>
      </div>
      {sortedEvents.length > 0 && (
        <div className="events">
          {sortedEvents.map((event) => (
            <CalendarEvents key={event.id} event={event} />
          ))}
        </div>
      )}
      <EventModal
        date={day}
        isOpen={isNewEventModalOpen}
        onClose={() => setNewEventModalOpen(false)}
        onSubmit={addEvent}
      />
    </div>
  );
}
