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
                <div>(2) جداول دراسية</div>
                <div>
                    <font-awesome-icon
                        :icon="['fas', 'plus']"
                        @click="main_bubble = true"
                    />
                </div>
            </div>

            <div class="boxes">
                <div class="box">
                    <div class="title">فصل (1/1) - عربي</div>
                    <div class="time">
                        <font-awesome-icon :icon="['fas', 'clock']" />
                        <div>أحدث تعديل 2024/4/4</div>
                    </div>
                    <div class="Footer">
                        <div class="show" @click="main_bubble_1 = true">
                            عرض
                        </div>
                        <div class="delete">حذف</div>
                    </div>
                </div>
                <div class="box">
                    <div class="title">فصل (1/2) - عربي</div>
                    <div class="time">
                        <font-awesome-icon :icon="['fas', 'clock']" />
                        <div>أحدث تعديل 2024/4/4</div>
                    </div>
                    <div class="Footer">
                        <div class="show" @click="main_bubble_1 = true">
                            عرض
                        </div>
                        <div class="delete">حذف</div>
                    </div>
                </div>
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
                        <div>أحدث تعديل 2024/4/4</div>
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
                        <div>حفظ التغييرات</div>
                    </div>
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
                                <tr>
                                    <td>الأحد</td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="رياضيات"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. أحمد"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="علوم"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. محمد"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="لغة عربية"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. علي"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="تاريخ"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. سمير"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="جغرافيا"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. خالد"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="رياضيات"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. أحمد"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="علوم"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. محمد"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="لغة عربية"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. علي"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>الإثنين</td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="لغة عربية"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. علي"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="رياضيات"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. أحمد"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="علوم"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. محمد"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="جغرافيا"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. خالد"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="تاريخ"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. سمير"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="لغة عربية"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. علي"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="رياضيات"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. أحمد"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="علوم"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. محمد"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>الثلاثاء</td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="علوم"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. محمد"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="لغة عربية"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. علي"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="رياضيات"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. أحمد"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="تاريخ"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. سمير"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="جغرافيا"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. خالد"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="علوم"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. محمد"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="لغة عربية"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. علي"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="رياضيات"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. أحمد"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>الأربعاء</td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="جغرافيا"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. خالد"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="تاريخ"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. سمير"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="رياضيات"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. أحمد"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="علوم"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. محمد"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="لغة عربية"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. علي"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="جغرافيا"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. خالد"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="تاريخ"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. سمير"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="رياضيات"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. أحمد"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>الخميس</td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="تاريخ"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. سمير"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="جغرافيا"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. خالد"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="لغة عربية"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. علي"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="رياضيات"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. أحمد"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="علوم"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. محمد"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="تاريخ"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. سمير"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="جغرافيا"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. خالد"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            class="subject"
                                            value="لغة عربية"
                                        />
                                        <hr />
                                        <input
                                            type="text"
                                            class="teacher"
                                            value="أ. علي"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </v-dialog>
            <!-- <v-card style="padding: 15px">
                <v-card-title
                    class="headline"
                    style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    "
                >
                    إضافة جدول دراسي
                    <v-spacer></v-spacer>
                    <v-btn
                        :disabled="!changesMade"
                        color="green darken-1"
                        @click="saveSchedule"
                    >
                        حفظ التعديلات
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <div style="padding: 20px">
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
                        <v-card flat>
                            <div class="table">
                                <v-table>
                                    <thead>
                                        <tr>
                                            <th>اليوم الدراسي</th>
                                            <th>الفترة الأولى</th>
                                            <th>الفترة الثانية</th>
                                            <th>الفترة الثالثة</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="(
                                                degree, index
                                            ) in Results.schedule"
                                            :key="index"
                                        >
                                            <td>{{ degree.Subject_Name }}</td>
                                            <td>
                                                <v-text-field
                                                    v-model="
                                                        degree.Minor_degree
                                                    "
                                                    style="text-align: center"
                                                    @input="handleInputChange"
                                                    required
                                                ></v-text-field>
                                            </td>
                                            <td>
                                                <v-text-field
                                                    v-model="
                                                        degree.Major_degree
                                                    "
                                                    style="text-align: center"
                                                    @input="handleInputChange"
                                                    required
                                                ></v-text-field>
                                            </td>
                                            <td>
                                                <v-text-field
                                                    v-model="
                                                        degree.Student_degree
                                                    "
                                                    style="text-align: center"
                                                    @input="handleInputChange"
                                                    required
                                                ></v-text-field>
                                            </td>
                                        </tr>
                                    </tbody>
                                </v-table>
                            </div>
                        </v-card>
                    </div>
                    <div style="padding: 20px; text-align: right">
                        <p>آخر تعديل: {{ lastModified }}</p>
                    </div>
                </v-card-text>
            </v-card> -->
            <confirm_message2
                v-model="showSnackbar"
                :text="confirmationText"
                :snackbar="showSnackbar"
                @close-snackbar="showSnackbar = false"
            /></div
    ></v-dialog>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    getDocs,
    Timestamp,
    query,
    collection,
    where,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
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
const storage = getStorage(app);
import confirm_message2 from "@/components/confirm_message2.vue";

