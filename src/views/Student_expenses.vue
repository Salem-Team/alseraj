<template>
    <v-container class="mt-0">
        <div>
            <!-- Header Section -->
            <div class="visible">
                <div class="right">
                    <v-breadcrumbs>
                        <v-breadcrumbs-item @click="goToChildDetails" link>
                            <font-awesome-icon
                                :icon="['fas', 'circle-arrow-right']"
                                style="font-size: 25px"
                            />
                        </v-breadcrumbs-item>
                        <v-breadcrumbs-item> المصروفات</v-breadcrumbs-item>
                    </v-breadcrumbs>
                </div>

                <div class="table">
                    <div class="invoice Title">
                        <font-awesome-icon
                            :icon="['fas', 'file-invoice-dollar']"
                        />

                        <div>فاتورة</div>
                    </div>
                    <div class="Row">
                        <div>المصروفات</div>
                        <div>{{ totalAmount || 0 }} جنية مصري</div>
                    </div>
                    <div class="Row">
                        <div>نظام الدفع</div>
                        <div>
                            {{ paymentMethod || "الدفع المباشر" }}
                        </div>
                    </div>
                    <div class="Row">
                        <div>نظام التقسيط</div>
                        <div>
                            {{ selectedPlan || "لا يوجد" }}
                        </div>
                    </div>
                    <div class="Row">
                        <div>المدفوع</div>
                        <div>{{ paidAmount || 0 }} جنية مصري</div>
                    </div>
                    <div class="Row">
                        <div>المتبقي</div>
                        <div>{{ remainingAmount || 0 }} جنية مصري</div>
                    </div>
                </div>
                <ExpenseRow label="المصروفات" :value="totalAmount" />
                <ExpenseRow
                    label="نظام الدفع"
                    :value="paymentMethod || 'الدفع المباشر'"
                />
                <ExpenseRow
                    label="نظام التقسيط"
                    :value="selectedPlan || 'لا يوجد'"
                />
                <ExpenseRow label="المدفوع" :value="paidAmount" />
                <ExpenseRow label="المتبقي" :value="remainingAmount" />

                <div class="deidline">
                    <div class="Title">
                        <font-awesome-icon :icon="['fas', 'circle-info']" />
                        <div>تفاصيل المدفوعات والأقساط المستحقة</div>
                    </div>
                </div>

                <v-row
                    v-if="paymentMethod === 'نظام التقسيط'"
                    class="details_row"
                >
                    <v-select
                        v-model="selectedPlan"
                        :items="selectPaid"
                        label="اختر نظام التقسيط"
                        @change="updateCircles"
                        outlined
                        dense
                    ></v-select>
                </v-row>

                <!-- Payment Timeline -->
                <div
                    v-if="paymentMethod === 'نظام التقسيط' && selectedPlan"
                    class="payment-section"
                >
                    <v-row style="margin: 10px 15px">
                        <div class="timeline-container">
                            <div class="timeline">
                                <div class="timeline-line"></div>
                                <div class="progress_container">
                                    <div
                                        class="progress"
                                        :style="{
                                            height:
                                                (paidAmount / totalAmount) *
                                                    100 +
                                                '%',
                                            backgroundColor:
                                                'var(--main-color)',
                                        }"
                                    ></div>
                                    <span class="progress-label mb-3"
                                        >{{ paidAmount }} مدفوعاتك</span
                                    >
                                </div>
                                <div
                                    v-for="month in numberOfMonths"
                                    :key="month"
                                    class="timeline-item"
                                >
                                    <div
                                        class="timeline-item-content"
                                        :style="{
                                            backgroundColor:
                                                paidAmount >=
                                                installmentAmount * month
                                                    ? '#d8588c'
                                                    : '#fff',
                                            color:
                                                paidAmount >=
                                                installmentAmount * month
                                                    ? '#fff'
                                                    : '#333',
                                        }"
                                    >
                                        <div class="timeline-item-header">
                                            <span
                                                class="month-name"
                                                :style="{
                                                    color:
                                                        paidAmount >=
                                                        installmentAmount *
                                                            month
                                                            ? '#fff'
                                                            : '#333',
                                                }"
                                            >
                                                {{ monthNames[month - 1] }}
                                            </span>
                                        </div>
                                        <div class="timeline-item-body">
                                            <p>
                                                القسط الشهري :
                                                {{ installmentAmount }} جنيه
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-row>

                    <!-- Statistics -->
                    <div
                        class="Title"
                        v-show="CreateChart"
                        style="margin-top: 55px"
                    >
                        <font-awesome-icon :icon="['fas', 'chart-pie']" />
                        <div>إحصائيات</div>
                    </div>
                    <div class="details" v-show="CreateChart">
                        <div class="myChart">
                            <canvas id="myChart"></canvas>
                        </div>
                        <ul>
                            <li class="li">
                                <font-awesome-icon
                                    :icon="['fas', 'money-bills']"
                                />
                                <div>المصروفات المستحقة</div>
                                <div>
                                    <span>{{ totalAmount }}</span> جنيه
                                </div>
                            </li>
                            <li>
                                <div>المصروفات المدفوعة</div>
                                <div>
                                    <span>{{ paidAmount }}</span> جنيه
                                </div>
                            </li>
                            <li>
                                <div>المصروفات المتبقية</div>
                                <div>
                                    <span>{{ remainingAmount }}</span> جنيه
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </v-container>
</template>

