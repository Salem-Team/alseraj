<template>
    <div class="visible">
        <div class="right">
            <div>
                <v-breadcrumbs>
                    <v-breadcrumbs-item @click="$router.push('/admin')" link>
                        الإشراف
                    </v-breadcrumbs-item>
                    <v-breadcrumbs-divider />
                    <v-breadcrumbs-item>الفصول الدراسية</v-breadcrumbs-item>
                </v-breadcrumbs>
            </div>
        </div>
        <div v-if="class_rooms.length === 0">
            <svg
                style="
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 245px;
                "
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
        </div>
        <v-container>
            <div
                class="feat"
                v-for="classroom in class_rooms"
                :key="classroom.id"
            >
                <div class="feat2">
                    <div class="title">
                        <div>{{ classroom.grade }}</div>
                        <div
                            class="button"
                            @click="goToClassroom(classroom.grade)"
                        >
                            الطلاب
                        </div>
                    </div>
                    <div class="charts">
                        <div class="box">
                            <div>
                                <canvas
                                    :id="'myChart_' + classroom.id"
                                ></canvas>
                            </div>
                            <ul>
                                <li class="li">
                                    <font-awesome-icon
                                        :icon="['fas', 'graduation-cap']"
                                    />
                                    <div>الطلاب</div>
                                    <div>
                                        <span>{{
                                            classroom.total_students || 0
                                        }}</span>
                                        طالب
                                    </div>
                                </li>
                                <li>
                                    <div>ذكر</div>
                                    <div>
                                        <span>{{
                                            classroom.students_gender.male || 0
                                        }}</span>
                                        طالب
                                    </div>
                                </li>
                                <li>
                                    <div>أنثى</div>
                                    <div>
                                        <span>{{
                                            classroom.students_gender.female ||
                                            0
                                        }}</span>
                                        طالبة
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="box">
                            <div>
                                <canvas
                                    :id="'myChart_1_' + classroom.id"
                                ></canvas>
                            </div>

                            <ul>
                                <li>
                                    <div>عربي</div>
                                    <div>
                                        <span>{{
                                            classroom.sections.arabic || 0
                                        }}</span>
                                        طالب
                                    </div>
                                </li>
                                <li>
                                    <div>لغات</div>
                                    <div>
                                        <span>{{
                                            classroom.sections.english || 0
                                        }}</span>
                                        طالب
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div
                            class="box"
                            v-if="
                                user.roles.includes('الاطلاع على الحسابات') ||
                                user.roles.includes('الكل')
                            "
                        >
                            <div>
                                <canvas
                                    :id="'myChart_2_' + classroom.id"
                                ></canvas>
                            </div>
                            <ul>
                                <li class="li">
                                    <font-awesome-icon
                                        :icon="['fas', 'money-bills']"
                                    />
                                    <div>المصروفات المستحقة</div>
                                    <div>
                                        <span>{{
                                            classroom.fees.due_fees || 0
                                        }}</span>
                                        جنية
                                    </div>
                                </li>
                                <li>
                                    <div>المصروفات المدفوعة</div>
                                    <div>
                                        <span>{{
                                            classroom.fees.paid_fees || 0
                                        }}</span>
                                        جنية
                                    </div>
                                </li>
                                <li>
                                    <div>المصروفات المتبقية</div>
                                    <div>
                                        <span>{{
                                            classroom.fees.remaining_fees || 0
                                        }}</span>
                                        جنية
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div class="box big">
                            <div>
                                <canvas
                                    :id="'myChart_3_' + classroom.id"
                                ></canvas>
                            </div>
                            <ul>
                                <li>
                                    <div>إجمالي درجات الطلاب</div>
                                    <div></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </v-container>
    </div>
</template>

<script>
import { ref, watch, onMounted, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Chart } from "chart.js/auto";
import { collection, getDocs, getFirestore } from "firebase/firestore";

import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBdk3sqIHjXvB2C-O-lvkRgMFpg8pemkno",
    authDomain: "alseraj--almoner.firebaseapp.com",
    projectId: "alseraj--almoner",
    storageBucket: "alseraj--almoner.appspot.com",
    messagingSenderId: "462211256149",
    appId: "1:462211256149:web:a03ace3c70b306620169dc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
