<template>
    <div>
        <svg
            style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 245px;
            "
            v-if="loading1"
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
                <stop offset=".3" stop-color="#336699" stop-opacity=".9"></stop>
                <stop offset=".6" stop-color="#336699" stop-opacity=".6"></stop>
                <stop offset=".8" stop-color="#336699" stop-opacity=".3"></stop>
                <stop offset="1" stop-color="#336699" stop-opacity="0"></stop>
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
        <div class="right">
            <div>
                <v-breadcrumbs>
                    <v-breadcrumbs-item
                        @click="$router.push('/ClassRoom')"
                        link
                    >
                        <div>الفصول الدراسية</div>
                        <font-awesome-icon :icon="['fas', 'school']" />
                    </v-breadcrumbs-item>
                    <v-breadcrumbs-divider />
                    <v-breadcrumbs-item>{{ year }}</v-breadcrumbs-item>
                </v-breadcrumbs>
            </div>
            <div class="left">
                <img
                    src="../assets/class/search.png"
                    alt=""
                    @click="dialog_7 = true"
                    class="pluse icon"
                />
                <img
                    src="../assets/top_board/filter.svg"
                    alt=""
                    class="pluse icon"
                    @click="dialogFilter = true"
                />
                <img
                    src="../assets/class/square.png"
                    alt=""
                    @click="dialog = true"
                    class="pluse icon"
                    v-tooltip="add"
                />
            </div>
        </div>
        <v-container>
            <v-dialog v-model="dialog_7" width="90%">
                <div class="search" ref="searchContainer">
                    <div class="head">
                        <div>البحث</div>
                        <font-awesome-icon
                            :icon="['fas', 'xmark']"
                            @click="dialog_7 = false"
                        />
                    </div>
                    <div class="body">
                        <div class="input_container">
                            <input
                                type="text"
                                v-model="searchQuery"
                                @input="searchStudent"
                                placeholder="ادخل إسم الطالب"
                            />

                            <font-awesome-icon
                                :icon="['fas', 'magnifying-glass']"
                                @click="
                                    searchQuery === ''
                                        ? openDialog_7()
                                        : closeDialog_7()
                                "
                            />
                        </div>
                    </div>
                </div>
            </v-dialog>
            <v-row>
                <v-col>
                    <v-dialog v-model="dialog" width="90%">
                        <div class="search">
                            <div class="head">
                                <div>
                                    <font-awesome-icon
                                        :icon="['fas', 'gear']"
                                    />
                                    <div>الإعدادات</div>
                                </div>
                                <font-awesome-icon
                                    :icon="['fas', 'xmark']"
                                    @click="dialog = false"
                                />
                            </div>
                            <div class="boxes">
                                <div class="box" link @click="subject = true">
                                    <img
                                        src="../assets/class/book-stack.png"
                                        alt=""
                                    />
                                    <div>المواد الدراسية</div>
                                </div>
                                <div class="box" @click="openDialog">
                                    <img
                                        src="../assets/class/schedule.png"
                                        alt=""
                                    />
                                    <div>الجداول الدراسية</div>
                                </div>
                                <div class="box" @click="dialog_1 = true">
                                    <img
                                        src="../assets/class/notification.png"
                                        alt=""
                                    />
                                    <div>الإشعارات</div>
                                </div>
                                <div class="box" @click="showAddStudentDialog">
                                    <img
                                        src="../assets/class/student.png"
                                        alt=""
                                    />
                                    <div>طالب جديد</div>
                                </div>
                                <div class="box" @click="dialog_2 = true">
                                    <img
                                        src="../assets/class/picture.png"
                                        alt=""
                                    />
                                    <div>معرض الصور</div>
                                </div>
                                <div class="box" @click="main_bubble = true">
                                    <img
                                        src="../assets/class/exam.png"
                                        alt=""
                                    />
                                    <div>الإختبارت الأونلاين</div>
                                </div>
                                <div class="box" @click="openDialog2">
                                    <img
                                        src="../assets/class/plan.png"
                                        alt=""
                                    />
                                    <div>الخطط الأسبوعية</div>
                                </div>
                                <div class="box" @click="openDialogq">
                                    <img
                                        src="../assets/class/learning.png"
                                        alt=""
                                    />
                                    <div>المحتوي التعليمي</div>
                                </div>
                            </div>
                        </div>
                    </v-dialog>

                    <add-subject
                        @closeDialog="closeDialog"
                        :localSubject="subject"
                    />
                    <add-study-schedule
                        :year="year"
                        v-model="showDialog"
                        @close-dialog="closeDialog__"
                    />
                    <EducationalContentDialog :year="year" v-model="dialogq" />

                    <weeklyPlan v-model="showDialog2" :year="year" />

                    <v-dialog v-model="dialog_1" max-width="90%">
                        <v-card style="padding: 30px">
                            <div
                                style="
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    margin-bottom: 20px;
                                "
                            >
                                <div style="display: flex; align-items: center">
                                    <v-card-title>
                                        <span class="headline"
                                            >إضافة اشعار</span
                                        >
                                    </v-card-title>
                                </div>
                                <v-btn
                                    color="blue"
                                    @click="dialogAddNotice = true"
                                    >إضافة اشعار</v-btn
                                >
                            </div>
                            <v-card-text>
                                <v-row>
                                    <v-col
                                        v-if="
                                            filteredClasses[0].Notifications
                                                .length === 0
                                        "
                                    >
                                        <Empty_error text="لا يوجد اشعارات." />
                                    </v-col>
                                    <v-col
                                        v-else
                                        v-for="(
                                            classRoom, index
                                        ) in filteredClasses[0].Notifications"
                                        :key="classRoom.id"
                                        @click="selectClass(classRoom)"
                                        cols="12"
                                        md="4"
                                    >
                                        <v-alert
                                            :type="
                                                classRoom.NotificationType ===
                                                'سئ'
                                                    ? 'error'
                                                    : classRoom.NotificationType ===
                                                      'جيد'
                                                    ? 'success'
                                                    : 'info'
                                            "
                                            class="pa-3 mb-3 notification-card"
                                            border="left"
                                            colored-border
                                        >
                                            <div
                                                class="d-flex justify-space-between align-center"
                                            >
                                                <span>{{
                                                    classRoom.NoticeTitle
                                                }}</span>
                                                <div>
                                                    <v-icon
                                                        small
                                                        color="white"
                                                        class="mr-2"
                                                        @click="
                                                            editNotification(
                                                                filteredClasses[0]
                                                                    .id,
                                                                index
                                                            )
                                                        "
                                                        >mdi-pencil</v-icon
                                                    >
                                                    <v-icon
                                                        small
                                                        class="mr-2"
                                                        color="white"
                                                        @click="
                                                            deleteNotification(
                                                                filteredClasses[0]
                                                                    .id,
                                                                index
                                                            )
                                                        "
                                                        >mdi-delete</v-icon
                                                    >
                                                </div>
                                            </div>
                                            <div>
                                                {{ classRoom.theDescription }}
                                            </div>
                                        </v-alert>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-dialog
                                v-model="dialogAddNotice"
                                max-width="500px"
                            >
                                <v-card>
                                    <v-card-title>
                                        <span class="headline"
                                            >إضافة اشعار جديدة</span
                                        >
                                    </v-card-title>
                                    <v-card-text>
                                        <v-form ref="addForm">
                                            <v-text-field
                                                v-model="
                                                    newNotification.NoticeTitle
                                                "
                                                label="عنوان الاشعار"
                                                required
                                            ></v-text-field>
                                            <v-textarea
                                                v-model="
                                                    newNotification.theDescription
                                                "
                                                label="الوصف"
                                                required
                                            ></v-textarea>
                                            <v-select
                                                v-model="
                                                    newNotification.NotificationType
                                                "
                                                label="نوع الاشعار"
                                                required
                                                :items="[
                                                    'سئ',
                                                    'جيد',
                                                    'معلومات',
                                                ]"
                                            ></v-select>
                                        </v-form>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="dialogAddNotice = false"
                                            >إلغاء</v-btn
                                        >
                                        <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="
                                                addNotification(
                                                    filteredClasses[0].id
                                                )
                                            "
                                            >حفظ</v-btn
                                        >
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-card>
                    </v-dialog>
                    <v-dialog
                        v-model="editNotificationDialog"
                        max-width="500px"
                    >
                        <v-card>
                            <v-card-title>
                                <span class="headline">تعديل الاشعار</span>
                            </v-card-title>
                            <v-card-text>
                                <v-form ref="editForm">
                                    <v-text-field
                                        v-model="editedNotification.NoticeTitle"
                                        label="عنوان الاشعار"
                                        required
                                    ></v-text-field>
                                    <v-textarea
                                        v-model="
                                            editedNotification.theDescription
                                        "
                                        label="الوصف"
                                        required
                                    ></v-textarea>
                                    <v-select
                                        v-model="
                                            editedNotification.NotificationType
                                        "
                                        label="نوع الاشعار"
                                        required
                                        :items="['سئ', 'جيد', 'معلومات']"
                                    ></v-select>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="closeNotificationDialogs"
                                    >إلغاء</v-btn
                                >
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="saveNotificationEdit"
                                    >حفظ</v-btn
                                >
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <v-dialog v-model="dialog_2" max-width="90%">
                        <div style="background: white; padding: 53px">
                            <div
                                style="
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    margin-bottom: 20px;
                                "
                            >
                                <div style="display: flex; align-items: center">
                                    <h2 style="color: #2196f3">الصور</h2>
                                </div>
                                <v-btn
                                    color="blue"
                                    @click="dialogAddPhoto = true"
                                    >اضافه صوره</v-btn
                                >
                            </div>
                            <v-row>
                                <v-col
                                    v-if="
                                        filteredClasses[0].photos.length === 0
                                    "
                                >
                                    <Empty_error text="لا يوجد صور." />
                                </v-col>
                                <v-col
                                    v-else
                                    cols="12"
                                    md="4"
                                    v-for="(photo, index) in filteredClasses[0]
                                        .photos"
                                    :key="index"
                                >
                                    <v-card
                                        class="mb-3 notification-card"
                                        outlined
                                    >
                                        <v-card-title
                                            class="d-flex align-left"
                                            style="justify-content: end"
                                        >
                                            <div>
                                                <v-icon
                                                    small
                                                    class="mr-2"
                                                    @click="
                                                        deletePhotos(
                                                            filteredClasses[0]
                                                                .id,
                                                            index
                                                        )
                                                    "
                                                    >mdi-delete</v-icon
                                                >
                                            </div>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-img
                                                :src="photo.linkphoto"
                                                aspect-ratio="1"
                                                class="mb-2"
                                            ></v-img>
                                            <!-- عرض وقت الصورة -->
                                            <p
                                                style="
                                                    color: grey;
                                                    font-size: 0.9em;
                                                "
                                            >
                                                {{ photo.DatePhoto }}
                                            </p>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </div>
                    </v-dialog>

                    <v-dialog v-model="dialogAddPhoto" max-width="500px">
                        <v-card>
                            <v-card-title>
                                <span class="headline">إضافة صوره جديدة</span>
                            </v-card-title>
                            <v-card-text>
                                <v-form ref="addForm">
                                    <v-file-input
                                        style="width: 100%"
                                        v-model="AddPhoto.file"
                                        label="صورة"
                                        accept="image/*"
                                        variant="outlined"
                                        prepend-icon=""
                                        width="100%"
                                        prepend-inner-icon="mdi-paperclip"
                                        required
                                    ></v-file-input>
                                    <v-textarea
                                        v-model="AddPhoto.grade"
                                        label="وصف الصوره"
                                        required
                                    ></v-textarea>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="dialogAddPhoto = false"
                                    >إلغاء</v-btn
                                >
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="addPhoto(filteredClasses[0].id)"
                                    >حفظ</v-btn
                                >
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="main_bubble" max-width="90%">
                        <div class="search">
                            <div class="right right_1">
                                <div>
                                    <v-breadcrumbs>
                                        <v-breadcrumbs-item
                                            @click="main_bubble = false"
                                            link
                                        >
                                            <div>الإعدادت</div>
                                            <font-awesome-icon
                                                :icon="['fas', 'gear']"
                                            />
                                        </v-breadcrumbs-item>
                                        <v-breadcrumbs-divider />
                                        <v-breadcrumbs-item
                                            >الإختبارات
                                            الأونلاين</v-breadcrumbs-item
                                        >
                                    </v-breadcrumbs>
                                </div>
                                <div class="left">
                                    <font-awesome-icon
                                        :icon="['fas', 'xmark']"
                                        @click="main_bubble = false"
                                        style="font-size: 25px"
                                    />
                                </div>
                            </div>
                            <div class="add">
                                <div>(2) إختبارات</div>
                                <div>
                                    <font-awesome-icon
                                        :icon="['fas', 'plus']"
                                        @click="main_bubble_1 = true"
                                    />
                                </div>
                            </div>
                            <div class="feats">
                                <div class="feat">
                                    <div>المادة: عربي</div>
                                    <div>أختبار علي الوحدة الأولي</div>
                                    <div>فصل (1/1) - عربي</div>
                                    <div>
                                        <font-awesome-icon
                                            :icon="['fas', 'calendar-days']"
                                        />
                                        <div>2024/8/11</div>
                                    </div>
                                    <div class="time">
                                        <div>
                                            <font-awesome-icon
                                                :icon="['fas', 'clock']"
                                            />
                                            <div>10:00 م</div>
                                        </div>
                                        <div>إلي</div>
                                        <div>
                                            <div>10:00 م</div>
                                        </div>
                                    </div>
                                    <div>(10) طلاب تم اختبارهم</div>
                                    <button>الطلاب</button>
                                    <div>
                                        <button @click="main_bubble_2 = true">
                                            الإختبار
                                        </button>
                                        <button>حذف</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <v-dialog v-model="main_bubble_2" max-width="90%">
                            <div class="search">
                                <div class="right right_1">
                                    <v-breadcrumbs>
                                        <v-breadcrumbs-item
                                            ><input
                                                style="width: 80%"
                                                type="text"
                                                value="عربي"
                                        /></v-breadcrumbs-item>
                                    </v-breadcrumbs>
                                    <div class="left">
                                        <font-awesome-icon
                                            :icon="['fas', 'xmark']"
                                            @click="main_bubble_2 = false"
                                            style="font-size: 25px"
                                        />
                                    </div>
                                </div>
                                <div class="top">
                                    <v-text-field
                                        v-model="userName_0"
                                        label="عنوان الإختبار"
                                        style="
                                            color: var(--therd-color);
                                            font-weight: bold;
                                        "
                                    ></v-text-field>
                                    <v-select
                                        v-model="newTest.section"
                                        :items="section"
                                        label="القسم"
                                        required
                                        style="
                                            color: var(--therd-color);
                                            font-weight: bold;
                                        "
                                    ></v-select>

                                    <v-select
                                        v-model="newTest.className"
                                        :items="all_classes"
                                        label="الفصل"
                                        required
                                        style="
                                            color: var(--therd-color);
                                            font-weight: bold;
                                        "
                                    ></v-select>

                                    <v-text-field
                                        v-model="
                                            newTest.questions[0].Date_Testing
                                        "
                                        label="تاريخ بدأ الاختبار"
                                        required
                                        type="date"
                                        dir="ltr"
                                        lang="ar"
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="
                                            newTest.questions[0].Time_Testing
                                        "
                                        label="وقت بداية الإختبار"
                                        type="time"
                                        required
                                    ></v-text-field>
                                    <v-text-field
                                        label="وقت نهاية الإختبار"
                                        type="time"
                                        required
                                    ></v-text-field>
                                    <div class="Btns">
                                        <v-btn
                                            :loading="loading"
                                            class="mt-2"
                                            type="submit"
                                            block
                                            style="
                                                color: #fff;
                                                font-weight: bold;
                                                background: var(--main-color);
                                                padding: 20px;
                                            "
                                        >
                                            <font-awesome-icon
                                                :icon="['fas', 'floppy-disk']"
                                            />
                                            <div>حفظ التغييرات</div>
                                        </v-btn>
                                        <v-menu>
                                            <template
                                                v-slot:activator="{ props }"
                                            >
                                                <v-btn
                                                    color="var(--main-color)"
                                                    v-bind="props"
                                                    style="
                                                        color: #fff;
                                                        font-weight: bold;
                                                        background: var(
                                                            --main-color
                                                        );
                                                    "
                                                >
                                                    <font-awesome-icon
                                                        :icon="['fas', 'plus']"
                                                    />
                                                    <div>إضافة سؤال</div>
                                                </v-btn>
                                            </template>
                                            <v-list>
                                                <v-list-item @click="AddQu_1">
                                                    <v-list-item-title>
                                                        <font-awesome-icon
                                                            :icon="[
                                                                'fas',
                                                                'check',
                                                            ]"
                                                        />
                                                    </v-list-item-title>
                                                </v-list-item>
                                                <v-list-item @click="AddQu_2">
                                                    <v-list-item-title>
                                                        <font-awesome-icon
                                                            :icon="[
                                                                'fas',
                                                                'list-check',
                                                            ]"
                                                        />
                                                    </v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                    </div>
                                </div>
                                <div class="Bottom">
                                    <div v-if="questions.length > 0">
                                        <h3
                                            style="
                                                color: var(--main-color);
                                                margin-bottom: 20px;
                                            "
                                        >
                                            عدد الأسئلة : {{ questions.length }}
                                        </h3>
                                        <div
                                            class="Feat"
                                            v-for="(
                                                question, index
                                            ) in questions"
                                            :key="index"
                                        >
                                            <div class="header">
                                                <div class="number">
                                                    {{ index + 1 }}
                                                </div>
                                                <font-awesome-icon
                                                    @click="
                                                        removeQuestion(index)
                                                    "
                                                    :icon="['fas', 'trash']"
                                                    style="
                                                        font-size: 20px;
                                                        color: var(
                                                            --pink-color
                                                        );
                                                    "
                                                />
                                            </div>
                                            <div>
                                                <div
                                                    v-if="
                                                        question.type ===
                                                        'true_false'
                                                    "
                                                >
                                                    <textarea
                                                        v-model="
                                                            questions[index]
                                                                .question
                                                        "
                                                        placeholder="أدخل نص السؤال"
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
                                                                setAnswer(
                                                                    index,
                                                                    true
                                                                )
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
                                                                setAnswer(
                                                                    index,
                                                                    false
                                                                )
                                                            "
                                                            color="red"
                                                            dark
                                                        >
                                                            خطأ
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    v-else-if="
                                                        question.type ===
                                                        'multiple_choice'
                                                    "
                                                >
                                                    <textarea
                                                        style="
                                                            width: 100%;
                                                            margin: 10px 0;
                                                            padding: 8px 0;
                                                            font-weight: bold;
                                                        "
                                                        type="text"
                                                        v-model="
                                                            question.question
                                                        "
                                                    ></textarea>
                                                    <div class="inputs">
                                                        <div
                                                            v-for="(
                                                                option, optIndex
                                                            ) in question.options"
                                                            :key="optIndex"
                                                        >
                                                            <input
                                                                :style="{
                                                                    borderColor:
                                                                        optIndex ===
                                                                        0
                                                                            ? 'var(--main-color)'
                                                                            : 'var(--pink-color)',
                                                                    borderWidth:
                                                                        '2px',
                                                                    borderStyle:
                                                                        'solid',
                                                                }"
                                                                v-model="
                                                                    questions[
                                                                        index
                                                                    ].options[
                                                                        optIndex
                                                                    ]
                                                                "
                                                                @change="
                                                                    updateOption(
                                                                        index,
                                                                        optIndex
                                                                    )
                                                                "
                                                                type="text"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <p>لم تتم إضافة أي أسئلة بعد.</p>
                                    </div>
                                </div>
                            </div>
                        </v-dialog>
                        <v-dialog v-model="main_bubble_1" max-width="90%">
                            <div class="search">
                                <div class="right right_1">
                                    <v-breadcrumbs>
                                        <v-breadcrumbs-item
                                            >إضافة إختبار</v-breadcrumbs-item
                                        >
                                    </v-breadcrumbs>
                                    <div class="left">
                                        <font-awesome-icon
                                            :icon="['fas', 'xmark']"
                                            @click="main_bubble_1 = false"
                                            style="font-size: 25px"
                                        />
                                    </div>
                                </div>
                                <v-form
                                    validate-on="submit lazy"
                                    @submit.prevent="submit"
                                    style="margin-top: 20px"
                                >
                                    <v-text-field
                                        v-model="userName"
                                        label="المادة"
                                        style="
                                            color: var(--therd-color);
                                            font-weight: bold;
                                        "
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="userName_0"
                                        label="عنوان الإختبار"
                                        style="
                                            color: var(--therd-color);
                                            font-weight: bold;
                                        "
                                    ></v-text-field>
                                    <v-select
                                        v-model="newTest.section"
                                        :items="section"
                                        label="القسم"
                                        required
                                        style="
                                            color: var(--therd-color);
                                            font-weight: bold;
                                        "
                                    ></v-select>

                                    <v-select
                                        v-model="newTest.className"
                                        :items="all_classes"
                                        label="الفصل"
                                        required
                                        style="
                                            color: var(--therd-color);
                                            font-weight: bold;
                                        "
                                    ></v-select>

                                    <v-text-field
                                        v-model="
                                            newTest.questions[0].Date_Testing
                                        "
                                        label="تاريخ بدأ الاختبار"
                                        required
                                        type="date"
                                        dir="ltr"
                                        lang="ar"
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="
                                            newTest.questions[0].Time_Testing
                                        "
                                        label="وقت بداية الإختبار"
                                        type="time"
                                        required
                                    ></v-text-field>
                                    <v-text-field
                                        label="وقت نهاية الإختبار"
                                        type="time"
                                        required
                                    ></v-text-field>

                                    <v-btn
                                        :loading="loading"
                                        class="mt-2"
                                        text="إضافة"
                                        type="submit"
                                        block
                                        style="
                                            color: #fff;
                                            font-weight: bold;
                                            background: var(--main-color);
                                            padding: 20px;
                                        "
                                    ></v-btn>
                                </v-form>
                            </div>
                        </v-dialog>
                    </v-dialog>
                </v-col>
            </v-row>
            <v-snackbar
                v-model="snackbar.visible"
                :color="snackbar.color"
                timeout="3000"
            >
                {{ snackbar.message }}
                <v-btn text @click="snackbar.visible = false">Close</v-btn>
            </v-snackbar>

            <ul class="show_details">
                <li v-if="selectedClassj">
                    <font-awesome-icon :icon="['fas', 'filter']" />
                    <div>فصل {{ selectedClassj }}</div>
                </li>
                <li v-if="filtersy.byGrades">
                    <font-awesome-icon :icon="['fas', 'filter']" />
                    <div>نتائج {{ filtersy.byGrades }}</div>
                </li>
                <li v-if="paymentSortActive">
                    <font-awesome-icon :icon="['fas', 'filter']" />
                    <div>ترتيب حسب المدفوعات</div>
                </li>
                <li v-if="filteredStudentsCount">
                    <font-awesome-icon :icon="['fas', 'filter']" />
                    <div>نتيجة الفلتر: {{ filteredStudentsCount }}</div>
                </li>
            </ul>

            <v-dialog v-model="dialogFilter" width="90%">
                <div class="filter">
                    <div class="head">
                        <div>
                            <font-awesome-icon :icon="['fas', 'filter']" />
                            <div>الفلتر</div>
                        </div>
                        <font-awesome-icon
                            :icon="['fas', 'xmark']"
                            @click="dialogFilter = false"
                        />
                    </div>

                    <div class="body">
                        <div>
                            <v-switch
                                v-model="paymentSortActive"
                                label="ترتيب حسب المدفوعات"
                                :style="{
                                    color: paymentSortActive
                                        ? 'var(--main-color)'
                                        : '',
                                }"
                                style="
                                    font-weight: bold;
                                    background: whitesmoke;
                                    margin: 10px 0;
                                    border-radius: 5px;
                                    padding: 0 10px;
                                "
                                @blur="handlePaymentSortChange"
                                class="filter-switch"
                                color="var(--main-color)"
                                hide-details
                            ></v-switch>
                        </div>
                        <div>
                            <v-select
                                v-model="filtersy.byGrades"
                                :items="gradeOptions"
                                label="ترتيب حسب النتائج"
                                outlined
                                hide-details
                            ></v-select>
                        </div>
                        <div>
                            <v-select
                                v-model="selectedClassj"
                                :items="all_classes"
                                label="اختر الفصل الدراسي"
                                outlined
                                hide-details
                            ></v-select>
                        </div>
                    </div>
                    <div class="footer">
                        <div @click="applyFilters">
                            <font-awesome-icon :icon="['fas', 'filter']" />
                            <div>تطبيق الفلتر</div>
                        </div>
                        <div @click="resetFilters">
                            <font-awesome-icon :icon="['fas', 'retweet']" />
                            <div>إعادة تعيين</div>
                        </div>
                    </div>
                </div>
            </v-dialog>
        </v-container>
        <StudentList
            :year="year"
            :sortStudents="sortStudentsByYearAndAlphabetically"
            :selectedSection="selectedSection"
            :isSortedAscending="isSortedAscending"
            :selectedClassj="selectedClassj"
            :paymentSortActive="paymentSortActive"
            :gradeSortActive="filtersy.byGrades"
            :gradeOptions="gradeOptions"
            :filteredStudentList="students"
            @updateFilteredCount="updateFilteredCount"
            @close-dialog="dialog = false"
        />
        <v-dialog
            v-model="showDeleteDialog"
            max-width="500px"
            persistent
            scrollable
        >
            <v-card>
                <v-card-title class="headline">تأكيد الحذف</v-card-title>
                <v-card-subtitle>
                    هل أنت متأكد أنك تريد حذف هذا الكارد؟
                </v-card-subtitle>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="showDeleteDialog = false">إلغاء</v-btn>
                    <v-btn color="red" @click="deleteQuestion">حذف</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import EducationalContentDialog from "@/components/EducationalContentDialog.vue";
