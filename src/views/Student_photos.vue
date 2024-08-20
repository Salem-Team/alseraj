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
                                الصور</v-breadcrumbs-item
                            >
                        </v-breadcrumbs>
                    </div>
                </div>
                <div
                            class="Img_Container"
                            
                        >
                        <div v-for="photo in photos"
                            :key="photo.id">

                       
                            <img
                                :src="photo.linkphoto"
                                alt=""
                                loading="lazy"
                            />
                            <div class="caption">
                                <div class="time">
                                    <font-awesome-icon
                                        :icon="['fas', 'clock']"
                                    />
                                    <div>
                                        {{
                                            photo.DatePhoto
                                        }}
                                    </div>
                                </div>

                            </div>
                            </div>
                        </div>
                        <div v-if="photos.length === 0" style="    background: var(--secound-color);
    padding: 10px;
    width: calc(100% - 20px);
    margin: 10px auto;
    border-radius: 5px;
    text-align: center;
    font-weight: bold;
    color: var(--main-color);">
                            لا توجد صور حالياً
                        </div>
            </div>
        </div>
    </v-container>
</template>
<script>
import { db } from "@/Firebase.js";
import {
    doc,
    getDoc,
    // getDocs,
    // query,
    // collection,
    // where,
    // updateDoc,
} from "firebase/firestore";
export default {
    data() {
        return {
            photos: [],
            
        };
    },
    async created() {
        this.$nextTick(() => {
            window.scrollTo(0, 0);
            console.log("Scrolled to top");
        });
        const documentId = this.$route.params.id;
        try {
            const docSnap = await getDoc(doc(db, "students", documentId));
            if (docSnap.exists()) {
                const studentData = docSnap.data().photos;
                this.photos = studentData
                console.log("this.phots=>", this.photos);
            } else {
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
        }
    },
    methods: {
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
    .Img_Container {
width: calc(100% - 20px);
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin: 10px auto;
        &> div {
            width: 32% !important;
            padding: 15px;
            box-shadow: 0 0 10px #ddd;
            border-radius: 5px;
            gap: 10px;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            height: 380px;

        }
        img,
        video {
            height: 300px;
            width: 100%;
            object-fit: cover;
            object-position: center;
            cursor: zoom-in;
            transition: 00.3s;
            &:hover {
                transform: scale(1.02);
            }
        }
        .caption {
            display: flex;
            align-items: center;
            background: var(--secound-color);
            border-radius: 5px;
            justify-content: space-between;
            padding: 10px;
            color: var(--main-color);
            font-weight: bold;
            & > div {
                display: flex;
                align-items: center;
                gap: 5px;
            }
        }
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
@media (max-width: 700px) {
        .Img_Container {
            width: 100% !important;
            justify-content: flex-start;
            margin-bottom: 20px !important;
        }
}

@media (min-width: 700px) and (max-width: 950px) {
        .Img_Container {
            margin-bottom: 20px !important;
            width: 47% !important;
            justify-content: flex-start;
        }
}
</style>
