<template>
    <v-container class="mt-0">
        <div class="visible">
            <div class="right">
                <div>
                    <v-breadcrumbs>
                        <v-breadcrumbs-item @click="goToChildDetails" link>
                            <font-awesome-icon
                                :icon="['fas', 'circle-arrow-right']"
                                style="font-size: 25px"
                            />
                        </v-breadcrumbs-item>
                        <v-breadcrumbs-item>الإشعارات</v-breadcrumbs-item>
                    </v-breadcrumbs>
                </div>
            </div>
            <div class="notifications-list">
                <div
                    v-for="(notification, index) in notifications"
                    :key="index"
                    :class="`notification-item ${getNotificationColor(
                        notification.NotificationType
                    )}`"
                >
                    <div>
                        <font-awesome-icon
                            :icon="
                                getNotificationIcon(
                                    notification.NotificationType
                                )
                            "
                        />
                        <div class="notification-title">
                            {{ notification.NoticeTitle }}
                        </div>
                    </div>
                    <div class="notification-description">
                        {{ notification.theDescription }}
                    </div>
                </div>
                <div v-if="!notifications.length" class="notification-item">
                    <div class="notification-alert info">
                        لا توجد إشعارات حالياً.
                    </div>
                </div>
            </div>
        </div>
    </v-container>
</template>

<script>
import { db } from "@/Firebase.js";
import { doc, getDoc } from "firebase/firestore";

export default {
    data() {
        return {
            notifications: [],
        };
    },
    async created() {
                this.$nextTick(() => {
            window.scrollTo(0, 0);
            console.log("Scrolled to top");
        });
        const documentId = this.$route.params.id;
        try {
            const docSnap = await getDoc(doc(db, "students", documentId));
            if (docSnap.exists()) {
                const studentData = docSnap.data();
                this.notifications = studentData.Notifications || [];
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    },
    methods: {
        goToChildDetails() {
            this.$router.push({
                name: "ChildDetails",
                params: { id: this.$route.params.id },
            });
        },
        getNotificationColor(type) {
            switch (type) {
                case "سئ":
                    return "bad";
                case "جيد":
                    return "good";
                case "معلومات":
                    return "info";
                default:
                    return "default";
            }
        },
        getNotificationIcon(type) {
            switch (type) {
                case "سئ":
                    return ["fas", "times-circle"];
                case "جيد":
                    return ["fas", "check-circle"];
                case "معلومات":
                    return ["fas", "info-circle"];
                default:
                    return ["fas", "bell"];
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.visible {
    opacity: 0;
    animation: fadeIn 1.5s ease-in-out forwards;
    margin-top: 20px;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
.right {
    width: calc(100% - 20px);
    font-weight: bold;
    font-size: 20px;
    border-bottom: 5px solid var(--secound-color);
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto 30px;
    .v-breadcrumbs-item:first-child {
        color: var(--main-color);
        cursor: pointer;
        font-size: 24px;
        display: flex;
        align-items: center;
        gap: 5px;
    }
    .v-breadcrumbs {
        padding: 16px 0;
    }
}
.left {
    display: flex;
    align-items: center;
    gap: 15px;
}
.v-container {
    margin: 20px auto !important;
    flex-wrap: wrap;
    padding: 0;
    justify-content: flex-start !important;
    flex-direction: column;
    gap: 40px;
}

.breadcrumbs {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
}

.breadcrumb-item {
    margin-right: 10px;
    cursor: pointer;
    font-size: 24px;
    display: flex;
    align-items: center;
}

.notifications-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}

.notifications-list {
    list-style-type: none;
    padding: 0;
    width: calc(100% - 20px);
    margin: 0 auto;
}

.notification-item {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border-radius: 5px;
    flex-direction: column;
    align-items: flex-start;
    background: var(--secound-color);
    color: var(--therd-color);
    font-weight: bold;
    > div {
        display: flex;
        gap: 10px;
        align-items: center;
    }
}

.notification-item.bad svg,
.notification-item.bad .notification-title {
    color: var(--pink-color);
}

.notification-item.good svg,
.notification-item.good .notification-title {
    color: green;
}

.notification-item.info svg,
.notification-item.info .notification-title {
    color: var(--main-color);
}

.notification-title {
    font-weight: bold;
    font-size: 18px;
}

.notification-description {
    font-size: 16px;
}
</style>
