import multer, { StorageEngine } from 'multer';
import path from 'path';
import { Request } from 'express';

// Define the storage engine with proper types
const storage: StorageEngine = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req: Request, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

const uploadFieldMiddleware = upload.fields([
    {
        name: 'business_license_path',
        maxCount: 1
    }
    // You can uncomment and add more fields like:
    // { name: 'governmentId', maxCount: 1 }
]);

export default uploadFieldMiddleware;
