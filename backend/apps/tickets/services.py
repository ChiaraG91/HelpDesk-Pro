from .workflows import TICKET_WORKFLOW
from .permissions import can_change_status, can_assign_ticket, can_reopen_ticket
from .models import Ticket, TicketHistory


class TicketService:

    @staticmethod
    def change_ticket_status(ticket, user, new_status):

        if not can_change_status(user):
            raise Exception("User cannot change ticket status")

        allowed_transitions = TICKET_WORKFLOW.get(ticket.status, [])

        if new_status not in allowed_transitions:
            raise Exception("Invalid status transition")

        old_status = ticket.status

        ticket.status = new_status
        ticket.save()

       
        TicketService.create_ticket_history(ticket, user, old_status, new_status)

        return ticket

    @staticmethod
    def assign_ticket(ticket, operator, user):

        if not can_assign_ticket(user):
            raise Exception("Only admin can assign tickets")

        old_operator = ticket.assigned_operator

        ticket.assigned_operator = operator
        ticket.save()

        TicketService.create_ticket_history(ticket, user, old_operator, operator)

        return ticket
    
    @staticmethod
    def close_ticket(ticket, user):

        if not can_change_status(user):
            raise Exception("User cannot close ticket")

        
        if ticket.status != Ticket.StatusChoice.RESOLVED:
            raise Exception("Only resolved tickets can be closed")

        old_status = ticket.status

        ticket.status = Ticket.StatusChoice.CLOSED
        ticket.save()

        TicketService.create_ticket_history(
            ticket, user, old_status, Ticket.StatusChoice.CLOSED
        )

        return ticket

    @staticmethod
    def reopen_ticket(ticket, user):

        if not can_reopen_ticket(user):
            raise Exception("Only admin and operator can reopen tickets")

        if ticket.status not in [Ticket.StatusChoice.RESOLVED, Ticket.StatusChoice.CLOSED]:
            raise Exception("Ticket cannot be reopened")

        old_status = ticket.status

        ticket.status = Ticket.StatusChoice.IN_PROGRESS
        ticket.save()

        TicketService.create_ticket_history(
            ticket, user, old_status, Ticket.StatusChoice.IN_PROGRESS
        )

        return ticket

    @staticmethod
    def add_comment(ticket, user, text):

        from apps.comments.models import Comment

        comment = Comment.objects.create(
            ticket=ticket,
            author=user,
            body=text
        )

        return comment

    @staticmethod
    def create_ticket_history(ticket, user, old_value, new_value):

        return TicketHistory.objects.create(
            ticket=ticket,
            changed_by=user,
            old_value=old_value,
            new_value=new_value
        )