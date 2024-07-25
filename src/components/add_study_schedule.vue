<template>
    <v-dialog v-model="showDialog" max-width="90%">
        <v-card style="padding: 15px">
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
                        @blur="loadSchedule"
                        required
                    ></v-select>
                    <v-select
                        v-model="selectedSection"
                        :items="sections"
                        label="اختر القسم"
                        @blur="loadSchedule"
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
                                                v-model="degree.Minor_degree"
                                                style="text-align: center"
                                                @input="handleInputChange"
                                                required
                                            ></v-text-field>
                                        </td>
                                        <td>
                                            <v-text-field
                                                v-model="degree.Major_degree"
                                                style="text-align: center"
                                                @input="handleInputChange"
                                                required
                                            ></v-text-field>
                                        </td>
                                        <td>
                                            <v-text-field
                                                v-model="degree.Student_degree"
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
        </v-card>
    </v-dialog>
</template>

<script>
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    Timestamp,
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

export { db, storage };

export default {
    props: {
        year: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            showDialog: false,
            changesMade: false,
            selectedClass: null,
            selectedSection: null,
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
        };
    },
    methods: {
        async loadSchedule() {
            if (!this.selectedClass || !this.selectedSection) return;

            // إعادة تعيين الجدول قبل تحميل البيانات الجديدة
            this.Results.schedule = [
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
            ];

            this.changesMade = false;
            this.lastModified = "لم يتم التعديل بعد";

            try {
                const docRef = doc(
                    db,
                    "studySchedule",
                    `${this.selectedClass.replace("/", "-")}_${
                        this.selectedSection
                    }`
                );
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    this.Results.schedule = data.schedule || [
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
                    ];
                    this.lastModified = data.lastModified
                        ? data.lastModified.toDate().toLocaleString()
                        : "لم يتم التعديل بعد";
                } else {
                    // في حالة عدم وجود بيانات، إعداد جدول دراسي فارغ
                    this.Results.schedule = [
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
                    ];
                }
            } catch (error) {
                console.error("Error getting document: ", error);
            }
        },
        async saveSchedule() {
            if (!this.selectedClass || !this.selectedSection) return;
            try {
                const docRef = doc(
                    db,
                    "studySchedule",
                    `${this.selectedClass.replace("/", "-")}_${
                        this.selectedSection
                    }`
                );
                await setDoc(docRef, {
                    class: this.selectedClass,
                    section: this.selectedSection,
                    educational_level: this.year,
                    schedule: this.Results.schedule,
                    lastModified: Timestamp.now(),
                });
                this.changesMade = false;
                this.lastModified = new Date().toLocaleString();
                this.closeDialog();
            } catch (error) {
                console.error("Error updating document: ", error);
            }
        },
        closeDialog() {
            this.showDialog = false;
        },
        handleInputChange() {
            this.changesMade = true;
        },
    },
    mounted() {
        console.log(this.year);
    },
};
</script>

<style scoped lang="scss"></style>
