<template>
    <v-container class="mt-0">
        <!-- بيانات الطالب -->
        <div class="visible">
            <svg
                style="
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 245px;
                "
                v-if="loading1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 200"
            >
                <radialGradient
                    id="a12"
                    cx=".66"
                    fx=".66"
                    cy=".3125"
                    fy=".3125"
                    gradientTransform="scale(1.5)"
                >
                    <stop offset="0" stop-color="#336699"></stop>
                    <stop
                        offset=".3"
                        stop-color="#336699"
                        stop-opacity=".9"
                    ></stop>
                    <stop
                        offset=".6"
                        stop-color="#336699"
                        stop-opacity=".6"
                    ></stop>
                    <stop
                        offset=".8"
                        stop-color="#336699"
                        stop-opacity=".3"
                    ></stop>
                    <stop
                        offset="1"
                        stop-color="#336699"
                        stop-opacity="0"
                    ></stop>
                </radialGradient>
                <circle
                    transform-origin="center"
                    fill="none"
                    stroke="url(#a12)"
                    stroke-width="15"
                    stroke-linecap="round"
                    stroke-dasharray="200 1000"
                    stroke-dashoffset="0"
                    cx="100"
                    cy="100"
                    r="70"
                >
                    <animateTransform
                        type="rotate"
                        attributeName="transform"
                        calcMode="spline"
                        dur="2"
                        values="360;0"
                        keyTimes="0;1"
                        keySplines="0 0 1 1"
                        repeatCount="indefinite"
                    ></animateTransform>
                </circle>
                <circle
                    transform-origin="center"
                    fill="none"
                    opacity=".2"
                    stroke="#336699"
                    stroke-width="15"
                    stroke-linecap="round"
                    cx="100"
                    cy="100"
                    r="70"
                ></circle>
            </svg>
        </div>
        <!-- Loading  تحميل -->
        <div class="right">
            <div>
                <v-breadcrumbs>
                    <v-breadcrumbs-item @click="$router.push('/profile')" link>
                        <font-awesome-icon
                            :icon="['fas', 'circle-arrow-right']"
                            style="font-size: 25px"
                        />
                    </v-breadcrumbs-item>
                    <v-breadcrumbs-item>
                        {{ student.student_name }}</v-breadcrumbs-item
                    >
                </v-breadcrumbs>
            </div>
        </div>
        <div class="feats">
            <div class="feat" @click="personal_data_Link()">
                <img
                    src="../assets/student/graduated.svg"
                    alt=""
                    width="30px"
                />
                <div>البيانات الشخصية</div>
            </div>
            <div class="feat">
                <img src="../assets/student/chat.png" alt="" width="30px" />
                <div>الدردشات</div>
            </div>
            <div class="feat" @click="Weekly_results_Link()">
                <img src="../assets/student/school.svg" alt="" width="30px" />
                <div>النتائج الأسبوعية</div>
            </div>
            <div class="feat" @click="Monthly_results_Link()">
                <img src="../assets/student/academic.svg" alt="" width="30px" />
                <div>النتائج الشهرية</div>
            </div>
            <div class="feat" @click="Academic_schedule_Link()">
                <img src="../assets/class/schedule.png" alt="" width="30px" />
                <div>الجدول الدراسي</div>
            </div>
                     <div class="feat" @click="Weekly_plans_Link()">
                <img src="../assets/class/plan.png" alt="" width="30px" />
                <div>الخطط الأسبوعية</div>
                     </div>
                     <div class="feat" @click="Educational_content_Link()">
               
                <img src="../assets/class/learning.png" alt="" width="30px" />
                <div>المحتوي التعليمي</div>
                     </div>

            <div class="feat" @click="Student_tests_Link()">
                <img src="../assets/class/exam.png" alt="" width="30px" />
                <div>الإختبارات الأونلاين (online)</div>
            </div>
            <div class="feat" @click="Student_Notifications_Link()">
                <img
                    src="../assets/class/notification.png"
                    alt=""
                    width="30px"
                />
                <div>الإشعارات</div>
            </div>
            <div class="feat" @click="Student_statistics_Link()">
                <img src="../assets/student/analysis.svg" alt="" width="30px" />
                <div>الإحصائيات</div>
            </div>
   
            <div class="feat" @click="Student_photos_Link()">
                <img src="../assets/class/picture.png" alt="" width="30px" />
                <div>الصور</div>
            </div>
            <div class="feat" @click="Student_expenses_Link()">
                <img src="../assets/student/money.svg" alt="" width="30px" />
                <div>المصروفات</div>
            </div>
        </div>
    </v-container>
