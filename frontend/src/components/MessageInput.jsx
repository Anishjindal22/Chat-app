import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Paperclip, SendHorizontal, X, Camera } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 bg-base-100 border-t border-base-300 w-full shrink-0">
      {imagePreview && (
        <div className="mb-4 flex items-center gap-2">
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Preview"
              className="h-28 rounded-xl object-cover border border-base-300"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-base-content text-base-100 flex items-center justify-center hover:bg-error transition-colors shadow-md"
              type="button"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-end gap-2 max-w-full">
        <button
          type="button"
          className="p-3 text-base-content/50 hover:text-base-content hover:bg-base-200 rounded-full transition-colors shrink-0"
          onClick={() => fileInputRef.current?.click()}
        >
          <Paperclip className="w-5 h-5" />
        </button>
        
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        <div className="flex-1 bg-base-200/60 border border-base-300 rounded-2xl flex items-center px-4 py-1 min-h-[44px]">
          <input
            type="text"
            className="w-full bg-transparent border-0 focus:ring-0 text-[15px] placeholder:text-base-content/40 focus:outline-none h-full py-2.5"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="p-3 bg-primary text-primary-content rounded-full hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:hover:bg-primary shrink-0 flex items-center justify-center"
        >
          <SendHorizontal className="w-5 h-5 ml-0.5" />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;

