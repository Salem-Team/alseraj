import { defineStore } from "pinia";
/*import { initializeApp } from "@firebase/app";

const firebaseConfig = {
    // Firebase configuration object
    apiKey: "AIzaSyBdk3sqIHjXvB2C-O-lvkRgMFpg8pemkno",
    authDomain: "alseraj--almoner.firebaseapp.com",
    projectId: "alseraj--almoner",
    storageBucket: "alseraj--almoner.appspot.com",
    messagingSenderId: "462211256149",
    appId: "1:462211256149:web:a03ace3c70b306620169dc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import { getMessaging, getToken } from "firebase/messaging";
const messaging = getMessaging(app);*/
// Define Pinia store for managing photo gallery
export const usenotification = defineStore("notification_vue", {
    state: () => ({
        notification: "",
    }),
    actions: {
        /*async setToken() {
            try {
                const token = await getToken(messaging);
                console.log("FCM Token:", token);
                return token;
            } catch (error) {
                console.error("Error getting FCM token:", error);
                throw error;
            }
        },
         async send_Notification() {
            try {
                const token = await this.setToken();
                const notification = {
                    title: "Hello from Firebase!",
                    body: "This is a Firebase Cloud Messaging (FCM) notification message!",
                };

                await fetch("https://fcm.googleapis.com/fcm/send", {
                    method: "POST",
                    headers: {
                        Authorization: `key=${firebaseConfig.apiKey}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        to: token,
                        notification: notification,
                    }),
                });

                console.log("Notification sent successfully!");
            } catch (error) {
                console.error("Error sending notification:", error);
                throw error;
            }
        },
        */
        async send_Notification(title, text) {
            try {
                // Check if the browser supports notifications and permission is not denied
                if (
                    window.Notification &&
                    Notification.permission !== "denied"
                ) {
                    const permission = await Notification.requestPermission();
                    if (permission === "granted") {
                        // Notification permission is granted, create a notification
                        this.notification = new Notification(title, {
                            body: text,
                            icon: "/path/to/icon.png", // Optional icon path
                        });

                        // Handle click event on the notification (optional)
                        this.notification.onclick = function () {
                            // Handle what happens when the user clicks on the notification
                            console.log("Notification clicked");
                            // You can redirect to a specific page, etc.
                        };

                        console.log("Notification sent successfully!");
                    } else {
                        // Notification permission denied by user
                        alert("Notification permission denied");
                    }
                } else {
                    // Browser does not support notifications or permission is denied
                    alert("Notifications not supported or permission denied");
                }
            } catch (error) {
                console.error("Error sending notification:", error);
                throw error;
            }
        },
    },
});