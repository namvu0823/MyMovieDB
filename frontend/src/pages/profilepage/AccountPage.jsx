import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        fetch("http://localhost:5000/api/user/account", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                if (!res.ok) throw new Error("Unauthorized");
                return res.json();
            })
            .then(data => {
                setUser(data);
                setLoading(false);
            })
            .catch(() => {
                localStorage.removeItem("token"); // xóa token hỏng
                navigate("/login");
            });
    }, [navigate]);

    if (loading) return <p>Loading...</p>;
    if (!user) return null;

    return (
        <div className="w-full min-h-screen bg-white">
            
            <div className="bg-gradient-to-r from-teal-800 to-teal-900 text-white">
                <div className="max-w-6xl mx-auto px-6 py-10 flex items-center">
                
                    <div className="w-20 h-20 rounded-full bg-teal-500 flex items-center justify-center text-3xl font-bold">
                        {user.display_name?.[0]?.toUpperCase() ||
                        user.email?.[0]?.toUpperCase()}
                    </div>

               
                    <div className="ml-6">
                        <h1 className="text-2xl font-semibold">
                            {user.display_name || "No name"}
                        </h1>
                        <p className="text-sm opacity-80">Thành viên kể từ{" "}
                        {user.created_at
                            ? new Date(user.created_at).toLocaleString("vi-VN", {
                                month: "long",
                                year: "numeric",
                            })
                            : "Unknown"}
                        </p>
                    </div>

               
                    <div className="ml-auto flex space-x-10">
                        <div className="text-center">
                            <p className="text-2xl font-bold">0%</p>
                            <p className="text-sm opacity-80">Trung bình Điểm phim</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold">0%</p>
                            <p className="text-sm opacity-80">Trung bình Điểm TV</p>
                        </div>
                    </div>
                </div>
            </div>

        
            <div className="border-b bg-white shadow-sm">
                <div className="max-w-6xl mx-auto px-6 flex space-x-6 py-2 text-sm font-medium">
                    <button className="hover:text-teal-600">Overview</button>
                    <button className="hover:text-teal-600">Thảo luận</button>
                    <button className="hover:text-teal-600">Danh sách</button>
                    <button className="hover:text-teal-600">Xếp hạng</button>
                    <button className="hover:text-teal-600">Danh sách theo dõi</button>
                </div>
            </div>

            
            <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
                
                <div className="grid grid-cols-4 gap-6">
                    <div className="text-center">
                        <p className="text-3xl font-bold text-teal-600">0</p>
                        <p>Total Edits</p>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl font-bold text-teal-600">0</p>
                        <p>Total Ratings</p>
                    </div>
                    <div className="col-span-2 text-center">
                        <p className="font-medium">Đánh giá tổng quan</p>
                        <div className="w-full h-20 flex items-center justify-center border mt-2 text-gray-400 text-sm">(Biểu đồ)</div>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-semibold">Upcoming From Watchlist</h2>
                    <p className="text-gray-600 text-sm">
                        There are no upcoming movies on your watchlist.
                    </p>
                </div>

                
                <div>
                    <h2 className="text-lg font-semibold">Recent Discussions</h2>
                    <div className="border rounded-lg p-3 text-gray-500 text-sm">
                        Bạn không xem bất kỳ cuộc thảo luận nào.
                    </div>
                </div>

                
                <div>
                    <h2 className="text-lg font-semibold">Hoạt động gần đây</h2>
                    <p className="text-gray-600 text-sm">
                        Bạn chưa thực hiện bất kỳ chỉnh sửa nào gần đây.
                    </p>
                </div>
            </div>
        </div>
    );
}
