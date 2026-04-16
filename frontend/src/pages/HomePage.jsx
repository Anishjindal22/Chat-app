import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-100 flex overflow-hidden">
      {/* 
        Full-bleed minimalist layout.
        The top padding (pt-16) accounts for the Navbar.
        We drop all decorative backgrounds and rounding for an edge-to-edge application feel.
      */}
      <div className="flex w-full h-full pt-16">
        <Sidebar />
        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
      </div>
    </div>
  );
};
export default HomePage;
