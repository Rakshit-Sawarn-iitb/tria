---

# Tria — Contact List (React)

A single-page **Contact List Application** built using **React** as part of the **Tria Frontend Assignment**.
The app allows users to view, search, add, group, block/unblock, favourite, and delete contacts with a clean and minimal interface.

---

## Features

* View all contacts grouped alphabetically
* Search contacts by name (case-insensitive)
* Add a new contact via modal
* Assign contact to groups (`Friends`, `Family`, `Work`)
* Mark / unmark as favourite
* Block / unblock a contact
* Delete a contact (confirmation popup)
* Responsive layout using Tailwind CSS

---

## Tech Stack

* React (Vite)
* Tailwind CSS
* lucide-react (icons)
* Custom API integration in `src/config/api.jsx`

---

## Folder Structure

```
src/
 ┣ components/
 ┃ ┣ Sidebar.jsx
 ┃ ┣ ContactSection.jsx
 ┃ ┣ ContactCard.jsx
 ┃ ┣ NewContact.jsx
 ┃ ┣ GroupDialog.jsx
 ┃ ┣ ConfirmDialog.jsx
 ┣ config/
 ┃ ┗ api.jsx
 ┣ App.jsx
 ┗ index.css
```
---
## Deployed
The deployed version can be accessed here: [https://tria-eight.vercel.app/](https://tria-eight.vercel.app/)
---

## Setup Instructions

### Prerequisites

* Node.js (v14+)
* npm or yarn

### Run Locally

```bash
npm install
npm run dev
```

App runs at [http://localhost:3000](http://localhost:3000)

---

## API Integration

All API calls are handled via `src/config/api.jsx`.
MockAPI.io is used to create a mock object named contact and all the CRUD operations are performed.

Key methods used:

* `getAllContacts()` → fetch all contacts
* `createContact(data)` → add new contact
* `updateContact(id, payload)` → update details (favourite, block, group, etc.)
* `deleteContact(id)` → remove contact

Each contact follows the structure:

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "contactNumber": "9876543210",
  "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  "favourite": false,
  "blocked": false,
  "group": ["Friends"]
}
```

---

## Notes

* Groups are fixed as `Friends`, `Family`, and `Work`
* Search is case-insensitive
* Alerts are used for confirmation and feedback
* Responsive UI built with Tailwind

---

## Deployment

To deploy on Vercel:

```bash
npm run build
```

Then push to GitHub and import your repository into [Vercel](https://vercel.com/).

---