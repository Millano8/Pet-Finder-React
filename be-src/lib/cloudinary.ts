import {v2 as cloudinary} from "cloudinary"
import dotenv from 'dotenv'
          
cloudinary.config({ 
  cloud_name: 'djeehmnqe', 
  api_key: '223175168186295', 
  api_secret: 'DtfXPB4d5I8yawjlgbAxnk2ImE8' 
});

export {cloudinary};