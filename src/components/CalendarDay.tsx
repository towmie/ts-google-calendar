import { endOfDay, isBefore, isSameMonth, isToday } from "date-fns";
import { cc } from "../utils.js/cc";
import { formatDate } from "../utils.js/utils";

type CalendarDayProps = {
  day: Date;
  showWeekName: boolean;
  selectedMonth: Date;
};

export default function CalendarDay({
  day,
  showWeekName,
  selectedMonth,
}: CalendarDayProps) {
  console.log();

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
        <button className="add-event-btn">+</button>
      </div>
      <div className="events">
        <button className="all-day-event blue event">
          <div className="event-name">Short</div>
        </button>
        <button className="all-day-event green event">
          <div className="event-name">
            Long Event Name That Just Keeps Going
          </div>
        </button>
        <button className="event">
          <div className="color-dot blue"></div>
          <div className="event-time">7am</div>
        </button>
      </div>
    </div>
  );
}
