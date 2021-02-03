exports.model = (modelName) => {
  return `const mongoose = require('mongoose');

const { Schema } = mongoose;
//* create a ${modelName} Scheme
const ${modelName}Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  validation: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const ${modelName} = mongoose.model('${modelName}', ${modelName}Schema);
module.exports = ${modelName};`
}