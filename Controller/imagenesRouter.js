const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const fs = require("fs");

// Configuración de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// console.log("Cloudinary Configuración:", {
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// Configuración de multer para manejar archivos
const upload = multer({ dest: "uploads/" }); // Carpeta temporal para archivos

// Ruta para subir imágenes
router.post("/", upload.single("image"), async (req, res) => {
    console.log("Archivo recibido:", req.file); // Log del archivo recibido
    console.log("Cuerpo recibido:", req.body);  // Si envías más datos en el cuerpo

    if (!req.file) {
        return res.status(400).json({ message: "Debe proporcionar una imagen" });
    }


    try {
        const file = req.file; // Archivo enviado desde el frontend

        if (!file) {
            return res.status(400).json({ message: "Debe proporcionar una imagen" });
        }

        // Subir imagen a Cloudinary
        const uploadResult = await cloudinary.uploader.upload(file.path, {
            folder: "imagenes", // Carpeta opcional en Cloudinary
            transformation: [
                { quality: "auto", fetch_format: "auto" },
                { width: 1200, height: 1200, crop: "fill", gravity: "auto" },
            ],
        });

        // Elimina el archivo temporal después de subirlo
        fs.unlinkSync(file.path);

        // Responder con la URL de la imagen subida
        return res.status(200).json({
            message: "Imagen subida correctamente",
            url: uploadResult.secure_url,
        });
    } catch (error) {
        console.error("Error al subir la imagen:", error.message);
        return res.status(500).json({ message: "Error al subir la imagen", error: error.message });
    }
});

module.exports = router;
