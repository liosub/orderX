import multer from "multer";


const fileFilter = (req: any,file: any,cb: any) => {
    if(file.mimetype === "image/jpg"  || 
       file.mimetype ==="image/jpeg"  || 
       file.mimetype ===  "image/png"){
     
    cb(null, true);
   }else{
      cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
        }
}
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "/home/fancypanda/rev/public/images/uploads");
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-any-${file.originalname}`);
    
  },
});
const upload = multer({storage: storage, fileFilter : fileFilter}).fields([
  { 
    name: 'logo', 
    maxCount: 1 
  }, 
  { 
    name: 'bannerImage', 
    maxCount: 1 
  },
  { 
    name: 'QRCode', 
    maxCount: 1 
  }
]);


export const uploadItmes = multer({storage: storage, fileFilter : fileFilter}).fields([
  { 
    name: 'image', 
    maxCount: 1 
  }
]);
export default upload;
