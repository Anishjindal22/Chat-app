import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 h-16">
      <div className="w-full h-full px-4 lg:px-8">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="w-8 h-8 rounded-lg bg-primary text-primary-content flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-base-content">Connect</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className="btn btn-ghost btn-sm gap-2 text-base-content/70 hover:text-base-content"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className="btn btn-ghost btn-sm gap-2 text-base-content/70 hover:text-base-content">
                  <User className="size-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="btn btn-ghost btn-sm gap-2 text-base-content/70 hover:text-base-content" onClick={logout}>
                  <LogOut className="size-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
