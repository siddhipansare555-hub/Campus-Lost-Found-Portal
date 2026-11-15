const Item = require('../models/Item');

// @desc    Get all items (filtered by type)
// @route   GET /api/items?type=lost OR /api/items?type=found
exports.getItems = async (req, res) => {
  try {
    const { type } = req.query;
    const filter = type ? { type } : {};
    const items = await Item.find(filter).sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new item report
// @route   POST /api/items
exports.createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete item report
// @route   DELETE /api/items/:id
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};