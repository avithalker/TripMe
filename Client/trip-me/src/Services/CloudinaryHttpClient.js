import "whatwg-fetch";
import CloudinaryConfig from "../Config/CloudinaryConfig.js";

class CloudinaryHttpClient{
    uploadPhoto = (photo)=>{
        
        var uploadRequest= new FormData();
        uploadRequest.append('upload_preset',CloudinaryConfig.upload_preset);
        uploadRequest.append('file',photo);
        uploadRequest.append('multiple',true);
        uploadRequest.append('tags','diaryphotos');
        uploadRequest.append('context','');
                
        var promise = new Promise((resolve,reject) =>{
            const url = new URL(`https://api.cloudinary.com/v1_1/${CloudinaryConfig.cloud_name}/raw/upload`);
            fetch(url,{
                method: "POST",
                body: uploadRequest
            }).then(response =>{
                response.json().then(uploadResult=>{
                    resolve(uploadResult.secure_url);
                });
            });  
        });
        return promise;
    }
}

export default CloudinaryHttpClient;