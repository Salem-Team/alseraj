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
                                الإختبارات الأونلاين</v-breadcrumbs-item
                            >
                        </v-breadcrumbs>
                    </div>
                </div>
                <div
                    v-if="studentTests.length === 0"
                    style="
                        background: var(--secound-color);
                        padding: 10px;
                        text-align: center;
                        font-weight: bold;
                        color: var(--main-color);
                        width: calc(100% - 20px);
                        margin: 10px auto;
                    "
                >
                    لا توجد إختبارات حالياً
                </div>
<div class="feats">
    <div class="feat" v-for="(test, index) in studentTests" :key="test.id">
        <span class="header">
            <div class="index">{{index + 1}}</div>
<div>
    {{ test.subjectName }}
</div>
        </span>
        <div>{{ test.examTitle }}</div>
        <div>{{ test.className }} - {{ test.section }}</div>
        <div>
            <font-awesome-icon :icon="['fas', 'calendar-days']" />
            <div>{{ test.examDate }}</div>
        </div>
        <div class="time">
            <div>
                <font-awesome-icon :icon="['fas', 'clock']" />
                <div>
                    {{
                        new Date(`1970-01-01T${test.startTime}:00`).toLocaleString("ar-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                        })
                    }}
                </div>
            </div>
            <div>إلي</div>
            <div>
                <div>
                    {{
                        new Date(`1970-01-01T${test.endTime}:00`).toLocaleString("ar-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                        })
                    }}
                </div>
            </div>
        </div>
        <div>
            <button
                @click="openDialog_1(test.id)"
                v-if="isExamActive(test.examDate, test.startTime, test.endTime) && !hasTakenTest(test.id)"
            >
                الإختبار
            </button>
            <div
                v-else    style="width: 100%;"
            >

            <div
                style="width: 100%;"
              
            >
            <div   v-if="hasTakenTest(test.id)"    style="width: 100%;">
<div style="
                    color: #ffffff;
                    width: 100%;
                      background: var(--main-color);
                    padding: 5px 10px;
                    border-radius: 5px;
                    display: flex;
                    gap: 5px;
                    align-items: center;
                    justify-content: center;
                ">

                <font-awesome-icon :icon="['fas', 'thumbs-up']" />
                <div 
                >
                    لقد قمت بأداء هذا الاختبار
                    
            </div>
</div>
               
                           <div class="feat_3">
                            <div class="header">
                                <div>
                                    <font-awesome-icon :icon="['fas', 'square-poll-vertical']" />
                                    <div>درجة الطالب</div>
                                </div>
                                <div>
                                    {{ getStudentScore(test.id).score }} /
                                    {{ getStudentScore(test.id).maxScore }}
                                </div>
                            </div>
                            <div class="pro">
                                <div
                                    class="Progress"
                                    :style="{
                                        width:
                                            calculatePaymentProgress(
                                                 getStudentScore(test.id).score ,
                                                getStudentScore(test.id).maxScore 
                                            ) + '%',
                                    }"
                                ></div>
                                <div class="label-box">
                                    {{
                                        Math.ceil(
                                            calculatePaymentProgress(
                                                 getStudentScore(test.id).score,
                                               getStudentScore(test.id).maxScore 
                                            )
                                        )
                                    }}%
                                </div>
                            </div>
                        </div>
            </div>
               
                 <div  v-else style="
                    color: #ffffff;
                    width: 100%;
                    background: var(--pink-color);
                    padding: 5px 10px;
                    border-radius: 5px;
                    display: flex;
                    gap: 5px;
                    align-items: center;
                    justify-content: center;
                ">

                <font-awesome-icon :icon="['fas', 'ban']" />
                <div 
                >
                    الإختبار مغلق
                    
            </div>
</div>
                 </div>
                         
            </div>
        </div>
    </div>
</div>


                <v-dialog v-model="main_bubble_2" max-width="90%">
    <div class="search">
        <div class="right right_1">
            <v-breadcrumbs>
                <v-breadcrumbs-item>
                    {{ currentTest.subjectName }}
                </v-breadcrumbs-item>
            </v-breadcrumbs>
            <div class="left">
                <font-awesome-icon
                    :icon="['fas', 'xmark']"
                    @click="main_bubble_2 = false"
                    style="font-size: 25px"
                />
            </div>
        </div>

        <div class="Bottom">
            <div v-if="currentTest.questions.length > 0">
                <h3
                    style="
                        color: var(--main-color);
                        margin-bottom: 20px;
                    "
                >
                    عدد الأسئلة :
                    {{ currentTest.questions.length }}
                </h3>
                <div
                    class="Feat"
                    v-for="(question, index) in currentTest.questions"
                    :key="index"
                >
                    <div class="header">
                        <div class="number">
                            {{ index + 1 }}
                        </div>
                        <div class="degree">
                        {{((question.Question_degree) || (1)) + "درجة" }}
                            </div>
                    </div>
                    <div>
                        <!-- سؤال صح أو خطأ -->
<div v-if="question.type === 'true_false'">
    <textarea disabled :value="question.question" style="width: 100%; margin: 10px 0; padding: 8px 0; font-weight: bold;"></textarea>
    <div class="btns">
        <div
            :class="{ active: activeOption[index] === true, 'correct-answer': question.showCorrect && question.correctAnswer === true }"
            @click="toggleActiveOption(index, true)"
        >
            صح
        </div>
        <div
            :class="{ active: activeOption[index] === false, 'correct-answer': question.showCorrect && question.correctAnswer === false }"
            @click="toggleActiveOption(index, false)"
        >
            خطأ
        </div>
    </div>
</div>

<!-- سؤال اختيار من متعدد -->
<div v-if="question.type === 'multiple_choice'">
    <textarea
        disabled
        style="
            width: 100%;
            margin: 10px 0;
            padding: 8px 0;
            font-weight: bold;
        "
        type="text"
        :value="question.question"
    ></textarea>
    <div class="inputs">
        <div v-for="(option, optIndex) in question.options" :key="optIndex">
            <div
                :class="{
                    active: question.selectedOptionIndex === optIndex,
                    'correct-answer': question.showCorrect && option === question.correctAnswer
                }"
                @click="question.selectedOptionIndex = optIndex"
                class="custom-input"
                :style="{ color: question.showCorrect && option === question.correctAnswer ? 'green' : '' }"
            >
                {{ option }}
            </div>
        </div>
    </div>
