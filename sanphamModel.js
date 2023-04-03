const mongoose = require('mongoose');

const SanPhamSchema = new mongoose.Schema({
    ten: {
        type: String,
    },
    mota: {
        type: String,
    },
    gia: {
        type: Number,
    },
    soluong: {
        type: Number
    },
    khuyenmai: {
        type: Number
    }
});
const Usesr = mongoose.model('sanpham', SanPhamSchema);
module.exports = Usesr; 
