import { useState } from "react";
import { Link } from "react-router-dom";
import { FiFacebook, FiTwitter, FiYoutube } from "react-icons/fi";
import { FaInstagram, FaMastodon, FaTiktok, FaVimeoV } from "react-icons/fa";
import { putUserUpdate } from "../../service/user";


export default function EditProfilePage() {
  const [accent, setAccent] = useState("blue");
  const [formData,setFormData]=useState({
    email: "user2@example.com",
    display_name: "",
    avatar_url: "",
    theme: "light",
  });

  const handleChange=(e)=>{
    setFormData({
      ...formData,[e.target.name]:e.target.value,
    });
  }

  const handleSubmit=async()=>{
    // try{
    //   const token=localStorage.getItem("token");
    //   const res =await fetch("http://localhost:5000/api/user/update_user",{
    //     method:"PUT",
    //     headers:{
    //       "Content-Type":"application/json",
    //        Authorization:`Beare ${token}`,
    //     },
    //     body:JSON.stringify({
    //       email:formData.email,
    //       display_name:formData.display_name,
    //       avatar_url:formData.avatar_url,
    //       theme:formData.theme,
    //     }),
    //   });

    //   const data=await res.json();
    //     if (res.ok) {
    //       alert("Cập nhật thành công!");
    //     } else {
    //       alert("Lỗi: " + data.message);
    //     }
    try{
      const data =  await putUserUpdate(formData);
      alert("Cập nhật thành công!");
    }
    catch(err){
      console.error(err);
      alert("Có lỗi xảy ra khi cập nhật!");
    }
  }


  return (
    <div className="flex min-h-screen bg-gray-100">
     
      <aside className="w-60 bg-white shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">Settings</h2>
        <nav className="flex flex-col space-y-2">
          <Link to="/settings/edit-profile" className="px-3 py-2 rounded-md bg-gray-200 font-medium">
            Edit Profile
          </Link>
          <Link to="/settings/account" className="px-3 py-2 hover:bg-gray-100 rounded-md">Account Settings</Link>
          <Link to="/settings/streaming" className="px-3 py-2 hover:bg-gray-100 rounded-md">Streaming Services</Link>
          <Link to="/settings/notifications" className="px-3 py-2 hover:bg-gray-100 rounded-md">Notification Settings</Link>
          <Link to="/settings/blocked" className="px-3 py-2 hover:bg-gray-100 rounded-md">Blocked Users</Link>
          <Link to="/settings/import" className="px-3 py-2 hover:bg-gray-100 rounded-md">Import List</Link>
          <Link to="/settings/sharing" className="px-3 py-2 hover:bg-gray-100 rounded-md">Sharing Settings</Link>
          <Link to="/settings/sessions" className="px-3 py-2 hover:bg-gray-100 rounded-md">Sessions</Link>
          <Link to="/settings/api" className="px-3 py-2 hover:bg-gray-100 rounded-md">API</Link>
          <Link to="/settings/delete" className="px-3 py-2 hover:bg-gray-100 rounded-md text-red-500">Delete Account</Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-white shadow-md m-6 rounded-md">
        <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6">
          <button className="px-4 py-2 bg-gray-200 rounded-md">Change Password</button>
          <button className="px-4 py-2 bg-gray-200 rounded-md">Change Email</button>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 mt-1"
          />
        </div>

        {/* Avatar & Background */}
        <div className="mb-4">
          <p className="text-sm font-medium">Current Avatar</p>
          <p className="text-gray-500 text-sm">No avatar found. <span className="text-cyan-600 cursor-pointer">Upload Your Own?</span> · <span className="text-cyan-600 cursor-pointer">Use Gravatar?</span></p>
        </div>
        <div className="mb-4">
          <p className="text-sm font-medium">Background Image</p>
          <p className="text-cyan-600 text-sm cursor-pointer">Set a background image?</p>
        </div>

        {/* Accent Color */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-2">Accent Color</p>
          <div className="flex space-x-3">
            {["blue","sky","teal","green","purple","gray","orange","yellow","red","pink"].map(color => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full border-2 ${accent===color ? "border-black" : "border-transparent"}`}
                style={{ backgroundColor: color }}
                onClick={() => setAccent(color)}
              />
            ))}
          </div>
        </div>

        {/* Gender & Name */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">Gender</label>
            <select className="w-full border rounded-md px-3 py-2 mt-1">
              <option>-</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input type="text" 
              name="display_name"
              value={formData.display_name}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 mt-1" />
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea className="w-full border rounded-md px-3 py-2 mt-1" rows="3"></textarea>
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium"><FiFacebook /> <span>Facebook</span></label>
            <input type="text" className="w-full border rounded-md px-3 py-2 mt-1" />
          </div>
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium"><FaInstagram /> <span>Instagram</span></label>
            <input type="text" className="w-full border rounded-md px-3 py-2 mt-1" />
          </div>
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium"><FaMastodon /> <span>Mastodon</span></label>
            <input type="text" className="w-full border rounded-md px-3 py-2 mt-1" />
          </div>
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium"><FiTwitter /> <span>Twitter</span></label>
            <input type="text" className="w-full border rounded-md px-3 py-2 mt-1" />
          </div>
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium"><FaTiktok /> <span>TikTok</span></label>
            <input type="text" className="w-full border rounded-md px-3 py-2 mt-1" />
          </div>
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium"><FaVimeoV /> <span>Vimeo</span></label>
            <input type="text" className="w-full border rounded-md px-3 py-2 mt-1" />
          </div>
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium"><FiYoutube /> <span>YouTube</span></label>
            <input type="text" className="w-full border rounded-md px-3 py-2 mt-1" />
          </div>
        </div>

        {/* Save button */}
        <button onClick={handleSubmit} className="px-6 py-2 bg-cyan-600 text-white rounded-md">Save</button>
      </main>
    </div>
  );
}
