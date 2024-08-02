<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                    <div class="ser">
                        <div class="right">
                            <div>{{ year }}</div>
                        </div>
                        <div
                            class="left"
                            style="
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                gap: 20px;
                            "
                        >
                            <font-awesome-icon
                                :icon="['fas', 'filter']"
                                style="cursor: pointer"
                                @click="dialogFilter = true"
                            />
                            <font-awesome-icon
                                :icon="['fas', 'plus']"
                                @click="dialog = true"
                                style="cursor: pointer"
                                v-tooltip="add"
                            />
                        </div>
                    </div>
                    <v-dialog v-model="dialog" width="90%">
                        <v-card width="100%" class="popup">
                            <v-card-title
                                class="d-flex justify-space-between align-center"
                            >
                                <div
                                    class="text-h4 ps-2"
                                    style="color: var(--main-color)"
                                >
                                    إضافة
                                </div>
                                <v-btn
                                    style="color: var(--main-color)"
                                    icon="mdi-close"
                                    variant="text"
                                    @click="dialog = false"
                                ></v-btn>
                            </v-card-title>
                            <div class="cards mb-4" style="padding: 10px">
                                <v-row
                                    style="
                                        display: flex;
                                        justify-content: space-around;
                                        align-items: center;
                                    "
                                    class="mb-4"
                                >
                                    <v-card
                                        style="
                                            background-color: var(
                                                --secound-color
                                            ) !important;
                                            width: 30% !important;
                                        "
                                        class="card text-center mt-3"
                                        prepend-icon="mdi-book-open-variant"
                                        link
                                        @click="subject = true"
                                    >
                                        <v-card-title>إضافة مواد</v-card-title>
                                    </v-card>

                                    <!-- v-card to open dialog -->
                                    <v-card
                                        style="
                                            background-color: var(
                                                --secound-color
                                            ) !important;
                                            width: 30% !important;
                                        "
                                        class="card text-center mt-3"
                                        prepend-icon="mdi-account"
                                        link
                                        @click="openDialog"
                                    >
                                        <v-card-title
                                            >إضافة جدول دراسي</v-card-title
                                        >
                                    </v-card>
                                    <v-card
                                        style="
                                            background-color: var(
                                                --secound-color
                                            ) !important;
                                            width: 30% !important;
                                        "
                                        class="card text-center mt-3"
                                        prepend-icon="mdi-account"
                                        link
                                        @click="dialog_1 = true"
                                    >
                                        <v-card-title @click="dialog = false"
                                            >إضافة إشعارات</v-card-title
                                        >
                                    </v-card>
                                </v-row>
                                <add-subject
                                    @closeDialog="closeDialog"
                                    :localSubject="subject"
                                />
                                <add-study-schedule
                                    :year="year"
                                    v-model="showDialog"
                                />
                                <v-row
                                    style="
                                        display: flex;
                                        justify-content: space-around;
                                        align-items: center;
                                    "
                                >
                                    <v-card
                                        style="
                                            background-color: var(
                                                --secound-color
                                            ) !important;
                                        "
                                        class="card text-center mt-3"
                                        prepend-icon="mdi-newspaper-variant-multiple-outline"
                                        @click="showAddStudentDialog"
                                        width="30%"
                                    >
                                        <v-card-title @click="dialog = false"
                                            >إضافة بيانات الطالب</v-card-title
                                        >
                                    </v-card>
                                    <v-card
                                        style="
                                            background-color: var(
                                                --secound-color
                                            ) !important;
                                        "
                                        class="card text-center mt-3"
                                        prepend-icon="mdi-image"
                                        link
                                        @click="dialog_2 = true"
                                        width="30%"
                                    >
                                        <v-card-title @click="dialog = false"
                                            >إضافة الصور</v-card-title
                                        >
                                    </v-card>
                                    <!--Bubble sheet -->
                                    <v-card
                                        style="
                                            background-color: var(
                                                --secound-color
                                            ) !important;
                                            width: 30% !important;
                                        "
                                        class="card text-center mt-3"
                                        prepend-icon="mdi-help-circle-outline"
                                        link
                                        @click="main_bubble = true"
                                    >
                                        <v-card-title @click="dialog = false"
                                            >إضافة أختبارات</v-card-title
                                        >
                                    </v-card>
                                </v-row>
                                <v-row>
                                    <v-col clos="4"
                                        ><v-card
                                            style="
                                                background-color: var(
                                                    --secound-color
                                                ) !important;
                                            "
                                            class="card text-center mt-3"
                                            prepend-icon="mdi-newspaper-variant-multiple-outline"
                                            width="100%"
                                            @click="openDialog2"
                                        >
                                            <v-card-title
                                                >إضافة الخطه
                                                الاسبوعيه</v-card-title
                                            >
                                        </v-card></v-col
                                    >
                                    <v-col cols="4">
                                        <v-card
                                            style="
                                                background-color: var(
                                                    --secound-color
                                                ) !important;
                                            "
                                            class="card text-center mt-3"
                                            prepend-icon="mdi-newspaper-variant-multiple-outline"
                                            width="100%"
                                            @click="openDialogq"
                                        >
                                            <v-card-title
                                                >إضافة محتوي
                                                تعليمي</v-card-title
                                            >
                                        </v-card>
                                    </v-col>
                                    <EducationalContentDialog
                                        :year="year"
                                        v-model="dialogq"
                                    />
                                </v-row>
                                <weeklyPlan
                                    v-model="showDialog2"
                                    :year="year"
                                />
                            </div>
                        </v-card>
                    </v-dialog>
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
                        <v-card>
                            <div
                                style="
                                    background-color: #2196f3;
                                    width: 100%;
                                    height: 60px;
                                    font-size: 22px;
                                    font-weight: bold;
                                    color: #fff;
                                    border-radius: 5px;
                                "
                            >
                                <p class="ma-5">ألاختبارات</p>
                            </div>
                            <v-card-text>
                                <v-row>
                                    <v-col>
                                        <div>
                                            <h2>
                                                <strong
                                                    >عدد الاختبارات:
                                                    {{
                                                        existingQuestions
                                                            ? existingQuestions.length
                                                            : 0
                                                    }}</strong
                                                >
                                            </h2>
                                        </div>
                                    </v-col>
                                    <v-col class="ma-2 d-flex flex-row-reverse">
                                        <v-btn
                                            @click="dialog_bubble = true"
                                            style="
                                                background: var(--main-color);
                                                color: white;
                                            "
                                            size="large"
                                        >
                                            اضافه أختبار
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-row v-if="existingQuestions.length">
                                            <v-col
                                                cols="12"
                                                class="d-flex justify-end mb-4"
                                            >
                                                <v-icon
                                                    @click="sortQuestionsByDate"
                                                    >mdi-sort</v-icon
                                                >
                                            </v-col>
                                            <v-col
                                                sm="6"
                                                v-for="question in existingQuestions"
                                                :key="question.id"
                                                cols="12"
                                                md="6"
                                                lg="6"
                                                class="mb-4"
                                            >
                                                <!-- 666666666666666666666666666666666666 -->
                                                <v-card
                                                    class="mx-auto"
                                                    width="100%"
                                                    tile
                                                    elevation="2"
                                                >
                                                    <v-col
                                                        class="d-flex flex-row-reverse justify-space-between"
                                                    >
                                                        <v-card-actions>
                                                            <v-btn
                                                                outlined
                                                                size="large"
                                                                color="primary"
                                                                class="my-custom-btn"
                                                                @click="
                                                                    openQuestionsDialog(
                                                                        question.id
                                                                    )
                                                                "
                                                            >
                                                                عرض الأسئلة
                                                            </v-btn>
                                                            <!-- أيقونة الحذف -->
                                                            <v-icon
                                                                size="30"
                                                                @click="
                                                                    showDeleteConfirmation(
                                                                        question.id
                                                                    )
                                                                "
                                                                class="mr-3 delete-icon"
                                                            >
                                                                mdi-delete
                                                            </v-icon>
                                                        </v-card-actions>
                                                        <!-- نافذة التأكيد -->

                                                        <v-card-title
                                                            style="
                                                                color: var(
                                                                    --main-color
                                                                );
                                                                font-weight: bold;
                                                                font-size: 24px;
                                                                padding: 16px;
                                                            "
                                                        >
                                                            {{
                                                                question
                                                                    .questions[0]
                                                                    .title
                                                            }}
                                                        </v-card-title>
                                                    </v-col>
                                                    <v-card-text>
                                                        <strong
                                                            style="
                                                                font-size: 24px;
                                                                display: block;
                                                                margin-bottom: 12px;
                                                            "
                                                        >
                                                            ميعاد بدء الاختبار
                                                        </strong>
                                                    </v-card-text>
                                                    <v-card-text
                                                        class="d-flex flex-column pt-0"
                                                    >
                                                        <p
                                                            style="
                                                                background: #eee;
                                                                margin: 5px;
                                                                margin-top: 0;
                                                                font-size: 18px;
                                                                color: #333;
                                                                line-height: 50px;
                                                                display: flex;
                                                                align-items: center;
                                                                border-radius: 5px;
                                                            "
                                                        >
                                                            <v-icon
                                                                style="
                                                                    font-size: 28px;
                                                                    color: #555;
                                                                    margin-right: 10px;
                                                                "
                                                            >
                                                                mdi-calendar
                                                            </v-icon>
                                                            <strong
                                                                style="
                                                                    font-size: 18px;
                                                                    margin-right: 6px;
                                                                "
                                                            >
                                                                {{
                                                                    question.Date_Testing
                                                                        ? new Date(
                                                                              question.Date_Testing
                                                                          ).toLocaleDateString()
                                                                        : "غير محدد"
                                                                }}
                                                            </strong>
                                                        </p>
                                                        <p
                                                            style="
                                                                background: #eee;
                                                                margin: 10px 5px;
                                                                font-size: 18px;
                                                                color: #333;
                                                                line-height: 50px;
                                                                display: flex;
                                                                align-items: center;
                                                                border-radius: 5px;
                                                            "
                                                        >
                                                            <v-icon
                                                                style="
                                                                    font-size: 28px;
                                                                    color: #555;
                                                                    margin-right: 10px;
                                                                "
                                                            >
                                                                mdi-clock
                                                            </v-icon>
                                                            <strong
                                                                style="
                                                                    margin-right: 3px;
                                                                    font-size: 18px;
                                                                "
                                                            >
                                                                {{
                                                                    question.Time_Testing
                                                                        ? new Date(
                                                                              `1970-01-01T${question.Time_Testing}:00`
                                                                          ).toLocaleTimeString()
                                                                        : "غير محدد"
                                                                }}
                                                            </strong>
                                                        </p>
                                                    </v-card-text>
                                                </v-card>

                                                <!-- 4444444444444444444444444444444444 -->
                                                <v-dialog
                                                    v-model="questionsDialog"
                                                    max-width="90%"
                                                >
                                                    <!-- 77777777777777777777777 -->
                                                    <v-card>
                                                        <v-card-title>
                                                            <span
                                                                class="headline"
                                                                >أسئلة
                                                                الاختبار</span
                                                            >
                                                        </v-card-title>
                                                        <v-card-text>
                                                            <!-- 999999999999999 -->
                                                            <v-form
                                                                ref="questionsForm"
                                                            >
                                                                <v-list>
                                                                    <v-list-item-group
                                                                        v-if="
                                                                            selectedTestQuestions.length
                                                                        "
                                                                    >
                                                                        <v-list-item
                                                                            v-for="(
                                                                                question,
                                                                                index
                                                                            ) in selectedTestQuestions"
                                                                            :key="
                                                                                index
                                                                            "
                                                                        >
                                                                            <v-list-item-content>
                                                                                <v-text-field
                                                                                    v-model="
                                                                                        question.question
                                                                                    "
                                                                                    label="السؤال"
                                                                                    required
                                                                                ></v-text-field>
                                                                                <v-text-field
                                                                                    v-model="
                                                                                        question.correctAnswer
                                                                                    "
                                                                                    label="الإجابة الصحيحة"
                                                                                    required
                                                                                ></v-text-field>
                                                                                <v-text-field
                                                                                    v-model="
                                                                                        question.wrongAnswer1
                                                                                    "
                                                                                    label="الإجابة الخاطئة 1"
                                                                                    required
                                                                                ></v-text-field>
                                                                                <v-text-field
                                                                                    v-model="
                                                                                        question.wrongAnswer2
                                                                                    "
                                                                                    label="الإجابة الخاطئة 2"
                                                                                    required
                                                                                ></v-text-field>
                                                                                <v-divider></v-divider>
                                                                            </v-list-item-content>
                                                                        </v-list-item>
                                                                    </v-list-item-group>
                                                                    <v-list-item
                                                                        v-else
                                                                    >
                                                                        <v-list-item-content>
                                                                            <v-list-item-title
                                                                                >لا
                                                                                توجد
                                                                                أسئلة
                                                                                لهذا
                                                                                الاختبار.</v-list-item-title
                                                                            >
                                                                        </v-list-item-content>
                                                                    </v-list-item>
                                                                </v-list>
                                                                <v-btn
                                                                    @click="
                                                                        addQuestionToDialog
                                                                    "
                                                                    color="primary"
                                                                    >إضافة
                                                                    سؤال</v-btn
                                                                >
                                                            </v-form>
                                                        </v-card-text>
                                                        <v-card-actions>
                                                            <v-btn
                                                                @click="
                                                                    saveChanges
                                                                "
                                                                color="primary"
                                                            >
                                                                حفظ التغييرات
                                                            </v-btn>
                                                            <v-btn
                                                                @click="
                                                                    questionsDialog = false
                                                                "
                                                            >
                                                                إغلاق
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <!-- 555555555555555555555555 -->
                            <v-dialog
                                v-model="dialog_bubble"
                                max-width="90%"
                                height="50%"
                            >
                                <v-card style="padding: 0; height: auto">
                                    <div>
                                        <div
                                            style="
                                                background-color: var(
                                                    --main-color
                                                );
                                                color: #fff;
                                                font-size: 18px;
                                                padding: 10px;
                                            "
                                        >
                                            إنشاء إختبار
                                        </div>
                                        <v-form ref="createTestForm">
                                            <v-row
                                                class="d-flex justify-center"
                                            >
                                                <v-col>
                                                    <v-row>
                                                        <v-col>
                                                            <v-text-field
                                                                :value="year"
                                                            ></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row>
                                                        <v-col>
                                                            <v-select
                                                                v-model="
                                                                    newTest.section
                                                                "
                                                                :items="section"
                                                                label="القسم"
                                                                required
                                                            ></v-select>
                                                        </v-col>
                                                        <v-col>
                                                            <v-select
                                                                v-model="
                                                                    newTest.className
                                                                "
                                                                :items="
                                                                    all_classes
                                                                "
                                                                label="اسم الفصل"
                                                                required
                                                            ></v-select>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row>
                                                        <v-col>
                                                            <v-text-field
                                                                v-model="
                                                                    newTest
                                                                        .questions[0]
                                                                        .title
                                                                "
                                                                label="عنوان السؤال"
                                                                required
                                                            >
                                                                <!-- هنا نعرض العنوان -->
                                                            </v-text-field>
                                                            <v-text-field
                                                                v-model="
                                                                    newTest
                                                                        .questions[0]
                                                                        .Date_Testing
                                                                "
                                                                label="تاريخ بدأ الاختبار"
                                                                required
                                                                type="date"
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col>
                                                            <v-text-field
                                                                v-model="
                                                                    newTest
                                                                        .questions[0]
                                                                        .Time_Testing
                                                                "
                                                                label="توقيت بدأ الاختبار"
                                                                type="time"
                                                                required
                                                            ></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                    <v-text-field
                                                        v-model="
                                                            newTest.questions[0]
                                                                .question
                                                        "
                                                        label="السؤال الأول"
                                                        required
                                                    ></v-text-field>
                                                    <v-text-field
                                                        v-model="
                                                            newTest.questions[0]
                                                                .correctAnswer
                                                        "
                                                        label="الإجابة الصحيحة"
                                                        required
                                                    ></v-text-field>
                                                    <v-text-field
                                                        v-model="
                                                            newTest.questions[0]
                                                                .wrongAnswer1
                                                        "
                                                        label="الإجابة الخاطئة 1"
                                                        required
                                                    ></v-text-field>
                                                    <v-text-field
                                                        v-model="
                                                            newTest.questions[0]
                                                                .wrongAnswer2
                                                        "
                                                        label="الإجابة الخاطئة 2"
                                                        required
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-divider></v-divider>
                                            <v-row>
                                                <v-col cols="12">
                                                    <v-row
                                                        v-for="(
                                                            question, index
                                                        ) in newTest.questions.slice(
                                                            1
                                                        )"
                                                        :key="index"
                                                    >
                                                        <v-col cols="12">
                                                            <v-text-field
                                                                v-model="
                                                                    question.question
                                                                "
                                                                label="السؤال"
                                                                required
                                                            ></v-text-field>
                                                            <v-text-field
                                                                v-model="
                                                                    question.correctAnswer
                                                                "
                                                                label="الإجابة الصحيحة"
                                                                required
                                                            ></v-text-field>
                                                            <v-text-field
                                                                v-model="
                                                                    question.wrongAnswer1
                                                                "
                                                                label="الإجابة الخاطئة 1"
                                                                required
                                                            ></v-text-field>
                                                            <v-text-field
                                                                v-model="
                                                                    question.wrongAnswer2
                                                                "
                                                                label="الإجابة الخاطئة 2"
                                                                required
                                                            ></v-text-field>
                                                            <v-divider></v-divider>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row
                                                        class="ma-9 d-flex justify-space-between"
                                                    >
                                                        <v-btn
                                                            @click="addQuestion"
                                                            color="primary"
                                                            >+ إضافة سؤال</v-btn
                                                        >
                                                        <v-btn
                                                            @click="addTest"
                                                            color="success"
                                                            >إضافة
                                                            الاختبار</v-btn
                                                        >
                                                    </v-row>
                                                </v-col>
                                            </v-row>
                                        </v-form>
                                    </div>
                                </v-card>
                            </v-dialog>
                        </v-card>
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
            <v-row>
                <v-col>
                    <h3
                        v-if="isSortedAscending"
                        style="color: rgba(33, 150, 243, 0.768627451)"
                    >
                        نوع الفلتر :
                        {{ isSortedAscending ? " ابجدي" : "" }}
                    </h3>
                    <h3
                        v-if="paymentSortActive"
                        style="color: rgba(33, 150, 243, 0.768627451)"
                    >
                        نوع الفلتر :
                        {{ paymentSortActive ? "حسب المدفوعات" : "" }}
                    </h3>
                    <!-- <h3
                        v-if="filtersy.byGrades"
                        style="color: rgba(33, 150, 243, 0.768627451)"
                    >
                        نوع الفلتر :
                        {{ filtersy.byGrades ? filtersy.byGrades : "" }}
                    </h3> -->
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4" sm="6">
                    <v-btn
                        :class="{ active: activeButton === 'الكل' }"
                        :style="buttonStyle('الكل')"
                        rounded="xl"
                        size="x-large"
                        block
                        @click="updateSection('الكل')"
                    >
                        الكل
                    </v-btn>
                </v-col>
                <v-col cols="12" md="4" sm="6">
                    <v-btn
                        :class="{ active: activeButton === 'عربي' }"
                        :style="buttonStyle('عربي')"
                        rounded="xl"
                        size="x-large"
                        block
                        @click="updateSection('عربي')"
                    >
                        عربي
                    </v-btn>
                </v-col>
                <v-col cols="12" md="4" sm="6">
                    <v-btn
                        :class="{ active: activeButton === 'لغات' }"
                        :style="buttonStyle('لغات')"
                        rounded="xl"
                        size="x-large"
                        block
                        @click="updateSection('لغات')"
                    >
                        لغات
                    </v-btn>
                </v-col>
            </v-row>

            <v-dialog
                v-model="dialogFilter"
                max-width="600px"
                class="custom-dialog"
            >
                <transition name="fade">
                    <v-card>
                        <v-card-title class="headline">
                            فلتر الطلاب
                        </v-card-title>
                        <v-card-text>
                            <!-- Filter Options -->
                            <v-form>
                                <!-- Alphabetical Order Toggle -->
                                <v-row class="mb-3">
                                    <v-col>
                                        <v-switch
                                            v-model="paymentSortActive"
                                            label="اعلي المدفوعات"
                                            :style="{
                                                color: paymentSortActive
                                                    ? 'green'
                                                    : '',
                                            }"
                                            @change="handlePaymentSortChange"
                                            class="filter-switch"
                                        />
                                    </v-col>
                                </v-row>

                                <!-- Sort by Grades Select -->
                                <v-row class="mb-3">
                                    <v-col cols="12">
                                        <v-select
                                            v-model="filtersy.byGrades"
                                            :items="gradeOptions"
                                            label="ترتيب حسب الدرجات"
                                            outlined
                                            hide-details
                                        ></v-select>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </transition>
            </v-dialog>
        </v-container>
        <StudentList
            :year="year"
            :sortStudents="sortStudentsByYearAndAlphabetically"
            :selectedSection="selectedSection"
            :isSortedAscending="isSortedAscending"
            :paymentSortActive="paymentSortActive"
            :gradeSortActive="filtersy.byGrades"
            :gradeOptions="gradeOptions"
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
            showDeleteDialog: false,
            selectedQuestionId: null,
            questionsDialog: false,
            selectedTestQuestions: [],
            isAscending: true,
            existingQuestions: [],
            questions: [],
            main_bubble: false,
            paymentSortActive: false,
            activeButton: "الكل",
            all_classes: ["1/1", "1/2", "2/1", "2/2", "3/1", "3/2"],
            section: ["عربي", "لغات"],
            selectedSection: "الكل",
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
            dialog_1: false,
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
            selectedClass: [],
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
        applyFilters() {
            // Handle filter logic here
            console.log("Filters applied:", this.filters);
            this.dialogFilter = false;
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
        selectClass(classRoom) {
            this.selectedClass = classRoom;
        },
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
    },
    async mounted() {
        await this.fetchClassRooms();
        console.log(this.filteredClasses);
        this.fetchClassRooms();
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
</style>
