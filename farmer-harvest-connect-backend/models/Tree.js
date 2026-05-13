const mongoose = require('mongoose');

const treeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Tree name is required'],
      trim: true,
    },
    scientificName: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    category: {
      type: String,
      enum: ['Fruit', 'Timber', 'Medicinal', 'Ornamental', 'Shade', 'Environmental', 'Eco', 'Other'],
      default: 'Other',
    },
    mrp: {
      type: Number,
      default: 0,
    },
    benefits: [String],
    plantationGuide: {
      type: String,
    },
    image: {
      type: String, // URL to image
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Tree', treeSchema);
