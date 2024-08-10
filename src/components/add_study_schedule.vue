<template>
    <v-dialog v-model="showDialog" max-width="90%">
        <div class="schedule">
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
            <div class="right">
                <div>
                    <v-breadcrumbs>
                        <v-breadcrumbs-item @click="closeDialog()" link>
                            <div>الإعدادت</div>
                            <font-awesome-icon :icon="['fas', 'gear']" />
                        </v-breadcrumbs-item>
                        <v-breadcrumbs-divider />
                        <v-breadcrumbs-item
                            >الجداول الدراسية</v-breadcrumbs-item
                        >
                    </v-breadcrumbs>
                </div>
                <div class="left">
                    <font-awesome-icon
                        :icon="['fas', 'xmark']"
                        @click="closeDialog()"
                        style="font-size: 25px"
                    />
                </div>
            </div>
            <div class="add">
                <div>({{ schedules.length }}) جداول دراسية</div>
                <div>
                    <font-awesome-icon
                        :icon="['fas', 'plus']"
                        @click="main_bubble = true"
                    />
                </div>
            </div>

            <div class="boxes">
                <v-col
                    cols="6"
                    v-for="(schedule, index) in schedules"
                    :key="index"
                    class="box"
                >
                    <div class="title">
                        {{ schedule.class }} - {{ schedule.section }}
                    </div>
                    <div class="time">
                        <font-awesome-icon :icon="['fas', 'clock']" />
                        <div>
                            {{
                                new Date(
                                    schedule.lastModified.seconds * 1000
                                ).toLocaleDateString()
                            }}
                        </div>
                    </div>
                    <div class="Footer">
                        <div class="show" @click="showDetails(schedule)">
                            عرض
                        </div>
                        <div
                            class="delete"
                            @click="deleteSchedule(schedule.id)"
                        >
                            حذف
                        </div>
                    </div>
                </v-col>
            </div>

            <v-dialog v-model="main_bubble" max-width="90%">
                <div class="schedule">
                    <div class="right">
                        <div>
                            <v-breadcrumbs>
                                <v-breadcrumbs-item
                                    >إضافة جدول دراسي</v-breadcrumbs-item
                                >
                            </v-breadcrumbs>
                        </div>
                        <div class="left">
                            <font-awesome-icon
                                :icon="['fas', 'xmark']"
                                @click="main_bubble = false"
                                style="font-size: 25px"
                            />
                        </div>
                    </div>
                    <div
                        style="
                            width: 90%;
                            margin: 10px auto;
                            color: var(--main-color);
                            font-weight: bold;
                            background: #f5f5f5;
                            padding: 10px;
                            border-radius: 5px;
                        "
                    >
                        جدول ({{ selectedClass }}) - {{ selectedSection }}
                    </div>
                    <div style="width: 90%; margin: 0 auto">
                        <v-select
                            v-model="selectedClass"
                            :items="classes"
                            label="اختر الفصل"
                            @blur="fetchScheduleId"
                            required
                        ></v-select>
                        <v-select
                            v-model="selectedSection"
                            :items="sections"
                            label="اختر القسم"
                            @blur="fetchScheduleId"
                            required
                        ></v-select>
                    </div>
                    <div
                        style="
                            width: 90%;
                            margin: 0 auto 20px;
                            background: var(--main-color);
                            padding: 10px;
                            color: #fff;
                            border-radius: 5px;
                            text-align: center;
                            font-weight: bold;
                            cursor: pointer;
                        "
                        @click="addSchedule"
                    >
                        إضافة
                    </div>
                </div>
            </v-dialog>
            <v-dialog v-model="main_bubble_1" max-width="90%">
                <div class="schedule">
                    <div class="right">
                        <div>
                            <v-breadcrumbs>
                                <v-breadcrumbs-item
                                    >جدول ({{ selectedClass }}) -
                                    {{ selectedSection }}</v-breadcrumbs-item
                                >
                            </v-breadcrumbs>
                        </div>
                        <div class="left">
                            <font-awesome-icon
                                :icon="['fas', 'xmark']"
                                @click="main_bubble_1 = false"
                                style="font-size: 25px"
                            />
                        </div>
                    </div>
                    <div
                        style="
                            width: 90%;
                            margin: 10px auto;
                            color: var(--main-color);
                            font-weight: bold;
                            background: #f5f5f5;
                            padding: 10px;
                            border-radius: 5px;
                            display: flex;
                            align-items: center;
                            gap: 10px;
                        "
                    >
                        <font-awesome-icon :icon="['fas', 'clock']" />
                        <div>
                            أحدث تعديل
                            {{ formattedLastModified }}
                        </div>
                    </div>

                    <div style="width: 90%; margin: 0 auto">
                        <v-select
                            v-model="selectedClass"
                            :items="classes"
                            label="اختر الفصل"
                            @blur="fetchScheduleId"
                            required
                        ></v-select>
                        <v-select
                            v-model="selectedSection"
                            :items="sections"
                            label="اختر القسم"
                            @blur="fetchScheduleId"
                            required
                        ></v-select>
                    </div>
                    <div
                        style="
                            width: 90%;
                            margin: 0 auto 20px;
                            background: var(--main-color);
                            padding: 10px;
                            color: #fff;
                            border-radius: 5px;
                            text-align: center;
                            font-weight: bold;
                            cursor: pointer;
                            display: flex;
                            align-items: center;
                            gap: 5px;
                            justify-content: center;
                        "
                    >
                        <font-awesome-icon :icon="['fas', 'floppy-disk']" />
                        <div @click="updateSchedule">حفظ التغييرات</div>
                    </div>
                    <confirm_message2
                        v-model="showSnackbar"
                        :text="confirmationText"
                        @close-snackbar="showSnackbar = false"
                    />
                    <div class="contain">
                        <table class="schedule_table">
                            <thead>
                                <tr>
                                    <th>الأيام</th>
                                    <th>الحصة الأولى<br />8:00 - 8:45</th>
                                    <th>الحصة الثانية<br />8:45 - 9:30</th>
                                    <th>الحصة الثالثة<br />9:30 - 10:15</th>
                                    <th>الحصة الرابعة<br />10:15 - 11:00</th>
                                    <th>الحصة الخامسة<br />11:00 - 11:45</th>
                                    <th>الحصة السادسة<br />11:45 - 12:30</th>
                                    <th>الحصة السابعة<br />12:30 - 1:15</th>
                                    <th>الحصة الثامنة<br />1:15 - 2:00</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="day in schedule" :key="day.day">
                                    <td>{{ day.day }}</td>
                                    <td
                                        v-for="(period, index) in day.periods"
                                        :key="index"
                                    >
                                        <input
                                            type="text"
                                            class="subject"
                                            v-model="day.periods[index].subject"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            v-model="day.periods[index].teacher"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </v-dialog></div
    ></v-dialog>
