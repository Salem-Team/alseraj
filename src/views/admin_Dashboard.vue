<template>
    <v-card>
        <div class="d-flex justify-space-between" v-if="user">
            <h5 class="text-right ma-4">أهلا {{ user.name }}</h5>
            <div>
                <v-btn class="ma-2" size="small" @click="Edit()">
                    تعديل البيانات
                </v-btn>
                <v-btn class="ma-2" size="small" @click="My_Logout()">
                    تسجيل خروج
                </v-btn>
            </div>
        </div>

        <v-toolbar color="primary" title="بياناتك"></v-toolbar>

        <div class="d-flex flex-row">
            <v-tabs v-model="tab" color="primary" direction="vertical">
                <v-tab prepend-icon="mdi-account" value="first-tab">
                    تعديل بياناتك
                </v-tab>
                <v-tab prepend-icon="mdi-lock" value="second-tab">
                    نتائج
                </v-tab>
                <v-tab prepend-icon="mdi-access-point" value="third-tab">
                    إحصائيات
                </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
                <v-tab-item value="first-tab">
                    <v-card flat>
                        <v-card-text>
                            <!-- زر لتغيير حالة جميع الطلاب -->
                            <v-switch
                                v-model="showTests"
                                label="عرض الاختبارات"
                                @change="updateVisibilitySetting"
                            ></v-switch>
                        </v-card-text>
                    </v-card>
                </v-tab-item>

                <v-tab-item value="second-tab">
                    <v-card flat>
                        <v-card-text></v-card-text>
                    </v-card>
                </v-tab-item>

                <v-tab-item value="third-tab">
                    <v-card flat>
                        <v-card-text> </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </div>
    </v-card>
</template>

<script>
import { mapState } from "pinia";
import { useAuthStore } from "../store/userStore";
import { db } from "@/Firebase.js";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import { mapActions } from "pinia";
import { usenotification } from "../store/notification.js";
export default {
    data: () => ({
        tab: "first-tab",
        showTests: false,
        // studentId: "حدد_معرف_الطالب_هنا", // قم بتحديد معرف الطالب الذي تريد تعديل حالته
    }),
    async created() {
        // تحميل الإعدادات الحالية من قاعدة البيانات
        const visibilitySnap = await getDoc(
            doc(db, "admin_settings", "visibility")
        );
        if (visibilitySnap.exists()) {
            const settings = visibilitySnap.data();
            this.showTests = settings.tests || false;
        }
    },
    mounted() {
        this.get_notifications("public_notification");
        this.get_notifications("Class_Notification");
    },
    computed: {
        ...mapState(useAuthStore, ["user"]),
    },
    methods: {
        ...mapActions(usenotification, ["get_notifications"]),
        async updateVisibilitySetting() {
            try {
                // جلب جميع وثائق الطلاب
                const querySnapshot = await getDocs(collection(db, "students"));

                // تحديث حالة `state` لكل وثيقة طالب
                const promises = querySnapshot.docs.map((doc) => {
                    return updateDoc(doc.ref, {
                        state: this.showTests,
                    });
                });

                // انتظار جميع التحديثات
                await Promise.all(promises);

                console.log("تم تحديث حالة عرض الاختبارات لجميع الطلاب");
            } catch (error) {
                console.error(
                    "Error updating visibility settings for all students:",
                    error
                );
            }
        },
    },
};
</script>

<style scoped>
.v-card {
    margin: 20px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
