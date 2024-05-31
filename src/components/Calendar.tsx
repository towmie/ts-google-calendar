import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { useMemo, useState } from "react";
import CalendarDay from "./CalendarDay";

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
        <button className="btn">Today</button>
        <div>
          <button className="month-change-btn">&lt;</button>
          <button className="month-change-btn">&gt;</button>
        </div>
        <span className="month-title">June 2023</span>
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
