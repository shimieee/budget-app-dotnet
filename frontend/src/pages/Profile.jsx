import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { fetchCurrentUser, updateCurrentUser } from "../api/users";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      setError("");
      try {
        const user = await fetchCurrentUser();
        setProfile({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          bio: "Budgeting enthusiast. Love to keep my finances in check!",
        });
      } catch (err) {
        setError("Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleEdit = async () => {
    if (isEditing) {
      // Save changes
      setError("");
      setSuccess("");
      try {
        const { firstName, lastName, email } = profile;
        const FullName = `${firstName} ${lastName}`.trim();
        await updateCurrentUser({ FullName, Email: email });
        setSuccess("Profile updated successfully!");
        setIsEditing(false);
      } catch (err) {
        setError("Failed to update profile");
      }
    } else {
      setIsEditing(true);
    }
  };

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-[#F4EBD0] pb-10">
        <Sidebar />
        <main className="flex-1 flex flex-col items-center p-10 pt-10 lg:pt-10 h-[calc(100vh-2rem)]">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full h-full border border-[#d9cbb2] flex flex-col">
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <img
                  className="w-28 h-28 rounded-full object-cover border-4 border-[#b7d3a8]"
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                  alt="Profile"
                />
                <button
                  className="absolute bottom-0 right-0 p-2 bg-[#b7d3a8] rounded-full hover:bg-[#a07a4a] transition-colors"
                  title="Change photo"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#425951]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-[#425951]">{profile.firstName} {profile.lastName}</h2>
              <p className="text-[#b88b5a]">{profile.email}</p>
            </div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-bold text-[#425951]">Profile Information</h1>
              <button
                onClick={handleEdit}
                className="px-4 py-2 text-sm font-medium text-white bg-[#b88b5a] hover:bg-[#a07a4a] rounded-lg transition-colors"
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>
            {loading ? (
              <div className="text-[#667538]">Loading...</div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#667538] mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      className="w-full px-4 py-2 bg-[#f9f5ed] border border-[#b7d3a8] rounded-lg text-[#425951] focus:outline-none focus:border-[#b88b5a]"
                      value={profile.firstName}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#667538] mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      className="w-full px-4 py-2 bg-[#f9f5ed] border border-[#b7d3a8] rounded-lg text-[#425951] focus:outline-none focus:border-[#b88b5a]"
                      value={profile.lastName}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#667538] mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-2 bg-[#f9f5ed] border border-[#b7d3a8] rounded-lg text-[#425951] focus:outline-none focus:border-[#b88b5a]"
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#667538] mb-2">Bio</label>
                  <textarea
                    name="bio"
                    className="w-full px-4 py-2 bg-[#f9f5ed] border border-[#b7d3a8] rounded-lg text-[#425951] focus:outline-none focus:border-[#b88b5a]"
                    rows="3"
                    value={profile.bio}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                {error && <div className="text-red-600">{error}</div>}
                {success && <div className="text-green-600">{success}</div>}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Profile;
