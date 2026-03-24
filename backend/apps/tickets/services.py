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

       
        TicketService.create_ticket_history(ticket, user, "status", str(old_status) if old_status else "None", str(new_status))

        return ticket

    @staticmethod
    def assign_ticket(ticket, assigning_user, target_operator):
        from .permissions import is_admin, is_operator

        if is_operator(assigning_user):
            if target_operator.id != assigning_user.id:
                raise Exception("Un operatore può auto-assegnarsi solo i propri ticket")
            if ticket.assigned_to is not None:
                raise Exception("Questo ticket è già preso in carico")
        elif not is_admin(assigning_user):
            raise Exception("Solo l'amministratore può forzare l'assegnazione")

        old_operator = ticket.assigned_to

        ticket.assigned_to = target_operator
        ticket.save()

        TicketService.create_ticket_history(
            ticket, 
            assigning_user, 
            "assigned_to", 
            str(old_operator.username) if old_operator else "None", 
            str(target_operator.username) if target_operator else "None"
        )

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
            ticket, user, "status", str(old_status) if old_status else "None", str(Ticket.StatusChoice.CLOSED)
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
            ticket, user, "status", str(old_status) if old_status else "None", str(Ticket.StatusChoice.IN_PROGRESS)
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
    def create_ticket_history(ticket, user, field_changed, old_value, new_value):

        return TicketHistory.objects.create(
            ticket=ticket,
            changed_by=user,
            field_changed=field_changed,
            old_value=old_value,
            new_value=new_value
        )