</template>

<script>
import { db } from "@/Firebase.js";
import {
    doc,
    getDoc,
    getDocs,
    query,
    collection,
    updateDoc,
    where,
} from "firebase/firestore";
import Chart from "chart.js/auto";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Amiri_Regular from "@/assets/fonts/Amiri-Regular.js";
import { mapActions } from "pinia";
import { usenotification } from "../store/notification.js";

export default {
    data() {
        return {
            exams: [],
            studySchedules: [],
            educationalContent: [],
            photos: [],
            loading1: false,
            isAuthenticated: false,
            loading: true, // أضفناه لتفعيل عنصر التحميل
            CreateChart: null,
            value: 0,
            results: [],
            paymentMethod: null,
            dialogSuccess: false,
            transitionTimeline: false, // متغير للتحكم في الانتقال للـ timeline-item-content
            transitionProgress: false, // متغير للتحكم في الانتقال للبروجريس بار
            alertMessage: false,
            reachedProgress: false,
            currentActive: 0,
            // circles: [],
            totalAmount: null,
            paidAmount: 0,
            progress: 0,
            tab_5: null,
            tab_4: null,
            tab_1: 0,
            tab_2: null,
            tab_3: null,
            tab: "option-1", // تحديد التاب الافتراضي
            selectedGrade: null,
            gradeLevels: ["الصف الأول", "الصف الثاني", "الصف الثالث"],
            selectedMonth: "شهر أكتوبر",
            selectedPlan: null,
            selectPaid: ["شهر", "شهرين", "3 شهور", "4 شهور", "5 شهور"],
            amount: 0,
            selectedPaymentPlan: null,
            paymentPlans: ["شهر", "شهرين", "3 شهور", "4 شهور", "5 شهور"],
            steps: [
                "بدأ ",
                "الخطوة 1",
                "الخطوة 2",
                "الخطوة 3",
                "الخطوة 4",
                "الخطوة 5",
            ],

            // خاص بالبروحريس بار وتقسيم القسط

            student: {
                notifications: [],
                student_name: "",
                National_id: "",
                educational_level: "",
                class: "",
                section: "",
                gender: "",
                birthday: "",
                phone: "",
                tests: [],
                // Results: [], // بيانات النتائج ستكون هنا
                state: true, // إضافة حالة للتحكم في عرض الاختبارات
                name: "أحمد محمد",
                age: 12,
                BithOfDate: "2009-08-05",
                gradeLevel: "الصف الخامس",
                schoolYear: "2023-2024",
                photo: {
                    url1: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
                },
            },
        };
    },


    async created() {
        const documentId = this.$route.params.id; // استلام documentId من الـ route params
        this.loading = true; // بدء حالة التحميل

        try {
            // محاولة الحصول على بيانات الطالب
            const docSnap = await getDoc(doc(db, "students", documentId));
            if (docSnap.exists()) {
                const studentData = docSnap.data();
                this.student = studentData;
                studentData.documentId = documentId;


                this.isAuthenticated = true;
            } else {
                this.isAuthenticated = false;
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            this.isAuthenticated = false;
        } finally {
            this.loading = false; // إنهاء حالة التحميل
        }
    },


 
   
   methods: {
      Educational_content_Link() {
            const id = this.$route.params.id;
            if (id) {
                this.$router.push({
                    name: "Educational_content",
                    params: { id: id },
                });
            } else {
                console.warn("Invalid or undefined ID");
            }
        },
        Weekly_plans_Link() {
            const id = this.$route.params.id;
            if (id) {
                this.$router.push({
                    name: "Weekly_plans",
                    params: { id: id },
                });
            } else {
                console.warn("Invalid or undefined ID");
            }
        },
        Student_photos_Link() {
            const id = this.$route.params.id;
            if (id) {
                this.$router.push({
                    name: "Student_photos",
                    params: { id: id },
                });
            } else {
                console.warn("Invalid or undefined ID");
            }
        },
        Student_tests_Link() {
            const id = this.$route.params.id;
            if (id) {
                this.$router.push({
                    name: "Student_tests",
                    params: { id: id },
                });
            } else {
                console.warn("Invalid or undefined ID");
            }
        },
        Student_expenses_Link() {
            const id = this.$route.params.id;
            if (id) {
                this.$router.push({
                    name: "Student_expenses",
                    params: { id: id },
                });
            } else {
                console.warn("Invalid or undefined ID");
            }
        },
        Student_statistics_Link() {
            const id = this.$route.params.id;
            if (id) {
                this.$router.push({
                    name: "Student_statistics",
                    params: { id: id },
                });
            } else {
                console.warn("Invalid or undefined ID");
            }
        },
        Student_Notifications_Link() {
            const id = this.$route.params.id;
            if (id) {
                this.$router.push({
                    name: "Student_Notifications",
                    params: { id: id },
                });
            } else {
                console.warn("Invalid or undefined ID");
            }
        },
        Academic_schedule_Link() {
            const id = this.$route.params.id;
            if (id) {
                this.$router.push({
                    name: "Academic_schedule",
                    params: { id: id },
                });
            } else {
                console.warn("Invalid or undefined ID");
            }
        },
        Monthly_results_Link() {
            const id = this.$route.params.id;
            if (id) {
                this.$router.push({
                    name: "Monthly_results",
                    params: { id: id },
                });
            } else {
                console.warn("Invalid or undefined ID");
            }
        },
        Weekly_results_Link() {
            const id = this.$route.params.id;
            if (id) {
                this.$router.push({
                    name: "Weekly_results",
                    params: { id: id },
                });
            } else {
                console.warn("Invalid or undefined ID");
            }
        },
        personal_data_Link() {
            const id = this.$route.params.id;
            if (id) {
                this.$router.push({
                    name: "Personal_data",
                    params: { id: id },
                });
            } else {
                console.warn("Invalid or undefined ID");
            }
        },
  
    },
};
</script>

<style lang="scss" scoped>
.v-container {
    overflow: hidden;
}
.custom-font {
    font-family: "Cairo", sans-serif;
    font-size: 22px;
    font-weight: bold;
}
.custom-title {
    font-size: 20px;
    font-weight: 500;
    color: #333;
}
.v-card-title {
    padding: 16px;
    background-color: #f9f9f9;
    border-bottom: 1px solid #eee;
}
.v-card-text {
    padding: 16px;
}
.container {
    width: 100%;
    margin: auto;
}

.timeline-container {
    width: calc(100% - 110px) !important;
    margin: 20px !important;
}

.timeline {
    position: relative;
    margin-left: 20px;
}

.timeline-line {
    position: absolute;
    width: 2px;
    background-color: #ccc;
    left: 8px;
    top: 0;
    bottom: 0;
    margin: auto;
}
.progress_container {
    position: absolute;
    width: 5px;
    background-color: #eee;
    left: 8px;
    bottom: 0;
    margin: auto;
    height: calc(100% + 35px);
    top: 35px;
}

.timeline-item {
    position: relative;
    margin-bottom: 30px;
}

.timeline-item-content {
    position: relative;
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 10px;
    border-radius: 4px;
    position: relative;
    margin-left: 20px;
}
.timeline-item-content::before {
    content: "";
    position: absolute;
    bottom: -35px;
    left: -26.7px;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    /* border-radius: 50%; */
    transform: rotate(45deg);
    background-color: var(--main-color);
}
.timeline-item-content::after {
    content: "";
    position: absolute;
    top: 50%;
    right: -24px;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-right: 20px solid #d8588c;
}
.timeline-item-header {
    padding-bottom: 10px;
}

.timeline-item-body {
    font-size: 14px;
}

.month-name {
    font-weight: bold;
    color: var(--main-color);
}

.payment-section {
    margin-top: 20px;
}
.progress-label {
    font-size: 14px;
    font-weight: bold;
    position: absolute;
    right: 21px;
    width: 106px;
    background: var(--main-color);
    color: #fff;
    text-align: center;
    padding: 10px;
    border-radius: 5px;
}
.timeline-item-content {
    margin-left: 30px;
    transition: 0.5s;
    transition: margin-left 0.5s;
}
.success-message {
    color: #4caf50; /* لون أخضر لرسائل النجاح */
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 20px;
    transition: 0.5s;
}

.timeline-item-content.transition {
    margin-left: 60px; /* أو أي قيمة انتقال تفضلها */
}

.progress {
    transition: height 0.5s;
}

.progress.transition {
    height: 100%;
}
.custom-alert {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 120px;
    font-size: 20px;
    z-index: 9999;
    border-radius: 20px;
    transition: all 0.5s ease-in-out;
    /* text-align: center; */
}
.v-card-text {
    padding: 0;
    margin-top: 15px;
}
.v-window__container {
    .title {
        font-size: 22px;
        font-weight: bold;
        color: var(--main-color);
        position: relative;
        margin: 0 10px 30px;
        &::before {
            content: "";
            position: absolute;
            bottom: -15px;
            height: 4px;
            width: 100%;
            background: var(--secound-color);
        }
    }

    .box {
        box-shadow: 0 0 10px #ddd;
        padding: 10px;
        margin: 0 10px 10px;
        border-radius: 5px;
        & > div {
            width: 100%;
            background: var(--secound-color);
            padding: 10px;
            border-radius: 5px;
        }

        .feat {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin-top: 10px;
            .name {
                font-size: 19px;
                font-weight: bold;
                color: var(--therd-color);
            }
            .gender {
                color: var(--therd-color);
                font-weight: bold;
                font-size: 16px;
            }
            .educational_level {
                font-size: 17px;
                color: var(--main-color);
                font-weight: bold;
            }
            .Class {
                display: flex;
                align-items: center;
                gap: 5px;
                font-weight: bold;
                color: var(--pink-color);
                font-size: 16px;
            }
            .section {
                display: flex;
                align-items: center;
                gap: 5px;
                font-weight: bold;
                color: var(--pink-color);
                font-size: 16px;
            }
        }
    }
}
.weekly {
    .contain {
        display: flex;
        align-items: center;
        justify-content: space-between;
        row-gap: 20px;
        flex-wrap: wrap;
    }
    .feat {
        box-shadow: 0 0 10px #ddd;
        margin: 0 10px 10px;
        border-radius: 5px;
        padding: 10px;
        width: 48%;
        flex-grow: 1;
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            border-radius: 5px;
            position: relative;
            margin: 0 auto 30px;
            background: var(--secound-color);
            &::before {
                content: "";
                position: absolute;
                bottom: -20px;
                height: 5px;
                width: 100%;
                background: var(--secound-color);
                left: 50%;
                transform: translate(-50%, -50%);
            }
            & > div:first-child {
                display: flex;
                align-items: center;
                font-size: 21px;
                font-weight: bold;
                color: var(--main-color);
            }
        }
        .table {
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            width: 100%;

            & > div {
                display: flex;
                align-items: center;
                width: 100%;
                & > div {
                    display: flex;
                    align-items: center;
                    border: 1px solid var(--secound-color);
                    width: 50%;
                    justify-content: center;
                    padding: 10px;
                    font-size: 16px;
                    color: var(--therd-color);
                    font-weight: bold;
                    text-align: center;
                }
            }
        }
    }
}
.monthly {
    .header {
        display: flex;
        width: 100%;
        justify-content: space-between;
        flex-direction: column;

        & > div {
            width: auto;
            margin: 0 10px;
        }
        .download {
            height: 56px !important;
            color: var(--main-color);
            border-radius: 5px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            box-shadow: 0 0 10px #ddd;
            gap: 10px;
            font-weight: bold;
            text-align: center;
            img {
                width: 30px;
            }
        }
    }
    .Certificate {
        margin: 20px 10px;
        border: 2px outset var(--therd-color);
        padding: 20px;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        .head {
            justify-content: space-between;
            display: flex;
            align-items: center;
            position: relative;
            flex-direction: column;
            gap: 20px;
            & > div {
                width: 100%;
            }
            &::before {
                content: "";
                position: absolute;
                bottom: -20px;
                height: 5px;
                width: 100%;
                background: var(--secound-color);
                left: 50%;
                transform: translate(-50%, -50%);
            }
            .right {
                display: flex;
                flex-direction: column;
                gap: 10px;
                font-size: 18px;
                font-weight: bold;
                color: var(--therd-color);
            }
            .left {
                display: flex;
                flex-direction: column;
                align-items: center;
                color: var(--main-color);
                font-weight: bold;
                img {
                    border-bottom-left-radius: 50%;
                    border-bottom-right-radius: 50%;
                    height: 97px;
                }
            }
        }
        .body {
            overflow: auto;
        }
    }
}
.v-card--variant-elevated {
    box-shadow: none;
}
.v-slide-group__content {
    justify-content: center !important;
    justify-content: center;
}
.v-progress-circular {
    margin: 1rem;
}
.v-progress-circular {
    margin: 0 !important;
}
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 35px;
}
th,
td {
    border: 1px solid #000;
    padding: 8px;
    text-align: center;
    color: var(--therd-color);
    font-weight: bold;
}
th {
    background-color: var(--secound-color);
    color: var(--main-color);
}
.table {
    margin: 0 10px;

    .Row {
        width: 100%;
        display: flex;
        align-items: center;
        & > div {
            width: 50%;
            padding: 10px;
            border: 1px solid var(--secound-color);
            display: flex;
            align-items: center;
            text-align: center;
            justify-content: center;
            font-size: 16px;
            font-weight: bold;
            color: var(--therd-color);
        }
    }
}
.Title {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 20px;
    color: var(--main-color);
    font-weight: bold;
    background: var(--secound-color);
    padding: 10px;
    border-radius: 5px;
    margin: 20px 10px;
    &.invoice {
        margin: 20px 0;
    }
}
.v-row {
    margin: 10px;
    display: flex;
    gap: 10px;
    align-items: center;
    & > div {
        width: 48%;
    }
}
.details {
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: space-between;
    margin: 0 10px;
    .myChart {
        width: 100px;
    }
    ul {
        width: 100%;
        list-style: none;
        position: relative;
        &::before {
            content: "";
            position: absolute;
            right: -20px;
            left: 50%;
            width: 4px;
            height: 100%;
            background: var(--secound-color);
            transform: translateX(-50%);
        }
        li {
            position: relative;
            margin-right: 20px;
            display: flex;
            justify-content: space-between;
            margin-bottom: 7px;
            gap: 10px;
            & > div {
                font-weight: bold;
            }
            & > div:last-child {
                color: var(--therd-color);
                font-size: 12px;
                text-align: center;
                span {
                    font-size: 16px;
                }
            }
            span {
                font-weight: bold;
                color: var(--therd-color);
                font-size: 16px;
            }
            svg {
                position: absolute;
                width: 15px;
                height: 15px;
                right: -20px;
                top: 50%;
                transform: translateY(-50%);
                border-radius: 2px;
                color: var(--main-color);
            }

            &:not(.li)::before {
                content: "";
                position: absolute;
                width: 15px;
                height: 15px;
                right: -20px;
                top: 50%;
                transform: translateY(-50%);
                border-radius: 2px;
                background: var(--main-color);
            }

            &:last-of-type:not(.li) {
                &::before {
                    background: var(--pink-color);
                }
            }
        }
    }
}
.container_img {
    display: flex;
    flex-wrap: wrap;
    width: calc(100% - 20px);
    margin: 10px auto;
    gap: 10px;
    .img {
        width: 32%;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: 10px;
        background: var(--secound-color);
        border-radius: 5px;
        img {
            width: 100%;
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;
        }
        .date {
            padding: 10px;
            border-radius: 5px;
            color: var(--main-color);
            font-weight: bold;
        }
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
    margin: auto;
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
.card {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    font-size: 20px;
    color: var(--main-color);
    font-weight: bold;
    padding: 20px;
    text-align: center;
    width: 100%;
}
.feat {
    width: 100%;
    box-shadow: 0 0 10px #ddd;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    // max-width: 33%;
    & > div {
        width: 100%;

        position: relative;
    }
    .Top {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 250px;
        .v-img {
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;
        }
        svg {
            position: absolute;
            top: 8px;
            left: 8px;
            width: 15px;
            height: 15px;
            padding: 6px;
            border-radius: 50%;
            cursor: pointer;
            color: #fff;
            z-index: 100000000000;
            background: var(--main-color);
            &:first-child {
                left: 40px;
            }
        }
    }
    .Bottom {
        padding: 10px;
        .title {
            font-size: 20px;
            color: var(--main-color);
            font-weight: bold;
            margin: 5px 0;
        }
        .time {
            display: flex;
            align-items: center;
            gap: 5px;
            color: var(--therd-color);
            font-weight: bold;
            margin-bottom: 20px;
            position: relative;
            font-size: 14px;
            &::before {
                content: "";
                position: absolute;
                bottom: -10px;
                left: 0;
                width: 100%;
                height: 4px;
                background: var(--secound-color);
            }
        }
        .description {
            font-weight: bold;
            color: var(--therd-color);
        }
    }
    .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        margin-bottom: 15px;
        &::before {
            content: "";
            position: absolute;
            bottom: -15px;
            height: 3px;
            width: 100%;
            background: var(--secound-color);
        }
        & > div {
            display: flex;
            align-items: center;
            gap: 5px;
            .number {
                background: var(--main-color);
                color: #fff;
                border-radius: 5px;
                font-weight: bold;
                font-size: 18px;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .name {
                font-size: 20px;
                color: var(--main-color);
                font-weight: bold;
            }
            svg {
                color: var(--main-color);
                font-size: 20px;
                cursor: pointer;

                &:hover {
                    color: var(--therd-color);
                }
            }
        }
    }
    .body {
        & > div {
            font-weight: bold;
            font-size: 19px;
            color: var(--therd-color);
            margin: 20px 0 5px;
        }
        ul {
            color: var(--therd-color);
            font-weight: bold;
            font-size: 16px;
            li {
                list-style-type: square;
                list-style-position: inside;
            }
        }
    }
    .footer {
        .show_password {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            background: var(--main-color);
            width: 100%;
            padding: 10px;
            color: #fff;
            border-radius: 5px;
            cursor: pointer;
            &:hover {
                background-color: var(--therd-color);
            }
        }
    }
}
.v-card.v-theme--light.v-card--density-default.v-card--variant-elevated {
    .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 10px 0;
        font-size: 23px;
        color: var(--main-color);
        font-weight: bold;
        position: relative;
        margin-bottom: 20px;
        svg {
            cursor: pointer;
            padding: 10px;
        }
        &::before {
            content: "";
            position: absolute;
            bottom: -10px;
            left: 50%;
            height: 4px;
            width: 95%;
            background: var(--secound-color);
            transform: translateX(-50%);
        }
    }
    .body {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        color: var(--therd-color);
        background: var(--secound-color);
        margin: 0 10px 10px;
        border-radius: 5px;
        svg {
            color: var(--main-color);
            font-size: 18px;
            cursor: pointer;
        }
    }
}
.feat {
    width: 100%;
    box-shadow: 0 0 10px #ddd;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    // max-width: 33%;
    & > div {
        width: 100%;

        position: relative;
    }
    .Top {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 250px;
        .v-img {
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;
        }
        svg {
            position: absolute;
            top: 8px;
            left: 8px;
            width: 15px;
            height: 15px;
            padding: 6px;
            border-radius: 50%;
            cursor: pointer;
            color: #fff;
            z-index: 100000000000;
            background: var(--main-color);
            &:first-child {
                left: 40px;
            }
        }
    }
    .Bottom {
        padding: 10px;
        .title {
            font-size: 20px;
            color: var(--main-color);
            font-weight: bold;
            margin: 5px 0;
        }
        .time {
            display: flex;
            align-items: center;
            gap: 5px;
            color: var(--therd-color);
            font-weight: bold;
            margin-bottom: 20px;
            position: relative;
            font-size: 14px;
            &::before {
                content: "";
                position: absolute;
                bottom: -10px;
                left: 0;
                width: 100%;
                height: 4px;
                background: var(--secound-color);
            }
        }
        .description {
            font-weight: bold;
            color: var(--therd-color);
        }
    }
    .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        margin-bottom: 15px;
        &::before {
            content: "";
            position: absolute;
            bottom: -15px;
            height: 3px;
            width: 100%;
            background: var(--secound-color);
        }
        & > div {
            display: flex;
            align-items: center;
            gap: 5px;
            .number {
                background: var(--main-color);
                color: #fff;
                border-radius: 5px;
                font-weight: bold;
                font-size: 18px;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .name {
                font-size: 20px;
                color: var(--main-color);
                font-weight: bold;
            }
            svg {
                color: var(--main-color);
                font-size: 20px;
                cursor: pointer;

                &:hover {
                    color: var(--therd-color);
                }
            }
        }
    }
    .body {
        & > div {
            font-weight: bold;
            font-size: 19px;
            color: var(--therd-color);
            margin: 20px 0 5px;
        }
        ul {
            color: var(--therd-color);
            font-weight: bold;
            font-size: 16px;
            li {
                list-style-type: square;
                list-style-position: inside;
            }
        }
    }
    .footer {
        .show_password {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            background: var(--main-color);
            width: 100%;
            padding: 10px;
            color: #fff;
            border-radius: 5px;
            cursor: pointer;
            &:hover {
                background-color: var(--therd-color);
            }
        }
    }
}
.children {
    width: 100%;
    .title {
        width: 100%;
        background: var(--secound-color);
        padding: 10px;
        border-radius: 5px;
        color: var(--main-color);
        font-size: 22px;
        font-weight: bold;
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .body {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;
        margin-top: 20px;

        .box {
            box-shadow: 0 0 10px #ddd;
            display: flex;
            flex-direction: column;
            width: 100%;
            padding: 10px;
            border-radius: 5px;
            position: relative;
            gap: 5px;
            .head {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: var(--secound-color);
                padding: 10px;
                border-radius: 5px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                margin-top: 10px;
                img {
                    width: 35px;
                }
                .name {
                    font-size: 18px;
                    font-weight: bold;
                    color: var(--main-color);
                }
            }
            .grad {
                color: var(--therd-color);
                font-weight: bold;
                font-size: 15px;
                background: var(--secound-color);
                padding: 10px;
                border-radius: 5px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                margin-top: 10px;
            }
            .class {
                display: flex;
                align-items: center;
                gap: 5px;
                color: var(--pink-color);
                font-weight: bold;
                background: var(--secound-color);
                padding: 10px;
                border-radius: 5px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                margin-top: 10px;
            }
        }
    }
}
.Certificate .head .right {
    justify-content: space-around;
    align-items: flex-start;
}
.contain {
    width: 90%;
    overflow: auto;
    margin: 20px auto;
}

table.schedule_table {
    width: 100%;
    margin: 20px auto;
    border-collapse: collapse;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    th,
    td {
        border: 2px solid #ddd;
        padding: 12px;
        text-align: center;
        vertical-align: middle;
        min-height: 30px;
        min-width: 140px;

        &:first-child {
            background-color: var(--secound-color);
            color: var(--main-color);
            font-weight: bold;
        }

        &:not(:first-child) {
            background-color: white;
        }
    }

    th {
        background-color: #f2f2f2;
        font-weight: bold;
    }

    td {
        .subject {
            display: block;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .teacher {
            display: block;
            font-size: 14px;
            color: #777;
        }
    }

    hr {
        border: none;
        border-top: 1px solid #ddd;
        margin: 5px 0;
    }
    input {
        padding: 5px;
        border: none;
        background: none;
        text-align: center;
        font-size: 14px;
        border-radius: 5px;
        width: 100%;
    }
}
.feats {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    width: calc(100% - 20px);
    margin: 30px auto 30px;
    .feat {
        cursor: pointer;
        width: 32%;
        box-shadow: 0 0 10px #ddd;
        padding: 20px;
        border-radius: 5px;
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 10px;
        text-decoration: auto;
        transition: 0.3s;
        &:hover {
            background: #33669928;
        }
        img {
            width: 60px !important;
        }
        div {
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            color: var(--main-color);
        }
    }
}
@media (max-width: 599px) {
    .feats {
        .feat {
            width: 48%;
            img {
                width: 60px !important;
            }
            div {
                font-size: 14px;
            }
        }
    }
    .details_row {
        flex-direction: column;
        & > div {
            width: 100%;
        }
    }
    .container_img {
        flex-direction: column;
        .img {
            width: 100%;
            img {
                width: 100%;
            }
        }
    }
}
@media (min-width: 600px) and (max-width: 768px) {
}
@media (min-width: 769px) {
    .weekly {
        .contain {
            row-gap: 10px;
        }
    }
    .monthly {
        .header {
            width: 100%;
            flex-direction: row;
            gap: 10px;
            & > div {
                width: 48%;
            }
        }
        .Certificate {
            .head {
                flex-direction: row;
                & > div {
                    width: auto;
                }
            }
        }
    }
}
</style>
