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
            userTypes: ["parent", "admin"],
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
                this.email = "nada@gmail.com";
                this.password = "0WtCdL5e";
            }
        },
    },
    methods: {
        ...mapActions(useAuthStore, ["login"]),
        async handleLogin() {
            const querySnapshot = await getDocs(collection(db, "users"));
            const decryption = useSecureDataStore();

            let authenticatedUser = null;

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
                        name: decryption.decryptData(doc.data().name, "12345a"),
                        userType: doc.data().userType,
                        password: doc.data().password,
                        roles: doc.data().roles,
                    };
                }
            });

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
