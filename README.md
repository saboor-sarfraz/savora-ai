# Savora Intelligent Restaurant Assistant

<p align="center">
  <img src="screenshots/Screenshot 2026-07-22 112023.png" alt="Savora AI preview" />
</p>


Savora AI is a modern, AI-powered restaurant experience that brings conversational ordering, personalized recommendations, and a polished digital storefront into one seamless product. This project combines a beautiful frontend with an intelligent backend to create a futuristic food-ordering experience that feels natural, fast, and engaging.

## Why this project matters

This project was designed to explore how AI can transform everyday interactions in hospitality. Instead of forcing users through traditional menus and forms, Savora AI lets guests talk naturally, discover dishes, manage their cart, and complete ordering through a conversational interface.

It is a strong portfolio project because it brings together:
- modern UI/UX design
- real-world AI application logic
- full-stack development
- conversational agent workflows
- end-to-end product thinking

---

## Key Features

- Conversational AI assistant for menu questions and food recommendations
- Natural-language ordering experience
- Cart management and checkout flow
- Personalized suggestions based on cravings, budget, and dietary preferences
- Modern restaurant website with dedicated pages for menu, cart, checkout, and contact
- Full-stack architecture with a frontend experience and AI-powered backend service

---

## What the system does

Savora AI allows users to:
- browse the restaurant menu
- ask for dish recommendations
- request food based on mood, taste, or budget
- add items to a cart through chat
- move through checkout with a smooth experience

The backend uses a language-driven workflow to interpret user intent, manage the order context, and respond in a helpful, human-like way.

---

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Radix UI components

### Backend
- Python
- FastAPI
- LangChain
- LangGraph
- Groq
- SQLAlchemy for data persistence

---

## Project Structure

- frontend/ — polished restaurant website and UI components
- src/ — backend logic, workflow orchestration, and AI agent tools
- menu.py and related modules — restaurant data and menu handling
- README.md — project overview and documentation

---

## 📸 Screenshots

### Home Page
<p align="center">
  <img src="screenshots/Screenshot%202026-07-22%20112123.png"
       alt="Home Page"
       width="900">
</p>
### Chat Interface
<p align="center">
  <img src="screenshots/Screenshot%202026-07-22%20112229.png"
       alt="Chat Interface"
       width="400">
</p>

### Menu & Cart
<p align="center">
  <img src="screenshots/Screenshot%202026-07-22%20113253.png"
       alt="Menu and Cart"
       width="400">
</p>

### Order Summary
<p align="center">
  <img src="screenshots/Screenshot%202026-07-22%20113357.png"
       alt="Order Summary"
       width="400">
</p>

### Order Cancellation
<p align="center">
  <img src="screenshots/Screenshot%202026-07-22%20113427.png"
       alt="Order Confirmation"
       width="400">
</p>
---

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- npm or pnpm
- pip

### 1. Clone the repository

```bash
git clone https://github.com/your-username/savora-ai.git
cd savora-ai
```

### 2. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Set up environment variables

Create a `.env` file in the project root and add your Groq API key:

```env
GROQ_API_KEY=your_groq_api_key_here
```

You can also include any other required settings such as the frontend origin if needed.

### 4. Run the backend

```bash
pip install -e .
python -m uvicorn src.main:app --reload
```

> Make sure your `.env` file is present before starting the backend, especially if you are using the AI assistant features.

---

## Future Enhancements

- order history and admin dashboard
- multilingual support
- voice-based assistant experience
- analytics for customer behavior and ordering patterns

---
