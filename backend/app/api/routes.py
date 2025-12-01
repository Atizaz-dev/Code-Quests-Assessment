from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from typing import List

from app.services.ingestion import IngestionService
from app.services.llm import ChatService

router = APIRouter()
ingest_service = IngestionService()
chat_service = ChatService()

# --- Schemas ---
class AskRequest(BaseModel):
    question: str

class AskResponse(BaseModel):
    answer: str
    sources: List[str]

# --- Endpoints ---

@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    try:
        # Print that we started
        result = await ingest_service.process_file(file)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ask", response_model=AskResponse)
async def ask_assistant(request: AskRequest):
    try:
        return chat_service.ask_question(request.question)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
