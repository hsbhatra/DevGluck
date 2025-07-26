import aws from 'aws-sdk';
import { accessKeyId, secretAccessKey, region, bucketName } from '../../config.mjs';

aws.config.update({
    accessKeyId:accessKeyId, 
    secretAccessKey:secretAccessKey,
    region:region
});

const s3 = new aws.S3();

const uploadImage = async (file) => {
    // file: { buffer, mimetype, originalname }
    const params = {
        Bucket: bucketName,
        Key: `${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read', // or 'private' if you want restricted access
    };
    return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
            if (err) return reject(err);
            resolve(data.Location); // S3 file URL
        });
    });
};

export { uploadImage };