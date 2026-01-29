from django.urls import path
from .views import chatbot, chatbot_page

urlpatterns = [
    path("chat/", chatbot_page),        # frontend UI page
    path("chatbot-api/", chatbot),      # backend API
    
]
