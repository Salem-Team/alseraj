<template>
    <v-container class="login-container">
        <v-card>
            <v-card-title class="text-center">Login</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="handleLogin">
                    <v-select
                        v-model="userType"
                        :items="userTypes"
                        label="User Type"
                        required
                    ></v-select>
                    <v-text-field
                        v-model="email"
                        label="Email"
                        type="email"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="password"
                        label="Password"
                        type="password"
                        required
                    ></v-text-field>

                    <v-btn
                        type="submit"
                        :loading="loading"
                        :disabled="loading"
                        color="primary"
                    >
                        Login
                    </v-btn>
                    <v-alert v-if="error" type="error" class="mt-2">{{
                        error
                    }}</v-alert>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useAuthStore } from "../store/userStore";
import { initializeApp } from "@firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDocs, collection } from "@firebase/firestore";
//import { useSecureDataStore } from "./secureData";
const firebaseConfig = {
    // Firebase configuration object
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
import { useSecureDataStore } from "@/store/secureData.js";
export default {
    data() {
        return {
            email: "",
            password: "",
            userType: "",
            id: "",
            roles: [],
            userTypes: ["parent", "admin", "student"],
            user: [],
        };
    },
    computed: {
        ...mapState(useAuthStore, ["loading", "error"]),
    },
    watch: {
        userType(newValue) {
            if (newValue === "parent") {
                this.email = "parent@gmail.com";
                this.password = "123456";
            } else if (newValue === "admin") {
                this.email = "admin@gmail.com";
                this.password = "123456";
            } else {
                this.email = "student@gmail.com";
                this.password = "123456";
            }
        },
    },
    methods: {
        ...mapActions(useAuthStore, ["login"]),
        async Check_User() {
            const decryption = useSecureDataStore();
            let authenticatedUser = null;
            try {
                if (this.userType === "parent") {
                    const querySnapshot = await getDocs(
                        collection(db, "parents")
                    );
                    querySnapshot.forEach((doc) => {
                        if (
                            doc.data().email === this.email &&
                            doc.data().password === this.password
                        ) {
                            authenticatedUser = {
                                id: doc.id,
                                email: doc.data().email,
                                name: doc.data().name,
                                userType: "parent",
                                password: doc.data().password,
                                roles: "",
                            };
                        }
                    });
                    return authenticatedUser;
                } else if (this.userType === "admin") {
                    const querySnapshot = await getDocs(
                        collection(db, "users")
                    );
                    querySnapshot.forEach((doc) => {
                        const decryptedEmail = decryption.decryptData(
                            doc.data().email,
                            "12345a"
                        );

                        if (
                            decryptedEmail === this.email &&
                            doc.data().password === this.password
                        ) {
                            authenticatedUser = {
                                id: doc.id,
                                email: decryptedEmail,
                                name: decryption.decryptData(
                                    doc.data().name,
                                    "12345a"
                                ),
                                userType: doc.data().userType,
                                password: doc.data().password,
                                roles: doc.data().roles,
                            };
                        }
                    });
                    return authenticatedUser;
                } else {
                    const querySnapshot = await getDocs(
                        collection(db, "students")
                    );
                    querySnapshot.forEach((doc) => {
                        if (
                            doc.data().email === this.email &&
                            doc.data().password === this.password
                        ) {
                            authenticatedUser = {
                                email: doc.data().email,
                                name: doc.data().student_name,
                                userType: "student",
                                password: doc.data().password,
                                roles: "",
                            };
                        }
                    });
                    return authenticatedUser;
                }
            } catch (error) {
                console.error("Error fetching users:", error);
                throw error; // Optionally rethrow the error for higher-level error handling
            }
        },
        async handleLogin() {
            let authenticatedUser = await this.Check_User();
            if (authenticatedUser) {
                // Call your login method or perform necessary actions
                await this.login(
                    authenticatedUser.email,
                    authenticatedUser.userType,
                    authenticatedUser.roles,
                    authenticatedUser.name
                );

                if (!this.error) {
                    if (authenticatedUser.userType === "parent") {
                        this.$router.push({ name: "Parent_Dashboard" });
                    } else if (authenticatedUser.userType === "admin") {
                        this.$router.push({ name: "admin_Dashboard" });
                    } else {
                        this.$router.push({ name: "Student_Dashboard" });
                    }
                }
            } else {
                // Handle invalid credentials
                console.log("Invalid email or password.");
                // Set an error message or handle the UI accordingly
                this.error = true; // Assuming error handling mechanism
            }
        },
    },
};
</script>

<style scoped>
.login-container {
    max-width: 300px;
    margin: 0 auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
}
</style>
