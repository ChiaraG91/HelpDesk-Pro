def is_admin(user):
    return user.role == "ADMIN"


def is_operator(user):
    return user.role == "OPERATOR"


def is_customer(user):
    return user.role == "CLIENT"

def can_change_status(user):
    return is_operator(user) or is_admin(user)


def can_assign_ticket(user):
    return is_admin(user)

def can_reopen_ticket(user):
    return is_operator(user) or is_admin(user)