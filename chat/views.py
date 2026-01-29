from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
import json, uuid, os
from google.cloud import dialogflow_v2 as dialogflow
from django.shortcuts import render

# GOOGLE_CREDENTIALS_PATH = r"C:\Users\vaish\Downloads\abc-chatbot-isyw-badb4206698f.json"
# os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = GOOGLE_CREDENTIALS_PATH

PROJECT_ID = os.environ.get("abc-chatbot-isyw")

@csrf_exempt
def chatbot(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            text = data.get("message", "").strip()

            if not text:
                return JsonResponse({"error": "No message provided"}, status=400)

            session_client = dialogflow.SessionsClient()
            session_id = str(uuid.uuid4())
            session = session_client.session_path(PROJECT_ID, session_id)

            text_input = dialogflow.TextInput(text=text, language_code="en")
            query_input = dialogflow.QueryInput(text=text_input)

            response = session_client.detect_intent(
                request={"session": session, "query_input": query_input}
            )

            # Safe parameters conversion
            parameters = response.query_result.parameters
            try:
                parameters_dict = parameters.to_dict()  # works in newer versions
            except Exception:
                parameters_dict = {}  # fallback

            return JsonResponse({
                "reply": response.query_result.fulfillment_text,
                "intent": response.query_result.intent.display_name,
                "parameters": parameters_dict
            })

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    elif request.method == "GET":
        return JsonResponse({"info": "Send a POST request with JSON {'message': 'text'} to get a response from the chatbot."})

    else:
        return HttpResponseBadRequest("Invalid request method.")

def chatbot_page(request):
    return render(request, "chat/chatbot.html")
#  cd C:\Users\vaish\OneDrive\Desktop\chatbot\it_chatbot