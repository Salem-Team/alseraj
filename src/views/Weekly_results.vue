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
                                النتائج الأسبوعية</v-breadcrumbs-item
                            >
                        </v-breadcrumbs>
                    </div>
                </div>
                <div class="weekly">
                    <div
                        class="contain d-flex w-100"
                        v-for="(result, resultIndex) in student.Results"
                        s
                        :key="resultIndex"
                    >
                        <div
                            class="feat"
                            v-for="(subject, index) in result.weekly"
                            :key="index"
                        >
                            <div class="header">
                                <div>
                                    <div class="sub">
                                        {{ subject?.Subject_Name }}
                                    </div>
                                </div>
                                <div class="text-center">
                                    <v-progress-circular
                                        :model-value="subject?.Student_degree"
                                        :rotate="360"
                                        :size="80"
                                        :width="15"
                                        color="var(--main-color)"
                                    >
                                        <template v-slot:default>
                                            {{ subject?.Student_degree }}
                                            %
                                        </template>
                                    </v-progress-circular>
                                </div>
                            </div>
                            <div class="table">
                                <div class="Row">
                                    <div>درجة الطالب</div>
                                    <div>
                                        {{ subject?.Student_degree }}
                                    </div>
                                </div>
                                <div class="Row">
                                    <div>الدرجة النهائية</div>
                                    <div>
                                        {{ subject?.Major_degree }}
                                    </div>
                                </div>
                                <div class="Row">
                                    <div>تاريخ الإمتحان</div>
                                    <div>
                                        {{ subject?.Date }}
                                    </div>
                                </div>
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
    margin: 0 auto 30px;
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
