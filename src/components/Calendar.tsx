import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { useMemo, useState } from "react";
import CalendarDay from "./CalendarDay";
import { formatDate } from "../utils.js/utils";

export default function Calendar() {
  const [selectedMonth, setSelectedMont] = useState(new Date());

  const calendarDays = useMemo(() => {
    const firstWeekStart = startOfWeek(startOfMonth(selectedMonth));
    const lastWeekEnd = endOfWeek(endOfMonth(selectedMonth));
    return eachDayOfInterval({
      start: firstWeekStart,
      end: lastWeekEnd,
    });
  }, [selectedMonth]);

  return (
    <div className="calendar">
      <div className="header">
        <button className="btn" onClick={() => setSelectedMont(new Date())}>
          Today
        </button>
        <div>
          <button
            className="month-change-btn"
            onClick={() => setSelectedMont((m) => subMonths(m, 1))}
          >
            &lt;
          </button>
          <button
            className="month-change-btn"
            onClick={() => setSelectedMont((m) => addMonths(m, 1))}
          >
            &gt;
          </button>
        </div>
        <span className="month-title">
          {formatDate(selectedMonth, { month: "long", year: "numeric" })}
        </span>
      </div>
      <div className="days">
        {calendarDays.map((day, i) => (
          <CalendarDay
            key={day.getTime()}
            day={day}
            showWeekName={i < 7}
            selectedMonth={selectedMonth}
          />
        ))}
      </div>
    </div>
  );
}
