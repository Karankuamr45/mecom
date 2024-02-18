// categoryModel.js
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

const categoryModel = mongoose.model('Category', categorySchema);

export default categoryModel;
