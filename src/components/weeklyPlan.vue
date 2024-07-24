<template>
    <v-dialog v-model="showDialog2" max-width="90%">
        <v-card style="padding: 15px; min-height: 400px">
            <v-card-title
                class="headline"
                style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                "
            >
                إضافة خطة أسبوعية
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" @click="showAddWeeklyPlanDialog">
                    إضافة خطة أسبوعية
                </v-btn>
            </v-card-title>
            <v-row>
                <v-col
                    cols="4"
                    v-for="(plan, index) in weeklyPlans"
                    :key="index"
                    ><v-card
                        class="my-2"
                        color="info"
                        style="width: 100%; padding: 20px; text-align: center"
                    >
                        <v-card-title class="mb-5">
                            الأسبوع {{ index + 1 }}
                            <v-spacer></v-spacer>
                        </v-card-title>
                        <div
                            style="
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                            "
                        >
                            <v-btn icon @click="showDetailsDialog(plan)">
                                <v-icon>mdi-eye</v-icon>
                            </v-btn>
                            <v-btn icon @click="deletePlan(plan.id)">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </div>
                    </v-card></v-col
                >
            </v-row>
        </v-card>
        <v-dialog v-model="showAddWeeklyPlan" max-width="90%">
            <v-card>
                <v-card-title
                    class="headline"
                    style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 20px;
                    "
                >
                    إضافة خطة أسبوعية جديدة
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" @click="addWeeklyPlan">
                        اضافه
                    </v-btn>
                </v-card-title>
                <v-card-text>
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
                                    v-for="(plan, index) in daysOfWeek"
                                    :key="index"
                                >
                                    <td>{{ plan.day }}</td>
                                    <td>
                                        <v-text-field
                                            v-model="plan.minor_degree"
                                            style="text-align: center"
                                            @input="handleInputChange"
                                            required
                                        ></v-text-field>
                                    </td>
                                    <td>
                                        <v-text-field
                                            v-model="plan.major_degree"
                                            style="text-align: center"
                                            @input="handleInputChange"
                                            required
                                        ></v-text-field>
                                    </td>
                                    <td>
                                        <v-text-field
                                            v-model="plan.student_degree"
                                            style="text-align: center"
                                            @input="handleInputChange"
                                            required
                                        ></v-text-field>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="grey darken-1"
                        text
                        @click="closeAddWeeklyPlanDialog"
                    >
                        إلغاء
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="showDetails6" max-width="90%">
            <v-card style="padding: 15px">
                <v-card-title
                    class="headline"
                    style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    "
                >
                    تفاصيل الخطة
                    <v-spacer></v-spacer>
                    <v-btn
                        :disabled="!changesMade"
                        color="green darken-1"
                        @click="saveDetails"
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
                                            v-for="(
                                                degree, index
                                            ) in selectedPlan.days"
                                            :key="index"
                                        >
                                            <td>
                                                {{ degree.day }}
                                            </td>
                                            <td>
                                                <v-text-field
                                                    v-model="
                                                        degree.minor_degree
                                                    "
                                                    style="text-align: center"
                                                    @input="handleInputChange"
                                                    required
                                                ></v-text-field>
                                            </td>
                                            <td>
                                                <v-text-field
                                                    v-model="
                                                        degree.major_degree
                                                    "
                                                    style="text-align: center"
                                                    @input="handleInputChange"
                                                    required
                                                ></v-text-field>
                                            </td>
                                            <td>
                                                <v-text-field
                                                    v-model="
                                                        degree.student_degree
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
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="grey darken-1"
                        text
                        @click="closeDetailsDialog"
                    >
                        إلغاء
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-dialog>

    <!-- Dialog for adding weekly plan -->

    <!-- Dialog for details -->
</template>

