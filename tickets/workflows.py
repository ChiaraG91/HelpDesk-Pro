TICKET_WORKFLOW = {
    "open": ["in_progress"],
    "in_progress": ["waiting_feedback", "resolved"],
    "waiting_feedback": ["in_progress", "resolved"],
    "resolved": ["closed"],
    "closed": []
}