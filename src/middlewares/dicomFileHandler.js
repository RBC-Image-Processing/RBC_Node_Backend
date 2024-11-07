// dicomFileHandler.js
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit per file
  },
  fileFilter: (req, file, cb) => {
    console.log("Received file in filter:", {
      fieldname: file.fieldname,
      originalname: file.originalname,
      mimetype: file.mimetype
    });

    // Check file type
    if (file.mimetype === "application/dicom" ||
        file.originalname.toLowerCase().endsWith(".dcm") ||
        file.mimetype === "application/octet-stream") {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type: ${file.mimetype}`));
    }
  }
}).array('dicom', 50); // Allow up to 50 files with field name 'dicom'

export const handleFileUpload = (req, res, next) => {
  console.log('Request headers:', req.headers);
  
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      console.error("Multer error:", err);
      return res.status(400).json({
        status: 'error',
        message: `File upload error: ${err.message}`,
        details: {
          code: err.code,
          field: err.field
        }
      });
    } else if (err) {
      console.error("Upload error:", err);
      return res.status(400).json({
        status: 'error',
        message: `Upload error: ${err.message}`
      });
    }
    
    // Log successful files upload
    if (req.files && req.files.length > 0) {
      console.log(`Processed ${req.files.length} files:`, 
        req.files.map(file => ({
          fieldname: file.fieldname,
          originalname: file.originalname,
          mimetype: file.mimetype,
          size: file.size
        }))
      );
    } else {
      console.log("No files received");
    }
    
    next();
  });
};