import StudentList from "@/components/StudentList.vue";
import Empty_error from "@/components/Empty_error.vue";
import { useDialogStore } from "@/store/useDialogStore";
import { reactive } from "vue";
import { mapActions } from "pinia";
import { usenotification } from "../store/notification.js";
import "vue-toastification/dist/index.css"; // Import the CSS file
// import confirm_message2 from "@/components/confirm_message2.vue";
// import { decodeURIComponent } from "vue-router";
import addSubject from "@/components/subject/addSubject.vue";
// import addStudySchedule from "@/components/add_study_schedule.vue";
import AddStudySchedule from "@/components/add_study_schedule.vue";
import weeklyPlan from "@/components/weeklyPlan.vue";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    getFirestore,
    addDoc,
    deleteDoc,
    query,
    writeBatch,
    where,
    // serverTimestamp,
    orderBy,
} from "firebase/firestore";
import { initializeApp } from "@firebase/app";
import { getStorage } from "firebase/storage";

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
    name: "ClassPage",
    components: {
        StudentList,
        addSubject,
        AddStudySchedule,
        weeklyPlan,
        // confirm_message2,
        Empty_error,
        EducationalContentDialog,
    },
    props: ["year"],
    setup() {
        const dialogStore = useDialogStore();
        const showAddStudentDialog = () => {
            dialogStore.showAddStudentDialog();
        };

        const showSearchStudentDialog = () => {
            dialogStore.showSearchStudentDialog();
        };
        return {
            showAddStudentDialog,
            showSearchStudentDialog,
        };
    },
    data() {
        return {
            userName_0: "",
            questions: [],
            items: [
                { title: "Click Me" },
                { title: "Click Me" },
                { title: "Click Me" },
                { title: "Click Me 2" },
            ],
            loading: false,
            rules: [(value) => this.checkApi(value)],
            timeout: null,
            userName: "",
            showDeleteDialog: false,
            selectedQuestionId: null,
            questionsDialog: false,
            selectedTestQuestions: [],
            isAscending: true,
            existingQuestions: [],
            main_bubble: false,
            main_bubble_1: false,
            main_bubble_2: false,
            paymentSortActive: false,
            selectedClassj: null,
            activeButton: "الكل",
            all_classes: ["1/1", "1/2", "2/1", "2/2", "3/1", "3/2"],
            section: ["عربي", "لغات"],
            selectedSection: "الكل",
            dialog_7: false,
            dialog_6: false,
            showDialog: false,
            showDialog2: false,
            isSortedAscending: true,
            dialogq: false,
            showSnackbar: false,
            StudySchedule: {
                // البيانات التي ترغب في تمريرها إلى المكون
            },
            filtersy: {
                byGrades: "",
            },
            newTest: {
                className: "",
                section: "",
                grade: "", // إضافة الحقل الجديد للصف الدراسي
                questions: [
                    {
                        title: "",
                        question: "",
                        correctAnswer: "",
                        wrongAnswer1: "",
                        wrongAnswer2: "",
                        Date_Testing: "",
                        Time_Testing: "",
                    },
                ],
                exam_id: "",
            },
            snackbar: {
                visible: false,
                message: "",
                color: "error",
            },
            class_rooms: [],
            photos: [
                {
                    Date: "",
                    link: "",
                },
            ],
            subject: false,

            sortActive: false, // متغير لتتبع حالة الترتيب
            dialog: false,
            dialog_1: false,
            newNotification: {
                NoticeTitle: "",
                theDescription: "",
                NotificationType: "",
            },
            filters: reactive({
                alphabetical: false,
            }),
            students_class: [],
            searchQuery: "",
            dialogAddPhoto: false,

            dialog_bubble: false,
            dialog_2: false,
            dialogAddNotice: false,
            editNotificationDialog: false,
            dialogFilter: false,
            AddNotice: {
                NoticeTitle: "",
                theDescription: "",
                NotificationType: "",
            },
            editedNotification: {
                NoticeTitle: "",
                theDescription: "",
                NotificationType: "",
            },

            progress: 0,
            // selectedClass: [],
            students: [],
            classes: [],
            AddPhoto: {
                Date: "",
                link: "",
            },

            gradeOptions: [
                "شهر أكتوبر",
                "شهر نوفمبر",
                "الترم الأول",
                "شهر فبراير",
                "شهر مارس",
                "الترم الثاني",
            ],
            monthOptions: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ],
        };
    },
    computed: {
        decodedYear() {
            return decodeURIComponent(this.$route.params.year);
        },

        filteredClasses() {
            return this.class_rooms.filter(
                (classs) => classs.grade === this.year
            );
        },
    },
    methods: {
        closeDialog__() {
            this.showDialog = false;
        },
        addClickListener() {
            document.addEventListener("click", this.handleOutsideClick);
        },
        removeClickListener() {
            document.removeEventListener("click", this.handleOutsideClick);
        },
        handleOutsideClick(event) {
            const dialogElement = this.$refs.searchContainer;
            if (dialogElement && !dialogElement.contains(event.target)) {
                this.openDialog_7();
            }
        },
        openDialog_7() {
            this.dialog_7 = true;
            this.addClickListener();
        },
        closeDialog_7() {
            this.dialog_7 = false;
            this.resetSearch();
            this.removeClickListener();
        },

        resetSearch() {
            this.searchQuery = "";
            this.searchStudent(); // Reset the student list
        },
        removeQuestion(index) {
            this.questions.splice(index, 1);
        },
        updateOption(questionIndex, optionIndex) {
            this.questions[questionIndex].options[optionIndex] =
                event.target.value;
            // تعيين الإجابة الصحيحة كأول خيار دائمًا
            if (optionIndex === 0) {
                this.questions[questionIndex].correctAnswer =
                    this.questions[questionIndex].options[0];
            }
        },
        setAnswer(index, answer) {
            this.questions[index].correctAnswer = answer;
            console.log("this.questions=>", this.questions);
        },
        AddQu_1() {
            const trueFalseQuestion = {
                type: "true_false",
                question: "سؤال صواب أو خطأ؟",
                correctAnswer: true, // يمكن تعديلها بناءً على المتطلبات
            };
            this.questions.push(trueFalseQuestion);
            console.log("this.questions=>", this.questions);
        },
        AddQu_2() {
            const multipleChoiceQuestion = {
                type: "multiple_choice",
                question: "سؤال اختياري",
                options: ["الإجابة الصحيحة", "إجابة خاطئة", "إجابة خاطئة"], // الخيارات المتاحة
                correctAnswer: "الإجابة الصحيحة", // الإجابة الصحيحة
            };
            this.questions.push(multipleChoiceQuestion);
            console.log("this.questions=>", this.questions);
        },
        async submit(event) {
            this.loading = true;
            const results = await event;
            this.loading = false;
            alert(JSON.stringify(results, null, 2));
        },
        async checkApi(userName) {
            return new Promise((resolve) => {
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    if (!userName) return resolve("أدخل اسم المادة.");
                    if (userName === "johnleider")
                        return resolve(
                            "User name already taken. Please try another one."
                        );
                    return resolve(true);
                }, 1000);
            });
        },
        openDialogq() {
            this.dialogq = true;
        },
        ...mapActions(usenotification, [
            "send_Notification",
            "get_notifications",
        ]),
        ...mapActions(usenotification, ["send_Notification"]),
        updateSection(section) {
            this.activeButton = section;
            this.selectedSection = section;
        },
        buttonStyle(section) {
            return this.activeButton === section
                ? { background: "white", color: "#54aef5" }
                : { background: "#54aef5", color: "white" };
        },
        openDialog() {
            this.showDialog = true;
        },
        openDialog2() {
            this.showDialog2 = true;
        },
        openQuestionsDialog(testId) {
            const selectedTest = this.existingQuestions.find(
                (test) => test.id === testId
            );
            if (selectedTest) {
                this.selectedTestQuestions = selectedTest.questions || [];
                this.newTest.exam_id = testId; // تأكد من تعيين exam_id هنا
            } else {
                console.error(`Test with ID ${testId} not found.`);
                this.selectedTestQuestions = [];
            }
            this.questionsDialog = true;
        },
        // 111111111111111111111111111111111111111111111111111111
        async showDeleteConfirmation(questionId) {
            this.selectedQuestionId = questionId;
            this.showDeleteDialog = true;
        },
        async deleteQuestion() {
            try {
                if (!this.selectedQuestionId) {
                    this.snackbar.message = "لا يوجد معرف للحذف.";
                    this.snackbar.color = "error";
                    this.snackbar.visible = true;
                    return;
                }

                const docRef = doc(db, "exam", this.selectedQuestionId);
                await deleteDoc(docRef);

                this.snackbar.message = "تم حذف الكارد بنجاح";
                this.snackbar.color = "success";
                this.snackbar.visible = true;

                await this.loadQuestions();
            } catch (error) {
                console.error("Error deleting question: ", error);
                this.snackbar.message = "خطأ أثناء حذف الكارد";
                this.snackbar.color = "error";
                this.snackbar.visible = true;
            } finally {
                this.showDeleteDialog = false; // تأكد من إغلاق نافذة التأكيد
            }
        },
        async saveChanges() {
            try {
                const testId = this.newTest.exam_id;

                if (!testId) {
                    this.snackbar.message = "الاختبار غير موجود";
                    this.snackbar.color = "error";
                    this.snackbar.visible = true;
                    console.error("exam_id is missing.");
                    return;
                }

                console.log("Exam ID: ", testId);

                const examRef = doc(db, "exam", testId);
                const examDoc = await getDoc(examRef);

                if (examDoc.exists()) {
                    const existingExam = examDoc.data();

                    console.log("Existing exam data: ", existingExam);

                    existingExam.questions = this.selectedTestQuestions.map(
                        (question) => ({
                            // title: question.title,
                            question: question.question,
                            correctAnswer: question.correctAnswer,
                            wrongAnswer1: question.wrongAnswer1,
                            wrongAnswer2: question.wrongAnswer2,
                        })
                    );

                    await setDoc(examRef, existingExam);

                    this.snackbar.message = "تم حفظ التغييرات بنجاح";
                    this.snackbar.color = "success";
                    this.snackbar.visible = true;
                    this.questionsDialog = false;
                } else {
                    this.snackbar.message = "الاختبار غير موجود";
                    this.snackbar.color = "error";
                    this.snackbar.visible = true;
                    console.error("Document does not exist.");
                }
            } catch (error) {
                console.error("Error saving changes: ", error);
                this.snackbar.message = "خطأ أثناء حفظ التغييرات";
                this.snackbar.color = "error";
                this.snackbar.visible = true;
            }
        },
        async showQuestionsDialog(testId) {
            if (!testId) {
                this.snackbar.message = "لا يمكن فتح الحوار بدون exam_id";
                this.snackbar.color = "error";
                this.snackbar.visible = true;
                console.error("testId is missing.");
                return;
            }

            this.newTest.exam_id = testId;

            try {
                const examRef = doc(db, "exam", testId);
                const examDoc = await getDoc(examRef);

                if (examDoc.exists()) {
                    this.selectedTestQuestions = examDoc.data().questions || [];
                } else {
                    this.snackbar.message = "الاختبار غير موجود";
                    this.snackbar.color = "error";
                    this.snackbar.visible = true;
                    console.error("Document does not exist.");
                }
            } catch (error) {
                console.error("Error loading questions: ", error);
                this.snackbar.message = "خطأ أثناء تحميل الأسئلة";
                this.snackbar.color = "error";
                this.snackbar.visible = true;
            }

            this.questionsDialog = true;
        },
        addQuestion() {
            const firstQuestion = this.newTest.questions[0];
            if (
                firstQuestion.title &&
                firstQuestion.question &&
                firstQuestion.correctAnswer &&
                firstQuestion.wrongAnswer1 &&
                firstQuestion.wrongAnswer2
            ) {
                this.newTest.questions.push({
                    question: "",
                    correctAnswer: "",
                    wrongAnswer1: "",
                    wrongAnswer2: "",
                    title: this.newTest.questions[0].title,
                    Date_Testing: this.newTest.questions[0].Date_Testing,
                    Time_Testing: this.newTest.questions[0].Time_Testing,
                });
            } else {
                alert(
                    "الرجاء ملء جميع الحقول في السؤال الأول قبل إضافة المزيد."
                );
            }
        },
        async addTest() {
            const educationalLevel = this.year;
            const className = this.newTest.className;
            const section = this.newTest.section;
            const title = this.newTest.questions[0].title || "";
            const Date_Testing = this.newTest.questions[0]?.Date_Testing || "";
            const Time_Testing = this.newTest.questions[0]?.Time_Testing || "";

            if (
                !educationalLevel ||
                !className ||
                !section ||
                !Date_Testing ||
                !Time_Testing ||
                !title
            ) {
                this.snackbar.message = "يرجى ملء جميع الحقول";
                this.snackbar.color = "error";
                this.snackbar.visible = true;
                return;
            }

            try {
                // إنشاء بيانات الاختبار
                const testData = {
                    exam_id: "", // سيتم تعيين هذا لاحقًا
                    Date_Testing: Date_Testing,
                    Time_Testing: Time_Testing,
                    section: section,
                    class: className,
                    grade: educationalLevel,
                    questions: this.newTest.questions.map((question) => ({
                        title: question.title,
                        question: question.question,
                        correctAnswer: question.correctAnswer,
                        wrongAnswer1: question.wrongAnswer1,
                        wrongAnswer2: question.wrongAnswer2,
                    })),
                };

                // إضافة الاختبار إلى كوليكشن `exam`
                const docRef = await addDoc(collection(db, "exam"), testData);
                await updateDoc(docRef, { exam_id: docRef.id });

                // تحديث أو إضافة حقل exam في كوليكشن `students`
                const batch = writeBatch(db); // استخدام writeBatch لتحديث عدة مستندات في عملية واحدة

                // استعلام للحصول على الطلاب المناسبين
                const studentsQuery = query(
                    collection(db, "students"),
                    where("educational_level", "==", educationalLevel),
                    where("class", "==", className),
                    where("section", "==", section)
                );

                const querySnapshot = await getDocs(studentsQuery);

                if (querySnapshot.empty) {
                    this.snackbar.message =
                        "لم يتم العثور على السجلات المناسبة في الطلاب.";
                    this.snackbar.color = "error";
                    this.snackbar.visible = true;
                    return;
                }

                querySnapshot.forEach((studentDoc) => {
                    const studentRef = studentDoc.ref;

                    // قراءة بيانات الطالب وتحديث حقل exams
                    const studentData = studentDoc.data();
                    const existingExams = studentData.exams || [];

                    // إضافة بيانات الاختبار إلى مصفوفة exams
                    existingExams.push({
                        // exam_id: docRef.id,
                        Date_Testing: Date_Testing,
                        Time_Testing: Time_Testing,
                        questions: this.newTest.questions.map((question) => ({
                            title: question.title,
                            question: question.question,
                            correctAnswer: question.correctAnswer,
                            wrongAnswer1: question.wrongAnswer1,
                            wrongAnswer2: question.wrongAnswer2,
                        })),
                    });

                    // تحديث بيانات الطالب
                    batch.update(studentRef, { exams: existingExams });
                });

                // تنفيذ التحديثات
                await batch.commit();

                this.snackbar.message =
                    "تم إضافة الاختبار وتحديث بيانات الطلاب بنجاح";
                this.snackbar.color = "success";
                this.snackbar.visible = true;
                this.dialog_bubble = false;

                // تحميل الأسئلة المحدثة
                await this.loadQuestions();
            } catch (error) {
                console.error("Error adding test: ", error);
                this.snackbar.message = "خطأ أثناء إضافة الاختبار";
                this.snackbar.color = "warning";
                this.snackbar.visible = true;
            }
        },
        async loadQuestions() {
            try {
                const querySnapshot = await getDocs(
                    query(
                        collection(db, "exam"),
                        orderBy("Date_Testing", "asc")
                    )
                );
                this.existingQuestions = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    data.id = doc.id; // إضافة المعرف الفريد
                    return data;
                });
                console.log("Questions loaded:", this.existingQuestions);
            } catch (error) {
                console.error("Error loading questions: ", error);
            }
        },
        addQuestionToDialog() {
            if (
                this.selectedTestQuestions.length === 0 ||
                (this.selectedTestQuestions[
                    this.selectedTestQuestions.length - 1
                ].question &&
                    this.selectedTestQuestions[
                        this.selectedTestQuestions.length - 1
                    ].correctAnswer &&
                    this.selectedTestQuestions[
                        this.selectedTestQuestions.length - 1
                    ].wrongAnswer1 &&
                    this.selectedTestQuestions[
                        this.selectedTestQuestions.length - 1
                    ].wrongAnswer2)
            ) {
                this.selectedTestQuestions.push({
                    question: "",
                    correctAnswer: "",
                    wrongAnswer1: "",
                    wrongAnswer2: "",
                });
            } else {
                alert("الرجاء ملء جميع الحقول قبل إضافة المزيد.");
            }
        },
        sortQuestionsByDate() {
            if (this.isAscending) {
                this.existingQuestions.sort((a, b) => {
                    const dateA = new Date(a.Date_Testing);
                    const dateB = new Date(b.Date_Testing);
                    return dateA - dateB;
                });
            } else {
                this.existingQuestions.sort((a, b) => {
                    const dateA = new Date(a.Date_Testing);
                    const dateB = new Date(b.Date_Testing);
                    return dateB - dateA;
                });
            }
            this.isAscending = !this.isAscending; // تبديل حالة الفرز
        },
        // sortQuestionsByDate() {
        //     this.existingQuestions.sort((a, b) => {
        //         const dateA = new Date(a.Date_Testing);
        //         const dateB = new Date(b.Date_Testing);
        //         return dateA - dateB;
        //     });
        // },
        closeDialog(value) {
            this.subject = value;
        },
        async sortStudentsByPayment() {
            this.students_class.sort((a, b) => {
                if (a.payment_status === b.payment_status) {
                    return 0;
                }
                return a.payment_status > b.payment_status ? -1 : 1;
            });
        },
        togglePaymentSort() {
            this.paymentSortActive = !this.paymentSortActive;
        },
        async sortStudentsByYearAndAlphabetically() {
            try {
                // جلب الطلاب المنتمين إلى السنة المحددة
                const q = query(
                    collection(db, "students"),
                    where("year", "==", this.year)
                );
                const querySnapshot = await getDocs(q);

                this.students_class = querySnapshot.docs
                    .map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                        showDetails: false,
                    }))
                    .sort((a, b) => {
                        const nameA =
                            a.student_information[0].student_name.toLowerCase();
                        const nameB =
                            b.student_information[0].student_name.toLowerCase();

                        if (this.isSortedAscending) {
                            return nameA.localeCompare(nameB, "ar", {
                                sensitivity: "base",
                            });
                        } else {
                            return nameB.localeCompare(nameA, "ar", {
                                sensitivity: "base",
                            });
                        }
                    });

                console.log(this.students_class);
            } catch (error) {
                console.error("Error sorting students:", error);
            }
        },
        toggleSorting() {
            this.isSortedAscending = !this.isSortedAscending;
        },
        toggleSortOrder() {
            if (this.isSortingActive) {
                this.isSortedAscending = !this.isSortedAscending;
                this.sortStudentsByYearAndAlphabetically();
            }
        },
        resetSortOrder() {
            this.isSortedAscending = !this.isSortedAscending;
            this.sortStudentsByYearAndAlphabetically();
        },

        toggleAlphabetical() {
            this.alphabetical = !this.alphabetical;
        },
        togglePayments() {
            this.payments = !this.payments;
        },
        togglePaymentsSorting() {
            this.paymentSortActive = !this.paymentSortActive;
        },
        applyFilter() {
            // تطبيق الفلتر بناءً على الخيارات المحددة
            this.dialog = false;
        },
        handlePaymentSortChange() {
            // عندما يكون paymentSortActive مفعلًا، نظبط filtersy.byGrades إلى null
            if (this.paymentSortActive) {
                this.filtersy.byGrades = null;
            }
        },

        async fetchClassRooms() {
            try {
                const querySnapshot = await getDocs(
                    collection(db, "class_rooms")
                );
                this.class_rooms = querySnapshot.docs.map((doc) => {
                    const classRoomData = doc.data();
                    const classRoom = {
                        id: doc.id,
                        ...classRoomData,
                    };
                    return classRoom;
                });

                console.log("Fetched class rooms:", this.class_rooms);
            } catch (error) {
                console.error("Error fetching class rooms:", error);
            }
        },
        async addNotification(classId) {
            try {
                const classRef = doc(db, "class_rooms", classId);
                const classDoc = await getDoc(classRef);
                if (classDoc.exists()) {
                    const classData = classDoc.data();
                    classData.Notifications.push({
                        NoticeTitle: this.newNotification.NoticeTitle,
                        theDescription: this.newNotification.theDescription,
                        NotificationType: this.newNotification.NotificationType,
                    });
                    this.newNotification = Object.assign(
                        {},
                        this.newNotification,
                        classData
                    );
                    this.send_Notification(
                        this.newNotification.NoticeTitle,
                        this.newNotification.theDescription,
                        "Class_Notification"
                    );
                    await updateDoc(classRef, classData);
                    this.dialogAddNotice = false;
                    this.newNotification = {
                        NoticeTitle: "",
                        theDescription: "",
                        NotificationType: "",
                    };
                    this.confirmationText = "تم إضافة اشعار بنجاح";
                    this.showSnackbar = true;

                    await this.fetchClassRooms();
                } else {
                    console.error("Class document does not exist.");
                }
            } catch (error) {
                console.error("Error adding notification:", error);
            }
        },
        async deleteNotification(classId, notificationIndex) {
            try {
                const classRef = doc(db, "class_rooms", classId);
                const classDoc = await getDoc(classRef);
                if (classDoc.exists()) {
                    const classData = classDoc.data();
                    classData.Notifications.splice(notificationIndex, 1);
                    await updateDoc(classRef, {
                        Notifications: classData.Notifications,
                    });
                    this.confirmationText = "تم حذف اشعار بنجاح";
                    this.showSnackbar = true;
                    await this.fetchClassRooms();
                }
            } catch (error) {
                console.error("Error deleting notification:", error);
            }
        },
        editNotification(classId, index) {
            this.editedNotification = {
                ...this.filteredClasses[0].Notifications[index],
            };
            this.editedClassId = classId;
            this.editedIndex = index;
            console.log(this.editedIndex);
            this.editNotificationDialog = true;
        },
        async saveNotificationEdit() {
            try {
                const classRef = doc(db, "class_rooms", this.editedClassId);
                const classDoc = await getDoc(classRef);
                if (classDoc.exists()) {
                    const classData = classDoc.data();
                    Object.assign(
                        classData.Notifications[this.editedIndex],
                        this.editedNotification
                    );
                    await updateDoc(classRef, {
                        Notifications: classData.Notifications,
                    });
                    this.closeNotificationDialogs();
                    this.confirmationText = "تم تعديل اشعار بنجاح";
                    this.showSnackbar = true;
                    await this.fetchClassRooms();
                }
            } catch (error) {
                console.error("Error editing notification:", error);
            }
        },
        // selectClass(classRoom) {
        //     this.selectedClass = classRoom;
        // },
        closeNotificationDialogs() {
            this.editNotificationDialog = false;
        },
        // OIJI
        async addPhoto(classId) {
            try {
                if (this.AddPhoto.file) {
                    const storageRef = ref(
                        storage,
                        `photos/${this.AddPhoto.file.name}`
                    );
                    await uploadBytes(storageRef, this.AddPhoto.file);
                    const downloadURL = await getDownloadURL(storageRef);

                    const classRef = doc(db, "class_rooms", classId);
                    const classDoc = await getDoc(classRef);
                    if (classDoc.exists()) {
                        const classData = classDoc.data();

                        // تأكد من أن photos موجودة وهي مصفوفة
                        if (!Array.isArray(classData.photos)) {
                            classData.photos = [];
                        }

                        // الحصول على الوقت الحالي بصيغة مناسبة
                        const photoTime = new Date().toLocaleString("ar-EG", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                        });

                        classData.photos.push({
                            DatePhoto: photoTime,
                            linkphoto: downloadURL,
                        });
                        await updateDoc(classRef, { photos: classData.photos });

                        this.dialogAddPhoto = false;
                        this.AddPhoto = {
                            Date: "",
                            link: "",
                        };
                        this.confirmationText = "تم اضافه الصوره بنجاح";
                        this.showSnackbar = true;
                        await this.fetchClassRooms();
                    } else {
                        console.error("Class document does not exist.");
                    }
                }
            } catch (error) {
                console.error("Error adding photo:", error);
            }
        },
        async deletePhotos(classId, photoIndex) {
            try {
                const classRef = doc(db, "class_rooms", classId);
                const classDoc = await getDoc(classRef);
                if (classDoc.exists()) {
                    const classData = classDoc.data();
                    classData.photos.splice(photoIndex, 1);
                    await updateDoc(classRef, { photos: classData.photos });
                    this.confirmationText = "تم حذف الصوره بنجاح";
                    this.showSnackbar = true;
                    await this.fetchClassRooms();
                }
            } catch (error) {
                console.error("Error deleting photo:", error);
            }
        },
        applyFilters() {
            // Trigger sorting or filtering logic based on selected options
            this.sortStudentsByYearAndAlphabetically();
            // Close the filter dialog
            this.dialogFilter = false;
        },
        resetFilters() {
            // Reset all filter-related data properties
            this.paymentSortActive = false;
            this.filtersy.byGrades = null;
            this.selectedClassj = null;
            // Optionally, reset the filtered student list
            this.sortStudentsByYearAndAlphabetically();
            this.dialogFilter = false;
        },
        updateFilteredCount(count) {
            this.filteredStudentsCount = count;
        },
        async searchStudent() {
            try {
                const trimmedQuery = this.searchQuery.trim().toLowerCase();
                if (!trimmedQuery) {
                    const querySnapshot = await getDocs(
                        collection(db, "students")
                    );
                    this.students = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                        showDetails: false,
                    }));
                } else {
                    const querySnapshot = await getDocs(
                        collection(db, "students")
                    );
                    this.students = querySnapshot.docs
                        .map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                            showDetails: false,
                        }))
                        .filter((student) =>
                            student.student_name
                                .toLowerCase()
                                .includes(trimmedQuery)
                        );
                }
            } catch (error) {
                console.error("Error searching students:", error);
            }
        },
    },
    watch: {
        dialog_7(newValue) {
            if (!newValue) {
                this.resetSearch();
            }
        },
    },
    async mounted() {
        await this.fetchClassRooms();
        this.fetchClassRooms();
        this.searchStudent();
    },
    created() {
        this.loadQuestions();
    },
};
</script>