<script>
import {
    getFirestore,
    doc,
    setDoc,
    getDocs,
    Timestamp,
    collection,
    addDoc,
    deleteDoc,
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
            showDialog2: false,
            showAddWeeklyPlan: false,
            showDetails6: false,
            changesMade: false,
            newPlanName: "",
            selectedPlan: {},
            weeklyPlans: [], // Store weekly plans here
            lastModified: "",
            daysOfWeek: [
                {
                    day: "السبت",
                    minor_degree: "",
                    major_degree: "",
                    student_degree: "",
                },
                {
                    day: "الأحد",
                    minor_degree: "",
                    major_degree: "",
                    student_degree: "",
                },
                {
                    day: "الإثنين",
                    minor_degree: "",
                    major_degree: "",
                    student_degree: "",
                },
                {
                    day: "الثلاثاء",
                    minor_degree: "",
                    major_degree: "",
                    student_degree: "",
                },
                {
                    day: "الأربعاء",
                    minor_degree: "",
                    major_degree: "",
                    student_degree: "",
                },
                {
                    day: "الخميس",
                    minor_degree: "",
                    major_degree: "",
                    student_degree: "",
                },
            ],
        };
    },
    async mounted() {
        await this.loadWeeklyPlans();
    },
    methods: {
        async loadWeeklyPlans() {
            try {
                const querySnapshot = await getDocs(
                    collection(db, "weeklyPlan")
                );
                this.weeklyPlans = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
            } catch (error) {
                console.error("Error getting weekly plans: ", error);
            }
        },
        showAddWeeklyPlanDialog() {
            this.showAddWeeklyPlan = true;
        },
        async addWeeklyPlan() {
            try {
                const newPlan = {
                    days: this.daysOfWeek,
                    createdAt: Timestamp.now(),
                };
                const docRef = await addDoc(
                    collection(db, "weeklyPlan"),
                    newPlan
                );
                this.weeklyPlans.push({
                    id: docRef.id,
                    ...newPlan,
                });
                // Reset daysOfWeek to default values
                this.daysOfWeek = [
                    {
                        day: "السبت",
                        minor_degree: "",
                        major_degree: "",
                        student_degree: "",
                    },
                    {
                        day: "الأحد",
                        minor_degree: "",
                        major_degree: "",
                        student_degree: "",
                    },
                    {
                        day: "الإثنين",
                        minor_degree: "",
                        major_degree: "",
                        student_degree: "",
                    },
                    {
                        day: "الثلاثاء",
                        minor_degree: "",
                        major_degree: "",
                        student_degree: "",
                    },
                    {
                        day: "الأربعاء",
                        minor_degree: "",
                        major_degree: "",
                        student_degree: "",
                    },
                    {
                        day: "الخميس",
                        minor_degree: "",
                        major_degree: "",
                        student_degree: "",
                    },
                ];
                this.showAddWeeklyPlan = false;
            } catch (error) {
                console.error("Error adding weekly plan: ", error);
            }
        },
        async deletePlan(id) {
            try {
                await deleteDoc(doc(db, "weeklyPlan", id));
                this.weeklyPlans = this.weeklyPlans.filter(
                    (plan) => plan.id !== id
                );
            } catch (error) {
                console.error("Error deleting plan: ", error);
            }
        },
        showDetailsDialog(plan) {
            this.selectedPlan = plan;
            this.showDetails6 = true;
        },
        async saveDetails() {
            try {
                const docRef = doc(db, "weeklyPlan", this.selectedPlan.id);
                await setDoc(docRef, {
                    days: this.selectedPlan.days,
                    lastModified: Timestamp.now(), // Update lastModified
                });

                this.changesMade = false;
                this.lastModified = new Date().toLocaleString();
                this.showDetails6 = false;
            } catch (error) {
                console.error("Error updating plan details: ", error);
            }
        },
        closeAddWeeklyPlanDialog() {
            this.showAddWeeklyPlan = false;
        },
        closeDetailsDialog() {
            this.showDetails6 = false;
        },
        handleInputChange() {
            this.changesMade = true;
        },
    },
};
</script>

<style scoped lang="scss">
/* Add your styles here */
</style>
