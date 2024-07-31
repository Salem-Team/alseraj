<template>
    <v-dialog v-model="dialogq" max-width="90%">
        <v-card>
            <v-card-title>إضافة محتوى تعليمي</v-card-title>
            <v-card-subtitle>
                <v-select
                    v-model="selectedClass"
                    :items="classes"
                    item-text="name"
                    item-value="id"
                    label="اختر الفصل"
                    outlined
                ></v-select>
                <v-select
                    v-model="selectedSection"
                    :items="sections"
                    item-text="name"
                    item-value="id"
                    label="اختر القسم"
                    outlined
                ></v-select>
                <v-btn @click="openImageDialog">إضافة صورة</v-btn>
                <v-btn @click="openVideoDialog">إضافة فيديو</v-btn>
                <v-btn @click="openPDFDialog">إضافة PDF</v-btn>
            </v-card-subtitle>

            <!-- Display uploaded items -->
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col
                            v-for="item in items"
                            :key="item.id"
                            cols="12"
                            sm="4"
                        >
                            <v-card class="item-card">
                                <v-card-title
                                    style="width: 100%; text-align: end"
                                >
                                    <v-icon
                                        @click="deleteItem(item)"
                                        class="delete-icon"
                                        >mdi-delete</v-icon
                                    >
                                </v-card-title>
                                <v-img
                                    v-if="item.type === 'image'"
                                    :src="item.linkphoto"
                                    :alt="item.description"
                                    class="item-img"
                                ></v-img>
                                <video
                                    v-if="item.type === 'video'"
                                    controls
                                    class="item-video"
                                >
                                    <source
                                        :src="item.linkvideo"
                                        type="video/mp4"
                                    />
                                    Your browser does not support the video tag.
                                </video>
                                <div
                                    v-if="item.type === 'pdf'"
                                    class="pdf-icon-container"
                                >
                                    <v-icon large>mdi-file-pdf-box</v-icon>
                                    <v-btn
                                        :href="item.linkpdf"
                                        target="_blank"
                                        class="view-pdf-btn"
                                        >عرض PDF</v-btn
                                    >
                                </div>
                                <v-card-subtitle class="item-description">{{
                                    item.description
                                }}</v-card-subtitle>
                                <v-card-subtitle class="item-date">{{
                                    item.DatePhoto ||
                                    item.DateVideo ||
                                    item.DatePDF
                                }}</v-card-subtitle>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

            <!-- Image Dialog -->
            <v-dialog v-model="imageDialog" max-width="500px">
                <v-card>
                    <v-card-title>إضافة صورة</v-card-title>
                    <v-card-subtitle>
                        <v-file-input
                            v-model="imageFile"
                            label="اختر صورة"
                        ></v-file-input>
                        <v-textarea
                            v-model="imageDescription"
                            label="وصف الصورة"
                        ></v-textarea>
                        <v-btn @click="uploadImage">رفع الصورة</v-btn>
                    </v-card-subtitle>
                </v-card>
            </v-dialog>

            <!-- Video Dialog -->
            <v-dialog v-model="videoDialog" max-width="500px">
                <v-card>
                    <v-card-title>إضافة فيديو</v-card-title>
                    <v-card-subtitle>
                        <v-file-input
                            v-model="videoFile"
                            label="اختر فيديو"
                            accept="video/*"
                        ></v-file-input>
                        <v-textarea
                            v-model="videoDescription"
                            label="وصف الفيديو"
                        ></v-textarea>
                        <v-btn @click="uploadVideo">رفع الفيديو</v-btn>
                    </v-card-subtitle>
                </v-card>
            </v-dialog>

            <!-- PDF Dialog -->
            <v-dialog v-model="pdfDialog" max-width="500px">
                <v-card>
                    <v-card-title>إضافة PDF</v-card-title>
                    <v-card-subtitle>
                        <v-file-input
                            v-model="pdfFile"
                            label="اختر PDF"
                            accept=".pdf"
                        ></v-file-input>
                        <v-textarea
                            v-model="pdfDescription"
                            label="وصف PDF"
                        ></v-textarea>
                        <v-btn @click="uploadPDF">رفع PDF</v-btn>
                    </v-card-subtitle>
                </v-card>
            </v-dialog>
        </v-card>
        <confirm_message2
            v-model="showSnackbar"
            :text="confirmationText"
            :snackbar="showSnackbar"
            @close-snackbar="showSnackbar = false"
        />
    </v-dialog>
</template>

<script>
import confirm_message2 from "@/components/confirm_message2.vue";

