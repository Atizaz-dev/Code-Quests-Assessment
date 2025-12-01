from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from app.core.config import settings

class VectorStoreService:
    def __init__(self):
        self.embeddings = OpenAIEmbeddings(
            openai_api_key=settings.OPENAI_API_KEY,
            model="text-embedding-3-small"
        )
        self.index_name = settings.PINECONE_INDEX_NAME

    def get_vector_store(self):
        return PineconeVectorStore(
            index_name=self.index_name,
            embedding=self.embeddings,
            pinecone_api_key=settings.PINECONE_API_KEY
        )

    def as_retriever(self):
        vectorstore = self.get_vector_store()
        # Retrieve top 4 relevant chunks
        return vectorstore.as_retriever(search_kwargs={"k": 4})