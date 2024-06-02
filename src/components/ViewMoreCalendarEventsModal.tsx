import { Event } from "../context/events";
import { formatDate } from "../utils.js/utils";
import CalendarEvents from "./CalendarEvents";
import Modal, { ModalProps } from "./Modal";

type ViewMoreCalendarEventsModalProps = {
  events: Event[];
} & Omit<ModalProps, "children">;

export default function ViewMoreCalendarEventsModal({
  events,
  ...modalProps
}: ViewMoreCalendarEventsModalProps) {
  if (events.length === 0) return null;

  return (
    <Modal {...modalProps}>
      <div className="modal-title">
        <small>{formatDate(events[0].date, { dateStyle: "short" })}</small>
        <button className="close-btn" onClick={modalProps.onClose}>
          &times;
        </button>
      </div>
      <div className="events">
        {events.map((event) => (
          <CalendarEvents event={event} key={event.id} />
        ))}
      </div>
    </Modal>
  );
}
