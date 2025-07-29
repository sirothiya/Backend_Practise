const express = require("express");
const router = express.Router();

const MenuItem = require("../models/Menu");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const menuItem = new MenuItem(data);
    const newMenu = await menuItem.save();
    console.log("Menu item saved successfully:", newMenu);
    res.status(200).json(newMenu);
  } catch (err) {
    res.status(500).json({
      message: "Error in saving menu item",
      error: err.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const menuData = await MenuItem.find();
    res.status(200).json(menuData);
  } catch (err) {
    res.status(500).json({
      message: "Error in fetching menu data",
      error: err.message,
    });
  }
});

router.get("/name/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const menuItem = await MenuItem.findOne({ name });
    if (!menuItem)
      return res
        .status(404)
        .json({
          message: "This item is not in our Menu. Please otp for other",
        });
    res.status(200).json(menuItem);
  } catch (err) {
    res.status(500).json({
      message: "Error in fetching menu item",
      error: err.message,
    });
  }
});
router.get("/taste/:taste", async (req, res) => {
  try {
    const taste = req.params.taste;
    if (!["spicy", "sweet", "sour", "bitter", "salty"].includes(taste)) {
      return res.status(404).json({ message: "Invalid taste type" });
    }
    const MenuItems = await MenuItem.find({ taste });
    res
      .status(200)
      .json({
        message: `Menu items with ${taste} taste are : ${MenuItems.length}`,
      });
  } catch (err) {
    res.status(500).json({
      message: "Error in fetching menu items by taste",
      error: err.message,
    });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const menuItem = await MenuItem.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
    if (!menuItem)
      return res
        .status(404)
        .json({ message: "Menu item not found with this ID" });
    res
      .status(200)
      .json({ message: "Menu item updated successfully", menuItem });
  } catch (err) {
    res.status(500).json({
      message: "Error in updating menu item ..please try again",
      error: err.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedItem = await MenuItem.findByIdAndDelete(id);
    if (!deletedItem)
      return res
        .status(404)
        .json({ message: "Menu item not found with this ID" });
    res
      .status(200)
      .json({ message: "Menu item deleted successfully", deletedItem });
  } catch (err) {
    res.status(500).json({
      message: "Error in deleting menu item ..please try again",
      error: err.message,
    });
  }
});

module.exports = router;
