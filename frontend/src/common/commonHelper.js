import { AwsConstants } from '../constants/AwsConstants';
import { Credentials } from "aws-sdk";
import S3 from "aws-sdk/clients/s3";

const cryptoKey = "MovIeLiST@Eq2023";

const s3 = new S3({
  accessKeyId: AwsConstants.accessKeyId,
  secretAccessKey: AwsConstants.secretAccessKey,
  // credentials: s3_access,
  region: AwsConstants.region,
  signatureVersion: "v4",
});

export const commonHelper = {
  setItem,
  getItem,
  getHeaders,
  getAssetUrl,
};

async function getAssetUrl(path) {

  var options = {
    Bucket: AwsConstants.Bucket,
    Key: path, /* Filename in the bucket */
    Expires: 3000 /* Seconds */
  };
  const url = await s3.getSignedUrlPromise("getObject", options);
  return url;
}


function setItem(key, strString) {
  let CryptoJS = require("crypto-js");
  localStorage.setItem(key, CryptoJS.AES.encrypt(strString, cryptoKey));
}

function getItem(key) {
  let CryptoJS = require("crypto-js");
  let dataValues = localStorage.getItem(key) || "";
  let dataStr = "";
  if (dataValues !== "") {
    var bytes = CryptoJS.AES.decrypt(dataValues, cryptoKey);
    dataStr = bytes.toString(CryptoJS.enc.Utf8);
  }
  return dataStr;
}


function getHeaders() {
  if (getItem("auth_token")) {
    getItem("auth_token")
    return {
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getItem("auth_token"),
    }
  } else {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  }
}

