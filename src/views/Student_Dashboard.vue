<template>
    <v-container>
        <!-- عنصر تحميل -->
        <v-dialog v-model="loading" persistent max-width="290" hide-overlay>
            <v-card class="loading-dialog" flat>
                <v-card-title class="justify-center">
                    <v-progress-circular
                        style="position: relative; right: 60px"
                        indeterminate
                        color="primary"
                        size="64"
                        width="6"
                        class="mx-auto"
                    >
                    </v-progress-circular>
                </v-card-title>
                <v-card-subtitle class="text-center">
                    جاري تحميل البيانات...
                </v-card-subtitle>
            </v-card>
        </v-dialog>

        <!-- معلومات الطالب -->
        <v-card class="mb-5 student-card" v-if="isAuthenticated">
            <v-card-title class="student-card-title"
                >معلومات الطالب</v-card-title
            >
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            label="اسم الطالب"
                            v-model="student.student_name"
                            readonly
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            label="الرقم القومي"
                            v-model="student.National_id"
                            readonly
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            label="المرحلة الدراسية"
                            v-model="student.educational_level"
                            readonly
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            label="الفصل"
                            v-model="student.class"
                            readonly
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            label="القسم"
                            v-model="student.section"
                            readonly
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            label="النوع"
                            v-model="student.gender"
                            readonly
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            label="تاريخ الميلاد"
                            v-model="student.birthday"
                            readonly
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            label="رقم التليفون"
                            v-model="student.phone"
                            readonly
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <!-- الاختبارات -->
        <v-card class="mb-5 student-card" v-if="isAuthenticated">
            <v-card-title class="student-card-title">الاختبارات</v-card-title>
            <v-card-text>
                <v-list v-if="student.state">
                    <ul>
                        <li>First</li>
                        <li>Seconde</li>
                        <li>Third</li>
                        <li>Fourth</li>
                    </ul>
                </v-list>
                <v-alert v-else type="warning">
                    تم حجب الاختبارات لحين السداد.
                </v-alert>
            </v-card-text>
        </v-card>

        <!-- النتائج الأسبوعية -->
        <v-card class="mb-5 student-card" v-if="isAuthenticated">
            <v-card-title class="student-card-title"
                >النتائج الأسبوعية</v-card-title
            >
            <v-card-text>
                <v-data-table
                    :headers="weeklyHeaders"
                    :items="student.Results[0].weekly"
                >
                    <template v-slot:item="{ item }">
                        <tr>
                            <td>{{ item.Subject_Name }}</td>
                            <td>{{ item.Major_degree }}</td>
                            <td>{{ item.Student_degree }}</td>
                        </tr>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
        <!-- النتائج الشهرية -->
        <v-card class="mb-5 student-card" v-if="isAuthenticated">
            <v-card-title class="student-card-title"
                >النتائج الشهرية</v-card-title
            >
            <v-card-text>
                <v-accordion
                    v-if="
                        student.Results[0].Monthly &&
                        student.Results[0].Monthly.length
                    "
                >
                    <v-accordion-item
                        v-for="(month, monthIndex) in student.Results[0]
                            .Monthly"
                        :key="monthIndex"
                        :value="monthIndex"
                    >
                        <template v-slot:title>
                            {{ month.Certificate_title }}
                        </template>
                        <v-accordion-item__body>
                            <v-data-table
                                :headers="monthlyHeaders"
                                :items="month.Degrees"
                            >
                                <template v-slot:item="{ item }">
                                    <tr>
                                        <td>{{ item.Subject_Name }}</td>
                                        <td>{{ item.Behavior_assessment }}</td>
                                        <td>{{ item.Major_degree }}</td>
                                        <td>{{ item.Minor_degree }}</td>
                                        <td>{{ item.Student_degree }}</td>
                                        <td>{{ item.Teacher_Name }}</td>
                                    </tr>
                                </template>
                            </v-data-table>
                        </v-accordion-item__body>
                    </v-accordion-item>
                </v-accordion>
            </v-card-text>
        </v-card>

        <!-- الإحصائيات -->
        <v-card class="student-card" v-if="isAuthenticated">
            <v-card-title class="student-card-title">الإحصائيات</v-card-title>
            <v-card-text>
                <!-- رسوم بيانية أو بيانات إحصائية -->
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import { db } from "@/Firebase.js";
import { doc, getDoc } from "firebase/firestore";

export default {
    data() {
        return {
            student: {
                student_name: "",
                National_id: "",
                educational_level: "",
                class: "",
                section: "",
                gender: "",
                birthday: "",
                phone: "",
                tests: [],
                Results: [], // بيانات النتائج ستكون هنا
                state: false, // إضافة حالة للتحكم في عرض الاختبارات
            },
            isAuthenticated: false,
            loading: true, // أضفناه لتفعيل عنصر التحميل
            weeklyHeaders: [
                { text: "Subject Name", value: "Subject_Name" },
                { text: "Major Degree", value: "Major_degree" },
                { text: "Student Degree", value: "Student_degree" },
            ],
            monthlyHeaders: [
                { text: "Subject Name", value: "Subject_Name" },
                { text: "Behavior Assessment", value: "Behavior_assessment" },
                { text: "Major Degree", value: "Major_degree" },
                { text: "Minor Degree", value: "Minor_degree" },
                { text: "Student Degree", value: "Student_degree" },
                { text: "Teacher Name", value: "Teacher_Name" },
            ],
        };
    },
    async created() {
        try {
            const documentId = this.$route.params.id; // استلام documentId من الـ route params
            this.documentId = documentId;

            // محاولة الحصول على بيانات الطالب
            const docSnap = await getDoc(doc(db, "students", documentId));
            if (docSnap.exists()) {
                this.student = docSnap.data();
                this.isAuthenticated = true;
            } else {
                console.error("No document found for the given ID");
                this.isAuthenticated = false;
            }
        } catch (error) {
            console.error("Error fetching student data:", error);
            this.isAuthenticated = false;
        } finally {
            // بعد الانتهاء من تحميل البيانات، قم بإخفاء عنصر التحميل
            this.loading = false;
        }
    },
};
</script>

<style scoped>
.v-card {
    margin-bottom: 20px;
    background-color: var(--secound-color);
    border: 1px solid var(--main-color);
    border-radius: 10px;
}

.student-card-title {
    background-color: var(--main-color);
    color: white;
    font-weight: bold;
    padding: 10px;
    border-radius: 10px 10px 0 0;
}

.v-text-field {
    background-color: white;
    border-radius: 4px;
}

.student-card {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.v-list-item {
    border-bottom: 1px solid var(--therd-color);
}

.v-list-item-title {
    color: var(--pink-color);
    font-weight: bold;
}
.loading-dialog {
    border: none;
    box-shadow: none;
    border-radius: 8px;
    padding: 20px;
}

.v-dialog__content {
    align-items: center;
    justify-content: center;
}
</style>
