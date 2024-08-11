<template>
    <div class="visible">
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
                    <v-breadcrumbs-item>
                        <img
                            src="../assets/profile/user.svg"
                            alt=""
                            class="pluse"
                        />
                        <div>الملف الشخصي</div>
                    </v-breadcrumbs-item>
                </v-breadcrumbs>
            </div>
            <div class="left">
                <img
                    src="../assets/profile/edit-info.svg"
                    alt=""
                    class="pluse pluse_1"
                    @click="dialog = true"
                />
                <img
                    src="../assets/profile/logout.svg"
                    alt=""
                    class="pluse pluse_1 ml-5"
                    @click="My_Logout()"
                />
            </div>
        </div>
        <div class="children">
            <div class="hello_text">
                مرحبًا {{ user.name }}، نشكرك على ثقتك في معهد السراج المنير
                الأزهري، نتطلع سويًا لتحقيق مستقبل مشرق لأبنائنا.
            </div>
            <div class="body" v-if="this.user.userType != 'student'">
                <div class="box">
                    <div class="head">
                        <div class="name">
                            {{ user.name }}
                        </div>
                    </div>
                    <div class="class" style="color: var(--therd-color)">
                        <div>الرقم القومى</div>
                        <div>
                            {{ user.National_id }}
                        </div>
                    </div>
                    <div class="bg-white pa-0">
                        <div class="class" v-if="user.phone != ''">
                            <div>رقم الهاتف</div>
                            <div>{{ user.phone }}</div>
                        </div>
                        <div class="class" v-if="user.email != ''">
                            <div>الايميل</div>
                            <div>
                                {{ user.email }}
                            </div>
                        </div>
                        <div class="class" v-if="user.userType === 'admin'">
                            <div>
                                الصلاحيات
                                <div v-for="role in user.roles" :key="role">
                                    {{ role }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Student_Dashboard v-if="this.user.userType === 'student'" />
    <Parent_Dashboard v-if="this.user.userType === 'parent'" />
    <v-dialog v-model="dialog" width="90%">
        <v-card width="100%" class="popup">
            <div class="d-flex justify-space-between align-center title">
                <div style="color: var(--main-color)">تعديل البيانات</div>
                <v-btn icon="mdi-close" @click="dialog = false"></v-btn>
            </div>
            <form
                ref="form"
                @submit.prevent="update_data()"
                class="ma-auto mt-4"
            >
                <v-text-field
                    v-model="user.name"
                    type="text"
                    label=" الاسم"
                    :rules="[(v) => !!v || 'الاسم مطلوب']"
                    variant="outlined"
                    required
                ></v-text-field>
                <v-text-field
                    v-if="this.user.userType != 'student'"
                    v-model="user.National_id"
                    :rules="[
                        (v) => !!v || 'الرقم القومي مطلوب',
                        (v) =>
                            (/.{14}/.test(v) && v.length <= 14) ||
                            'يجب أن يكون الرقم القومي مكون من 14 رقم',
                    ]"
                    type="text"
                    label="الرقم القومي"
                    variant="outlined"
                    :minlength="14"
                    :maxlength="14"
                    required
                ></v-text-field>

                <v-text-field
                    v-if="user.email !== ''"
                    v-model="user.email"
                    type="email"
                    label="بريد الكتروني"
                    variant="outlined"
                    :rules="[
                        (v) => !!v || 'البريد الإلكتروني مطلوب',
                        (v) =>
                            /.+@.+\..+/.test(v) || 'البريد الإلكتروني غير صالح',
                    ]"
                    required
                ></v-text-field>
                <!-- Phone Input -->
                <v-text-field
                    v-model="user.phone"
                    type="text"
                    label="التليفون"
                    variant="outlined"
                    required
                    :rules="[
                        (v) => !!v || 'يجب إدخال رقم الهاتف',
                        (v) => /^\d{11}$/.test(v) || 'الرقم غير صحيح',
                    ]"
                    :minlength="11"
                ></v-text-field>
                <p
                    @click="dispaly = !dispaly"
                    style="
                        cursor: pointer;
                        color: var(--main-color);
                        padding-right: 5px;
                    "
                >
                    تغيير كلمه المرور
                </p>
                <br />
                <div v-if="dispaly === true">
                    <v-text-field
                        v-model="password"
                        :rules="[
                            (v) => !!v || 'كلمة المرور مطلوبة',
                            (v) =>
                                (v && v.length >= 6) ||
                                'يجب أن تكون كلمة المرور 6 أحرف على الأقل',
                        ]"
                        :type="show_Password ? 'text' : 'password'"
                        label="كلمة مرور السابقة"
                        variant="outlined"
                        required
                        :append-inner-icon="
                            show_Password ? 'mdi-eye' : 'mdi-eye-off'
                        "
                        :minlength="6"
                        @click:append-inner="toggle_Show_Password"
                        @focus="check_pass()"
                        @blur="check_pass()"
                    ></v-text-field>
                    <p
                        style="
                            display: block;
                            margin-right: 15px;
                            font-size: small;
                            color: #af0829;
                        "
                        v-if="check === false"
                    >
                        كلمة المرور غير صحيحة
                    </p>
                    <v-text-field
                        v-model="user_password"
                        :rules="[
                            (v) => !!v || 'كلمة المرور مطلوبة',
                            (v) =>
                                (v && v.length >= 6) ||
                                'يجب أن تكون كلمة المرور 6 أحرف على الأقل',
                        ]"
                        :type="show_Password1 ? 'text' : 'password'"
                        label="كلمة مرور الجديدة"
                        variant="outlined"
                        required
                        :append-inner-icon="
                            show_Password1 ? 'mdi-eye' : 'mdi-eye-off'
                        "
                        :minlength="6"
                        @click:append-inner="toggle_Show_Password1"
                    ></v-text-field>
                    <v-text-field
                        v-model="password2"
                        :rules="[
                            (v) => !!v || 'كلمة المرور مطلوبة',
                            (v) =>
                                (v && v.length >= 6) ||
                                'يجب أن تكون كلمة المرور 6 أحرف على الأقل',
                        ]"
                        :type="show_Password2 ? 'text' : 'password'"
                        label="تأكيد كلمة مرور"
                        variant="outlined"
                        required
                        :append-inner-icon="
                            show_Password2 ? 'mdi-eye' : 'mdi-eye-off'
                        "
                        :minlength="6"
                        @click:append-inner="toggle_Show_Password2"
                        @input="check_pass1()"
                        @blur="check_pass1()"
                    ></v-text-field>
                    <p
                        style="
                            display: block;
                            margin-right: 15px;
                            font-size: small;
                            color: #af0829;
                        "
                        v-if="check1 === false"
                    >
                        كلمة المرور غير متطابقة
                    </p>
                </div>
                <v-btn
                    type="submit"
                    class="d-flex align-center mb-4"
                    style="
                        width: 100%;
                        padding: 20px;
                        letter-spacing: normal;
                        font-weight: bold;
                        font-size: 19px;
                        background: var(--main-color);
                        color: #fff;
                    "
                >
                    تعديل
                </v-btn>
            </form>
        </v-card></v-dialog
    >
