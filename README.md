# Django Dialogflow Chatbot

A simple chatbot application built using **Django** as backend and **Google Dialogflow** for NLP.

## Features
- Django REST API for chatbot
- Dialogflow integration
- Simple web-based chat UI
- Deployed on Render (free tier)

## Tech Stack
- Python
- Django
- Google Dialogflow
- HTML, JavaScript

## How it works
1. User sends message from UI
2. Django API receives message
3. Message is sent to Dialogflow
4. Dialogflow returns intent response
5. Response is shown in UI

## Setup (Local)
```bash
pip install -r requirements.txt
python manage.py runserver
