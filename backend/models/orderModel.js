import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {type:String,required:true, ref: "user"},
    items: { type: Array, required:true},
    amount: { type: Number, required: true},
    address:{type:Object,required:true},
    status: {type:String,default:"Food Processing"},
    date: {type:Date,default:Date.now()},
    payment:{type:Boolean,default:false},
    deliveryPartner: {type:String,default:"", ref: "DeliveryPartner"}
})

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;