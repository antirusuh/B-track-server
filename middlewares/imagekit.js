const formData = require("form-data");
const axios = require("axios");

const imagekit = (req, res, next) => {
  const encodedFile = req.file.buffer.toString("base64");

  const form = new formData();
  form.append("file", encodedFile);
  form.append("fileName", req.file.originalname);

  const privateKey = new Buffer.from(
    process.env.IMG_KIT_API + ":",
    "utf-8"
  ).toString("base64");

  axios({
    method: "post",
    url: process.env.IMG_KIT_URL,
    data: form,
    headers: {
      ...form.getHeaders(),
      Authorization: `Basic ${privateKey}`,
    },
  })
    .then((res) => {
      req.body.invoice = res.data.url;
      next();
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

module.exports = imagekit;
