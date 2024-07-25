<template>
    <div class="container">
        <v-card flat class="mx-auto my-4" max-width="90%">
            <v-card-title class="text-h4 custom-font" style="color: #2980b9">
                الطالب
            </v-card-title>
            <!-- العنصر الذي سيتم التحكم في ظهوره -->
            <v-card v-if="showElement">
                <v-card-text>
                    هذا العنصر يمكن إظهاره أو إخفاؤه بناءً على حالة الـ admin.
                </v-card-text>
            </v-card>
        </v-card>
    </div>
</template>

<script>
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { firebaseConfig } from "../Firebase"; // تأكد من تعديل المسار حسب موقع ملف Firebase.js

const db = getFirestore(firebaseConfig);

export default {
    data() {
        return {
            showElement: false,
        };
    },
    async created() {
        const studentId = this.$route.params.id; // جلب الـ ID من الـ route params أو استبدله بالقيمة المناسبة
        const studentDocRef = doc(db, "students", studentId);
        const studentDoc = await getDoc(studentDocRef);

        if (studentDoc.exists()) {
            this.showElement = studentDoc.data().state === true;
        }
    },
};
</script>

<style scoped></style>