</template>

<script>
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase.js";
import { mapState, mapActions } from "pinia";
import { useAuthStore } from "../store/userStore";
import { useSecureDataStore } from "@/store/secureData.js";
import Student_Dashboard from "../components/Student_Dashboard.vue";
import Parent_Dashboard from "../components/Parent_Dashboard.vue";
export default {
    components: {
        Student_Dashboard,
        Parent_Dashboard,
    },
    data: () => ({
        password: "",
        check: true,
        check1: true,
        password2: "",
        user_password: "",
        dialog: false,
        dispaly: false,
        show_Password: false, // State for showing password
        show_Password1: false, // State for showing password
        show_Password2: false, // State for showing password
    }),
    async created() {},
    computed: {
        ...mapState(useAuthStore, ["user"]),
    },
    methods: {
        ...mapActions(useAuthStore, ["logout"]),
        async My_Logout() {
            try {
                this.logout();
                this.$router.push({ name: "home" });
            } catch (error) {
                console.error("حدث خطأ أثناء تسجيل الخروج:", error.message);
            }
        },
        // Toggle password visibility
        toggle_Show_Password() {
            this.show_Password = !this.show_Password;
        },
        toggle_Show_Password1() {
            this.show_Password1 = !this.show_Password1;
        },
        toggle_Show_Password2() {
            this.show_Password2 = !this.show_Password2;
        },

        check_pass() {
            if (this.password != this.user.password) {
                this.check = false;
            } else {
                this.check = true;
            }
        },
        check_pass1() {
            if (this.password2 != this.user_password) {
                this.check1 = false;
            } else {
                this.check1 = true;
                this.user.password = this.user_password;
            }
        },
        async update_data() {
            const secrureDataStore = useSecureDataStore();
            try {
                if (this.check1 === true && this.check === true) {
                    if (this.user.userType === "parent") {
                        const docRef = doc(db, "parents", this.user.id);
                        // Update document in Firestore
                        await updateDoc(docRef, {
                            National_id: this.user.National_id,
                            name: this.user.name,
                            parent_pass: this.user.password,
                            parent_email: this.user.email,
                            parent_phone: this.user.phone,
                        });
                        localStorage.setItem("user", JSON.stringify(this.user));
                    }

                    if (this.user.userType === "admin") {
                        const docRef = doc(db, "users", this.user.id);
                        // Update document in Firestore
                        await updateDoc(docRef, {
                            name: secrureDataStore.encryptData(
                                this.user.name,
                                "12345a"
                            ),
                            email: secrureDataStore.encryptData(
                                this.user.email,
                                "12345a"
                            ),
                            National_id: secrureDataStore.encryptData(
                                this.user.National_id,
                                "12345a"
                            ),
                            password: this.user.password,
                            roles: this.user.roles,
                        });
                        localStorage.setItem("user", JSON.stringify(this.user));
                    }

                    if (this.user.userType === "student") {
                        const docRef = doc(db, "students", this.user.id);
                        // Update document in Firestore
                        await updateDoc(docRef, {
                            name: this.user.name,
                            student_pass: this.user.password,
                            student_email: this.user.email,
                            student_phone: this.user.phone,
                        });
                        localStorage.setItem("user", JSON.stringify(this.user));
                    }

                    console.log("done");
                    this.dialog = false;
                } else {
                    console.log("not updated");
                }
            } catch (error) {
                console.error("Error fetching users:", error);
                this.error = "An error occurred while fetching user data.";
            }
        },
    },
};
</script>

