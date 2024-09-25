// src/notifications/PushNotifications.js
import { messaging } from '../firebase';

const requestNotificationPermission = async () => {
    try {
        await messaging.requestPermission();
        const token = await messaging.getToken();
        console.log('Notification token:', token);
        // Send token to backend to store for push notifications
    } catch (error) {
        console.error('Error getting notification permission:', error);
    }
};

export default requestNotificationPermission;
