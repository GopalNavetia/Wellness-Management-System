import NotificationMockData from '../mocks/GymNotificationMemberData';
import { useState, useEffect } from 'react';

function useGymNotifications() {
    const [gymNotifyData, setGymNotifyData] = useState([]);

    useEffect(() => {
        let today = new Date();

        let notifications = NotificationMockData.filter(member => {
            let endDate = new Date(member.membershipEndDate);
            let dueDate = member.paymentDueDate ? new Date(member.paymentDueDate) : null;

            return endDate < today || (dueDate && dueDate < today);
        }).map(member => {
            let endDate = new Date(member.membershipEndDate);
            let dueDate = member.paymentDueDate ? new Date(member.paymentDueDate) : null;

            if (endDate < today && dueDate) return { id: member.id, name: member.name, type: "expired+dueDate" };
            if (endDate < today && !dueDate) return { id: member.id, name: member.name, type: "expired" };
            if (endDate >= today && dueDate < today) return { id: member.id, name: member.name, type: "dueDate" };
        });
        setGymNotifyData(notifications);
    }, []);

    return gymNotifyData;
}

export default useGymNotifications;