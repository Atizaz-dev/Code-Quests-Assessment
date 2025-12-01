from langchain_openai import ChatOpenAI
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from app.services.vector_store import VectorStoreService
from app.core.config import settings

class ChatService:
    def __init__(self):
        self.llm = ChatOpenAI(
            model="gpt-4-turbo-preview", 
            api_key=settings.OPENAI_API_KEY
        )
        self.vector_service = VectorStoreService()

    def ask_question(self, query: str):
        retriever = self.vector_service.as_retriever()

        system_prompt = (
            "You are an assistant for questioning tasks. "
            "Use the following pieces of retrieved context to answer the question. "
            "If you don't know the answer, say that you don't know. "
            "Use three sentences maximum and keep the answer concise."
            "\n\n"
            "{context}"
        )

        prompt = ChatPromptTemplate.from_messages([
            ("system", system_prompt),
            ("human", "{input}"),
        ])

        question_answer_chain = create_stuff_documents_chain(self.llm, prompt)
        rag_chain = create_retrieval_chain(retriever, question_answer_chain)

        response = rag_chain.invoke({"input": query})
        
        # Clean up sources for frontend
        sources = list(set([doc.metadata.get("source", "Unknown") for doc in response.get("context", [])]))

        return {
            "answer": response["answer"],
            "sources": sources
        }