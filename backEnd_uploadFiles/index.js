// const express = require("express");
// const multer = require("multer");
// const uuiv4 = require("uuid").v4;
// const path = require("path");
// const app = express();
// const multerStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./uploads");
//     },
//     filename: function (req, file, cb) {
//         const ext = file.mimetype.split("/")[1];
//         cb(
//             null,
//             `category-${uuiv4().split("-").join("")}-${Date.now()}.${ext}`
//         );
//     },
// });
// function multerFilter(req, file, cb) {
//     const fileType = file.mimetype.split("/")[0];
//     if (fileType.startsWith("image") || fileType.startsWith("video")) {
//         cb(null, true);
//     } else {
//         cb(new Error("Only Images allowed !!", 400), false);
//     }
// }
// const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
// app.use(express.json());
// app.use(express.static(path.join(__dirname, "uploads")));
// app.post("/upload", upload.single("image"), (req, res) => {
//     res.status(200).json({
//         message: `http://localhost:3000/${req.file.filename}`,
//     });
// });
// app.listen(3000, () => console.log("Server is running on port 3000"));
const express = require("express");
const multer = require("multer");
const uuidv4 = require("uuid").v4;
const path = require("path");

const app = express();

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split("/")[1];
        cb(
            null,
            `category-${uuidv4().split("-").join("")}-${Date.now()}.${ext}`
        );
    },
});

function multerFilter(req, file, cb) {
    const fileType = file.mimetype.split("/")[0];
    if (
        fileType.startsWith("image") ||
        fileType.startsWith("video") ||
        file.mimetype === "application/pdf"
    ) {
        cb(null, true);
    } else {
        req.fileValidationError = "Only Images, Videos, and PDFs are allowed!";
        cb(null, false);
    }
}

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));

app.post("/upload", upload.single("file"), (req, res) => {
    if (req.fileValidationError) {
        return res.status(400).json({ message: req.fileValidationError });
    }
    if (!req.file) {
        return res.status(400).json({ message: "Please upload a file" });
    }
    res.status(200).json({
        message: `http://localhost:3000/${req.file.filename}`,
    });
    console.log({ message: `http://localhost:3000/${req.file.filename}` });
});

app.listen(3000, () => console.log("Server is running on port 3000"));
