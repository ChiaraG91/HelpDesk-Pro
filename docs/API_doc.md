# 🚀 Ticketing System API

Backend REST API per la gestione di ticket, commenti e servizi AI, sviluppata con Django Rest Framework.

---

## 📌 Base URL

```
/api/
```

---

## 🔐 Autenticazione

Sistema basato su JWT.

Aggiungere l'header:

```
Authorization: Bearer <your_token>
```

---

# 🔑 AUTH API

## Login

**POST** `/api/auth/login/`

```json
{
  "username": "mario",
  "password": "123456"
}
```

### Response

```json
{
  "access": "JWT_ACCESS_TOKEN",
  "refresh": "JWT_REFRESH_TOKEN"
}
```

---

## Registrazione

**POST** `/api/auth/register/`

```json
{
  "username": "mario",
  "email": "mario@email.com",
  "password": "123456"
}
```

---

## Refresh Token

**POST** `/api/auth/refresh/`

```json
{
  "refresh": "REFRESH_TOKEN"
}
```

---

# 👤 USERS API

## Get Current User

**GET** `/api/users/me/`

### Response

```json
{
  "id": 1,
  "username": "mario",
  "email": "mario@email.com",
  "is_staff": false
}
```

---

## Admin - User Management

| Method | Endpoint           | Description |
| ------ | ------------------ | ----------- |
| GET    | `/api/users/`      | List users  |
| GET    | `/api/users/{id}/` | User detail |
| POST   | `/api/users/`      | Create user |
| PUT    | `/api/users/{id}/` | Update user |
| DELETE | `/api/users/{id}/` | Delete user |

---

# 🎫 TICKETS API

## Get Tickets

**GET** `/api/tickets/`

### Query Parameters

| Param       | Description                 |
| ----------- | --------------------------- |
| status      | Filter by status            |
| priority    | Filter by priority          |
| assigned_to | Filter by operator          |
| search      | Search in title/description |

### Example

```
/api/tickets/?status=open&priority=high&search=login
```

---

## Create Ticket

**POST** `/api/tickets/`

```json
{
  "title": "Login issue",
  "description": "Cannot login",
  "priority": "high",
  "category": 1
}
```

---

## Ticket Detail

**GET** `/api/tickets/{id}/`

---

## Update Ticket

**PUT** `/api/tickets/{id}/`

```json
{
  "title": "Updated title",
  "description": "Updated description",
  "priority": "medium",
  "status": "in_progress"
}
```

---

## Partial Update

**PATCH** `/api/tickets/{id}/`

```json
{
  "status": "closed"
}
```

---

## Delete Ticket

**DELETE** `/api/tickets/{id}/`

---

# 💬 COMMENTS API

## Get Ticket Comments

**GET** `/api/comments/ticket/{ticket_id}/`

### Response

```json
[
  {
    "id": 1,
    "content": "Working on it",
    "author": 2,
    "created_at": "2026-03-17T10:00:00Z"
  }
]
```

---

## Create Comment

**POST** `/api/comments/ticket/{ticket_id}/`

```json
{
  "content": "New comment"
}
```

---

# 🗂 CATEGORIES API

## Get Categories

**GET** `/api/categories/`

### Response

```json
[
  { "id": 1, "name": "Bug" },
  { "id": 2, "name": "Feature" }
]
```

---

# 🔍 Filtering & Search

Supported on tickets endpoint:

```
/api/tickets/?status=open
/api/tickets/?priority=high
/api/tickets/?assigned_to=2
/api/tickets/?search=login
```

---

# ⚠️ Error Handling

| Code | Meaning      |
| ---- | ------------ |
| 400  | Bad Request  |
| 401  | Unauthorized |
| 403  | Forbidden    |
| 404  | Not Found    |

### Example

```json
{
  "detail": "Authentication credentials were not provided."
}
```

---

# 🛠 Tech Stack

* Django
* Django REST Framework
* JWT (SimpleJWT)

---

# 📦 Setup

```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
