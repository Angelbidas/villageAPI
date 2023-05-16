import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
  name: {
     type: String,
      required: true
     },
  email: { 
    type: String,
     required: true },
  phone: { 
    type: String,
     required: true },
  checkinTime: { 
    type: Date, 
    default: Date.now },
  checkoutTime: { 
    type: Date
 },
});

const Visitor = mongoose.model('Visitor', visitorSchema);

export default Visitor;
