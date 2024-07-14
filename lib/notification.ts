import { message } from "./types";

export function notification() {
    const notificationBubble = document.getElementById("notification-bubble");
    notificationBubble.addEventListener("click", toggleNotificationBox);

    const socket = new WebSocket("ws://localhost:8080/notifications");

    socket.onmessage = (event) => {        
        const docCreated: message = JSON.parse(event.data);
        localStorage.setItem("notifications", JSON.stringify(docCreated));
        addNotification(docCreated.DocumentTitle, docCreated.UserName, docCreated.Timestamp);
    };
}

function toggleNotificationBox() {
    const notificationBox = document.getElementById("notification-box");
    notificationBox.classList.toggle("hidden");
    notificationBox.classList.toggle("flex");

    // Reset notification count to 0
    const notificationCount = document.getElementById("notification-count");
    notificationCount.textContent = "0";

}

function addNotification(title: string, user: string, timestamp: Date) {
    const createdAt = new Date(timestamp);
    
    const notifications = localStorage.getItem("notifications") || "[]";
    const notificationsArray = JSON.parse(notifications);
    if (notificationsArray.length === 0) {
        toggleNotificationBox();
    }

    const notificationBox = document.getElementById("notification-box");
    
    // Only update the notification count if the notification box is hidden
    if (notificationBox.classList.contains("hidden")) {
        const notificationCount = document.getElementById("notification-count");
        const currentCount = parseInt(notificationCount.textContent);
        
        // Limit the number of notifications to 20 to prevent overflow
        if (currentCount >= 20) {
            notificationCount.textContent = "+20";
        } else if (currentCount < 20) {
            notificationCount.textContent = `${currentCount + 1}`;
        }
    }
    
    notificationBox.innerHTML += `
        <div class="border-b p-1">
		    <p class="text-sm text-stone-700">${title}</p>
            <p class="text-sm text-stone-500">${user} - ${createdAt.getFullYear()}</p>
		</div>
    `;
}