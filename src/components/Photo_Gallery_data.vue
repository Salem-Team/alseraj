<template>
    <!-- Main Container -->
    <div
        style="
            width: 100% !important; /* Full width */
            margin: auto; /* Centered horizontally */
            background: var(--secound-color); /* Background color */
            padding: 40px 0px; /* Padding top and bottom */
        "
    >
        <!-- Section Title -->
        <div class="use">
            <div class="title">
                <div class="right">معرض الصور</div>
                <!-- Title in Arabic -->
            </div>
        </div>
        <!-- Cards Container -->
        <Empty_error v-if="empty === true" :text="text0" />
        <div
            class="box d-flex align-center justify-space-around"
            v-if="(!loading1, empty === false)"
        >
            <!-- Photo Cards Loop -->
            <v-card
                class="card"
                v-for="photo in Photos"
                :key="photo.id"
                width="30%"
                @click.="photos.photo_Information(photo)"
                @click="dialog_6 = true"
            >
                <v-skeleton-loader v-if="loading2" type="image">
                </v-skeleton-loader>
                <v-img
                    v-if="photo.File_type == 'صورة'"
                    :src="photo.image"
                    height="200"
                    @load="handleImageLoad"
                    loading="lazy"
                ></v-img>
                <video
                    v-if="photo.File_type == 'فيديو'"
                    controls
                    @load="handleImageLoad"
                    loading="lazy"
                >
                    <source :src="photo.video" type="video/mp4" />

                    Your browser does not support the video tag.
                </video>
            </v-card>
        </div>
        <!-- Display each photo -->
        <v-dialog v-model="dialog_6" width="90%">
            <v-card width="100%" class="popup">
                <div class="d-flex justify-space-between align-center title">
                    <div style="color: var(--main-color)">الصور</div>
                    <v-btn icon="mdi-close" @click="dialog_6 = false"></v-btn>
                </div>
                <v-carousel
                    :show-arrows="showArrows"
                    hide-delimiters
                    height="100%"
                    :cycle="false"
                >
                    <!-- Make carousel content scrollable -->
                    <v-carousel-item
                        class="pa-5 text-center"
                        v-if="photos.File_Information == 'صورة'"
                        :src="photos.Photo_Information"
                        height="400"
                    ></v-carousel-item>
                    <v-carousel-item
                        class="pa-5 text-center"
                        v-if="photos.File_Information == 'فيديو'"
                    >
                        <video height="400" controls>
                            <source
                                :src="photos.Video_Information"
                                type="video/mp4"
                            />

                            Your browser does not support the video tag.
                        </video></v-carousel-item
                    >
                    <div v-for="photo in Photos" :key="photo.id">
                        <div v-if="photo.id != photos.Id_Information">
                            <v-carousel-item
                                v-if="photo.File_type == 'صورة'"
                                class="pa-5 text-center"
                                :src="photo.image"
                                height="400"
                            ></v-carousel-item>
                            <v-carousel-item
                                v-if="photo.File_type == 'فيديو'"
                                class="pa-5 text-center"
                            >
                                <video controls height="400">
                                    <source
                                        :src="photo.video"
                                        type="video/mp4"
                                    />

                                    Your browser does not support the video tag.
                                </video></v-carousel-item
                            >
                        </div>
                    </div>
                    <template v-slot:next="{ props }">
                        <v-icon
                            style="text-align: center; color: var(--main-color)"
                            @click="props.onClick"
                            class="pa-10 carousel-arrow next-arrow"
                            >mdi-menu-right</v-icon
                        >
                    </template>
                    <template v-slot:prev="{ props }">
                        <v-icon
                            style="text-align: center; color: var(--main-color)"
                            @click="props.onClick"
                            class="pa-10 carousel-arrow prev-arrow"
                            >mdi-menu-left</v-icon
                        >
                    </template>
                </v-carousel>
            </v-card></v-dialog
        >
        <!-- Load More Button -->
        <div v-if="Photos.length < 4" class="btn">
            <v-btn
                style="
                    background-color: var(
                        --main-color
                    ) !important; /* Button background color */
                    color: white !important; /* Button text color */
                    width: 20%; /* Button width */
                "
                @click="$router.push('/Photos_more')"
                >المزيد</v-btn
            >
        </div>
    </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { usePhoto_Gallery } from "@/store/Photo_Gallery.js";
import Empty_error from "@/components/Empty_error.vue";
export default defineComponent({
    inject: ["Emitter"],
    components: {
        Empty_error,
    },
    setup() {
        // Access the Photo Gallery store
        const photos = usePhoto_Gallery();
        photos.Get_splice();
        // Destructure reactive references and methods from Photo Gallery store
        const {
            Photo,
            loading,
            text0,
            empty,
            Photos,
            File_type,
            Add_Photos,
            dialog_6,
            Get_data,
            loading1,
            image,
            photo_Information,
            Photo_Information,
        } = storeToRefs(photos);

        // Return the necessary reactive properties and methods
        return {
            Photo,
            text0,
            empty,
            dialog_6,
            File_type,
            loading,
            Photos,
            Add_Photos,
            Get_data,
            loading1,
            image,
            photos,
            Photo_Information,
            photo_Information,
        };
    },
    data() {
        return {
            loading2: true,
            showArrows: true,
        };
    },
    mounted() {
        this.updateArrowVisibility();
        window.addEventListener("resize", this.updateArrowVisibility);
    },
    methods: {
        handleImageLoad() {
            // This method is called when the image has fully loaded
            this.loading2 = false;
        },
        updateArrowVisibility() {
            this.showArrows = window.innerWidth >= 700;
        },
    },
});
</script>