</div>

<!-- سؤال مقالي -->
<div v-if="question.type === 'essay'">
    <textarea
        disabled
        style="
            width: 100%;
            margin: 10px 0;
            padding: 8px 0;
            font-weight: bold;
        "
        type="text"
        :value="question.question"
        placeholder="أدخل نص السؤال المقالي"
    ></textarea>

    <textarea
        id="student"
        style="
            width: 100%;
            margin: 10px 0;
            padding: 8px 0;
        "
        v-model="question.answer"
        placeholder="إجابة الطالب"
    ></textarea>

    <div v-if="question.showCorrect" style="color: green; font-weight: bold;">
        الإجابة النموذجية: {{ question.correctAnswer }}
    </div>
</div>

<!-- <div v-if="question.type === 'true_false'">
    <textarea disabled :value="question.question" style="width: 100%; margin: 10px 0; padding: 8px 0; font-weight: bold;"></textarea>
    <div class="btns">
        <div
            @click="toggleActiveOption(index, true)"
            :class="{ active: activeOption[index] === true }"
        >
            صح
        </div>
        <div
            @click="toggleActiveOption(index, false)"
            :class="{ active: activeOption[index] === false }"
        >
            خطأ
        </div>
    </div>
</div>





                        <div v-if="question.type === 'multiple_choice'">
                            <textarea
                                disabled
                                style="
                                    width: 100%;
                                    margin: 10px 0;
                                    padding: 8px 0;
                                    font-weight: bold;
                                "
                                type="text"
                                :value="question.question"
                            ></textarea>
                            <div class="inputs">
                                <div v-for="(option, optIndex) in question.options" :key="optIndex">
                                    <div
                                        :class="{ active: question.selectedOptionIndex === optIndex }"
                                        @click="question.selectedOptionIndex = optIndex"
                                        class="custom-input"
                                    >
                                        {{ option }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-else-if="question.type === 'essay'">
                            <textarea
                                disabled
                                style="
                                    width: 100%;
                                    margin: 10px 0;
                                    padding: 8px 0;
                                    font-weight: bold;
                                "
                                type="text"
                                :value="question.question"
                                placeholder="أدخل نص السؤال المقالي"
                            ></textarea>
                    
                            <textarea
                                id="student"
                                style="
                                    width: 100%;
                                    margin: 10px 0;
                                    padding: 8px 0;
                                "
                                v-model="question.answer"
                                placeholder="أدخل إجابتك"
                            ></textarea>
                        </div> -->
                    </div>
                </div>
            </div>
            <div v-else>
                <p>لم تتم إضافة أي أسئلة بعد.</p>
            </div>
                <div v-if="errorMessage" class="error-message">
                {{ errorMessage }}
            </div>
  <v-btn
    @click="finishTest"
    :loading="loading_btn"
    :disabled="isTestFinished"
    v-if="!isTestFinished" 
    class="mt-2"
    block
    style="background:var(--main-color);color:#fff;padding: 8px 0;"
>
    إنهاء الاختبار
</v-btn>

            <v-btn
    v-if="isTestFinished"
    @click="printModelAnswer"
    class="mt-2"
    block
    style="background:var(--main-color);color:#fff;padding: 8px 0;"
>
    طباعة الإجابة النموذجية
</v-btn>

        </div>
    </div>
</v-dialog>
                <!-- <v-dialog v-model="main_bubble_2" max-width="90%">
                    <div class="search">
                        <div class="right right_1">
                            <v-breadcrumbs>
                                <v-breadcrumbs-item>
                                    {{ currentTest.subjectName }}
                                </v-breadcrumbs-item>
                            </v-breadcrumbs>
                            <div class="left">
                                <font-awesome-icon
                                    :icon="['fas', 'xmark']"
                                    @click="main_bubble_2 = false"
                                    style="font-size: 25px"
                                />
                            </div>
                        </div>

                        <div class="Bottom">
                            <div v-if="currentTest.questions.length > 0">
                                <h3
                                    style="
                                        color: var(--main-color);
                                        margin-bottom: 20px;
                                    "
                                >
                                    عدد الأسئلة :
                                    {{ currentTest.questions.length }}
                                </h3>
                                <div
                                    class="Feat"
                                    v-for="(
                                        question, index
                                    ) in currentTest.questions"
                                    :key="index"
                                >
                                    <div class="header">
                                        <div class="number">
                                            {{ index + 1 }}
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            v-if="
                                                question.type === 'true_false'
                                            "
                                        >
                                            <textarea
                                                disabled
                                                :value="
                                                    currentTest.questions[index]
                                                        .question
                                                "
                                                style="
                                                    width: 100%;
                                                    margin: 10px 0;
                                                    padding: 8px 0;
                                                    font-weight: bold;
                                                "
                                            ></textarea>
                                            <div class="btns">
                                                <div
                                                    :class="{
                                                        active:
                                                            question.correctAnswer ===
                                                            true,
                                                    }"
                                                    @click="
                                                        setAnswer(index, true)
                                                    "
                                                    color="green"
                                                    dark
                                                >
                                                    صح
                                                </div>
                                                <div
                                                    :class="{
                                                        active:
                                                            question.correctAnswer ===
                                                            false,
                                                    }"
                                                    @click="
                                                        setAnswer(index, false)
                                                    "
                                                    color="red"
                                                    dark
                                                >
                                                    خطأ
                                                </div>
                                            </div>
                                        </div>
