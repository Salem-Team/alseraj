import { defineStore } from "pinia";
import Cookies from "js-cookie";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: {
            id: "",
            National_id: "",
            password: "",
            userType: "",
            roles: [],
        },
        loading: false,
        error: null,
    }),
    actions: {
        get_Cookies() {
            // Retrieve the cookie value
            const user_data = Cookies.get("user");

            // Check if user_data is not null or undefined
            if (user_data) {
                try {
                    // Attempt to parse the JSON string
                    this.user = JSON.parse(user_data);
                } catch (error) {
                    console.error(
                        "Failed to parse user data from cookies:",
                        error
                    );
                    // Handle the error as needed, for example, set `this.user` to a default value or an empty object
                    this.user = {
                        id: "",
                        National_id: "",
                        password: "",
                        userType: "",
                        roles: [],
                    };
                }
            } else {
                // Handle cases where the cookie does not exist or is empty
                this.user = {
                    id: "",
                    email: "",
                    National_id: "",
                    password: "",
                    userType: "",
                    roles: [],
                    name: "",
                };
            }
        },
        async login(id, email, National_id, userType, roles, name, password) {
            this.loading = true;
            try {
                // تحقق من البريد الإلكتروني وكلمة المرور

                this.user = {
                    id,
                    email,
                    National_id,
                    userType,
                    roles,
                    name,
                    password,
                };
                this.error = null;
                // تخزين بيانات المستخدم في الكوكيز
                Cookies.set("user", JSON.stringify(this.user), {
                    expires: 7,
                });
            } catch (error) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        logout() {
            this.user = {
                id: "",
                email: "",
                National_id: "",
                password: "",
                userType: "",
                roles: [],
                name: "",
            };
            // إزالة بيانات المستخدم من الكوكيز
            Cookies.remove("user");
        },
        // لإخفاء الخطأ بعد 5 ثوانٍ
        clearError() {
            setTimeout(() => {
                this.error = null;
            }, 5000);
        },
    },
});
