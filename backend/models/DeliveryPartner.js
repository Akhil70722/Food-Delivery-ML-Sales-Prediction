import mongoose from 'mongoose';

const deliveryPartnerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    estimatedDeliveryTime: { type: String, default: "30" }, // e.g., "30 minutes"
});

const DeliveryPartner = mongoose.model('DeliveryPartner', deliveryPartnerSchema);

export default DeliveryPartner;  // Default export for consistency with your imports
