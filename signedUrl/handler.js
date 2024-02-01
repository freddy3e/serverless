const AWS = require('aws-sdk');
const s3 = new AWS.S3({ signatureVersion: 'v4' });

const signedS3Url = async (event) => {
    const filename = event.queryStringParameters.filename;
    const signedUrl = await s3.getSignedUrl('putObject', {
        Key: `upload/${filename}`,
        Bucket: process.env.BUCKET,
        Expires: 300,
    });
    return {
        statusCode: 200,
        body: JSON.stringify({ signedUrl }),
    };
};

module.exports = { signedS3Url };