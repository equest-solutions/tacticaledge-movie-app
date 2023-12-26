const accessKeyId = process.env.S3_ACCESS_KEY
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY
const region = process.env.S3_REGION
const Bucket = process.env.S3_BUCKET
const signedUrlExpireSeconds = process.env.S3_SIGNED_URL_EXPIRY

export const AwsConstants = {
    accessKeyId: accessKeyId,
    secretAccessKey:secretAccessKey,
    region:region,
    Bucket :Bucket,
    signedUrlExpireSeconds :signedUrlExpireSeconds,
};