</template>

<script>
import confirm_message2 from "@/components/confirm_message2.vue";
import { v4 as uuidv4 } from "uuid";
import {
    getFirestore,
    doc,
    setDoc,
    getDocs,
    collection,
    deleteDoc,
} from "firebase/firestore";
import { initializeApp } from "@firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBdk3sqIHjXvB2C-O-lvkRgMFpg8pemkno",
    authDomain: "alseraj--almoner.firebaseapp.com",
    projectId: "alseraj--almoner",
    storageBucket: "alseraj--almoner.appspot.com",
    messagingSenderId: "462211256149",
    appId: "1:462211256149:web:a03ace3c70b306620169dc",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default {
    components: {
        confirm_message2,
    },
    props: {
        year: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            loading1: false,
            main_bubble: false,
            main_bubble_1: false,
            showDialog: false,
            changesMade: false,
            confirmationText: "",
            selectedClass: null,
            selectedSection: null,
            schedule: [
                {
                    day: "الأحد",
                    periods: [
                        { subject: "رياضيات", teacher: "أ. أحمد" },
                        { subject: "علوم", teacher: "أ. محمد" },
                        { subject: "لغة عربية", teacher: "أ. علي" },
                        { subject: "تاريخ", teacher: "أ. سمير" },
                        { subject: "جغرافيا", teacher: "أ. خالد" },
                        { subject: "رياضيات", teacher: "أ. أحمد" },
                        { subject: "علوم", teacher: "أ. محمد" },
                        { subject: "لغة عربية", teacher: "أ. علي" },
                    ],
                },
                {
                    day: "الإثنين",
                    periods: [
                        { subject: "لغة عربية", teacher: "أ. علي" },
                        { subject: "رياضيات", teacher: "أ. أحمد" },
                        { subject: "علوم", teacher: "أ. محمد" },
                        { subject: "جغرافيا", teacher: "أ. خالد" },
                        { subject: "تاريخ", teacher: "أ. سمير" },
                        { subject: "لغة عربية", teacher: "أ. علي" },
                        { subject: "رياضيات", teacher: "أ. أحمد" },
                        { subject: "علوم", teacher: "أ. محمد" },
                    ],
                },
                {
                    day: "الثلاثاء",
                    periods: [
                        { subject: "لغة عربية", teacher: "أ. علي" },
                        { subject: "رياضيات", teacher: "أ. أحمد" },
                        { subject: "علوم", teacher: "أ. محمد" },
                        { subject: "جغرافيا", teacher: "أ. خالد" },
                        { subject: "تاريخ", teacher: "أ. سمير" },
                        { subject: "لغة عربية", teacher: "أ. علي" },
                        { subject: "رياضيات", teacher: "أ. أحمد" },
                        { subject: "علوم", teacher: "أ. محمد" },
                    ],
                },
                {
                    day: "الاربعاء",
                    periods: [
                        { subject: "لغة عربية", teacher: "أ. علي" },
                        { subject: "رياضيات", teacher: "أ. أحمد" },
                        { subject: "علوم", teacher: "أ. محمد" },
                        { subject: "جغرافيا", teacher: "أ. خالد" },
                        { subject: "تاريخ", teacher: "أ. سمير" },
                        { subject: "لغة عربية", teacher: "أ. علي" },
                        { subject: "رياضيات", teacher: "أ. أحمد" },
                        { subject: "علوم", teacher: "أ. محمد" },
                    ],
                },
                {
                    day: "الخميس",
                    periods: [
                        { subject: "لغة عربية", teacher: "أ. علي" },
                        { subject: "رياضيات", teacher: "أ. أحمد" },
                        { subject: "علوم", teacher: "أ. محمد" },
                        { subject: "جغرافيا", teacher: "أ. خالد" },
                        { subject: "تاريخ", teacher: "أ. سمير" },
                        { subject: "لغة عربية", teacher: "أ. علي" },
                        { subject: "رياضيات", teacher: "أ. أحمد" },
                        { subject: "علوم", teacher: "أ. محمد" },
                    ],
                },
            ],
            showSnackbar: false,
            classes: ["1/1", "1/2", "2/1", "2/2", "3/1", "3/2"],
            sections: ["عربي", "لغات"],
            lastModified: "لم يتم التعديل بعد",
            scheduleId: null,
        };
    },
    computed: {
        formattedLastModified() {
            return this.lastModified === "لم يتم التعديل بعد"
                ? "لم يتم التعديل بعد"
                : new Date(this.lastModified).toLocaleString();
        },
    },
    methods: {
        showDetails(schedule) {
            this.selectedClass = schedule.class;
            this.selectedSection = schedule.section;
            this.schedule = schedule.schedule;
            this.scheduleId = schedule.id;
            this.lastModified = schedule.lastModified.toDate(); // Ensure proper date conversion
            this.main_bubble_1 = true;
        },
        async updateSchedule() {
            if (
                !this.scheduleId ||
                !this.selectedClass ||
                !this.selectedSection
            ) {
                console.error("Please provide all required fields.");
                return;
            }
            try {
                this.loading1 = true;
                const scheduleRef = doc(db, "studySchedule", this.scheduleId);
                await setDoc(scheduleRef, {
                    class: this.selectedClass,
                    section: this.selectedSection,
                    schedule: this.schedule,
                    lastModified: new Date(), // Record the time of the update
                });

                this.showSnackbar = true;
                this.confirmationText = "تم تعديل الجدول بنجاح.";

                await this.fetchSchedules();
            } catch (error) {
                console.error("Error updating schedule:", error);
            } finally {
                this.loading1 = false;
            }
        },

        closeDialog() {
            this.showDialog = false;
            this.resetDialog();
        },
        resetDialog() {
            this.selectedClass = null;
            this.selectedSection = null;
            this.schedule = [];
            this.lastModified = "لم يتم التعديل بعد";
        },

        async fetchSchedules() {
            this.loading1 = true;
            try {
                const querySnapshot = await getDocs(
                    collection(db, "studySchedule")
                );
                this.schedules = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
            } catch (error) {
                console.error("Error fetching schedules:", error);
            } finally {
                this.loading1 = false;
            }
        },
        async deleteSchedule(scheduleId) {
            if (!scheduleId) {
                console.error("No schedule ID provided for deletion.");
                return;
            }
            try {
                await deleteDoc(doc(db, "studySchedule", scheduleId));

                await this.fetchSchedules();
                console.log(this.schedules);
                console.log("Schedule deleted successfully.");
            } catch (error) {
                console.error("Error deleting schedule:", error);
            }
        },
        async addSchedule() {
            if (!this.selectedClass || !this.selectedSection) {
                console.error("Please provide all required fields.");
                return;
            }
            try {
                this.loading1 = true;
                const docRef = doc(collection(db, "studySchedule"), uuidv4());
                await setDoc(docRef, {
                    class: this.selectedClass,
                    section: this.selectedSection,
                    schedule: this.schedule,
                    educational_level: this.year,
                    lastModified: new Date(),
                });
                console.log("Schedule added successfully");
                // تحديث الجداول بعد إضافة جدول جديد
                await this.fetchSchedules();
                this.resetDialog();
                this.loading1 = false;
                this.main_bubble = false;
            } catch (error) {
                console.error("Error adding schedule: ", error);
                this.loading1 = false;
            }
        },

        // async deletePlan(id) {
        //     try {
        //         await deleteDoc(doc(db, "weeklyPlan", id));
        //         this.weeklyPlans = this.weeklyPlans.filter(
        //             (plan) => plan.id !== id
        //         );
        //         this.confirmationText = "تم حذف الخطه الاسبوعيه بنجاح";
        //         this.showSnackbar = true;
        //     } catch (error) {
        //         console.error("Error deleting plan: ", error);
        //     }
        // },
    },
    watch: {
        showDialog(val) {
            if (val) {
                this.selectedClass = "1/1";
                this.selectedSection = "عربي";
                this.fetchSchedules(); // Fetch schedules when dialog is shown
            }
        },
    },
    mounted() {
        this.fetchSchedules(); // Fetch schedules when the component is mounted
    },
};
</script>

