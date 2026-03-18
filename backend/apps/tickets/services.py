from .workflows import TICKET_WORKFLOW
from .permissions import can_change_status, can_assign_ticket, can_reopen_ticket

def change_ticket_status(ticket, user, new_status):

    if not can_change_status(user):
        raise Exception("User cannot change ticket status")

    allowed_transitions = TICKET_WORKFLOW.get(ticket.status, [])

    if new_status not in allowed_transitions:
        raise Exception("Invalid status transition")

    ticket.status = new_status
    ticket.save()

    return ticket

def assign_ticket(ticket, operator, user):

    if not can_assign_ticket(user):
        raise Exception("Only admin can assign tickets")

    ticket.assigned_operator = operator
    ticket.save()

    return ticket

def reopen_ticket(ticket, user):

    if not can_reopen_ticket(user):
         raise Exception("Only admin and operator can reopen tickets")

    if ticket.status not in ["resolved", "closed"]:
        raise Exception("Ticket cannot be reopened")

    ticket.status = "in_progress"
    ticket.save()

    return ticket

def add_comment(ticket, user, text):

    from apps.comments.models import Comment

    comment = Comment.objects.create(
        ticket=ticket,
        author=user,
        body=text
    )

    return comment

from tickets.models import TicketHistory

def create_ticket_history(ticket, user, old_value, new_value):
    history = TicketHistory.objects.create(
        ticket=ticket,
        changed_by=user,
        old_value=old_value,
        new_value=new_value
    )
    
    return history