<style scoped lang="scss">
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
form {
    padding: 20px;
    width: 100%;
}

img.pluse {
    width: 40px;
    cursor: pointer;
    &:hover {
        opacity: 0.7;
    }
}
img.pluse.pluse_1 {
    width: 30px;
    cursor: pointer;
    &:hover {
        opacity: 0.7;
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
.hello_text {
    font-size: 20px;
    color: var(--therd-color);
    font-weight: bold;
}
.children {
    width: 90% !important;
    margin: 0 auto;
    padding-top: 20px;
    .title {
        width: 100%;
        background: var(--secound-color);
        padding: 10px;
        border-radius: 5px;
        color: var(--main-color);
        font-size: 22px;
        font-weight: bold;
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .body {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;
        margin-top: 20px;

        .box {
            box-shadow: 0 0 10px #ddd;
            display: flex;
            flex-direction: column;
            width: 100%;
            padding: 10px;
            border-radius: 5px;
            position: relative;
            gap: 5px;
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
                    width: 35px !important;
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
    }
}
.pass {
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
.footer {
    .show_password {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        background: var(--main-color);
        width: 100%;
        padding: 10px;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
        &:hover {
            background-color: var(--therd-color);
        }
    }
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
@media (max-width: 599px) {
}
@media (min-width: 600px) and (max-width: 768px) {
}
@media (min-width: 769px) {
    .v-container {
        flex-direction: row;
        gap: 15px;
        align-items: stretch !important;
    }
    .card {
        width: 32%;
    }
    .feat {
        width: 32%;
        justify-content: flex-start;
    }
}
</style>