<style lang="scss" scoped>
form {
    width: 90%;
    margin: auto;
}
.ser {
    width: 100%;
    height: 100px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #2196f3c4;
    color: white;
    font-size: 23px;
}
.custom-dialog .v-dialog {
    border-radius: 10px; /* Example: Rounded corners */
    // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Example: Soft shadow */
}

.custom-dialog .v-card {
    background-color: #ffffff; /* Example: White background */
}
.v-dialog > .v-overlay__content > .v-card,
.v-dialog > .v-overlay__content > form > .v-card {
    padding: 35px !important;
}

.my-custom-btn {
    font-size: 16px; /* حجم الخط */
    padding: 10px 20px; /* حشوة الزر */
    border-radius: 8px; /* زوايا دائرية */
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.5); /* تأثير الظل عند التركيز */

    transition: background-color 0.3s ease, color 0.3s ease; /* تأثير الانتقال */
}

.my-custom-btn:hover {
    transition: background-color 0.3s ease, color 0.3s ease; /* تأثير الانتقال */
}

.my-custom-btn:focus {
    outline: none; /* إزالة الخط المحيط عند التركيز */
    color: #ffffff; /* لون النص عند التمرير */
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.5); /* تأثير الظل عند التركيز */
}
.delete-icon {
    cursor: pointer;
    color: rgba(33, 150, 243, 0.5);
    font-size: 24px;
    transition: color 0.3s ease;
}

