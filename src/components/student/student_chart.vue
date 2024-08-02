<template>
    <v-row>
        <v-col>
            <div>
                <v-select
                    v-model="selectedSubject"
                    :items="studentStore.subjectArray"
                    :rules="[(v) => !!v || 'أختر المرحلة الدراسية']"
                    label="أختر المرحلة الدراسية"
                    variant="outlined"
                    required
                    @update:model-value="fetchStudent"
                ></v-select>
            </div>
            <br />
            <div>
                <canvas id="myChart"></canvas>
            </div>
        </v-col>
    </v-row>
</template>

<script>
import { onMounted, ref } from "vue";
import { useStudentStore } from "../../store/useStudentChart.js";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
    setup() {
        const studentStore = useStudentStore();
        const chart = ref(null);
        const selectedSubject = ref(null);

        const getStudent = async () => {
            await studentStore.getStudent();
        };
        getStudent();

        const fetchStudent = () => {
            // Ensure subjectName is passed as a string
            studentStore.getStudentDegreesBySubject(selectedSubject.value);
            updateChart();
        };

        const updateChart = () => {
            const ctx = document.getElementById("myChart").getContext("2d");
            const labels = studentStore.monthlyDta;
            const data = {
                labels: labels,
                datasets: [
                    {
                        label: selectedSubject.value || "No Subject Selected",
                        data: studentStore.degreesBySubject,
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
            const config = {
                type: "bar",
                data: data,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            };

            if (chart.value) {
                chart.value.destroy(); // Destroy the old chart before creating a new one
            }
            chart.value = new Chart(ctx, config);
        };

        onMounted(() => {
            getStudent();
            fetchStudent(); // Fetch student data and update the chart when the component is mounted
        });

        return {
            fetchStudent,
            studentStore,
            selectedSubject,
        };
    },
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
