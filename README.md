📦 Inventory Management System
A full-stack web application for managing inventory, built with Django (backend) and React (frontend). It allows users to manage raw materials, track stock, and perform CRUD operations via a clean and modern interface.

🚀 Features
📊 Raw materials management
📝 Add, edit, delete inventory items
📦 Stock tracking
📈 RESTful API built with Django REST Framework
⚛️ Interactive frontend with React and Axios

🛠 Tech Stack
Layer	Tech
Frontend	React, Axios, React Router
Backend	Django, Django REST Framework
Database	SQLite (dev) / PostgreSQL (prod recommended)
Environment	Python, Node.js

📁 Project Structure
bash
Copy
Edit
inventory-management/
│
├── Inventory-Backend/       # Django backend
│   ├── manage.py
│   ├── Inventory/           # Django app
│   └── db.sqlite3
│
├── Inventory-Frontend/      # React frontend
│   ├── public/
│   ├── src/
│   └── .env
│
└── README.md
⚙️ Setup Instructions
🐍 Backend (Django)
Navigate to backend:

bash
Copy
Edit
cd Inventory-Backend
Create virtual environment & install requirements:

bash
Copy
Edit
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
Add your environment variables in .env:

env
DEBUG=True
SECRET_KEY=your-secret-key
ALLOWED_HOSTS=localhost,127.0.0.1
Run migrations and start the server:

bash
python manage.py migrate
python manage.py runserver

⚛️ Frontend (React)
Navigate to frontend:

bash
Copy
Edit
cd Inventory-Frontend
Install dependencies:

bash
Copy
Edit
npm install
Add your environment variable in .env:

env
REACT_APP_BACKEND_URL=http://localhost:8000
Start the React dev server:

bash
Copy
Edit
npm start
🔐 Environment Variables
Make sure to create .env files locally and never commit them. Add the following:

Frontend (Inventory-Frontend/.env)
env
REACT_APP_BACKEND_URL=http://localhost:8000
Backend (Inventory-Backend/.env)

env
SECRET_KEY=your-secret-key
DEBUG=True
🧪 Running Tests
Django tests:


bash
npm test
🚀 Deployment
You can deploy the backend to platforms like Heroku, Render, or DigitalOcean, and the frontend to Vercel, Netlify, or GitHub Pages.

Make sure to update REACT_APP_BACKEND_URL to your live API domain in .env.production.

📄 License
This project is open-source and available under the MIT License.
