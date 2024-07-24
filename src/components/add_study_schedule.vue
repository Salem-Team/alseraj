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
                    <v-card flat>
                        <div class="table">
                            <v-table>
                                <thead>
                                    <tr>
                                        <th>اليوم الدراسي</th>
                                        <th>الفتره الاولي</th>
                                        <th>الفتره الثانيه</th>
                                        <th>الفتره الثالثه</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(degree, index) in Results"
                                        :key="index"
                                    >
                                        <td>
                                            {{ degree.Subject_Name }}
                                        </td>
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
                    <!-- عرض توقيت آخر تعديل -->
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
    data() {
        return {
            showDialog: false,
            showDialog2: false,
            changesMade: false,
            Results: [
                {
                    Subject_Name: "السبت",
                    Minor_degree: "عربي",
                    Major_degree: "رياضه",
                    Student_degree: "تاريخ",
                },
                {
                    Subject_Name: "الاحد",
                    Minor_degree: "انجليزي",
                    Major_degree: "تاريخ",
                    Student_degree: "جغرفيا",
                },
                {
                    Subject_Name: "الاثنين ",
                    Minor_degree: "انجليزي",
                    Major_degree: "تاريخ",
                    Student_degree: "جغرفيا",
                },
                {
                    Subject_Name: "الثلاثاء",
                    Minor_degree: "انجليزي",
                    Major_degree: "تاريخ",
                    Student_degree: "دين",
                },
                {
                    Subject_Name: "الاربعاء",
                    Minor_degree: "رياضه",
                    Major_degree: "تاريخ",
                    Student_degree: "جغرفيا",
                },
                {
                    Subject_Name: "الخميس",
                    Minor_degree: "انجليزي",
                    Major_degree: "عربي",
                    Student_degree: "جغرفيا",
                },
            ],
        };
    },
    async mounted() {
        await this.loadSchedule();
    },
    methods: {
        async loadSchedule() {
            try {
                const docRef = doc(db, "studySchedule", "A2N0C3wVeRnVxOkmunGO");
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    this.Results = data.studySchedule || [];
                    this.lastModified = data.lastModified
                        ? data.lastModified.toDate().toLocaleString()
                        : "لم يتم التعديل بعد";
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error getting document: ", error);
            }
        },
        async saveSchedule() {
            try {
                const docRef = doc(db, "studySchedule", "A2N0C3wVeRnVxOkmunGO");
                await setDoc(docRef, {
                    studySchedule: this.Results,
                    lastModified: Timestamp.now(), // حفظ توقيت آخر تعديل
                });

                this.changesMade = false; // Reset changesMade flag after saving
                this.lastModified = new Date().toLocaleString(); // تحديث توقيت آخر تعديل في الواجهة
                this.closeDialog();
            } catch (error) {
                console.error("Error updating document: ", error);
            }
        },
        async closeDialog() {
            this.showDialog = false;
        },

        handleInputChange() {
            this.changesMade = true;
        },
    },
};
</script>
<style scoped lang="scss"></style>
