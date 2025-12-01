import ChatInterface from '../components/chat-interface';
import FileUploader from "../components/file-uploader";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black p-8 md:p-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Sidebar / Config Area */}
        <div className="md:col-span-1 space-y-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">Code⚔️Quests</h1>
            <p className="text-gray-500">RAG Knowledge Assistant</p>
          </div>
          
          <FileUploader />
          
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <h4 className="font-semibold text-blue-900 text-sm mb-2">How it works</h4>
            <ul className="text-xs text-blue-800 space-y-1 list-disc pl-4">
              <li>Upload a PDF or TXT file.</li>
              <li>System splits text into chunks.</li>
              <li>Embeddings stored in Pinecone.</li>
              <li>Ask questions to retrieve context.</li>
            </ul>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="md:col-span-2">
            <ChatInterface />
        </div>

      </div>
    </main>
  );
}