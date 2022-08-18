import { diskStorage } from 'multer';

export const storage = {
    storage: diskStorage({
        destination: './uploads/profileImages',
        filename: (req, file, cb) => {
            const originalname = file.originalname.replace(/[^A-Za-z0-9.]/g, "-");
            const filename = "img" + Date.now() + "-" + originalname;
            cb(null, filename)
        }
    })
}