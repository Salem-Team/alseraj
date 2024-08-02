const express = require("express");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: "uploads",
//         resource_type: "auto", // This allows any type of file (image/video/etc.)
//     },
// });

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        resource_type: "auto", // This allows any type of file (image/video/etc.)
    },
});

function multerFilter(req, file, cb) {
    const fileType = file.mimetype.split("/")[0];
    if (
        fileType.startsWith("image") ||
        fileType.startsWith("video") ||
        fileType === "application"
    ) {
        cb(null, true);
    } else {
        req.fileValidationError = "Only Images, Videos, and PDFs are allowed!";
        cb(null, false);
    }
}

const upload = multer({ storage: storage, fileFilter: multerFilter });

const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Please upload a file" });
    }

    const filePath = req.file.path;
    const fileType = req.file.mimetype;
    const isVideo = fileType.split("/")[0].startsWith("video");
    const isImage = fileType.split("/")[0].startsWith("image");
    const isPdf = fileType === "application/pdf";

    console.log("File type:", fileType);
    console.log("Is Video:", isVideo);
    console.log("Is Image:", isImage);
    console.log("Is PDF:", isPdf);

    if (isVideo) {
        cloudinary.uploader
            .upload(filePath, {
                folder: "videos",
                resource_type: "video",
                public_id: `videos/${encodeURIComponent(
                    req.file.originalname.split(".")[0]
                )}-${Date.now()}`,
                eager: [{ width: 720, crop: "scale", audio_codec: "auto" }],
                eager_async: true,
            })
            .then((result) => {
                console.log("Upload success:", result);
                return res.status(200).json({
                    message: "Upload successful",
                    data: result,
                });
            })
            .catch((error) => {
                console.error("Upload error:", error);
                res.status(500).json({
                    message: "Upload failed",
                    error: error.message,
                });
            });
    } else if (isImage) {
        cloudinary.uploader
            .upload(filePath, {
                folder: "images",
                resource_type: "image",
                public_id: `images/${encodeURIComponent(
                    req.file.originalname.split(".")[0]
                )}-${Date.now()}`,
            })
            .then((result) => {
                console.log("Upload success:", result);
                return res.status(200).json({
                    message: "Upload successful",
                    data: result,
                });
            })
            .catch((error) => {
                console.error("Upload error:", error);
                res.status(500).json({
                    message: "Upload failed",
                    error: error.message,
                });
            });
    } else if (isPdf) {
        cloudinary.uploader
            .upload(filePath, {
                pages: true,
                format: "pdf",
                folder: "pdfs",
                resource_type: "raw",
                public_id: `pdfs/${
                    req.file.originalname.split(".")[0]
                }-${Date.now()}`,
            })
            .then((result) => {
                console.log("Upload success:", result);
                return res.status(200).json({
                    message: "Upload successful",
                    data: result,
                });
            })
            .catch((error) => {
                console.error("Upload error:", error);
                res.status(500).json({
                    message: "Upload failed",
                    error: error.message,
                });
            });
    } else {
        res.status(400).json({
            message: "Unsupported file type",
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
