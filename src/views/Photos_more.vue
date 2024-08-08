<template>
    <!-- Main Container -->
    <div>
        <Offline_error>
            <template v-slot:default>
                <!-- Section Title -->
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
                        <stop
                            offset=".3"
                            stop-color="#336699"
                            stop-opacity=".9"
                        ></stop>
                        <stop
                            offset=".6"
                            stop-color="#336699"
                            stop-opacity=".6"
                        ></stop>
                        <stop
                            offset=".8"
                            stop-color="#336699"
                            stop-opacity=".3"
                        ></stop>
                        <stop
                            offset="1"
                            stop-color="#336699"
                            stop-opacity="0"
                        ></stop>
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
                            <v-breadcrumbs-item @click="$router.push('/')" link>
                                الرئيسية
                            </v-breadcrumbs-item>
                            <v-breadcrumbs-divider />
                            <v-breadcrumbs-item>المعرض</v-breadcrumbs-item>
                        </v-breadcrumbs>
                    </div>
                </div>
                <v-card
                    style="
                        min-height: 400px;
                        width: 90% !important;
                        margin: 20px auto auto;
                        border: none;
                        background: none;
                        box-shadow: none;
                    "
                >
                    <v-tabs
                        v-model="tab"
                        style="
                            background-color: white;
                            color: var(--main-color);
                            font-weight: bold;
                            width: calc(100% - 20px);
                            margin: 0 auto;
                        "
                    >
                        <v-tab
                            value="all"
                            style="font-weight: bold"
                            @click="photos.show_Data"
                            >الكل</v-tab
                        >
                        <v-tab
                            value="party"
                            style="font-weight: bold"
                            @click="photos.show_Data"
                            >حفلات</v-tab
                        >
                        <v-tab
                            value="news"
                            style="font-weight: bold"
                            @click="photos.show_Data"
                            >أخبار</v-tab
                        >
                        <v-tab
                            value="trip"
                            style="font-weight: bold"
                            @click="photos.show_Data"
                            >رحلات</v-tab
                        >
                    </v-tabs>

                    <v-card-text>
                        <v-tabs-window v-model="tab">
                            <v-tabs-window-item value="party">
                                <Empty_error
                                    v-if="empty3 === true"
                                    :text="text3"
                                />
                                <div
                                    class="Img_Container"
                                    v-for="photo in Photos"
                                    :key="photo.id"
                                    width="30%"
                                    v-else
                                >
                                    <img
                                        @click="dialog_6 = true"
                                        v-if="photo.File_type == 'صورة'"
                                        :src="photo.image"
                                        alt=""
                                        @click.prevent="
                                            photos.photo_Information(photo)
                                        "
                                        loading="lazy"
                                    />
                                    <video
                                        @click="dialog_6 = true"
                                        v-else
                                        controls
                                        loading="lazy"
                                    >
                                        <source
                                            :src="photo.video"
                                            type="video/mp4"
                                        />

                                        Your browser does not support the video
                                        tag.
                                    </video>
                                    <div class="caption">
                                        <div class="time">
                                            <font-awesome-icon
                                                :icon="['fas', 'clock']"
                                            />
                                            <div>
                                                {{
                                                    photo.time
                                                        .toDate()
                                                        .toLocaleString()
                                                }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </v-tabs-window-item>

                            <v-tabs-window-item value="all">
                                <Empty_error
                                    v-if="empty === true"
                                    :text="text0"
                                />
                                <div
                                    class="Img_Container"
                                    v-for="photo in Photos"
                                    :key="photo.id"
                                    width="30%"
                                    v-else
                                >
                                    <img
                                        @click="dialog_6 = true"
                                        v-if="photo.File_type == 'صورة'"
                                        :src="photo.image"
                                        alt=""
                                        @click.prevent="
                                            photos.photo_Information(photo)
                                        "
                                        loading="lazy"
                                    />
                                    <video
                                        @click="dialog_6 = true"
                                        v-else
                                        controls
                                        loading="lazy"
                                    >
                                        <source
                                            :src="photo.video"
                                            type="video/mp4"
                                        />

                                        Your browser does not support the video
                                        tag.
                                    </video>
                                    <div class="caption">
                                        <div class="time">
                                            <font-awesome-icon
                                                :icon="['fas', 'clock']"
                                            />
                                            <div>
                                                {{
                                                    photo.time
                                                        .toDate()
                                                        .toLocaleString()
                                                }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </v-tabs-window-item>
                            <v-tabs-window-item value="news">
                                <Empty_error
                                    v-if="empty2 === true"
                                    :text="text2"
                                />
                                <div
                                    class="Img_Container"
                                    v-for="photo in Photos"
                                    width="30%"
                                    :key="photo.id"
                                    v-else
                                >
                                    <img
                                        @click="dialog_6 = true"
                                        v-if="photo.File_type == 'صورة'"
                                        :src="photo.image"
                                        alt=""
                                        @click.prevent="
                                            photos.photo_Information(photo)
                                        "
                                        loading="lazy"
                                    />
                                    <video
                                        @click="dialog_6 = true"
                                        v-else
                                        controls
                                        loading="lazy"
                                    >
                                        <source
                                            :src="photo.video"
                                            type="video/mp4"
                                        />

                                        Your browser does not support the video
                                        tag.
                                    </video>
                                    <div class="caption">
                                        <div class="time">
                                            <font-awesome-icon
                                                :icon="['fas', 'clock']"
                                            />
                                            <div>
                                                {{
                                                    photo.time
                                                        .toDate()
                                                        .toLocaleString()
                                                }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </v-tabs-window-item>

                            <v-tabs-window-item width="30%" value="trip">
                                <Empty_error
                                    v-if="empty1 === true"
                                    :text="text1"
                                />
                                <div
                                    class="Img_Container"
                                    width="30%"
                                    v-for="photo in Photos"
                                    :key="photo.id"
                                    v-else
                                >
                                    <img
                                        @click="dialog_6 = true"
                                        v-if="photo.File_type == 'صورة'"
                                        :src="photo.image"
                                        alt=""
                                        loading="lazy"
                                        @click.prevent="
                                            photos.photo_Information(photo)
                                        "
                                        @click.="moveText()"
                                    />
                                    <video
                                        @click="dialog_6 = true"
                                        v-else
                                        controls
                                        loading="lazy"
                                    >
                                        <source
                                            :src="photo.video"
                                            type="video/mp4"
                                        />

                                        Your browser does not support the video
                                        tag.
                                    </video>
                                    <div class="caption">
                                        <div class="time">
                                            <font-awesome-icon
                                                :icon="['fas', 'clock']"
                                            />
                                            <div>
                                                {{
                                                    photo.time
                                                        .toDate()
                                                        .toLocaleString()
                                                }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </v-tabs-window-item>
                            <!-- Display each photo -->
                            <v-dialog v-model="dialog_6" width="90%">
                                <v-card width="100%" class="popup">
                                    <div
                                        class="d-flex justify-space-between align-center title"
                                    >
                                        <div style="color: var(--main-color)">
                                            الصور
                                        </div>
                                        <v-btn
                                            icon="mdi-close"
                                            @click="dialog_6 = false"
                                        ></v-btn>
                                    </div>
                                    <v-carousel
                                        :show-arrows="showArrows"
                                        hide-delimiters
                                        height="100%"
                                    >
                                        <!-- Make carousel content scrollable -->
                                        <v-carousel-item
                                            class="pa-5 text-center"
                                            v-if="
                                                photos.File_Information ==
                                                'صورة'
                                            "
                                            :src="photos.Photo_Information"
                                            height="400"
                                        ></v-carousel-item>
                                        <v-carousel-item
                                            class="pa-5 text-center"
                                            v-if="
                                                photos.File_Information ==
                                                'فيديو'
                                            "
                                        >
                                            <video height="400" controls>
                                                <source
                                                    :src="
                                                        photos.Video_Information
                                                    "
                                                    type="video/mp4"
                                                />

                                                Your browser does not support
                                                the video tag.
                                            </video></v-carousel-item
                                        >
                                        <div
                                            v-for="photo in Photos"
                                            :key="photo.id"
                                        >
                                            <v-carousel-item
                                                v-if="photo.File_type == 'صورة'"
                                                class="pa-5 text-center"
                                                :src="photo.image"
                                                height="400"
                                            ></v-carousel-item>
                                            <v-carousel-item
                                                v-if="
                                                    photo.File_type == 'فيديو'
                                                "
                                                class="pa-5 text-center"
                                            >
                                                <video controls height="400">
                                                    <source
                                                        :src="photo.video"
                                                        type="video/mp4"
                                                    />

                                                    Your browser does not
                                                    support the video tag.
                                                </video></v-carousel-item
                                            >
                                        </div>
                                        <template v-slot:next="{ props }">
                                            <v-icon
                                                style="
                                                    text-align: center;
                                                    color: var(--main-color);
                                                "
                                                @click="props.onClick"
                                                class="pa-10 carousel-arrow next-arrow"
                                                >mdi-menu-right</v-icon
                                            >
                                        </template>
                                        <template v-slot:prev="{ props }">
                                            <v-icon
                                                style="
                                                    text-align: center;
                                                    color: var(--main-color);
                                                "
                                                @click="props.onClick"
                                                class="pa-10 carousel-arrow prev-arrow"
                                                >mdi-menu-left</v-icon
                                            >
                                        </template>
                                    </v-carousel></v-card
                                ></v-dialog
                            >
                        </v-tabs-window>
                    </v-card-text>
                </v-card>
            </template>
        </Offline_error>
    </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { usePhoto_Gallery } from "@/store/Photo_Gallery.js";
import Offline_error from "@/components/Offline_error.vue";
import Empty_error from "@/components/Empty_error.vue";
export default defineComponent({
    inject: ["Emitter"],
    components: {
        Empty_error,
        Offline_error,
    },
    setup() {
        // Access the Photo Gallery store
        const photos = usePhoto_Gallery();

        // Initialize or fetch data on component setup
        photos.Get_data(); // Retrieve initial set of photos
        // Destructure reactive references and methods from Photo Gallery store
        const {
            text1,
            empty1,
            text2,
            empty2,
            text3,
            empty3,
            Photo,
            tab,
            loading,
            text0,
            empty,
            Photos,
            dialog_6,
            Add_Photos,
            photos_show,
            Get_data,
            loading1,
            show_Data,
            File_type,
            image,
            photo_Information,
            Photo_Information,
        } = storeToRefs(photos);

        // Return the necessary reactive properties and methods
        return {
            text1,
            empty1,
            text2,
            empty2,
            text3,
            empty3,
            Photo,
            tab,
            photos_show,
            text0,
            empty,
            loading,
            Photos,
            dialog_6,
            Add_Photos,
            Get_data,
            loading1,
            show_Data,
            File_type,
            Photo_Information,
            photo_Information,
            image,
            photos,
        };
    },
    data() {
        return {
            showArrows: true,
        };
    },
    mounted() {
        this.updateArrowVisibility();
        window.addEventListener("resize", this.updateArrowVisibility);
    },
    methods: {
        updateArrowVisibility() {
            this.showArrows = window.innerWidth >= 700;
        },
    },
});
</script>

<style lang="scss" scoped>
.v-tabs-window-item {
    flex-wrap: wrap !important; /* Wrap items inside container */
    gap: 10px !important; /* Gap between items */
    width: 90% !important;
    margin: 0 auto !important;
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
.v-container {
    margin: 20px auto !important;
    flex-wrap: wrap;
    padding: 0;
    justify-content: flex-start !important;
    flex-direction: column;
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
    width: 100%;
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
svg {
    cursor: pointer;
}
.v-card-text {
    padding: 0 !important;
}
.v-slide-group.v-slide-group--mobile.v-tabs.v-tabs--horizontal.v-tabs--align-tabs-start.v-tabs--density-default
    > div
    > div {
    justify-content: center !important;
    align-items: center !important;
}
.v-window-item.v-tabs-window-item {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    min-height: 400px;
    padding: 10px;
    width: 100% !important;
    .Img_Container {
        width: 32% !important;
        padding: 15px;
        box-shadow: 0 0 10px #ddd;
        border-radius: 5px;
        gap: 10px;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        height: 380px;
        img,
        video {
            height: 300px;
            width: 100%;
            object-fit: cover;
            object-position: center;
            cursor: zoom-in;
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
}
@media (max-width: 700px) {
    .v-window-item.v-tabs-window-item {
        flex-direction: column !important;
        gap: 15px !important;
        align-items: stretch !important;
        .Img_Container {
            width: 100% !important;
            justify-content: flex-start;
            margin-bottom: 20px !important;
        }
    }
}

@media (min-width: 700px) and (max-width: 950px) {
    .v-window-item.v-tabs-window-item {
        .Img_Container {
            margin-bottom: 20px !important;
            width: 47% !important;
            justify-content: flex-start;
        }
    }
}

img.pluse {
    width: 40px;
    cursor: pointer;
    &:hover {
        opacity: 0.7;
    }
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
</style>