import { gsap } from "gsap";
import { mapState } from "pinia";
import { useAuthStore } from "../store/userStore";
export default {
    name: "The_Classes",
    computed: {
        ...mapState(useAuthStore, ["user"]),
    },
    mounted() {
        this.spliceRoles();
    },

    methods: {
        spliceRoles() {
            // Remove "مشرف" from each role
            let splicedRoles = this.user.roles.map((role) =>
                role.replace("مشرف ", "")
            );
            this.user.roles = splicedRoles;
        },
    },
    setup() {
        const route = useRoute();
        const router = useRouter(); // استخدام useRouter هنا
        const classId = ref(route.params.id);
        const class_rooms = ref([]);
        const sortDataByRanking = (data) => {
            return data.sort((a, b) => a.Ranking - b.Ranking);
        };

        watch(
            () => route.params.id,
            (newId) => {
                classId.value = newId;
            }
        );

        const getData = async () => {
            try {
                const querySnapshot = await getDocs(
                    collection(db, "class_rooms")
                );
                let fetchedData = querySnapshot.docs.map((doc) => {
                    return { id: doc.id, ...doc.data() };
                });
                // ترتيب البيانات حسب Ranking
                fetchedData = sortDataByRanking(fetchedData);
                class_rooms.value = fetchedData;

                nextTick(() => {
                    class_rooms.value.forEach((classroom) => {
                        if (
                            classroom &&
                            classroom.sections &&
                            classroom.fees &&
                            classroom.results
                        ) {
                            createChart("myChart_" + classroom.id, [
                                classroom.students_gender.male || 0,
                                classroom.students_gender.female || 0,
                            ]);
                            createChart_1("myChart_1_" + classroom.id, [
                                classroom.sections.arabic || 0,
                                classroom.sections.english || 0,
                            ]);
                            createChart_2("myChart_2_" + classroom.id, [
                                classroom.fees.paid_fees || 0,
                                classroom.fees.remaining_fees || 0,
                            ]);
                            createChart_3("myChart_3_" + classroom.id, [
                                classroom.results || 0,
                            ]);
                            // Animate card when the component mounts
                            gsap.fromTo(
                                ".feat",
                                {
                                    opacity: 0,
                                    y: 100,
                                    stagger: 0.2, // Stagger animation for each card
                                    ease: "power3.out", // Easing function
                                },
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 3,
                                    stagger: 0.2,
                                    ease: "power3.out",
                                }
                            );
                        } else {
                            console.log(
                                `Data missing for classroom ${classroom.id}`
                            );
                        }
                    });
                });
            } catch (error) {
                console.error("Error fetching documents: ", error);
            }
        };

        const createChart = (id, data) => {
            const ctx = document.getElementById(id);
            if (ctx) {
                new Chart(ctx, {
                    type: "pie",
                    data: {
                        datasets: [
                            {
                                label: "الجنس",
                                data: data,
                                backgroundColor: ["#7a7a7a7a", "#d8588cc4"],
                                hoverOffset: 4,
                            },
                        ],
                    },
                });
            }
        };

        const createChart_1 = (id, data) => {
            const ctx = document.getElementById(id);
            if (ctx) {
                new Chart(ctx, {
                    type: "doughnut",
                    data: {
                        datasets: [
                            {
                                label: "القسم",
                                data: data,
                                backgroundColor: ["#336699", "#72a8dd"],
                                hoverOffset: 4,
                            },
                        ],
                    },
                });
            }
        };

        const createChart_2 = (id, data) => {
            const ctx = document.getElementById(id);
            if (ctx) {
                new Chart(ctx, {
                    type: "doughnut",
                    data: {
                        datasets: [
                            {
                                label: "القسم",
                                data: data,
                                backgroundColor: ["#336699", "#d8588c"],
                                hoverOffset: 4,
                            },
                        ],
                    },
                });
            }
        };

        const createChart_3 = (id, results) => {
            const canvas = document.getElementById(id);

            if (canvas) {
                const ctx = canvas.getContext("2d");
                if (ctx) {
                    const labels = [
                        "شهر أكتوبر",
                        "شهر نوفمبر",
                        "الترم الأول",
                        "شهر فبراير",
                        "شهر مارس",
                        "الترم الثاني",
                    ];

                    const data = {
                        labels: labels,
                        datasets: [
                            {
                                data: labels.map(
                                    (label) => results[0][label] || 0
                                ),
                                borderColor: "rgba(255, 99, 132, 1)",
                                backgroundColor: "#d8588c",
                                stack: "combined",
                                type: "bar",
                            },
                        ],
                    };

                    const config = {
                        type: "line",
                        data: data,
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                title: {
                                    display: false,
                                },
                                tooltip: {
                                    callbacks: {
                                        title: () => "",
                                        label: () => "",
                                    },
                                },
                                legend: {
                                    display: false,
                                },
                            },
                            scales: {
                                y: {
                                    stacked: true,
                                },
                                x: {
                                    stacked: true,
                                },
                            },
                        },
                    };

                    const actions = [
                        // عمليات مختلفة للرسم البياني
                        {
                            name: "Randomize",
                            handler(chart) {
                                chart.data.datasets.forEach((dataset) => {
                                    dataset.data = labels.map(() =>
                                        Math.floor(Math.random() * 501)
                                    );
                                });
                                chart.update();
                            },
                        },
                        {
                            name: "Add Dataset",
                            handler(chart) {
                                const newDataset = {
                                    backgroundColor: `rgba(${Math.floor(
                                        Math.random() * 255
                                    )}, ${Math.floor(
                                        Math.random() * 255
                                    )}, ${Math.floor(
                                        Math.random() * 255
                                    )}, 0.2)`,
                                    borderColor: `rgba(${Math.floor(
                                        Math.random() * 255
                                    )}, ${Math.floor(
                                        Math.random() * 255
                                    )}, ${Math.floor(Math.random() * 255)}, 1)`,
                                    borderWidth: 1,
                                    stack: "combined",
                                    data: labels.map(() =>
                                        Math.floor(Math.random() * 501)
                                    ),
                                };
                                chart.data.datasets.push(newDataset);
                                chart.update();
                            },
                        },
                        {
                            name: "Add Data",
                            handler(chart) {
                                const data = chart.data;
                                if (data.datasets.length > 0) {
                                    data.labels.push(
                                        `Label ${data.labels.length + 1}`
                                    );

                                    data.datasets.forEach((dataset) => {
                                        dataset.data.push(
                                            Math.floor(Math.random() * 501)
                                        );
                                    });

                                    chart.update();
                                }
                            },
                        },
                        {
                            name: "Remove Dataset",
                            handler(chart) {
                                chart.data.datasets.pop();
                                chart.update();
                            },
                        },
                        {
                            name: "Remove Data",
                            handler(chart) {
                                chart.data.labels.pop();

                                chart.data.datasets.forEach((dataset) => {
                                    dataset.data.pop();
                                });

                                chart.update();
                            },
                        },
                    ];

                    const chart = new Chart(ctx, config);

                    return { chart, actions };
                } else {
                    console.error(`Canvas context not found for id: ${id}`);
                }
            } else {
                console.error(`Canvas element with id ${id} not found.`);
            }
        };

        const goToClassroom = (id) => {
            router.push(`/class/${id}`);
        };

        onMounted(getData);

        return {
            classId,
            class_rooms,

            goToClassroom,
        };
    },
};
</script>
<style lang="scss" scoped>
.student-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.student-item:hover {
    background-color: #2196f333;
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
.v-container {
    margin: 20px auto !important;
    flex-wrap: wrap;
    padding: 0;
    justify-content: flex-start !important;
    flex-direction: column;
    gap: 40px;
    display: flex;
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
    width: 100%;
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
    width: 40px;
    cursor: pointer;
    &:hover {
        opacity: 0.7;
    }
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
.feat {
    width: 100%;
    .feat2 {
        padding: 20px;
        box-shadow: 0 0 10px #ddd;
        border-radius: 5px;
    }
    .title {
        position: relative;
        font-size: 20px;
        color: var(--main-color);
        font-weight: bold;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        & > div:last-child {
            background: var(--main-color);
            color: #fff;
            width: 100px;
            border-radius: 5px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            border: 1px solid var(--main-color);
            cursor: pointer;
            &:hover {
                background: var(--therd-color);
            }
        }
        &::before {
            content: "";
            position: absolute;
            bottom: -20px;
            left: 50%;
            height: 4px;
            width: 100%;
            background: var(--secound-color);
            transform: translateX(-50%);
        }
    }
    .charts {
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        gap: 10px;
        margin-top: 40px;
        flex-wrap: wrap;
        .box {
            width: 32%;
            max-width: 100%;
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 10px #ddd;
            border-radius: 5px;
            padding: 10px;
            flex-direction: column;
            gap: 10px;
            justify-content: start;
            &:first-child {
                ul li {
                    &:not(.li)::before {
                        background: #7a7a7a7a;
                    }

                    &:last-of-type:not(.li) {
                        &::before {
                            background: #d8588cc4;
                        }
                    }
                }
            }
            &:nth-child(2) {
                ul li {
                    &:last-of-type:not(.li) {
                        &::before {
                            background: #72a8dd;
                        }
                    }
                }
            }
            &.big {
                width: 100%;
                & > div {
                    height: 300px;
                    canvas {
                        height: 300px !important;
                    }
                }
            }
            & > div {
                height: 100px;
                position: relative;
                margin-bottom: 20px;
                width: 100%;
                display: flex;
                justify-content: center;
                &::before {
                    content: "";
                    position: absolute;
                    bottom: -20px;
                    left: 50%;
                    height: 4px;
                    width: 100%;
                    background: var(--secound-color);
                    transform: translateX(-50%);
                }
            }
            ul {
                width: 100%;
                list-style: none;

                li {
                    position: relative;
                    margin-right: 20px;
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 7px;
                    gap: 10px;
                    & > div {
                        font-weight: bold;
                        font-size: 16px;
                    }
                    & > div:last-child {
                        color: var(--therd-color);
                        font-size: 12px;
                        text-align: center;
                        span {
                            font-size: 16px;
                        }
                    }
                    span {
                        font-weight: bold;
                        color: var(--therd-color);
                        font-size: 16px;
                    }
                    svg {
                        position: absolute;
                        width: 15px;
                        height: 15px;
                        right: -20px;
                        top: 50%;
                        transform: translateY(-50%);
                        border-radius: 2px;
                        color: var(--main-color);
                    }

                    &:not(.li)::before {
                        content: "";
                        position: absolute;
                        width: 15px;
                        height: 15px;
                        right: -20px;
                        top: 50%;
                        transform: translateY(-50%);
                        border-radius: 2px;
                        background: var(--main-color);
                    }

                    &:last-of-type:not(.li) {
                        &::before {
                            background: var(--pink-color);
                        }
                    }
                }
            }
        }
    }
}
.empty {
    background: var(--secound-color);
    margin-top: 10px;
    width: 90%;
    margin: 10px auto;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    font-weight: bold;
    color: var(--therd-color);
    font-size: 19px;
}
@media (max-width: 599px) {
    .feat .title {
        flex-direction: column;
        gap: 15px;
        align-items: flex-start;
        .button {
            width: 100% !important;
        }
    }
    .feat .charts {
        flex-direction: column;
        & .box {
            width: 100%;
        }
    }
}
@media (min-width: 600px) and (max-width: 768px) {
    .feat .title {
        flex-direction: column;
        gap: 15px;
        align-items: flex-start;
        .button {
            width: 100% !important;
        }
    }
    .feat .charts {
        flex-direction: column;
        & .box {
            width: 100%;
        }
    }
}
@media (min-width: 769px) {
    .v-container {
        flex-direction: row;
        align-items: stretch !important;
    }
}
.v-overlay__scrim {
    background: rgb(0 0 0 / 36%) !important;
}
</style>
