<template>
    <v-container class="mt-0">
        <div>
            <div class="visible">
                <div class="right">
                    <div>
                        <v-breadcrumbs>
                            <v-breadcrumbs-item @click="goToChildDetails" link>
                                <font-awesome-icon
                                    :icon="['fas', 'circle-arrow-right']"
                                    style="font-size: 25px"
                                />
                            </v-breadcrumbs-item>
                            <v-breadcrumbs-item>
                                البيانات الشخصية</v-breadcrumbs-item
                            >
                        </v-breadcrumbs>
                    </div>
                </div>
                <div class="box">
                    <div class="head">
                        <div class="name">
                            {{ student.student_name }}
                        </div>
                    </div>
                    <div class="class" style="color: var(--therd-color)">
                        <div>
                            {{ student.educational_level }}
                        </div>
                        <div>
                            {{ student.gender }}
                        </div>
                    </div>
                    <div class="class" style="color: var(--therd-color)">
                        <div>
                            {{ student.section }}
                        </div>
                        <div>
                            فصل
                            {{ student.class }}
                        </div>
                    </div>
                    <div class="class" style="color: var(--therd-color)">
                        <div>الرقم القومى</div>
                        <div>
                            {{ student.National_id }}
                        </div>
                    </div>
                    <div class="class">
                        <div>تاريخ الميلاد</div>
                        <div>
                            {{ student.birthday }}
                        </div>
                    </div>
                    <div class="bg-white pa-0">
                        <div class="class">
                            <div>رقم الهاتف</div>
                            <div>
                                {{ student.student_phone }}
                            </div>
                        </div>
                        <div class="class">
                            <div>الايميل</div>
                            <div>
                                {{ student.student_email }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </v-container>
</template>
<script>
import { db } from "@/Firebase.js";
import {
    doc,
    getDoc,
    // getDocs,
    // query,
    // collection,
    // where,
    // updateDoc,
} from "firebase/firestore";
export default {
    data() {
        return {
            student: {
                notifications: [],
                student_name: "",
                student_phone: "",
                student_email: "",
                National_id: "",
                educational_level: "",
                class: "",
                section: "",
                gender: "",
                birthday: "",
                phone: "",
                tests: [],
                state: true,
                name: "",
                age: "",
                BithOfDate: "",
                gradeLevel: "",
                schoolYear: "",
                photo: {},
            },
        };
    },
    async created() {
           
        this.$nextTick(() => {
            window.scrollTo(0, 0);
            console.log("Scrolled to top");
        });
    
        const documentId = this.$route.params.id;
        try {
            const docSnap = await getDoc(doc(db, "students", documentId));
            if (docSnap.exists()) {
                const studentData = docSnap.data();
                this.student = studentData;
                console.log("this.student=>", this.student);
            } else {
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
        }
    },
    methods: {
        goToChildDetails() {
            this.$router.push({
                name: "ChildDetails",
                params: { id: this.$route.params.id },
            });
        },
    },
};
</script>
<style lang="scss" scoped>
.box {
    box-shadow: 0 0 10px #ddd;
    display: flex;
    flex-direction: column;
    width: calc(100% - 20px);
    padding: 10px;
    border-radius: 5px;
    position: relative;
    gap: 5px;
    margin: 20px auto;
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
.visible {
    opacity: 0;
    animation: fadeIn 1.5s ease-in-out forwards;
    margin-top: 20px;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
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
</style>
