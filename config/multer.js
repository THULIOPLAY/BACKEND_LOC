const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    dest: path.resolve(__dirname, '..',  'tmp', 'uploads'),
    storage: multer.diskStorage({
        destination: (req, file, cb)=> {
            cb(null, path.resolve(__dirname, '..', 'tmp', 'uploads'));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                const filename = `${file.originalname}`;

                cb(null, filename);
            });
        },
    }),
    fileFilter:(req, file, cb) => {
        const allowedMimes = [
           'image/jpeg',
           'image/jpg',
           'image/png',
           'image/pjpeg'  
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        }else {
            cb(new Error("Invalid file type."));
        }
    }
}