.delete-icon:hover {
    color: darkred;
}

/* تنسيق نافذة التأكيد */
.v-dialog__content {
    padding: 20px;
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
.left {
    display: flex;
    align-items: center;
    gap: 10px;
}
.v-container {
    margin: 20px auto !important;
    flex-wrap: wrap;
    padding: 0;
    justify-content: flex-start !important;
    gap: 40px;
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
    cursor: pointer;
    width: 30px;
    &:hover {
        opacity: 0.7;
    }
    &:first-child {
        transform: rotateY(180deg);
    }
    // &:nth-child(2) {
    // }
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

.popup .title {
    padding: 20px 20px 0 !important;
    font-size: 23px;
    font-weight: bold;
    color: var(--main-color);
    position: relative;
    margin-bottom: 15px;
    &::before {
        content: "";
        position: absolute;
        bottom: -15px;
        height: 3px;
        width: calc(100% - 40px);
        background: var(--secound-color);
        left: 50%;
        transform: translateX(-50%);
    }
}
.v-btn--icon.v-btn--density-default {
    color: var(--main-color);
    width: auto;
    height: auto;
    box-shadow: none;
    &:hover {
        background: #fff;
    }
}
svg {
    cursor: pointer;
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
            input {
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
.filter {
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        margin-bottom: 30px;
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
        & > div {
            margin-top: 15px;
        }
        .v-switch .v-label {
            font-weight: bold;
        }
        .filter-switch {
            display: flex;
            align-items: center;
            padding: 0 10px;
            background-color: whitesmoke;
            border-radius: 5px;
            font-weight: bold;
        }

        .switch-input {
            display: none;
        }

        .switch-label {
            cursor: pointer;
            color: var(--main-color);
        }

        .switch-input:checked + .switch-label {
            color: var(--main-color);
        }
    }
    .footer {
        & > div {
            display: flex;
            align-items: center;
            height: 40px;
            background: var(--main-color);
            color: #fff;
            justify-content: center;
            gap: 5px;
            font-weight: bold;
            border-radius: 5px;
            width: 100%;
            margin-top: 15px;
            cursor: pointer;
            border: 1px solid;
            transition: 0.3s;
            &:last-child {
                background: #fff;
                color: var(--main-color);
                border-color: var(--main-color);
            }
            &:hover {
                background: var(--main-color);
                color: #fff;
            }
        }
    }
}
.v-breadcrumbs-item {
    svg {
        display: none;
    }
}
.add {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-radius: 5px;
    width: 90%;
    margin: 15px auto;
    color: var(--main-color);
    font-weight: bold;
    svg {
        background: var(--main-color);
        font-size: 21px;
        color: #fff;
        padding: 5px 7px;
        border-radius: 5px;
        cursor: pointer;
    }
}
.feats {
    width: 90%;
    margin: 10px auto;
    display: flex;
    gap: 10px;
    align-items: center;
    .feat {
        width: 32%;
        box-shadow: 0 0 10px #ddd;
        border-radius: 5px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;

        & > div:not(:last-of-type) {
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
                width: 48%;
                &:last-child {
                    background: var(--pink-color);
                }
            }
        }
        .time > div:nth-child(2) {
            color: var(--pink-color);
        }
    }
}
.top,
.Bottom {
    width: 90%;
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
        .inputs {
            & > div {
                width: 100%;
                margin-bottom: 10px;
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
}

.active {
    background-color: var(--main-color) !important;
    color: white !important;
}
.active_1 {
    background-color: green !important;
    color: white !important;
}
@media (max-width: 700px) {
    .v-breadcrumbs-item {
        svg {
            display: flex;
        }
        div {
            display: none;
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
    .feat {
        width: 100% !important;
    }
    .right {
        &:not(.right_1) {
            flex-direction: column;
            .left {
                width: 100%;
                justify-content: center;
                margin-bottom: 15px;
                gap: 25px;
            }
        }
    }
}

@media (min-width: 700px) and (max-width: 950px) {
    .feat {
        width: 47% !important;
    }
}
ul.show_details {
    color: var(--therd-color);
    font-weight: bold;
    font-size: 16px;
    gap: 10px;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    li {
        list-style-type: none;
        display: flex;
        align-items: center;
        gap: 10px;
        background: var(--secound-color);
        padding: 10px;
        border-radius: 5px;
    }
}
</style>
