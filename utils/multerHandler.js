import multer from "multer";
//service img storage
const servicestorage=multer.diskStorage({
    destination:"uploads/serviceimg",
    filename:function(req,file,cb){
        const uniqueSuffix=Date.now()+"-"+Math.round(Math.random()*1e9);
        cb(null,uniqueSuffix+file.originalname);
    },
});
export const serviceImgUpload = multer({servicestorage});

// trusted customer img storage