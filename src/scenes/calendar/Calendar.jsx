import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  useMediaQuery,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { formatDate } from "@fullcalendar/core";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [currentEvents, setCurrentEvents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDateClick = (arg) => {
    const calendarApi = arg.view.calendar;
    calendarApi.unselect();
    const isMobile = !isNonMobile;
    setOpenModal(true);
    setSelectedDate(arg);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleAddEvent = () => {
    const title = document.getElementById("event-title").value;
  
    if (title && selectedDate) {
      const newEvent = {
        id: `${selectedDate.dateStr}-${title}`,
        title,
        start: selectedDate.start || selectedDate.date,
        end: selectedDate.end || selectedDate.date,
        allDay: selectedDate.allDay,
      };
  
      selectedDate.view.calendar.addEvent(newEvent);
  
      setCurrentEvents([...currentEvents, newEvent]);
    }
  
    setOpenModal(false);
  };
  

  const handleEventClick = (selected) => {
    setSelectedEvent(selected.event);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };
  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setCurrentEvents(currentEvents.filter((event) => event.id !== selectedEvent.id));
      setSelectedEvent(null);
      setOpenDeleteDialog(false);
    }
  };
  
  

  const handleEventItemClick = (event) => {
    setSelectedEvent(event);
    setOpenDeleteDialog(true);
  };

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

      <Box
        gap="20px"
        display="flex"
        justifyContent="center"
        flexDirection={["column", "row"]}
      >
        {/* CALENDAR */}
        <Box
          width={["100%", "60%"]}
          sx={{
            "& .fc-toolbar-title": {
              fontSize: ["14px", "14px"],
              margin: "0 0px",
            },
            "& .fc-toolbar-ltr": {
              fontSize: ["14px", "14px"],
              alignItems: "flex-start",
            },
          }}
        >
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={[
              {
                id: "12315",
                title: "All-day event",
                date: "2022-09-14",
              },
              {
                id: "5123",
                title: "Timed event",
                date: "2022-09-28",
              },
            ]}
          />
        </Box>
        {/* CALENDAR SIDEBAR */}
        <Box backgroundColor={colors.primary[400]} p="15px" borderRadius="4px">
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                onClick={() => handleEventItemClick(event)}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      {/* Add Event Modal */}
      <Dialog open={openModal} onClose={handleModalClose}>
        <DialogTitle>Add Event</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" id="event-title" label="Event Title" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button onClick={handleAddEvent}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Event Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the event '{selectedEvent?.title}'?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={handleDeleteEvent} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Calendar;
