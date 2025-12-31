// Required the cloudinary and multer storage cloudinary to configa nd store our file on the cloudinary.
const cloudinary = require('cloudinary').v2;  
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configured the cloudinary
cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key :process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})

// Specifying the  place where our files get stored on the cloudinary.
const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params: {
    folder: 'WonderLust_Files',
    allowedformat: ["png","jpeg","pdf","jpg"], // supports promises as well
  }
})

// Exporting the data
module.exports={
    cloudinary,
    storage
}

  