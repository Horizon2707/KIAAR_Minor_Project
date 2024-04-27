const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: "AKIA5FTY7W63IQSVYTEC",
  secretAccessKey: "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",
  region: "ap-south-1",
});

const s3 = new AWS.S3();

const listObjectsParams = {
  Bucket: "pddf-bucket",
  Prefix: "uploads/",
};
try {
  s3.listObjects(listObjectsParams, function (err, data) {
    if (err) {
      console.error("Error listing objects: ", err);
    } else {
      console.log("Objects in the bucket: ", data.Contents);
    }
  });
} catch (err) {
  console.log(err);
}
