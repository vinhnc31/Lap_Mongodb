module.exports = {
  mutipleMongooseToObject: function (mongoose) {
    return mongoose.map((mongoose) => mongoose.toObject());
  },
  mongoosetoObject: function (mongoose) {
    return mongoose ? mongoose.toObject() : mongoose;
  },
};
