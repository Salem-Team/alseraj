import { defineStore } from "pinia";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/Firebase";

export const useStepStudy = defineStore({
    id: "stepStudy",
    state: () => ({
        school: {
            stepStudy: [
                {
                    name: "رياض الأطفال",
                    grades: ["الصف الأول", "الصف الثاني"],
                },
                {
                    name: "المرحلة الابتدائية",
                    grades: [
                        "الصف الأول الابتدائي",
                        "الصف الثاني الابتدائي",
                        "الصف الثالث الابتدائي",
                        "الصف الرابع الابتدائي",
                        "الصف الخامس الابتدائي",
                        "الصف السادس الابتدائي",
                    ],
                },
                {
                    name: "المرحلة الإعدادية",
                    grades: [
                        "الإعدادي الصف الأول",
                        "الإعدادي الصف الثاني",
                        "الإعدادي الصف الثالث",
                    ],
                },
                {
                    name: "المرحلة الثانوية",
                    grades: [
                        "الصف الأول الثانوي",
                        "الصف الثاني الثانوي",
                        "الصف الثالث الثانوي",
                    ],
                },
            ],
        },
        subjects: {}, // لتخزين المواد الدراسية حسب المرحلة
        classRoomsData: [],
    }),
    actions: {
        getSteps() {
            return this.school.stepStudy;
        },
        getGradesForStage(stageName) {
            const stage = this.school.stepStudy.find(
                (s) => s.name === stageName
            );
            return stage ? stage.grades : [];
        },
        async fetchAllClassRooms() {
            try {
                // Build the query with the specified filters
                const q = collection(db, "class_rooms");
                //                   where("subjects", "array-contains", subject) // Assuming subjects is an array
                // where("grade", "==", grade)

                // Fetch the documents that match the query
                const querySnapshot = await getDocs(q);
                const classRooms = [];

                querySnapshot.forEach((doc) => {
                    classRooms.push({ id: doc.id, ...doc.data() });
                });

                // Store the fetched data
                console.log("firebase=>", classRooms);
                this.classRoomsData = classRooms;
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        },
        getClassRooms() {
            console.log("Getting=>>>>", this.classRoomsData);
            return this.classRoomsData;
        },
        getSubjectsByStage: (state) => (stageValue) => {
            return state.subjects[stageValue] || [];
        },
    },
});
