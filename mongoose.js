const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Sanpham", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("ket noi thanh cong");
  } catch (error) {
    console.log("Ket noi that bai");
  }
}
module.exports = { connect };