<style scoped lang="scss">
.schedule {
    background: #fff;
    border-radius: 5px;
    height: 90%;
    overflow: auto;
}
.admin-card {
    padding: 68px;
    background-color: #2196f333;
}
.right {
    width: 90% !important;
    margin: auto;
    font-weight: bold;
    font-size: 20px;
    border-bottom: 5px solid var(--secound-color);
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .v-breadcrumbs-item:first-child {
        color: var(--main-color);
        cursor: pointer;
        font-size: 24px;
    }
    .v-breadcrumbs {
        padding: 16px 0;
    }
}
.left {
    display: flex;
    align-items: center;
    gap: 10px;
}
.add {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    width: 90%;
    margin: 15px auto;
    color: var(--main-color);
    font-weight: bold;
    svg {
        background: var(--main-color);
        font-size: 21px;
        color: #fff;
        padding: 5px 7px;
        border-radius: 5px;
        cursor: pointer;
    }
}
.v-container {
    margin: 20px auto !important;
    flex-wrap: wrap;
    padding: 0;
    justify-content: flex-start !important;
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
}
.feat {
    width: 24% !important;
    box-shadow: 0 0 10px #ddd;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
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
img.pluse {
    cursor: pointer;
    width: 30px;
    &:hover {
        opacity: 0.7;
    }
    &:first-child {
        transform: rotateY(180deg);
    }
    // &:nth-child(2) {
    // }
}
.visible {
    opacity: 0;
    animation: fadeIn 1s ease-in-out forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.popup .title {
    padding: 20px 20px 0 !important;
    font-size: 23px;
    font-weight: bold;
    color: var(--main-color);
    position: relative;
    margin-bottom: 15px;
    &::before {
        content: "";
        position: absolute;
        bottom: -15px;
        height: 3px;
        width: calc(100% - 40px);
        background: var(--secound-color);
        left: 50%;
        transform: translateX(-50%);
    }
}
.v-btn--icon.v-btn--density-default {
    color: var(--main-color);
    width: auto;
    height: auto;
    box-shadow: none;
    &:hover {
        background: #fff;
    }
}
svg {
    cursor: pointer;
}
.search {
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    overflow: auto;
    .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        margin-bottom: 15px;
        color: var(--main-color);
        font-weight: bold;
        font-size: 20px;
        div {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        &::before {
            content: "";
            position: absolute;
            bottom: -15px;
            height: 3px;
            width: 100%;
            background: var(--secound-color);
            left: 50%;
            transform: translateX(-50%);
        }
    }
    .body {
        .input_container {
            width: 100%;
            position: relative;
            input {
                width: 100%;
                padding: 10px;
                border: 1px solid var(--secound-color);
                margin: 10px 0;
                border-radius: 5px;
            }
            svg {
                position: absolute;
                left: 30px;
                top: 50%;
                transform: translate(-50%, -50%);
                background: var(--main-color);
                padding: 5px 10px;
                border-radius: 5px;
                color: #fff;
            }
        }
    }
}
.boxes {
    display: flex;
    flex-wrap: wrap;
    // gap: 13px;
    width: 90%;
    margin: 20px auto;

    .box {
        flex-grow: 1;
        width: 24%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: center;
        box-shadow: 0 0 10px #ddd;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        transition: 0.3s;
        // &:hover {
        //     background: #33669929;
        // }

        .title {
            font-size: 20px;
            font-weight: bold;
            color: var(--main-color);
        }
        .time {
            background: var(--secound-color);
            padding: 10px;
            border-radius: 5px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: bold;
            color: var(--main-color);
        }
        .Footer {
            display: flex;
            align-items: center;
            gap: 10px;
            & > div {
                background: var(--main-color);
                width: 48%;
                padding: 10px;
                border-radius: 5px;
                text-align: center;
                color: #fff;
                font-weight: bold;
                cursor: pointer;
                flex-grow: 1;
                &:last-child {
                    background: var(--pink-color);
                }
            }
        }
    }
}
.filter {
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        margin-bottom: 30px;
        color: var(--main-color);
        font-weight: bold;
        font-size: 20px;
        div {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        &::before {
            content: "";
            position: absolute;
            bottom: -15px;
            height: 3px;
            width: 100%;
            background: var(--secound-color);
            left: 50%;
            transform: translateX(-50%);
        }
    }
    .body {
        & > div {
            margin-top: 15px;
        }
        .v-switch .v-label {
            font-weight: bold;
        }
        .filter-switch {
            display: flex;
            align-items: center;
            padding: 0 10px;
            background-color: whitesmoke;
            border-radius: 5px;
            font-weight: bold;
        }

        .switch-input {
            display: none;
        }

        .switch-label {
            cursor: pointer;
            color: var(--main-color);
        }

        .switch-input:checked + .switch-label {
            color: var(--main-color);
        }
    }
    .footer {
        & > div {
            display: flex;
            align-items: center;
            height: 40px;
            background: var(--main-color);
            color: #fff;
            justify-content: center;
            gap: 5px;
            font-weight: bold;
            border-radius: 5px;
            width: 100%;
            margin-top: 15px;
            cursor: pointer;
            border: 1px solid;
            transition: 0.3s;
            &:last-child {
                background: #fff;
                color: var(--main-color);
                border-color: var(--main-color);
            }
            &:hover {
                background: var(--main-color);
                color: #fff;
            }
        }
    }
}
.v-breadcrumbs-item {
    svg {
        display: none;
    }
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

hr {
    border: none;
    border-top: 1px solid #ddd;
    margin: 5px 0;
}

@media (max-width: 700px) {
    .v-breadcrumbs-item {
        svg {
            display: flex;
        }
        div {
            display: none;
        }
    }

    .feat {
        width: 100% !important;
    }
    .boxes .box {
        width: 100%;
    }
}

@media (min-width: 700px) and (max-width: 950px) {
    .feat {
        width: 47% !important;
    }
}
ul.show_details {
    color: var(--therd-color);
    font-weight: bold;
    font-size: 16px;
    gap: 10px;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    li {
        list-style-type: none;
        display: flex;
        align-items: center;
        gap: 10px;
        background: var(--secound-color);
        padding: 10px;
        border-radius: 5px;
    }
}
</style>
