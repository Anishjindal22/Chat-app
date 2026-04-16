import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden bg-base-100">
        <ChatHeader />
        <div className="flex-1 overflow-y-auto">
           <MessageSkeleton />
        </div>
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-base-100 relative">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {messages.map((message) => {
          const isSender = message.senderId === authUser._id;
          return (
          <div
            key={message._id}
            className={`flex w-full ${isSender ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-200`}
            ref={messageEndRef}
          >
            <div className={`flex max-w-[85%] md:max-w-[75%] lg:max-w-[65%] gap-3 ${isSender ? "flex-row-reverse" : "flex-row"}`}>
              <div className="shrink-0 mt-auto">
                <img
                  src={
                    isSender
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>

              <div className={`flex flex-col ${isSender ? "items-end" : "items-start"}`}>
                <div className="flex items-center gap-2 mb-1 px-1">
                  <span className="font-semibold text-[13px] text-base-content/80">
                    {isSender ? "You" : selectedUser.fullName}
                  </span>
                  <time className="text-[11px] opacity-50 font-medium">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>

                <div className={`
                    rounded-2xl px-4 py-2.5 shadow-sm text-[15px] leading-relaxed relative
                    ${isSender 
                      ? "bg-primary text-primary-content rounded-br-sm" 
                      : "bg-base-200 text-base-content rounded-bl-sm border border-base-300"
                    }`}>
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="max-w-[280px] w-full rounded-lg mb-2 object-cover"
                    />
                  )}
                  {message.text && <p className="whitespace-pre-wrap">{message.text}</p>}
                </div>
              </div>
            </div>
          </div>
        )})}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
