import { useState, useEffect } from "react";
import axiosInstance from "./AxiosInstance";
import NotificationMockData from "../mocks/GymNotificationMemberData";

function useGymNotifications() {
  const [gymNotifyData, setGymNotifyData] = useState([]);
  const [fetchData, setFetchData] = useState([]);

  // 1. Load data from backend
  useEffect(() => {
    async function loadData() {
      try {
        const result = await axiosInstance.get("/MyProject/NotificationAPI", {
          headers: { "ngrok-skip-browser-warning": "true" },
        });
        setFetchData(result.data || []);
      } catch (error) {
        console.error("Notification API error:", error);
        setFetchData([]);
      }
    }

    loadData();
  }, []);

  // 2. Derive notifications whenever fetchData changes
  useEffect(() => {
    const today = new Date();

    const notifications = fetchData
      .filter((member) => {
        const endDate = member.membershipEndDate
          ? new Date(member.membershipEndDate)
          : null;
        const dueDate = member.paymentDueDate
          ? new Date(member.paymentDueDate)
          : null;

        return (endDate && endDate < today) || (dueDate && dueDate < today);
      })
      .map((member) => {
        const endDate = member.membershipEndDate
          ? new Date(member.membershipEndDate)
          : null;
        const dueDate = member.paymentDueDate
          ? new Date(member.paymentDueDate)
          : null;

        if (endDate && endDate < today && dueDate)
          return { id: member.id, name: member.name, type: "expired+dueDate" };
        if (endDate && endDate < today && !dueDate)
          return { id: member.id, name: member.name, type: "expired" };
        if (dueDate && dueDate < today)
          return { id: member.id, name: member.name, type: "dueDate" };

        return null;
      })
      .filter(Boolean);

    setGymNotifyData(notifications);
  }, [fetchData]); // IMPORTANT: depend on fetchData

  return gymNotifyData;
}

export default useGymNotifications;
