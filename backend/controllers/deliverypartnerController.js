import DeliveryPartner from '../models/DeliveryPartner.js';

// Create a new delivery partner
export const createDeliveryPartner = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const newPartner = new DeliveryPartner({ name, phone });
    await newPartner.save();
    res.status(201).json({ message: "Delivery partner created successfully", newPartner });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all delivery partners
export const getAllDeliveryPartners = async (req, res) => {
  try {
    const partners = await DeliveryPartner.find();
    res.status(200).json(partners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single delivery partner by ID
export const getDeliveryPartnerById = async (req, res) => {
  try {
    const partner = await DeliveryPartner.findById(req.params.id);
    if (!partner) return res.status(404).json({ message: "Delivery partner not found" });
    res.status(200).json(partner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a delivery partner by ID
export const updateDeliveryPartner = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const updatedPartner = await DeliveryPartner.findByIdAndUpdate(
      req.params.id,
      { name, phone },
      { new: true, runValidators: true }
    );
    if (!updatedPartner) return res.status(404).json({ message: "Delivery partner not found" });
    res.status(200).json({ message: "Delivery partner updated successfully", updatedPartner });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a delivery partner by ID
export const deleteDeliveryPartner = async (req, res) => {
  try {
    const deletedPartner = await DeliveryPartner.findByIdAndDelete(req.params.id);
    if (!deletedPartner) return res.status(404).json({ message: "Delivery partner not found" });
    res.status(200).json({ message: "Delivery partner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
