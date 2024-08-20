<template>
    <v-container class="mt-0">
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
                        <v-breadcrumbs-item>الإحصائيات</v-breadcrumbs-item>
                    </v-breadcrumbs>
                </div>
            </div>
            <v-col>
                <div>
                    <v-select
                        v-model="selectedSubject"
                        :items="subjectArray"
                        :rules="[(v) => !!v || 'أختر مادة دراسية']"
                        label="أختر مادة دراسية"
                        variant="outlined"
                        required
                        @update:model-value="fetchStudent"
                    ></v-select>
                </div>
                <br />
                <div class="chart">
                    <canvas id="myChart"></canvas>
                </div>
            </v-col>
        </div>
    </v-container>
</template>

<script>
import { query, collection, getDocs, limit, where } from "firebase/firestore";
import { db } from "@/Firebase.js";
import { onMounted, ref } from "vue";
import { Chart, registerables } from "chart.js";
import { useRoute, useRouter } from "vue-router";
Chart.register(...registerables);

export default {
    created() {
        this.$nextTick(() => {
            window.scrollTo(0, 0);
            console.log("Scrolled to top");
        });
    },
    setup() {
        const monthlyData = ref([]);
        const subjectArray = ref([]);
        const allSubjectsArray = ref([]);
        const degreesBySubject = ref([]);
        const selectedSubject = ref(null);
        const chart = ref(null);
        const route = useRoute();
        const router = useRouter();

        const getStudent = async () => {
            try {
                const q = query(
                    collection(db, "students"),
                    where("National_id", "==", route.params.id),
                    limit(1)
                );

                const querySnapshot = await getDocs(q);

                monthlyData.value = [];
                const uniqueSubjects = new Set();

                querySnapshot.docs.forEach((doc) => {
                    const monthly = doc.data().Results?.["1"]?.Monthly;
                    if (monthly) {
                        Object.values(monthly).forEach(
                            ({ Certificate_title, Degrees }) => {
                                allSubjectsArray.value.push(Degrees);
                                monthlyData.value.push(Certificate_title);
                                Degrees.forEach((degree) => {
                                    if (degree.Subject_Name)
                                        uniqueSubjects.add(degree.Subject_Name);
                                });
                            }
                        );
                    }
                });

                subjectArray.value = Array.from(uniqueSubjects);
            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        };

        const getStudentDegreesBySubject = (subjectName) => {
            degreesBySubject.value = [];
            allSubjectsArray.value.forEach((monthlyArray) => {
                let foundSubject = false;
                monthlyArray.forEach((item) => {
                    if (item.Subject_Name === subjectName) {
                        foundSubject = true;
                        degreesBySubject.value.push(+item.Student_degree);
                    }
                });
                if (!foundSubject) degreesBySubject.value.push(0);
            });
        };

        const goToChildDetails = () => {
            router.push({
                name: "ChildDetails",
                params: { id: route.params.id },
            });
        };

        const fetchStudent = () => {
            getStudentDegreesBySubject(selectedSubject.value);
            updateChart();
        };

        const updateChart = () => {
            const ctx = document.getElementById("myChart").getContext("2d");
            const data = {
                labels: monthlyData.value,
                datasets: [
                    {
                        label: selectedSubject.value || "No Subject Selected",
                        data: degreesBySubject.value,
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(255, 159, 64, 0.2)",
                            "rgba(255, 205, 86, 0.2)",
                            "rgba(75, 192, 192, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(153, 102, 255, 0.2)",
                            "rgba(201, 203, 207, 0.2)",
                        ],
                        borderColor: [
                            "rgb(255, 99, 132)",
                            "rgb(255, 159, 64)",
                            "rgb(255, 205, 86)",
                            "rgb(75, 192, 192)",
                            "rgb(54, 162, 235)",
                            "rgb(153, 102, 255)",
                            "rgb(201, 203, 207)",
                        ],
                        borderWidth: 1,
                    },
                ],
            };

            if (chart.value) chart.value.destroy();
            chart.value = new Chart(ctx, {
                type: "bar",
                data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: { y: { beginAtZero: true } },
                },
            });
        };

        onMounted(() => {
            getStudent();
        });

        return {
            fetchStudent,
            selectedSubject,
            subjectArray,
            goToChildDetails,
        };
    },
};
</script>

<style lang="scss" scoped>
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
.chart {
    height: 50vh;
    width: 100%;
}
</style>
