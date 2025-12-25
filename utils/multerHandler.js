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
const tcustomerStorage = multer.diskStorage({
  destination: "uploads/tcustomerimg",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

export const tcustomerImgUpload = multer({
  storage: tcustomerStorage, 
});
// gallary storage
const galleries = multer.diskStorage({
  destination: "uploads/gallary",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }, 
})
export const Galleries = multer({storage:galleries});
