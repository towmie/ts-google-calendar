import { Fragment, useId, useState } from "react";
import { Event } from "../context/events";
import { UnionOmit } from "../utils.js/types";
import { formatDate } from "../utils.js/utils";
import Modal, { ModalProps } from "./Modal";
import { EVENTS_COLOR } from "../context/useEvents";

type EventModalProps = {
  onSubmit: (event: UnionOmit<Event, "id">) => void;
} & (
  | {
      onDelete: () => void;
      event: Event;
      date?: never;
    }
  | { onDelete?: never; event?: never; date: Date }
) &
  Omit<ModalProps, "children">;

export default function EventModal({
  onSubmit,
  onDelete,
  event,
  date,
  ...modalProps
}: EventModalProps) {
  const formId = useId();
  const [selectedColor, setSelectedColor] = useState(
    event?.color || EVENTS_COLOR[0]
  );
  const isNew = event === undefined;
  const [isAlldayChecked, setAlldayChecked] = useState(event?.allDays || false);
  const [startTime, setStartTime] = useState(event?.startTime || "");

  return (
    <Modal {...modalProps}>
      <div className="modal-title">
        <div>{isNew ? "Add" : "Edit"} Event</div>
        <small>{formatDate(date || event.date, { dateStyle: "short" })}</small>
        <button className="close-btn" onClick={modalProps.onClose}>
          &times;
        </button>
      </div>
      <form>
        <div className="form-group">
          <label htmlFor={`${formId}-name`}>Name</label>
          <input type="text" name="name" id={`${formId}-name`} />
        </div>
        <div className="form-group checkbox">
          <input
            checked={isAlldayChecked}
            onChange={(e) => setAlldayChecked(e.target.checked)}
            type="checkbox"
            name="all-day"
            id={`${formId}-all-day`}
          />
          <label htmlFor={`${formId}-all-day`}>All Day?</label>
        </div>
        <div className="row">
          <div className="form-group">
            <label htmlFor={`${formId}-start-time`}>Start Time</label>
            <input
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required={!isAlldayChecked}
              disabled={isAlldayChecked}
              type="time"
              name="start-time"
              id={`${formId}-start-time`}
            />
          </div>
          <div className="form-group">
            <label htmlFor={`${formId}-end-time`}>End Time</label>
            <input
              min={startTime}
              required={!isAlldayChecked}
              disabled={isAlldayChecked}
              type="time"
              name="end-time"
              id={`${formId}-end-time`}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Color</label>
          <div className="row left">
            {EVENTS_COLOR.map((color) => (
              <Fragment key={color}>
                <input
                  type="radio"
                  name="color"
                  value={color}
                  id={`${formId}-${color}`}
                  checked={selectedColor === color}
                  onChange={() => setSelectedColor(color)}
                  className="color-radio"
                />
                <label htmlFor={`${formId}-${color}`}>
                  <span className="sr-only">{color}</span>
                </label>
              </Fragment>
            ))}
          </div>
        </div>
        <div className="row">
          <button className="btn btn-success" type="submit">
            {isNew ? "Add" : "Edit"}
          </button>
          {onDelete !== null && (
            <button onClick={onDelete} className="btn btn-delete" type="button">
              Delete
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
}
