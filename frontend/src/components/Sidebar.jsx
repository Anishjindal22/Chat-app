import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Search } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesOnline = showOnlineOnly ? onlineUsers.includes(user._id) : true;
    return matchesSearch && matchesOnline;
  });

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-80 border-r border-base-300 bg-base-200/40 flex flex-col transition-all duration-300 shrink-0">
      <div className="p-4 border-b border-base-300 space-y-4">
        <div className="flex items-center justify-between hidden lg:flex">
          <h2 className="text-xl font-bold tracking-tight text-base-content">Messages</h2>
          <div className="badge badge-primary badge-sm font-bold">{onlineUsers.length - 1} Online</div>
        </div>
        
        <div className="hidden lg:block relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-base-content/40" />
          </div>
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-sm w-full pl-9 bg-base-100 border-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm h-10 rounded-xl transition-shadow"
          />
        </div>

        <div className="hidden lg:flex items-center justify-between">
          <span className="text-sm font-medium text-base-content/60">Active Now</span>
          <input
            type="checkbox"
            className="toggle toggle-primary toggle-sm"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
          />
        </div>
      </div>

      <div className="overflow-y-auto flex-1 w-full p-2 space-y-1 scroll-smooth">
        {filteredUsers.map((user) => {
          const isSelected = selectedUser?._id === user._id;
          const isOnline = onlineUsers.includes(user._id);

          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
                w-full p-3 flex items-center gap-4 rounded-2xl transition-all duration-200
                ${isSelected ? "bg-primary text-primary-content shadow-md shadow-primary/20 scale-[0.98]" : "hover:bg-base-100 text-base-content border border-transparent hover:border-base-300"}
              `}
            >
              <div className="relative shrink-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name}
                  className={`w-12 h-12 object-cover rounded-full ${isSelected ? "ring-2 ring-primary-content/30" : "ring-1 ring-base-300"} transition-all`}
                />
                {isOnline && (
                  <span
                    className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 
                    ${isSelected ? "bg-green-400 border-primary" : "bg-success border-base-100"}`}
                  />
                )}
              </div>

              <div className="hidden lg:flex flex-col items-start min-w-0 flex-1">
                <span className={`font-semibold truncate w-full text-left text-[15px]`}>
                  {user.fullName}
                </span>
                <span className={`text-sm truncate w-full text-left ${isSelected ? "text-primary-content/80 font-medium" : "text-base-content/50"}`}>
                  {isOnline ? "Active now" : "Offline"}
                </span>
              </div>
            </button>
          );
        })}

        {filteredUsers.length === 0 && (
          <div className="text-center text-base-content/40 py-10 flex flex-col items-center gap-3">
             <Search className="w-8 h-8 opacity-20" />
             <p className="text-sm font-medium">No users found</p>
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;