export { db, storage };

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
            selectedClass: null, // تعيين القيمة الافتراضية لاحقًا
            selectedSection: null, // تعيين القيمة الافتراضية لاحقًا
            showSnackbar: false,
            classes: ["1/1", "1/2", "2/1", "2/2", "3/1", "3/2"],
            sections: ["عربي", "لغات"],
            Results: {
                educational_level: "",
                classes: ["1/1", "1/2", "2/1", "2/2", "3/1", "3/2"],
                sections: ["عربي", "لغات"],
                schedule: [
                    {
                        Subject_Name: "السبت",
                        Minor_degree: "",
                        Major_degree: "",
                        Student_degree: "",
                    },
                    {
                        Subject_Name: "الاحد",
                        Minor_degree: "",
                        Major_degree: "",
                        Student_degree: "",
                    },
                    {
                        Subject_Name: "الاثنين ",
                        Minor_degree: "",
                        Major_degree: "",
                        Student_degree: "",
                    },
                    {
                        Subject_Name: "الثلاثاء",
                        Minor_degree: "",
                        Major_degree: "",
                        Student_degree: "",
                    },
                    {
                        Subject_Name: "الاربعاء",
                        Minor_degree: "",
                        Major_degree: "",
                        Student_degree: "",
                    },
                    {
                        Subject_Name: "الخميس",
                        Minor_degree: "",
                        Major_degree: "",
                        Student_degree: "",
                    },
                ],
            },
            lastModified: "لم يتم التعديل بعد",
            scheduleId: null, // هنا لتخزين معرّف الجدول
        };
    },
    methods: {
        handleCloseSnackbar() {
            this.showSnackbar = false; // تحديث حالة الرسالة في المكون الأم
        },
        async loadSchedule() {
            if (!this.selectedClass || !this.selectedSection) return;

            try {
                this.changesMade = false;
                this.lastModified = "لم يتم التعديل بعد";

                const docRef = doc(db, "studySchedule", this.scheduleId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    this.Results.schedule =
                        data.schedule || this.Results.schedule;
                    this.lastModified = data.lastModified
                        ? data.lastModified.toDate().toLocaleString()
                        : "لم يتم التعديل بعد";
                }
            } catch (error) {
                console.error("Error getting document: ", error);
            }
        },
        async saveSchedule() {
            if (!this.selectedClass || !this.selectedSection) return;

            try {
                const docRef = doc(db, "studySchedule", this.scheduleId);
                const docSnap = await getDoc(docRef);

                const isNew = !docSnap.exists();

                await setDoc(
                    docRef,
                    {
                        class: this.selectedClass,
                        section: this.selectedSection,
                        educational_level: this.year,
                        schedule: this.Results.schedule,
                        lastModified: Timestamp.now(),
                    },
                    { merge: true }
                );

                this.changesMade = false;
                this.lastModified = new Date().toLocaleString();
                this.closeDialog();

                if (isNew) {
                    this.confirmationText = `تم إضافة جدول دراسي جديد للفصل ${this.selectedClass} للقسم ${this.selectedSection} للسنة الدراسية ${this.year}`;
                } else {
                    this.confirmationText = "تم تعديل الجدول";
                }
                this.showSnackbar = true;
            } catch (error) {
                console.error("Error updating document: ", error);
            }
        },
        async fetchScheduleId() {
            if (!this.selectedClass || !this.selectedSection) return;

            try {
                const querySnapshot = await getDocs(
                    query(
                        collection(db, "studySchedule"),
                        where("class", "==", this.selectedClass),
                        where("section", "==", this.selectedSection),
                        where("educational_level", "==", this.year)
                    )
                );

                if (!querySnapshot.empty) {
                    const doc = querySnapshot.docs[0];
                    this.scheduleId = doc.id;
                    this.loadSchedule(); // تحميل البيانات الحالية
                } else {
                    this.scheduleId = uuidv4();
                    this.Results.schedule = [
                        {
                            Subject_Name: "السبت",
                            Minor_degree: "",
                            Major_degree: "",
                            Student_degree: "",
                        },
                        {
                            Subject_Name: "الأحد",
                            Minor_degree: "",
                            Major_degree: "",
                            Student_degree: "",
                        },
                        {
                            Subject_Name: "الإثنين",
                            Minor_degree: "",
                            Major_degree: "",
                            Student_degree: "",
                        },
                        {
                            Subject_Name: "الثلاثاء",
                            Minor_degree: "",
                            Major_degree: "",
                            Student_degree: "",
                        },
                        {
                            Subject_Name: "الأربعاء",
                            Minor_degree: "",
                            Major_degree: "",
                            Student_degree: "",
                        },
                        {
                            Subject_Name: "الخميس",
                            Minor_degree: "",
                            Major_degree: "",
                            Student_degree: "",
                        },
                    ];
                }
            } catch (error) {
                console.error("Error fetching schedule ID: ", error);
            }
        },
        closeDialog() {
            this.showDialog = false;
            console.log('@click="main_bubble = false"');
        },
        handleInputChange() {
            this.changesMade = true;
        },
    },
    watch: {
        showDialog(val) {
            if (val) {
                // تعيين القيم الافتراضية عند فتح الحوار
                this.selectedClass = "1/1";
                this.selectedSection = "عربي";
                this.fetchScheduleId(); // قم بتحديث الجدول عند فتح الحوار
            }
        },
    },
    mounted() {
        console.log(this.year);
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
    gap: 13px;
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
