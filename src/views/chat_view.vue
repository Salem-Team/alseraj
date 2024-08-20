<template>
    <div class="chat">
        <div class="recipient-input">
            <input
                :value="recipientId"
                @input="loadMessages"
                placeholder="أدخل معرف المستلم"
            />
        </div>
        <div
            class="messages"
            v-for="(message, index) in messages"
            :key="message.id"
        >
            <div v-if="shouldShowDate(index)" class="date-separator">
                {{ formatDay(message.timestamp) }}
            </div>
            <div
                @click="toggleDeleteButton(index)"
                :class="[
                    'message',
                    message.senderId === user.id ? 'sent' : 'received',
                ]"
            >
                <div class="content">{{ message.content }}</div>
                <div class="timestamp">
                    {{ formatTime(message.timestamp) }}
                </div>
                <button
                    v-if="
                        showDeleteButton === index &&
                        message.senderId === user.id
                    "
                    @click.stop="deleteMessage(message.id)"
                    class="delete-button"
                >
                    حذف
                </button>
            </div>
        </div>
        <div class="input">
            <input
                v-model="newMessage"
                @keyup.enter="sendMessage"
                placeholder="اكتب رسالة..."
                style="
                    font-weight: bold;
                    width: 100%;
                    padding: 10px;
                    outline: none;
                "
            />
            <button @click="sendMessage">إرسال</button>
        </div>
    </div>
</template>

<script>
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { db } from "../Firebase.js";

export default {
    data() {
        return {
            messages: [],
            newMessage: "",
            user: null,
            showDeleteButton: null,
            recipientId: this.$route.query.recipientId,
        };
    },
    watch: {
        $route(to) {
            this.recipientId = to.query.recipientId;
            console.log("Updated recipientId:", this.recipientId);
            this.loadMessages();
        },
    },
    async created() {
        this.user = JSON.parse(localStorage.getItem("user")) || null;
        console.log("User ID:", this.user?.id);
        await this.loadMessages(); // Load messages when component is created
    },
    methods: {
        toggleDeleteButton(index) {
            this.showDeleteButton =
                this.showDeleteButton === index ? null : index;
        },

        async loadMessages() {
            if (!this.recipientId) return;

            const messagesQuery = query(
                collection(db, "messages"),
                orderBy("timestamp")
            );

            onSnapshot(messagesQuery, (snapshot) => {
                console.log(
                    "Snapshot data:",
                    snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
                );
                this.messages = snapshot.docs
                    .map((doc) => ({ id: doc.id, ...doc.data() }))
                    .filter(
                        (message) =>
                            (message.senderId === this.user.id &&
                                message.recipientId === this.recipientId) ||
                            (message.recipientId === this.user.id &&
                                message.senderId === this.recipientId)
                    );
            });
        },

        async sendMessage() {
            if (
                !this.newMessage ||
                this.newMessage.trim() === "" ||
                !this.recipientId ||
                this.recipientId.trim() === ""
            ) {
                return;
            }

            try {
                await addDoc(collection(db, "messages"), {
                    senderId: this.user.id,
                    senderName: this.user.name,
                    content: this.newMessage,
                    timestamp: new Date(),
                    recipientId: this.recipientId,
                });
                this.newMessage = ""; // Clear the input field
            } catch (error) {
                console.error("Error sending message:", error);
            }
        },

        async deleteMessage(messageId) {
            try {
                await deleteDoc(doc(db, "messages", messageId));
                console.log("Message deleted successfully.");
            } catch (error) {
                console.error("Error deleting message:", error);
            }
        },

        shouldShowDate(index) {
            if (index === 0) return true;
            const prevTimestamp = this.messages[index - 1].timestamp;
            const currTimestamp = this.messages[index].timestamp;
            return (
                this.formatDay(prevTimestamp) !== this.formatDay(currTimestamp)
            );
        },

        formatDay(timestamp) {
            const date = timestamp.toDate ? timestamp.toDate() : timestamp;
            return date.toLocaleDateString("ar-EG", {
                weekday: "long",
                day: "numeric",
                month: "long",
            });
        },

        formatTime(timestamp) {
            const date = timestamp.toDate ? timestamp.toDate() : timestamp;
            return date.toLocaleString("ar-EG", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            });
        },
    },
};
</script>

<style scoped>
.chat {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #e5ddd5;
    margin-bottom: 61px;
    padding-bottom: 20px;
}

.recipient-input {
    padding: 10px;
    background-color: #f0f0f0;
    border-bottom: 1px solid #ccc;
}

.recipient-input input {
    width: 100%;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #ccc;
    outline: none;
    background-color: #fff;
    text-align: right;
}

.messages {
    padding: 2px;
    display: flex;
    flex-direction: column;
    background-color: #e5ddd5;
}

.message {
    flex: 1;
    display: flex;
    flex-direction: row;
    padding: 10px;
    max-width: 60%;
    border-radius: 10px;
    word-wrap: break-word;
    position: relative;
    align-items: end;
    justify-content: flex-end;
    gap: 10px;
    margin: 0 10px;
}

.sent {
    align-self: flex-end;
    background-color: #b1ceec8f;
    border-top-left-radius: 0;
}

.received {
    align-self: flex-start;
    background-color: #fff;
    border-top-right-radius: 0;
    flex-direction: row-reverse;
}

.content {
    font-size: 1em;
    margin-bottom: 5px;
}
.messages {
    overflow: hidden;
    white-space: normal;
}

.message .content {
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-all;
    white-space: normal;
    text-overflow: ellipsis;
    max-width: 95%;
}

.timestamp {
    width: auto;
    font-size: 0.8em;
    color: #555;
    text-align: left;
    white-space: nowrap;
}

.date-separator {
    text-align: center;
    margin: 20px auto;
    color: #888;
    font-size: 0.9em;
    background: #fff;
    width: fit-content;
    padding: 10px;
    border-radius: 5px;
}

.input {
    display: flex;
    padding: 10px;
    background-color: #f0f0f0;
    border-top: 1px solid #ccc;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    gap: 10px;
}

input[type="text"] {
    flex: 1;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #ccc;
    outline: none;
    text-align: right;
    width: 100%;
}

button {
    padding: 10px 20px;
    margin-left: 10px;
    background-color: var(--main-color);
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    outline: none;
}

.delete-button {
    background-color: #ff4d4d;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    margin-top: 5px;
    font-size: 0.8em;
    float: left;
}
</style>
