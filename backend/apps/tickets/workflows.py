from .models import StatusChoice

TICKET_WORKFLOW = {
    StatusChoice.OPEN: [StatusChoice.IN_PROGRESS],
    StatusChoice.IN_PROGRESS: [StatusChoice.WAITING_FEEDBACK, StatusChoice.RESOLVED],
    StatusChoice.WAITING_FEEDBACK: [StatusChoice.IN_PROGRESS, StatusChoice.RESOLVED],
    StatusChoice.RESOLVED: [StatusChoice.CLOSED],
    StatusChoice.CLOSED: []
}