<div v-if="question.type === 'multiple_choice'">
    <textarea
      disabled
      style="
        width: 100%;
        margin: 10px 0;
        padding: 8px 0;
        font-weight: bold;
      "
      type="text"
      :value="question.question"
    ></textarea>
    <div class="inputs">
      <div v-for="(option, optIndex) in question.options" :key="optIndex">
        <div
          :class="{ active: question.selectedOptionIndex === optIndex }"
          @click="question.selectedOptionIndex = optIndex"
          class="custom-input"
        >
          {{ option }}
        </div>
      </div>
    </div>
</div>                                      
                                        <div
                                            v-else-if="
                                                question.type === 'essay'
                                            "
                                        >
                                            <textarea
                                                disabled
                                                style="
                                                    width: 100%;
                                                    margin: 10px 0;
                                                    padding: 8px 0;
                                                    font-weight: bold;
                                                "
                                                type="text"
                                                :value="question.question"
                                                placeholder="أدخل نص السؤال المقالي"
                                            ></textarea>
                                            <div class="essay">
                                                <div>درجة السؤال</div>
                                                <input
                                                    disabled
                                                    type="number"
                                                    :value="
                                                        question.Question_degree
                                                    "
                                                />
                                            </div>
                                            <textarea
                                                id="student"
                                                style="
                                                    width: 100%;
                                                    margin: 10px 0;
                                                    padding: 8px 0;
                                                "
                                                placeholder="أدخل الإجابة الصحيحة"
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <p>لم تتم إضافة أي أسئلة بعد.</p>
                            </div>
                            <div></div>
                        </div>
                        <v-btn
                                            @click="finishTest"
                                            :loading="loading_btn"
                                            class="mt-2"
                                            block
                                        >
                                            <font-awesome-icon
                                                :icon="['fas', 'floppy-disk']"
                                            />
                                           إنهاء الإختبار
                                        </v-btn>
                    </div>
                </v-dialog> -->
            </div>
        </div>
    </v-container>
