import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, ShieldCheck } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen pt-24 pb-12 relative overflow-hidden bg-base-200/30">
      {/* Decorative Blurs */}
      <div className="absolute top-20 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute top-60 -right-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />

      <div className="max-w-2xl mx-auto p-4 relative z-10">
        <div className="glassmorphism rounded-3xl p-8 sm:p-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-base-content to-base-content/60 bg-clip-text text-transparent">Profile Overview</h1>
            <p className="mt-2 text-base-content/70 font-medium">Manage your personal information</p>
          </div>

          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="relative size-36 rounded-full object-cover border-[6px] border-base-100 shadow-xl"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-2 right-2 
                  bg-primary text-primary-content hover:scale-110 shadow-lg
                  p-2.5 rounded-full cursor-pointer 
                  transition-all duration-300
                  ${isUpdatingProfile ? "animate-spin pointer-events-none" : "hover:rotate-12"}
                `}
              >
                <Camera className="w-5 h-5" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-base-content/60 font-medium">
              {isUpdatingProfile ? "Uploading your new look..." : "Click the camera icon to update photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-sm font-semibold text-base-content/70 flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Full Name
              </div>
              <div className="px-5 py-3.5 bg-base-100/50 backdrop-blur-sm rounded-xl border border-base-content/5 shadow-inner">
                <p className="font-medium">{authUser?.fullName}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-semibold text-base-content/70 flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email Address
              </div>
              <div className="px-5 py-3.5 bg-base-100/50 backdrop-blur-sm rounded-xl border border-base-content/5 shadow-inner">
                <p className="font-medium">{authUser?.email}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-base-100/40 backdrop-blur-sm rounded-2xl p-6 border border-base-content/5">
            <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-success" />
              Account Information
            </h2>
            <div className="space-y-4 text-sm font-medium text-base-content/80">
              <div className="flex items-center justify-between py-2 border-b border-base-content/10">
                <span>Member Since</span>
                <span className="text-base-content">{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-success bg-success/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
