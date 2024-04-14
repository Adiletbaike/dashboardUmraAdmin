import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar = () => {
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        headerToolbar = {{
            start : "title",
            center: 'today prev,next',
            end : 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        height={"80vh"}
      />
    </div>
  );
};

export default Calendar;