import {
    uploadBytes,
    getDownloadURL,
    ref as storageRef,
    deleteObject,
} from "firebase/storage";
import {
    collection,
    addDoc,
    doc,
    deleteDoc,
    getDocs,
    getFirestore,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// import { Notify } from "notiwind";

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

export default {
    props: {
        year: {
            type: Number,
            required: true,
        },
    },
    components: {
        confirm_message2,
    },
    data() {
        return {
            showSnackbar: false,
            confirmationText: "",
            dialogq: false,
            imageDialog: false,
            videoDialog: false,
            pdfDialog: false,
            imageFile: null,
            imageDescription: "",
            videoFile: null,
            videoDescription: "",
            pdfFile: null,
            pdfDescription: "",
            selectedClass: null,
            selectedSection: null,
            classes: ["1/1", "1/2", "2/1", "2/2", "3/1", "3/2"], // Should be populated with class data from the props or API
            sections: ["عربي", "لغات"], // Should be populated with section data from the props or API
            items: [],
        };
    },
    methods: {
        openImageDialog() {
            this.imageDialog = true;
        },
        openVideoDialog() {
            this.videoDialog = true;
        },
        openPDFDialog() {
            this.pdfDialog = true;
        },
        validateSelection() {
            if (!this.selectedClass || !this.selectedSection) {
                this.confirmationText = "يجب اختيار الفصل ونوع القسم";
                this.showSnackbar = true;
                return false;
            }
            return true;
        },
        async uploadImage() {
            if (this.validateSelection() && this.imageFile) {
                const filePath = `images/${this.imageFile.name}`;
                const imageRef = storageRef(storage, filePath);
                await uploadBytes(imageRef, this.imageFile);
                const url = await getDownloadURL(imageRef);

                const photoTime = new Date().toLocaleString("ar-EG", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                });

                await addDoc(collection(db, "Educationalcontent"), {
                    DatePhoto: photoTime,
                    linkphoto: url,
                    filePath: filePath,
                    type: "image",
                    description: this.imageDescription,
                    classId: this.selectedClass,
                    sectionId: this.selectedSection,
                    educational_level: this.year,
                });

                this.imageDialog = false;
                this.imageFile = null;
                this.imageDescription = "";
                this.selectedClass = null;
                this.selectedSection = null;
                this.fetchItems();
            }
        },
        async uploadVideo() {
            if (this.validateSelection() && this.videoFile) {
                const filePath = `videos/${this.videoFile.name}`;
                const videoRef = storageRef(storage, filePath);
                await uploadBytes(videoRef, this.videoFile);
                const url = await getDownloadURL(videoRef);

                const videoTime = new Date().toLocaleString("ar-EG", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                });

                await addDoc(collection(db, "Educationalcontent"), {
                    DateVideo: videoTime,
                    linkvideo: url,
                    filePath: filePath,
                    type: "video",
                    description: this.videoDescription,
                    classId: this.selectedClass,
                    sectionId: this.selectedSection,
                    educational_level: this.year,
                });

                this.videoDialog = false;
                this.videoFile = null;
                this.videoDescription = "";
                this.selectedClass = null;
                this.selectedSection = null;
                this.fetchItems();
            }
        },
        async uploadPDF() {
            if (this.validateSelection() && this.pdfFile) {
                const filePath = `pdfs/${this.pdfFile.name}`;
                const pdfRef = storageRef(storage, filePath);
                await uploadBytes(pdfRef, this.pdfFile);
                const url = await getDownloadURL(pdfRef);

                const pdfTime = new Date().toLocaleString("ar-EG", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                });

                await addDoc(collection(db, "Educationalcontent"), {
                    DatePDF: pdfTime,
                    linkpdf: url,
                    filePath: filePath,
                    type: "pdf",
                    description: this.pdfDescription,
                    classId: this.selectedClass,
                    sectionId: this.selectedSection,
                    educational_level: this.year,
                });

                this.pdfDialog = false;
                this.pdfFile = null;
                this.pdfDescription = "";
                this.selectedClass = null;
                this.selectedSection = null;
                this.fetchItems();
            }
        },
        async fetchItems() {
            const querySnapshot = await getDocs(
                collection(db, "Educationalcontent")
            );
            this.items = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
        },
        async deleteItem(item) {
            const desertRef = storageRef(storage, item.filePath);
            await deleteObject(desertRef);
            await deleteDoc(doc(db, "Educationalcontent", item.id));
            this.fetchItems();
        },
    },
    mounted() {
        this.fetchItems();
    },
};
</script>

<style scoped>
.item-card {
    max-width: 400px;
    margin: 10px;
}

.item-img {
    max-width: 100%;
    height: auto;
}

.item-video {
    width: 100%;
    height: auto;
}

.pdf-icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 340px;
}

.delete-icon {
    cursor: pointer;
    color: red;
}

.view-pdf-btn {
    margin-left: 8px;
}
</style>
