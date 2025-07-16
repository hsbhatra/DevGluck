import aws from 'aws-sdk';
import { accessKeyId, secretAccessKey, region } from '../../config.mjs';

aws.config.update({
    accessKeyId:accessKeyId, 
    secretAccessKey:secretAccessKey,
    region:region
});

const function_name = async (file)=>{
    return new Promise((resolve, reject)=>{
        // creating service



    })
}
export {uploadImage};