"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
// Define the storage engine with proper types
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});
const upload = (0, multer_1.default)({ storage });
const uploadFieldMiddleware = upload.fields([
    {
        name: 'business_license_path',
        maxCount: 1
    }
    // You can uncomment and add more fields like:
    // { name: 'governmentId', maxCount: 1 }
]);
exports.default = uploadFieldMiddleware;
