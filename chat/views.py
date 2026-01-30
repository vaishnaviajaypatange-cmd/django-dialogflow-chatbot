from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
import json, uuid, os
from google.cloud import dialogflow_v2 as dialogflow

# Step 2a: Load Dialogflow credentials from environment variable
if "GOOGLE_CREDENTIALS_JSON" in os.environ:
    credentials_dict = json.loads(os.environ["GOOGLE_CREDENTIALS_JSON"])
    with open("dialogflow_key.json", "w") as f:
        json.dump(credentials_dict, f)
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "dialogflow_key.json"

# Step 2b: Get project ID
PROJECT_ID = os.environ.get("PROJECT_ID")

@csrf_exempt
def chatbot(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            text = data.get("message", "").strip()

            if not text:
                return JsonResponse({"error": "No message provided"}, status=400)

            # Create Dialogflow session
            session_client = dialogflow.SessionsClient()
            session_id = str(uuid.uuid4())
            session = session_client.session_path(PROJECT_ID, session_id)

            text_input = dialogflow.TextInput(text=text, language_code="en")
            query_input = dialogflow.QueryInput(text=text_input)

            response = session_client.detect_intent(
                request={"session": session, "query_input": query_input}
            )

            # Get parameters safely
            parameters = response.query_result.parameters
            try:
                parameters_dict = parameters.to_dict()
            except Exception:
                parameters_dict = {}

            return JsonResponse({
                "reply": response.query_result.fulfillment_text,
                "intent": response.query_result.intent.display_name,
                "parameters": parameters_dict
            })

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    elif request.method == "GET":
        return JsonResponse({
            "info": "Send a POST request with JSON {'message': 'text'} to get a chatbot response."
        })

    else:
        return HttpResponseBadRequest("Invalid request method.")


def chatbot_page(request):
    return render(request, "chat/chatbot.html")
