import shutil
import os
from fastapi import UploadFile
from langchain_community.document_loaders import PyPDFLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from app.services.vector_store import VectorStoreService

class IngestionService:
    def __init__(self):
        self.vector_service = VectorStoreService()
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )

    async def process_file(self, file: UploadFile):
        # 1. Save temp file
        temp_filename = f"temp_{file.filename}"
        with open(temp_filename, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        try:
            # 2. Load Content
            if file.filename.endswith(".pdf"):
                loader = PyPDFLoader(temp_filename)
            else:
                loader = TextLoader(temp_filename)
            
            docs = loader.load()

            # 3. Add Metadata
            for doc in docs:
                doc.metadata["source"] = file.filename

            # 4. Split Text
            splits = self.text_splitter.split_documents(docs)

            # 5. Embed & Store
            vector_store = self.vector_service.get_vector_store()
            vector_store.add_documents(splits)

            return {
                "filename": file.filename,
                "chunks": len(splits),
                "status": "Success"
            }
        finally:
            # Cleanup
            if os.path.exists(temp_filename):
                os.remove(temp_filename)