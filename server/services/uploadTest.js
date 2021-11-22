const fs = require('fs');
const aws = require('aws-sdk');

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-2'
});

const s3 = new aws.S3();

const BUCKET_NAME = 'team-gingerbread-s3bucket';

const uploadFile = (fileName) => {
  const fileContent = fs.readFileSync(fileName);

  const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: fileContent
  };
  
  s3.upload(params, function(err, data) {
      if (err) {
          throw err
      }
      console.log(`File uploaded successfully. ${data.Location}`)
  });
};

uploadFile('68f55f7799df6c8078a874cfe0a61a5e6e9e1687.png');