<script>
import { db } from "@/Firebase.js";
import { doc, getDoc } from "firebase/firestore";
import Chart from "chart.js/auto";

export default {
    created() {
        this.$nextTick(() => {
            window.scrollTo(0, 0);
            console.log("Scrolled to top");
        });
    },
    data() {
        return {
            selectPaid: ["شهر", "شهرين", "3 شهور", "4 شهور", "5 شهور"],
            amount: 0,
            selectedPaymentPlan: null,
            paymentPlans: ["شهر", "شهرين", "3 شهور", "4 شهور", "5 شهور"],
            steps: [
                "بدأ ",
                "الخطوة 1",
                "الخطوة 2",
                "الخطوة 3",
                "الخطوة 4",
                "الخطوة 5",
            ],
            paymentMethod: "نظام التقسيط",
            selectedPlan: "3 شهور",
            totalAmount: 1000,
            paidAmount: 700,
            remainingAmount: 300,
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
            monthNames: [
                "شهر نوفمبر",
                "شهر ديسمبر",
                "الترم الأول",
                "شهر فبراير",
                "شهر مارس",
            ],
            CreateChart: false,
        };
    },
    computed: {
        numberOfMonths() {
            if (!this.selectedPlan) return [];
            const monthsMap = {
                شهر: 1,
                شهرين: 2,
                "3 شهور": 3,
                "4 شهور": 4,
                "5 شهور": 5,
            };
            return Array.from(
                { length: monthsMap[this.selectedPlan] },
                (_, i) => i + 1
            );
        },
        installmentAmount() {
            if (!this.selectedPlan) return 0;
            const monthsMap = {
                شهر: 1,
                شهرين: 2,
                "3 شهور": 3,
                "4 شهور": 4,
                "5 شهور": 5,
            };
            return Math.floor(this.totalAmount / monthsMap[this.selectedPlan]);
        },
        remainingAmount() {
            return Math.max(this.totalAmount - this.paidAmount, 0);
        },
    },
    methods: {
        async created() {
            const documentId = this.$route.params.id;
            try {
                const docSnap = await getDoc(doc(db, "students", documentId));
                if (docSnap.exists()) {
                    const studentData = docSnap.data();
                    this.student = studentData;
                    console.log("this.student=>", this.student);
                    this.updateChart();
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },
        updateChart() {
            this.CreateChart = true;
            const ctx = document.getElementById("myChart");
            if (ctx) {
                if (this.myChart) {
                    this.myChart.destroy();
                }
                this.myChart = new Chart(ctx, {
                    type: "pie",
                    data: {
                        datasets: [
                            {
                                label: "المصروفات",
                                data: [this.paidAmount, this.remainingAmount],
                                backgroundColor: ["#369", "#d8588c"],
                                borderColor: "#fff",
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: "top",
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        let label = context.label || "";
                                        if (context.parsed) {
                                            label += `: ${context.parsed.toLocaleString()} جنيه`;
                                        }
                                        return label;
                                    },
                                },
                            },
                        },
                    },
                });
            }
        },
        goToChildDetails() {
            this.$router.push({
                name: "ChildDetails",
                params: { id: this.$route.params.id },
            });
        },
        validateTotalAmount() {
            if (this.totalAmount < 0) {
                this.totalAmount = 0;
                alert("المبلغ لا يمكن أن يكون أقل من صفر.");
            }
        },
        updatePaymentOptions() {
            // تحديث خيارات الدفع بناءً على التغييرات
        },
        updateCircles() {
            // تحديث الأقساط بناءً على التغييرات
        },
    },
    watch: {
        selectedPlan() {
            this.updateChart();
        },
        paidAmount() {
            this.updateChart();
        },
    },
    mounted() {
        this.created();
    },
};
</script>

