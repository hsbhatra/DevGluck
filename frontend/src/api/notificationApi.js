import axiosInstance from "./axiosInstance";

export const getNotifications = async () => {
  const res = await axiosInstance.get("/notifications");
  return res.data;
};
