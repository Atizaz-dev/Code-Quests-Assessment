"use client";
import { useState } from "react";
import { uploadFile } from "@/lib/api";
import { UploadCloud, FileText, CheckCircle, Loader2 } from "lucide-react";

export default function FileUploader() {
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    
    setUploading(true);
    setStatus(null);
    try {
      await uploadFile(e.target.files[0]);
      setStatus("File processed & embedded successfully!");
    } catch (err) {
      setStatus("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 border border-dashed border-gray-300 rounded-xl bg-gray-50 text-center">
      <div className="flex flex-col items-center gap-2">
        <div className="p-3 bg-white rounded-full shadow-sm">
            {uploading ? <Loader2 className="animate-spin text-blue-500"/> : <UploadCloud className="text-gray-600" />}
        </div>
        <h3 className="font-semibold text-gray-700">Upload Knowledge</h3>
        <p className="text-xs text-gray-500">PDF or TXT files only</p>
        
        <label className="mt-2 cursor-pointer bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition">
          <span>Select File</span>
          <input
            type="file"
            className="hidden"
            accept=".pdf,.txt"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
        
        {status && (
            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-green-600">
                <CheckCircle size={14} /> {status}
            </div>
        )}
      </div>
    </div>
  );
}