<style scoped>
/* CSS styles here */
</style>

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
.Title {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 20px;
    color: var(--main-color);
    font-weight: bold;
    background: var(--secound-color);
    padding: 10px;
    border-radius: 5px;
    margin: 20px 10px;
    &.invoice {
        margin: 20px 0;
    }
}
.v-row {
    margin: 10px;
    display: flex;
    gap: 10px;
    align-items: center;
    & > div {
        width: 48%;
    }
}
.details {
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: space-between;
    margin: 0 10px;
    .myChart {
        width: 100px;
    }
    ul {
        width: 100%;
        list-style: none;
        position: relative;
        &::before {
            content: "";
            position: absolute;
            right: -20px;
            left: 50%;
            width: 4px;
            height: 100%;
            background: var(--secound-color);
            transform: translateX(-50%);
        }
        li {
            position: relative;
            margin-right: 20px;
            display: flex;
            justify-content: space-between;
            margin-bottom: 7px;
            gap: 10px;
            & > div {
                font-weight: bold;
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
.table {
    margin: 0 10px;

    .Row {
        width: 100%;
        display: flex;
        align-items: center;
        & > div {
            width: 50%;
            padding: 10px;
            border: 1px solid var(--secound-color);
            display: flex;
            align-items: center;
            text-align: center;
            justify-content: center;
            font-size: 16px;
            font-weight: bold;
            color: var(--therd-color);
        }
    }
}

.timeline-container {
    width: calc(100% - 110px) !important;
    margin: 20px !important;
}

.timeline {
    position: relative;
    margin-left: 20px;
}

.timeline-line {
    position: absolute;
    width: 2px;
    background-color: #ccc;
    left: 8px;
    top: 0;
    bottom: 0;
    margin: auto;
}
.progress_container {
    position: absolute;
    width: 5px;
    background-color: #eee;
    left: 8px;
    bottom: 0;
    margin: auto;
    height: calc(100% + 35px);
    top: 35px;
}

.timeline-item {
    position: relative;
    margin-bottom: 30px;
}

.timeline-item-content {
    position: relative;
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 10px;
    border-radius: 4px;
    position: relative;
    margin-left: 20px;
}
.timeline-item-content::before {
    content: "";
    position: absolute;
    bottom: -35px;
    left: -26.7px;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    /* border-radius: 50%; */
    transform: rotate(45deg);
    background-color: var(--main-color);
}
.timeline-item-content::after {
    content: "";
    position: absolute;
    top: 50%;
    right: -24px;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-right: 20px solid #d8588c;
}
.timeline-item-header {
    padding-bottom: 10px;
}

.timeline-item-body {
    font-size: 14px;
}

.month-name {
    font-weight: bold;
    color: var(--main-color);
}

.payment-section {
    margin-top: 20px;
}
.progress-label {
    font-size: 14px;
    font-weight: bold;
    position: absolute;
    right: 21px;
    width: 106px;
    background: var(--main-color);
    color: #fff;
    text-align: center;
    padding: 10px;
    border-radius: 5px;
}
.timeline-item-content {
    margin-left: 30px;
    transition: 0.5s;
    transition: margin-left 0.5s;
}
.success-message {
    color: #4caf50; /* لون أخضر لرسائل النجاح */
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 20px;
    transition: 0.5s;
}

.timeline-item-content.transition {
    margin-left: 60px; /* أو أي قيمة انتقال تفضلها */
}

.progress {
    transition: height 0.5s;
}

@media (max-width: 700px) {
    .details ul li {
        flex-direction: column;
        align-items: flex-start;
    }
    .details ul li:not(.li)::before,
    .details ul li svg {
        top: 13px;
    }
}
</style>