</template>
<script>
import jsPDF from "jspdf";
import "jspdf-autotable";
import Amiri_Regular from "@/assets/fonts/Amiri-Regular.js";
import { db } from "@/Firebase.js";
import {
    doc,
    getDoc,
    getDocs,
    query,
    collection,
    where,
    setDoc,
    getFirestore
    // updateDoc,
} from "firebase/firestore";
export default {
    data() {
        return {
            studentTests: [],
            student: [],
            main_bubble_2: false,
            currentTime: new Date(),
            currentTest: [],
             activeInputIndex: null,
             loading_btn : null,
             errorMessage: '',
              activeOption: {},
              isTestFinished: false,
        };
    },

    async created() {
        this.$nextTick(() => {
            window.scrollTo(0, 0);
            console.log("Scrolled to top");
            setInterval(() => {
                this.currentTime = new Date(); // تحديث الوقت الحالي كل ثانية
            }, 1000);
          
            
        });

        const documentId = this.$route.params.id;
        try {
            const docSnap = await getDoc(doc(db, "students", documentId));
            if (docSnap.exists()) {
                const studentData = docSnap.data();
                this.student = studentData;
                console.log("this.student=>", this.student);
                this.fetchStudentTests(); // تأكد من استدعاء دالة لتحميل بيانات الاختبارات
            } else {
                console.error("No such document!");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    },

    methods: {
                calculatePaymentProgress(paid_Up, Expenses) {
            if (Expenses === 0) {
                return 0; // لتجنب القسمة على الصفر
            }
            return (paid_Up / Expenses) * 100;
        },

            hasTakenTest(testId) {
        return this.studentTests.some(test => 
            test.id === testId &&
            test.studentsTested &&
            test.studentsTested.some(student => student.nationalID === this.student.National_id)
        );
    },
    getStudentScore(testId) {
        const test = this.studentTests.find(test => test.id === testId);
        if (test) {
            const student = test.studentsTested.find(student => student.nationalID === this.student.National_id);
            if (student) {
                return student;
            }
        }
        return null;
    }
          ,
printModelAnswer(studentScore) {
    // الحصول على اسم المادة وعنوان الاختبار
    const subjectName = this.currentTest.subjectName  || "المادة";
    const examTitle = this.currentTest.examTitle || "العنوان";
    const examSection = this.currentTest.section || "القسم";

    // إنشاء مستند PDF بتنسيق أفقي
    const doc = new jsPDF("landscape");

    // إضافة الخط الخاص بك (افتراضياً تم تحميله)
    doc.addFileToVFS("Amiri-Regular.ttf", Amiri_Regular);
    doc.addFont("Amiri-Regular.ttf", "Amiri-Regular", "normal");
    doc.setFont("Amiri-Regular");

    // إعداد الحدود الخارجية للصفحة
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 10; // حجم الهامش من كل جانب
    doc.setLineWidth(0.5);
    doc.rect(
        margin,
        margin,
        pageWidth - 2 * margin,
        pageHeight - 2 * margin
    );

    // إضافة العنوان الرئيسي
    doc.setFontSize(20);
    doc.text("نتائج الاختبار", pageWidth / 2, 20, { align: "center" });

    // إعداد بيانات الجدول
    const tableColumn = ["رقم السؤال", "نوع السؤال", "إجابة الطالب", "الإجابة النموذجية"];
    const tableRows = [];

    // ملء بيانات الجدول بالإجابات
    this.currentTest.questions.forEach((question, index) => {
        let questionType = "";
        let studentAnswer = "لم يتم الإجابة";
        let modelAnswer = question.correctAnswer || "غير متاح";

        // تحديد نوع السؤال
        if (question.type === 'multiple_choice') {
            questionType = "اختيار من متعدد";
            studentAnswer = question.selectedOptionIndex !== undefined 
                ? question.options[question.selectedOptionIndex] 
                : "لم يتم الإجابة";
        } else if (question.type === 'true_false') {
            questionType = "صح وخطأ";
            if (this.activeOption[index] !== undefined) {
                studentAnswer = this.activeOption[index] ? "صح" : "خطأ";
            }
            modelAnswer = question.correctAnswer ? "صح" : "خطأ";
        } else if (question.type === 'essay') {
            questionType = "مقالي";
            studentAnswer = question.answer || "لم يتم الإجابة";
        }

        tableRows.push([
            index + 1, // رقم السؤال
            questionType, // نوع السؤال
            studentAnswer, // إجابة الطالب
            modelAnswer // الإجابة النموذجية
        ]);
    });

    // إعداد جدول الإجابات
    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 30,
        styles: {
            cellPadding: 8, // حجم الهامش داخل الخلية
            font: "Amiri-Regular",
            fontSize: 12,
            cellWidth: "wrap",
            halign: "left", // محاذاة النص أفقيًا لليسار لتناسب اتجاه الكتابة من اليمين لليسار
            valign: "middle", // محاذاة النص عموديًا
            lineColor: [0, 0, 0], // لون الحدود
            lineWidth: 0.5, // عرض الحدود
            dir: "rtl" // تحديد اتجاه النص من اليمين لليسار
        },
        headStyles: {
            valign: "middle", // محاذاة النص عموديًا
            fillColor: [220, 220, 220], // لون الخلفية لرؤوس الأعمدة
            textColor: [0, 0, 0], // لون النص لرؤوس الأعمدة
            fontStyle: "bold", // نمط الخط
            halign: "center", // محاذاة رؤوس الأعمدة لمنتصف
        },
        columnStyles: {
            0: { halign: 'center', cellWidth: 'auto' }, // محاذاة رقم السؤال لمنتصف
            1: { halign: 'center', cellWidth: 'auto' }, // محاذاة نوع السؤال لمنتصف
            2: { halign: 'left', cellWidth: 'auto' }, // محاذاة إجابة الطالب لليسار
            3: { halign: 'left', cellWidth: 'auto' }, // محاذاة الإجابة النموذجية لليسار
        },
        margin: { top: 35 }, // مسافة من أعلى الصفحة
    });

    // حساب النسبة المئوية
    const percentage = (studentScore.score / studentScore.maxScore) * 100;

    // إضافة بيانات الطالب ونتائج الاختبار إلى المستند
    doc.setFontSize(14);
    doc.text(`اسم الطالب: ${studentScore.studentName}`, margin, doc.lastAutoTable.finalY + 10);
    doc.text(`رقم الهوية: ${studentScore.nationalID}`, margin, doc.lastAutoTable.finalY + 20);
    doc.text(`درجة الطالب: ${studentScore.score} / ${studentScore.maxScore}`, margin, doc.lastAutoTable.finalY + 30);
    doc.text(`النسبة المئوية: ${percentage.toFixed(2)}%`, margin, doc.lastAutoTable.finalY + 40);
    doc.text(`مدة الامتحان: ${studentScore.examDuration}`, margin, doc.lastAutoTable.finalY + 50);
    doc.text(`وقت الانتهاء: ${studentScore.finishTime}`, margin, doc.lastAutoTable.finalY + 60);

    // تحديد اسم الملف بناءً على المادة والعنوان
    const fileName = `${subjectName}_${examTitle} - (${examSection}).pdf`.replace(/[/\\?%*:|"<>]/g, '_'); // استبدال الأحرف غير المسموح بها

    // حفظ ملف PDF
    doc.save(fileName);
}



,
async finishTest() {
    if (this.isTestFinished) {
        return; // منع النقر على الزر مرة أخرى
    }

    let totalScore = 0;
    const studentScore = {};
    const maxScore = this.currentTest.questions ? this.currentTest.questions.reduce((acc, question) => acc + (question.Question_degree || 1), 0) : 0;
    const finishTime = new Date();
    const finishTimeString = finishTime.toLocaleTimeString();

    this.errorMessage = '';

    if (Array.isArray(this.currentTest.questions)) {
        this.currentTest.questions.forEach((question, index) => {
            if (question.type === 'true_false') {
                if (this.activeOption && this.activeOption[index] !== undefined) {
                    if (this.activeOption[index] === question.correctAnswer) {
                        totalScore += question.Question_degree || 1;
                    }
                }
                question.showCorrect = true;
            } else if (question.type === 'multiple_choice') {
                if (this.options && this.options[question.selectedOptionIndex] !== undefined) {
                    if (this.options[question.selectedOptionIndex] === question.correctAnswer) {
                        totalScore += question.Question_degree || 1;
                    }
                }
                question.showCorrect = true;
            } else if (question.type === 'essay') {
                if (question.answer && question.answer.length >= 2) {
                    totalScore += question.Question_degree || 1;
                }
                question.showCorrect = true;
            }
        });
    } else {
        console.error("Questions array is not defined or not an array.");
        return;
    }

    studentScore.studentName = this.student.student_name || "Unknown";
    studentScore.nationalID = this.student.National_id || "Unknown";
    studentScore.score = totalScore;
    studentScore.maxScore = maxScore;
    studentScore.examDuration = this.calculateExamDuration() || "Unknown";
    studentScore.finishTime = finishTimeString;

    // إضافة score إلى studentsTested
    if (!this.currentTest.studentsTested) {
        this.currentTest.studentsTested = [];
    }
    const studentExists = this.currentTest.studentsTested.some(student => student.nationalID === studentScore.nationalID);
    if (!studentExists) {
        this.currentTest.studentsTested.push(studentScore);
        this.printModelAnswer(studentScore);
    } else {
        console.log(`الطالب ذو الـ ID ${studentScore.nationalID} موجود بالفعل.`);
    }

    // تسجيل البيانات في Firebase
    try {
        const db = getFirestore(); // تأكد من تعريف getFirestore بشكل صحيح
        const docRef = doc(db, "student_tests", this.testId); // استخدم testId لتحميل الاختبار المحدد
        await setDoc(docRef, this.currentTest, { merge: true }); // تحديث الوثيقة

        console.log('تم تسجيل بيانات الطالب بنجاح');
    } catch (error) {
        console.error("خطأ في تسجيل بيانات الطالب في Firebase: ", error);
    }

    this.isTestFinished = true; // تعيين حالة انتهاء الاختبار لمنع إعادة الضغط على الزر
}
// async finishTest() {
//     if (this.isTestFinished) {
//         return; // منع النقر على الزر مرة أخرى
//     }

//     let totalScore = 0;
//     const studentScore = {};
//     const maxScore = this.currentTest.questions.reduce((acc, question) => acc + (question.Question_degree || 1), 0);
//     const finishTime = new Date();
//     const finishTimeString = finishTime.toLocaleTimeString();

//     this.errorMessage = '';

//     this.currentTest.questions.forEach((question, index) => {
//         if (question.type === 'true_false') {
//             if (this.activeOption[index] !== undefined && this.activeOption[index] === question.correctAnswer) {
//                 totalScore += question.Question_degree || 1;
//             }
//             question.showCorrect = true;
//         } else if (question.type === 'multiple_choice') {
//             if (question.selectedOptionIndex !== null && question.selectedOptionIndex !== undefined && 
//                 question.options[question.selectedOptionIndex] === question.correctAnswer) {
//                 totalScore += question.Question_degree || 1;
//             }
//             question.showCorrect = true;
//         } else if (question.type === 'essay') {
//             if (question.answer && question.answer.length >= 2) {
//                 totalScore += question.Question_degree || 1;
//             }
//             question.showCorrect = true;
//         }
//     });

//     // إعداد بيانات الطالب
//     studentScore.studentName = this.student.student_name;
//     studentScore.nationalID = this.student.National_id;
//     studentScore.score = totalScore;
//     studentScore.maxScore = maxScore;
//     studentScore.examDuration = this.calculateExamDuration();
//     studentScore.finishTime = finishTimeString;

//     // إضافة score إلى studentsTested
//     const studentExists = this.currentTest.studentsTested.some(student => student.nationalID === studentScore.nationalID);
//     if (!studentExists) {
//         this.currentTest.studentsTested.push(studentScore);
//     } else {
//         console.log(`الطالب ذو الـ ID ${studentScore.nationalID} موجود بالفعل.`);
//     }

//     // تسجيل بيانات الطالب في Firebase
//     try {
//         const db = getFirestore();
//         const testRef = doc(db, "tests", this.currentTest.id); // افترض أن لديك حقل ID في this.currentTest
//         await setDoc(testRef, { studentsTested: this.currentTest.studentsTested }, { merge: true });

//         console.log('تم تسجيل بيانات الطالب بنجاح');
//     } catch (error) {
//         console.error("خطأ في تسجيل بيانات الطالب في Firebase: ", error);
//     }

//     this.isTestFinished = true; // تعيين حالة انتهاء الاختبار لمنع إعادة الضغط على الزر
// }



,
calculateExamDuration() {
    const startTime = new Date(`${this.currentTest.examDate}T${this.currentTest.startTime}`);
    const endTime = new Date(); // نفترض أن وقت الانتهاء هو الوقت الحالي
    const durationInSeconds = Math.floor((endTime - startTime) / 1000); // مدة الامتحان بالثواني
    const durationInMinutes = (durationInSeconds / 60).toFixed(2); // تحويل إلى دقائق
    return durationInMinutes; // إرجاع المدة بالدقائق
}
,

toggleActiveOption(index, value) {
    this.activeOption[index] = value;
},

convertTo24Hour(time12) {
    const [time, modifier] = time12.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    return { hours, minutes };
},

isExamActive(examDate, startTime12, endTime12) {
    if (!examDate || !startTime12 || !endTime12) {
        console.error("Missing examDate, startTime12, or endTime12");
        return false;
    }

    const now = this.currentTime;

    // تحويل الأوقات من تنسيق 12 ساعة إلى 24 ساعة
    const { hours: startHours, minutes: startMinutes } =
        this.convertTo24Hour(startTime12);
    const { hours: endHours, minutes: endMinutes } =
        this.convertTo24Hour(endTime12);

    // إنشاء التواريخ مع الأوقات المحددة
    const start = new Date(
        `${examDate}T${this.formatTime(startHours, startMinutes)}:00`
    );
    const end = new Date(
        `${examDate}T${this.formatTime(endHours, endMinutes)}:00`
    );

    // التحقق من أن التواريخ ضمن النطاق الصحيح
    if (start > end) {
        console.error("Start time cannot be after end time", {
            start,
            end,
        });
        return false;
    }

    // إغلاق الاختبار إذا انتهى الوقت
    if (now >= end) {
        return false; // الاختبار مغلق بعد الوقت النهائي
    }

    // إذا كان الوقت الحالي بين وقت البدء والانتهاء
    return now >= start && now < end;
},
    //         printModelAnswer() {
    //     let printContent = '';
        
    //     this.currentTest.questions.forEach((question, index) => {
    //         printContent += `<h3>السؤال ${index + 1}: ${question.question}</h3>`;
    //         if (question.type === 'true_false') {
    //             printContent += `<p>إجابة الطالب: ${this.activeOption[index] ? 'صح' : 'خطأ'}</p>`;
    //             printContent += `<p style="color: green;">الإجابة النموذجية: ${question.correctAnswer ? 'صح' : 'خطأ'}</p>`;
    //         } else if (question.type === 'multiple_choice') {
    //             const studentAnswer = question.options[question.selectedOptionIndex] || 'لم يتم الإجابة';
    //             printContent += `<p>إجابة الطالب: ${studentAnswer}</p>`;
    //             printContent += `<p style="color: green;">الإجابة النموذجية: ${question.correctAnswer}</p>`;
    //         } else if (question.type === 'essay') {
    //             printContent += `<p>إجابة الطالب: ${question.answer}</p>`;
    //             printContent += `<p style="color: green;">الإجابة النموذجية: ${question.correctAnswer}</p>`;
    //         }
    //         printContent += '<hr>';
    //     });

    //     const printWindow = window.open('', '', 'height=600,width=800');
    //     printWindow.document.write('<html><head><title>الإجابة النموذجية</title></head><body>');
    //     printWindow.document.write(printContent);
    //     printWindow.document.write('</body></html>');
    //     printWindow.document.close();
    //     printWindow.print();
    // },
//     finishTest() {
//     if (this.isTestFinished) {
//         return; // منع النقر على الزر مرة أخرى
//     }

//     let allAnswered = true;
//     let totalScore = 0;
//     const studentScore = {};
//     const maxScore = this.currentTest.questions.reduce((acc, question) => acc + (question.Question_degree || 1), 0);
//     const finishTime = new Date();
//     const finishTimeString = finishTime.toLocaleTimeString();

//     this.errorMessage = '';

//     this.currentTest.questions.forEach((question, index) => {
//         if (question.type === 'true_false') {
//             if (this.activeOption[index] === undefined) {
//                 allAnswered = false;
//             } else {
//                 if (this.activeOption[index] === question.correctAnswer) {
//                     totalScore += question.Question_degree || 1;
//                 }
//             }
//             question.showCorrect = true;
//         } else if (question.type === 'multiple_choice') {
//             if (question.selectedOptionIndex === null || question.selectedOptionIndex === undefined) {
//                 allAnswered = false;
//             } else {
//                 if (question.options[question.selectedOptionIndex] === question.correctAnswer) {
//                     totalScore += question.Question_degree || 1;
//                 }
//             }
//             question.showCorrect = true;
//         } else if (question.type === 'essay') {
//             if (!question.answer || question.answer.length < 2) {
//                 allAnswered = false;
//             } else {
//                 totalScore += question.Question_degree || 1;
//             }
//             question.showCorrect = true;
//         }
//     });

//     if (allAnswered) {
//         console.log("تم إنهاء الاختبار!");

//         studentScore.studentName = this.studentName;
//         studentScore.nationalID = this.nationalID;
//         studentScore.score = totalScore;
//         studentScore.maxScore = maxScore;
//         studentScore.examDuration = this.calculateExamDuration();
//         studentScore.finishTime = finishTimeString;

//         console.log(studentScore);

//         this.isTestFinished = true; // تعيين حالة انتهاء الاختبار لمنع إعادة الضغط على الزر
//     } else {
//         this.errorMessage = 'يرجى الإجابة على جميع الأسئلة بشكل صحيح قبل إنهاء الاختبار.';
//     }
// },

// calculateExamDuration() {
//     const startTime = new Date(`${this.currentTest.examDate}T${this.currentTest.startTime}`);
//     const endTime = new Date(); // نفترض أن وقت الانتهاء هو الوقت الحالي
//     const duration = Math.floor((endTime - startTime) / 1000); // مدة الامتحان بالثواني
//     return duration;
// },

//    toggleActiveOption(index, value) {
//        this.activeOption[index] = value;
//     },
//             convertTo24Hour(time12) {
//             const [time, modifier] = time12.split(" ");
//             let [hours, minutes] = time.split(":").map(Number);

//             if (modifier === "PM" && hours < 12) hours += 12;
//             if (modifier === "AM" && hours === 12) hours = 0;

//             return { hours, minutes };
//         },

//         isExamActive(examDate, startTime12, endTime12) {
//             if (!examDate || !startTime12 || !endTime12) {
//                 console.error("Missing examDate, startTime12, or endTime12");
//                 return false;
//             }

//             const now = this.currentTime;

//             // تحويل الأوقات من تنسيق 12 ساعة إلى 24 ساعة
//             const { hours: startHours, minutes: startMinutes } =
//                 this.convertTo24Hour(startTime12);
//             const { hours: endHours, minutes: endMinutes } =
//                 this.convertTo24Hour(endTime12);

//             // إنشاء التواريخ مع الأوقات المحددة
//             const start = new Date(
//                 `${examDate}T${this.formatTime(startHours, startMinutes)}:00`
//             );
//             const end = new Date(
//                 `${examDate}T${this.formatTime(endHours, endMinutes)}:00`
//             );

//             // التحقق من أن التواريخ ضمن النطاق الصحيح
//             if (start > end) {
//                 console.error("Start time cannot be after end time", {
//                     start,
//                     end,
//                 });
//                 return false;
//             }

//             // إغلاق الاختبار إذا انتهى الوقت
//             if (now >= end) {
//                 return false; // الاختبار مغلق بعد الوقت النهائي
//             }

//             // إذا كان الوقت الحالي بين وقت البدء والانتهاء
//             return now >= start && now < end;
//         },

        formatTime(hours, minutes) {
            return `${hours.toString().padStart(2, "0")}:${minutes
                .toString()
                .padStart(2, "0")}`;
        },
        // finishTest() {
        //     let allAnswered = true;
        //     this.errorMessage = ''; // إعادة تعيين رسالة الخطأ

        //     this.currentTest.questions.forEach(question => {
        //         if (question.type === 'true_false') {
        //             if (question.correctAnswer === null) {
        //                 allAnswered = false;
        //             }
        //         } else if (question.type === 'multiple_choice') {
        //             if (question.selectedOptionIndex === null) {
        //                 allAnswered = false;
        //             }
        //         } else if (question.type === 'essay') {
        //             if (!question.answer || question.answer.length < 2) {
        //                 allAnswered = false;
        //             }
        //         }
        //     });

        //     if (allAnswered) {
        //         // Logic to finish the test
        //         console.log("Test finished!");
        //         // Call your API or other finishing logic here
        //     } else {
        //         this.errorMessage = 'يرجى الإجابة على جميع الأسئلة بشكل صحيح قبل إنهاء الاختبار.';
        //     }
        // },
    shuffleAllQuestionsOptions() {
    if (Array.isArray(this.currentTest.questions)) {
        this.currentTest.questions.forEach((question, index) => {
            // تحقق من أن نوع السؤال هو multiple_choice وأنه يحتوي على مصفوفة options
            if (question.type === 'multiple_choice' && Array.isArray(question.options)) {
                this.shuffleOptions(index);
            } else {
                console.log("Skipping question without options array or with different type: ", question);
            }
        });
    }
},

shuffleOptions(questionIndex) {
    if (Array.isArray(this.currentTest.questions[questionIndex].options)) {
        let options = this.currentTest.questions[questionIndex].options;
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
    } else {
        console.error("Options is not an array for question: ", this.currentTest.questions[questionIndex]);
    }
}

  ,

        setAnswer(index, answer) {
            this.currentTest.questions[index].correctAnswer = answer;
            console.log(
                "this.currentTest.questions=>",
                this.currentTest.questions
            );
        },
        async openDialog_1(testId) {
            this.main_bubble_2 = false;
            this.testId = testId;
            console.log("this.testId=??", this.testId);
            try {
                const docRef = doc(db, "student_tests", testId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    this.currentTest = docSnap.data();
                          this.currentTest.questions.forEach(question => {
                if (question.type === 'multiple_choice') {
                    question.selectedOptionIndex = null;
                }
            });
                    this.main_bubble_2 = true;
                   if (Array.isArray(this.currentTest.questions)) {
                this.shuffleAllQuestionsOptions(); // خلط الخيارات
            }
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching document: ", error);
            }
        },

        async fetchStudentTests() {
            if (!this.student.class || !this.student.section) {
                console.error("Please select a class and section.");
                return;
            }

            try {
                this.studentTests = [];
                const q = query(
                    collection(db, "student_tests"),
                    where("className", "==", this.student.class),
                    where("section", "==", this.student.section)
                );

                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    this.studentTests.push(doc.data());
                });

                console.log("student_tests fetched successfully");
                console.log("this.fetchedSchedule =>", this.studentTests);
            } catch (error) {
                console.error("Error fetching student_tests: ", error);
            }
        },
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
.feats {
    width: calc(100% - 20px);
    margin: 10px auto;
    display: flex;
    gap: 13px;
    align-items: center;
    flex-wrap: wrap;
    .feat {
        width: 32%;
        box-shadow: 0 0 10px #ddd;
        border-radius: 5px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        flex-grow: 1;
span {
    display: flex;
    align-items: center;
    gap: 10px;
    .index {
        background: var(--main-color);
    color: #fff;
    width: 30px;
    border-radius: 5px;
    text-align: center;
    font-weight: bold;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    }
    div:not(.index) {
        color: var(--therd-color);
    font-weight: bold;
    font-size: 17px;
    }
}
        & > div:not(:last-of-type){
            background: var(--secound-color);
            padding: 5px 10px;
            border-radius: 5px;
            font-weight: bold;
            color: var(--therd-color);
            display: flex;
            align-items: center;
            gap: 10px;
            & > div {
                display: flex;
                gap: 10px;
                align-items: center;
            }
        }
       
        button {
            padding: 5px 10px;
            border-radius: 5px;
            font-weight: bold;
            color: var(--main-color);
            background: #fff;
            border: 1px solid;
            transition: 0.3s;
            &:hover {
                color: #fff;
                background: var(--main-color);
            }
        }
        & > div:last-of-type {
            display: flex;
            align-items: center;
            gap: 10px;
            & > button {
                color: #fff;
                background: var(--main-color);
                width: 100%;
                // &:last-child {
                //     background: var(--pink-color);
                // }
            }
        }
        .time > div {
            // text-wrap: nowrap;
        }
        .time > div:nth-child(2) {
            color: var(--pink-color);
        }
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
.search {
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    overflow: auto;
    .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        margin-bottom: 15px;
        color: var(--main-color);
        font-weight: bold;
        font-size: 20px;
        div {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        &::before {
            content: "";
            position: absolute;
            bottom: -15px;
            height: 3px;
            width: 100%;
            background: var(--secound-color);
            left: 50%;
            transform: translateX(-50%);
        }
    }
    .body {
        .input_container {
            width: 100%;
            position: relative;
            input , div{
                width: 100%;
                padding: 10px;
                border: 1px solid var(--secound-color);
                margin: 10px 0;
                border-radius: 5px;
            }
            svg {
                position: absolute;
                left: 30px;
                top: 50%;
                transform: translate(-50%, -50%);
                background: var(--main-color);
                padding: 5px 10px;
                border-radius: 5px;
                color: #fff;
            }
        }
    }
    .boxes {
        display: flex;
        flex-wrap: wrap;
        gap: 13px;
        margin-top: 35px;

        .box {
            flex-grow: 1;
            width: 24%;
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 10px #ddd;
            padding: 10px;
            border-radius: 5px;
            cursor: pointer;
            transition: 0.3s;
            &:hover {
                background: #33669929;
            }
            img {
                height: 50px;
            }
            div {
                font-size: 18px;
                font-weight: bold;
                color: var(--main-color);
            }
        }
    }
}
.top,
.Bottom {
    width: calc(100% - 20px);
    margin: 20px auto;
    .Btns {
        display: flex;
        gap: 10px;
        width: 100%;
        align-items: center;
        flex-wrap: wrap;
        & > * {
            width: 100%;
        }
    }
    .btns {
        display: flex;
        gap: 10px;
        width: 100%;
        & > div {
            flex-grow: 1;
            width: 48%;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            font-weight: bold;
            cursor: pointer;
            border: 1px solid var(--main-color);
            color: var(--main-color);
        }
    }
    p {
        background: var(--secound-color);
        padding: 10px;
        border-radius: 5px;
        color: var(--therd-color);
        font-weight: bold;
        text-align: center;
    }
    .Feat {
        box-shadow: 0 0 10px #ddd;
        border-radius: 5px;
        padding: 20px;
        margin-bottom: 10px;

        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .number {
                width: 30px;
                height: 30px;
                background: var(--main-color);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                border-radius: 5px;
                font-weight: bold;
            }
        }
        .inputs, div {
            & > div {
                width: 100%;
                margin-bottom: 10px;
                    border-radius: 5px;

                & > input {
                    width: 100%;
                    border-width: 2px;
                    border-style: solid;
                    padding: 10px;
                    border-radius: 5px;
                }
            }
        }
    }
    textarea {
        border: 1px solid var(--therd-color);
        padding: 10px !important;
        border-radius: 5px;
        resize: none;
    }
    textarea#student {
        resize: auto;
    }
    .essay {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: var(--secound-color);
        padding: 10px;
        border-radius: 5px;
        color: var(--therd-color);
        font-weight: bold;
        input {
            width: 40px !important;
            border: 1px solid var(--therd-color);
            border-radius: 5px;
            text-align: center;
            color: var(--therd-color);
            font-weight: bold;
            appearance: textfield;
        }
    }
}
.active {
    background-color: var(--main-color) !important;
    color: white !important;
    transition: 0.3s;
}
.selected {
    border: 2px solid var(--main-color); /* تغيير لون البوردر */
    background-color: var(--pink-color); /* تغيير لون الخلفية */
}
.custom-input {
  border-width: 2px;
  border-style: solid;
  padding: 8px;
  cursor: pointer;
  border-color: var(--secound-color);
}

.custom-input.active {
      background-color: var(--main-color) !important;
    border-color: var(--main-color)
}

.error-message {
    color: red;
    margin-bottom: 15px;
    font-weight: bold;
        text-align: center;
    padding: 10px;
    border-radius: 5px;
    transition: 0.5s;
}
svg {
    cursor: pointer;
}
.degree {
    width: fit-content !important;
    color: var(--therd-color);
    font-weight: bold;
}
.correct-answer {
    background: #21ad21 !important;
    color: #fff !important;
    border-color: #21ad21 !important;
}

.feat_3 {
                box-shadow: 0 0 10px #ddd;
                padding: 10px;
                border-radius: 5px;
                margin-top: 10px;
                .header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: var(--secound-color);
                    padding: 10px;
                    border-radius: 5px;
                    color: var(--therd-color);
                    font-weight: bold;
                    font-size: 16px;
                    justify-content: space-between;
                    margin-bottom: 10px;
                    div {
                        display: flex;
                        align-items: center;
                        gap: 5px;
                    }
                }
            }
            .progress-label .label-container {
    background-color: #3875a5;
    padding: 5px 10px;
    border-radius: 5px;
    position: relative;
    color: white;
}
.progress-label .arrow-down {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #3875a5;
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
}
.pro {
    background: var(--secound-color);
    height: 25px;
    width: 100%;
    position: relative;
    border-radius: 25px;
    .Progress {
        background: var(--main-color);
        width: 0;
        height: 100%;
        border-radius: 25px;
    }

    .label-box {
        position: absolute;
        border-radius: 4px;
        font-size: 16px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-weight: bold;
    }
}
@media (max-width: 700px) {
    .feats {
        .feat {
            width: 100% !important;
        }
    }
    .search .boxes {
        gap: 10px;
        .box {
            width: 48%;
            text-align: center;
            div {
                font-size: 14px;
            }
        }
    }
}
</style>