<style lang="scss" scoped>
.carousel-container {
    overflow-x: auto;
    white-space: nowrap;
}
/* Styles for Main Container */
.box {
    flex-wrap: wrap !important; /* Wrap items inside container */
    gap: 10px !important; /* Gap between items */
    width: 90% !important;
    margin: 0 auto !important;
}
.v-btn--variant-outlined {
    border: none;
}
.v-btn-group .v-btn:not(:last-child) {
    border-inline-end: solid;
}
.use {
    width: fit-content !important; /* Fit content width */
    margin: auto; /* Centered horizontally */
    .title {
        text-transform: uppercase; /* Uppercase title text */
        color: var(--main-color); /* Main color for title */
        margin: 0 auto 80px; /* Margin bottom for title */
        border: 2px solid var(--main-color); /* Border for title */
        padding: 10px 20px; /* Padding inside title */
        font-size: 30px; /* Font size of title */
        width: fit-content; /* Fit content width */
        position: relative; /* Positioning context */
        z-index: 1; /* Z-index for stacking */
        transition: 0.3s; /* Transition duration */
    }
    .title::before {
        content: ""; /* Empty content before pseudo-element */
        width: 12px; /* Width of before pseudo-element */
        height: 12px; /* Height of before pseudo-element */
        background-color: var(
            --main-color
        ); /* Main color for before pseudo-element */
        position: absolute; /* Absolute positioning */
        border-radius: 50%; /* Circular border radius */
        top: 50%; /* Position from top */
        right: -30px; /* Position from right */
        transform: translateY(-50%); /* Center vertically */
    }
    .title::after {
        content: ""; /* Empty content after pseudo-element */
        width: 12px; /* Width of after pseudo-element */
        height: 12px; /* Height of after pseudo-element */
        background-color: var(
            --main-color
        ); /* Main color for after pseudo-element */
        position: absolute; /* Absolute positioning */
        border-radius: 50%; /* Circular border radius */
        top: 50%; /* Position from top */
        left: -30px; /* Position from left */
        transform: translateY(-50%); /* Center vertically */
    }
    .title:hover::before {
        z-index: -1; /* Lower z-index on hover */
        animation: right-move 0.5s linear forwards; /* Animation for before pseudo-element */
    }
    .title:hover::after {
        z-index: -1; /* Lower z-index on hover */
        animation: left-move 0.5s linear forwards; /* Animation for after pseudo-element */
    }
    .title:hover {
        color: white; /* Color change on hover */
        border: 2px solid white; /* Border change on hover */
        transition-delay: 0.5s; /* Delay for transition */
    }
}

/* Styles for Photo Cards */
.card {
    border: 20px solid white; /* Border around each card */
    overflow: hidden; /* Hide overflow content */
    -webkit-box-shadow: 0 0 20px #ddd; /* Box shadow for webkit browsers */
    -moz-box-shadow: 0 0 20px #ddd; /* Box shadow for mozilla browsers */
    box-shadow: 0 0 20px #ddd; /* Box shadow */
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
    &::before {
        content: ""; /* Empty content before pseudo-element */
        position: absolute; /* Absolute positioning */
        top: 50%; /* Position from top */
        left: 50%; /* Position from left */
        transform: translate(
            -50%,
            -50%
        ); /* Center vertically and horizontally */
        background-color: rgb(
            255 255 255 / 20%
        ); /* Background color with opacity */
        width: 0; /* Initial width */
        height: 0; /* Initial height */
        opacity: 0; /* Initial opacity */
        z-index: 2; /* Z-index */
    }
    &:hover::before {
        animation: flashing 0.7s; /* Animation on hover */
    }
    .v-img {
        transition: 0.3s; /* Image transition duration */
    }
    &:hover .v-img {
        transform: rotate(5deg) scale(1.1); /* Image transformation on hover */
    }
}

/* Keyframe Animations */
@keyframes flashing {
    0%,
    40% {
        opacity: 1; /* Opacity keyframe */
    }
    100% {
        opacity: 0; /* Final opacity */
        width: 200%; /* Final width */
        height: 200%; /* Final height */
    }
}
@keyframes left-move {
    50% {
        left: 0; /* Left position at 50% keyframe */
        width: 12px; /* Width at 50% keyframe */
        height: 12px; /* Height at 50% keyframe */
    }
    100% {
        left: 0; /* Final left position */
        border-radius: 0; /* Final border radius */
        width: 50%; /* Final width */
        height: 100%; /* Final height */
    }
}
@keyframes right-move {
    50% {
        right: 0; /* Right position at 50% keyframe */
        width: 12px; /* Width at 50% keyframe */
        height: 12px; /* Height at 50% keyframe */
    }
    100% {
        right: 0; /* Final right position */
        border-radius: 0; /* Final border radius */
        width: 50%; /* Final width */
        height: 100%; /* Final height */
    }
}

/* Button Styling */
.btn {
    margin: auto !important; /* Centered horizontally */
    text-align: center; /* Center text */
    margin-top: 40px !important; /* Margin top */
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
@media (max-width: 700px) {
    .box {
        flex-direction: column !important;
    }
    .card {
        margin-bottom: 20px !important;
        width: 100% !important;
    }
}

@media (min-width: 700px) and (max-width: 950px) {
    .card {
        margin-bottom: 20px !important;
        width: 47% !important;
    }
}
</style>
