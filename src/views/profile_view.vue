<template>
    <v-card>
        <div class="d-flex justify-space-between" v-if="user">
            <div>
                <v-btn class="ma-2" size="small" @click="dialog = true">
                    تعديل البيانات
                </v-btn>
                <v-btn class="ma-2" size="small" @click="My_Logout()">
                    تسجيل خروج
                </v-btn>
            </div>
        </div>
        <div class="children">
            <div class="hello_text">
                مرحبًا {{ user.name }}، نشكرك على ثقتك في معهد السراج المنير
                الأزهري، نتطلع سويًا لتحقيق مستقبل مشرق لأبنائنا.
            </div>
            <div class="body">
                <div class="box">
                    <div class="head">
                        <div class="name">{{ user.name }}</div>
                    </div>
                    <div class="grad" v-if="user.userType === 'admin'">
                        {{ user.email }}
                    </div>
                    <div class="grad">{{ user.National_id }}</div>
                    <div class="class" v-if="user.userType === 'admin'">
                        <div>
                            الصلاحيات
                            <div v-for="role in user.roles" :key="role">
                                {{ role }}
                            </div>
                        </div>
                    </div>
                    <div class="footer">
                        <v-dialog max-width="500">
                            <template
                                v-slot:activator="{ props: activatorProps }"
                            >
                                <div
                                    class="show_password"
                                    v-bind="activatorProps"
                                >
                                    <font-awesome-icon
                                        :icon="['fas', 'lock-open']"
                                    />
                                    <div>عرض كلمة المرور</div>
                                </div>
                            </template>

                            <template v-slot:default="{ isActive }">
                                <v-card class="pass">
                                    <div class="head">
                                        <div>كلمة مرور</div>
                                        <font-awesome-icon
                                            :icon="['fas', 'xmark']"
                                            @click="isActive.value = false"
                                        />
                                    </div>
                                    <div class="body">
                                        <div id="password">
                                            {{ user.password }}
                                        </div>
                                        <div>
                                            <div>
                                                <font-awesome-icon
                                                    :icon="['fas', 'copy']"
                                                    @click="Snackbar_Function"
                                                    @click.prevent="
                                                        isActive.value = false
                                                    "
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </v-card>
                            </template>
                        </v-dialog>
                    </div>
                </div>
            </div>
        </div>
    </v-card>
    <v-dialog v-model="dialog" width="90%">
        <v-card width="100%" class="popup">
            <div class="d-flex justify-space-between align-center title">
                <div style="color: var(--main-color)">تعديل البيانات</div>
                <v-btn icon="mdi-close" @click="dialog = false"></v-btn>
            </div>
            <form ref="form" @submit.prevent="" class="ma-auto mt-4">
                <v-text-field
                    v-model="user.name"
                    type="text"
                    label=" الاسم"
                    :rules="[(v) => !!v || 'الاسم مطلوب']"
                    variant="outlined"
                    required
                ></v-text-field>
                <v-text-field
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
                    v-if="user.userType === 'admin'"
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
                    @focus="check_pass1()"
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
                <v-btn
                    type="submit"
                    :loading="loading"
                    :disabled="loading"
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
    <v-snackbar v-model="snackbar1">
        {{ text }}

        <template v-slot:actions>
            <v-btn
                color="var(--main-color)"
                variant="text"
                @click="snackbar1 = false"
            >
                إغلاق
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useAuthStore } from "../store/userStore";
export default {
    data: () => ({
        password: "",
        check: true,
        check1: true,
        password2: "",
        user_password: "",
        dialog: false,
        show_Password: false, // State for showing password
        show_Password1: false, // State for showing password
        show_Password2: false, // State for showing password
        snackbar1: false,
        text: `تم نسخ كلمة المرور`,
    }),
    async created() {},
    computed: {
        ...mapState(useAuthStore, ["user"]),
    },
    methods: {
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
        ...mapActions(useAuthStore, ["logout"]),
        Snackbar_Function() {
            const passwordElement = document.getElementById("password");
            const password =
                passwordElement.innerText || passwordElement.textContent;

            // استخدام واجهة برمجة تطبيقات الحافظة لنسخ النص
            navigator.clipboard
                .writeText(password)
                .then(() => {
                    console.log("تم نسخ كلمة المرور بنجاح!");
                    this.snackbar1 = true;
                })
                .catch((err) => {
                    console.error("فشل في نسخ كلمة المرور: ", err);
                });
        },
        check_pass() {
            if (this.password != this.user.password) {
                this.check = false;
            } else {
                this.check = true;
            }
        },
        check_pass1() {
            if (this.password != this.user_password) {
                this.check1 = false;
            } else {
                this.check1 = true;
                this.user.password = this.user_password;
            }
        },
        async My_Logout() {
            try {
                this.logout();
                this.$router.push({ name: "home" });
            } catch (error) {
                console.error("حدث خطأ أثناء تسجيل الخروج:", error.message);
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
    width: 100%;
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
