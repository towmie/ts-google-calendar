import Calendar from "./components/Calendar";
import { EventsProvider } from "./context/events";
import "./index.css";
function App() {
  return (
    <EventsProvider>
      <Calendar />
    </EventsProvider>
  );
}

export default App;
