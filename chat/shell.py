import os, uuid
from google.cloud import dialogflow_v2 as dialogflow

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = r"C:\Users\vaish\Downloads\abc-chatbot-isyw-badb4206698f.json"
PROJECT_ID = "abc-chatbot-isyw"

session_client = dialogflow.SessionsClient()
session = session_client.session_path(PROJECT_ID, str(uuid.uuid4()))

text_input = dialogflow.TextInput(text="Hello", language_code="en")
query_input = dialogflow.QueryInput(text=text_input)

response = session_client.detect_intent(request={"session": session, "query_input": query_input})
print(response.query_result.fulfillment_text)
