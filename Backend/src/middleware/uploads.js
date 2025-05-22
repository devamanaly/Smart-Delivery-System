// const multer = require('multer');
const multer = require('multer')
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
})

const upload = multer({ storage: storage })

const uploadFieldMiddleware = upload.fields([
    {
        name: 'business_license_path', maxCount: 1
    }
    // {name:'governmentId' ,maxCount:1  }

])

module.exports = uploadFieldMiddleware