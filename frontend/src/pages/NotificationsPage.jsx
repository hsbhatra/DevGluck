import React, { useEffect, useState } from "react";
import { getNotifications } from "../api/notificationApi";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch notifications on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNotifications();
        setNotifications(data || []);
      } catch (error) {
        console.error("Error fetching notifications:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-4 py-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-800">Notifications</h1>
      </div>

      {/* Body */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : notifications.length === 0 ? (
          <div className="text-center text-gray-500">No notifications found.</div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className="flex items-start gap-4 bg-white rounded-md p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={notification.sender?.profileImage || "/default-avatar.png"}
                  alt="avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-800">
                    <span className="font-semibold">{notification.sender?.username}</span>{" "}
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
