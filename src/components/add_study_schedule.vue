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
                        :items="classItems"
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
                                        <th>الحصة الأولى</th>
                                        <th>الحصة الثانية</th>
                                        <th>الحصة الثالثة</th>
                                        <th>الحصة الرابعة</th>
                                        <th>الحصة الخامسة</th>
                                        <th>الحصة السادسة</th>
                                        <th>الحصة السابعة</th>
                                        <th>الحصة الثامنة</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>مدة الحصة</td>
                                        <td>8:00 - 8:45</td>
                                        <td>8:45 - 9:30</td>
                                        <td>9:30 - 10:15</td>
                                        <td>10:15 - 11:00</td>
                                        <td>11:00 - 11:45</td>
                                        <td>11:45 - 12:30</td>
                                        <td>12:30 - 1:15</td>
                                        <td>1:15 - 2:00</td>
                                    </tr>
                                    <tr
                                        v-for="(
                                            degree, index
                                        ) in Results.schedule"
                                        :key="index"
                                    >
                                        <td>{{ degree.Subject_Name }}</td>
                                        <td>
                                            <div class="period-container">
                                                <v-text-field
                                                    v-model="
                                                        degree.Period1.subject
                                                    "
                                                    style="text-align: center"
                                                    @input="handleInputChange"
                                                    label="المادة"
                                                    required
                                                ></v-text-field>
                                                <v-text-field
                                                    v-model="
                                                        degree.Period1.teacher
                                                    "
                                                    style="text-align: center"
                                                    @input="handleInputChange"
                                                    label="المدرس"
                                                    required
                                                ></v-text-field>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="period-container">
                                                <v-text-field
                                                    v-model="
                                                        degree.Period2.subject
                                                    "
                                                    style="text-align: center"
                                                    @input="handleInputChange"
                                                    label="المادة"
                                                    required
                                                ></v-text-field>
                                                <v-text-field
                                                    v-model="
                                                        degree.Period2.teacher
                                                    "
                                                    style="text-align: center"
                                                    @input="handleInputChange"
                                                    label="المدرس"
                                                    required
                                                ></v-text-field>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="period-container">
                                                <v-text-field
                                                    v-model="
                                                        degree.Period3.subject
                                                    "
                                                    style="text-align: center"
                                                    @input="handleInputChange"
                                                    label="المادة"
                                                    required
                                                ></v-text-field>
                                                <v-text-field
                                                    v-model="
                                                        degree.Period3.teacher
                                                    "
                                                    style="text-align: center"
                                                    @input="handleInputChange"
                                                    label="المدرس"
                                                    required
                                                ></v-text-field>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="period-container">
                                                <v-text-field
                                                    v-model="
                                                        degree.Period4.subject
                                                    "
                                                    style="text-align: center"
                                                    @input="handleInputChange"
                                                    label="المادة"
                                                    required
                                                ></v-text-field>
                                                <v-text-field
                                                    v-model="
                                                        degree.Period4.teacher
                                                    "
                                                    style="text-align: center"
                                                    @input="handleInputChange"
                                                    label="المدرس"
                                                    required
                                                ></v-text-field>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="period-container">
                                                <v-text-field
                                                    v-model="
                                                        degree.Period5.subject
                                                    "
                                                    style="text-align: center"
                                                    @input="handleInputChange"
                                                    label="المادة"
                                                    required
                                                ></v-text-field>
                                                <v-text-field
                                                    v-model="
                                                        degree.Period5.teacher
                                                    "
                                                    style="text-align: center"
                                                    @input="handleInputChange"
                                                    label="المدرس"
                                                    required
                                                ></v-text-field>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="period-container">
                                                <v-text-field
                                                    v-model="
                                                        degree.Period6.subject
                                                    "
                                                    style="text-align: center"
                                                    @input="handleInputChange"
                                                    label="المادة"
                                                    required
                                                ></v-text-field>
                                                <v-text-field
                                                    v-model="
                                                        degree.Period6.teacher
                                                    "
                                                    style="text-align: center"
                                                    @input="handleInputChange"
                                                    label="المدرس"
                                                    required
                                                ></v-text-field>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="period-container">
                                                <v-text-field
                                                    v-model="
                                                        degree.Period7.subject
                                                    "
                                                    style="text-align: center"
                                                    @input="handleInputChange"
                                                    label="المادة"
                                                    required
                                                ></v-text-field>
                                                <v-text-field
                                                    v-model="
                                                        degree.Period7.teacher
                                                    "
                                                    style="text-align: center"
                                                    @input="handleInputChange"
                                                    label="المدرس"
                                                    required
                                                ></v-text-field>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="period-container">
                                                <v-text-field
                                                    v-model="
                                                        degree.Period8.subject
                                                    "
                                                    style="text-align: center"
                                                    @input="handleInputChange"
                                                    label="المادة"
                                                    required
                                                ></v-text-field>
                                                <v-text-field
                                                    v-model="
                                                        degree.Period8.teacher
                                                    "
                                                    style="text-align: center"
                                                    @input="handleInputChange"
                                                    label="المدرس"
                                                    required
                                                ></v-text-field>
                                            </div>
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
        <confirm_message2
            v-model="showSnackbar"
            :text="confirmationText"
            :snackbar="showSnackbar"
            @close-snackbar="handleCloseSnackbar"
        />
    </v-dialog>
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
            showDialog: false,
            changesMade: false,
            confirmationText: "",
            selectedClass: null,
            selectedSection: null,
            showSnackbar: false,
            classes: ["1/1", "1/2", "2/1", "2/2", "3/1", "3/2"],
            sections: ["عربي", "لغات"],
            Results: {
                educational_level: "",
                schedule: [
                    {
                        Subject_Name: "الأحد",
                        Period1: { subject: "", teacher: "" },
                        Period2: { subject: "", teacher: "" },
                        Period3: { subject: "", teacher: "" },
                        Period4: { subject: "", teacher: "" },
                        Period5: { subject: "", teacher: "" },
                        Period6: { subject: "", teacher: "" },
                        Period7: { subject: "", teacher: "" },
                        Period8: { subject: "", teacher: "" },
                    },
                    {
                        Subject_Name: "الإثنين",
                        Period1: { subject: "", teacher: "" },
                        Period2: { subject: "", teacher: "" },
                        Period3: { subject: "", teacher: "" },
                        Period4: { subject: "", teacher: "" },
                        Period5: { subject: "", teacher: "" },
                        Period6: { subject: "", teacher: "" },
                        Period7: { subject: "", teacher: "" },
                        Period8: { subject: "", teacher: "" },
                    },
                    {
                        Subject_Name: "الثلاثاء",
                        Period1: { subject: "", teacher: "" },
                        Period2: { subject: "", teacher: "" },
                        Period3: { subject: "", teacher: "" },
                        Period4: { subject: "", teacher: "" },
                        Period5: { subject: "", teacher: "" },
                        Period6: { subject: "", teacher: "" },
                        Period7: { subject: "", teacher: "" },
                        Period8: { subject: "", teacher: "" },
                    },
                    {
                        Subject_Name: "الأربعاء",
                        Period1: { subject: "", teacher: "" },
                        Period2: { subject: "", teacher: "" },
                        Period3: { subject: "", teacher: "" },
                        Period4: { subject: "", teacher: "" },
                        Period5: { subject: "", teacher: "" },
                        Period6: { subject: "", teacher: "" },
                        Period7: { subject: "", teacher: "" },
                        Period8: { subject: "", teacher: "" },
                    },
                    {
                        Subject_Name: "الخميس",
                        Period1: { subject: "", teacher: "" },
                        Period2: { subject: "", teacher: "" },
                        Period3: { subject: "", teacher: "" },
                        Period4: { subject: "", teacher: "" },
                        Period5: { subject: "", teacher: "" },
                        Period6: { subject: "", teacher: "" },
                        Period7: { subject: "", teacher: "" },
                        Period8: { subject: "", teacher: "" },
                    },
                ],
            },
            lastModified: "",
            scheduleId: "",
        };
    },
    methods: {
        handleCloseSnackbar() {
            this.showSnackbar = false;
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
                    this.loadSchedule();
                } else {
                    this.scheduleId = uuidv4();
                    this.Results.schedule = [
                        {
                            Subject_Name: "الأحد",
                            Period1: { subject: "", teacher: "" },
                            Period2: { subject: "", teacher: "" },
                            Period3: { subject: "", teacher: "" },
                            Period4: { subject: "", teacher: "" },
                            Period5: { subject: "", teacher: "" },
                            Period6: { subject: "", teacher: "" },
                            Period7: { subject: "", teacher: "" },
                            Period8: { subject: "", teacher: "" },
                        },
                        {
                            Subject_Name: "الإثنين",
                            Period1: { subject: "", teacher: "" },
                            Period2: { subject: "", teacher: "" },
                            Period3: { subject: "", teacher: "" },
                            Period4: { subject: "", teacher: "" },
                            Period5: { subject: "", teacher: "" },
                            Period6: { subject: "", teacher: "" },
                            Period7: { subject: "", teacher: "" },
                            Period8: { subject: "", teacher: "" },
                        },
                        {
                            Subject_Name: "الثلاثاء",
                            Period1: { subject: "", teacher: "" },
                            Period2: { subject: "", teacher: "" },
                            Period3: { subject: "", teacher: "" },
                            Period4: { subject: "", teacher: "" },
                            Period5: { subject: "", teacher: "" },
                            Period6: { subject: "", teacher: "" },
                            Period7: { subject: "", teacher: "" },
                            Period8: { subject: "", teacher: "" },
                        },
                        {
                            Subject_Name: "الأربعاء",
                            Period1: { subject: "", teacher: "" },
                            Period2: { subject: "", teacher: "" },
                            Period3: { subject: "", teacher: "" },
                            Period4: { subject: "", teacher: "" },
                            Period5: { subject: "", teacher: "" },
                            Period6: { subject: "", teacher: "" },
                            Period7: { subject: "", teacher: "" },
                            Period8: { subject: "", teacher: "" },
                        },
                        {
                            Subject_Name: "الخميس",
                            Period1: { subject: "", teacher: "" },
                            Period2: { subject: "", teacher: "" },
                            Period3: { subject: "", teacher: "" },
                            Period4: { subject: "", teacher: "" },
                            Period5: { subject: "", teacher: "" },
                            Period6: { subject: "", teacher: "" },
                            Period7: { subject: "", teacher: "" },
                            Period8: { subject: "", teacher: "" },
                        },
                    ];
                }
            } catch (error) {
                console.error("Error fetching schedule ID: ", error);
            }
        },
        closeDialog() {
            this.showDialog = false;
        },
        handleInputChange() {
            this.changesMade = true;
        },
    },
    watch: {
        showDialog(val) {
            if (val) {
                this.selectedClass = "1/1";
                this.selectedSection = "عربي";
                this.fetchScheduleId();
            }
        },
    },
    computed: {
        classItems() {
            // Generate the class items based on the selected grade
            switch (this.year) {
                case "مرحلة رياض الأطفال الاولي":
                    return ["1/1", "1/2", "1/3", "1/4", "1/5", "1/6"];
                case "مرحلة رياض الأطفال الثانية":
                    return ["2/1", "2/2", "2/3", "2/4", "2/5", "2/6"];
                case "الصف الأول الابتدائي":
                    return ["1/1", "1/2", "1/3", "1/4", "1/5", "1/6"];
                case "الصف الثاني الابتدائي":
                    return ["2/1", "2/2", "2/3", "2/4", "2/5", "2/6"];
                case "الصف الثالث الابتدائي":
                    return ["3/1", "3/2", "3/3", "3/4", "3/5", "3/6"];
                case "الصف الرابع الابتدائي":
                    return ["4/1", "4/2", "4/3", "4/4", "4/5", "4/6"];
                case "الصف الخامس الابتدائي":
                    return ["5/1", "5/2", "5/3", "5/4", "5/5", "5/6"];
                case "الصف السادس الابتدائي":
                    return ["6/1", "6/2", "6/3", "6/4", "6/5", "6/6"];
                case "الصف الأول الإعدادي":
                    return ["1/1", "1/2", "1/3", "1/4", "1/5", "1/6"];
                case "الصف الثاني الإعدادي":
                    return ["2/1", "2/2", "2/3", "2/4", "2/5", "2/6"];
                case "الصف الثالث الإعدادي":
                    return ["3/1", "3/2", "3/3", "3/4", "3/5", "3/6"];
                case "الصف الأول الثانوي":
                    return ["1/1", "1/2", "1/3", "1/4", "1/5", "1/6"];
                case "الصف الثاني الثانوي":
                    return ["2/1", "2/2", "2/3", "2/4", "2/5", "2/6"];
                case "الصف الثالث الثانوي":
                    return ["3/1", "3/2", "3/3", "3/4", "3/5", "3/6"];
                default:
                    return [];
            }
        },
    },
    mounted() {
        console.log(this.year);
    },
};
</script>

<style scoped>
.table {
    width: 100%;
    overflow-x: auto;
}
.period-container {
    display: flex;
    flex-direction: column;
}
</style>
