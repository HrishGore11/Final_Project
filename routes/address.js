const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Auth_user = require("../middlewares/Auth_user");
const validateAddress = require("../middlewares/ValidateAddress");
const Address = require("../models/address");
const auth_user = require("../middlewares/Auth_user");

// ROUTE 1: Get All the address using: GET "http://localhost:5000/api/address/address".
router.get("/address", async (req, res) => {
  try {
    const address = await User.address.find();
    res.json(address);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add a new address using: POST "http://localhost:5000/api/address/addAddress".
router.post("/addAddress", auth_user, async (req, res) => {
  try {
    const address = new Address({
      user: req.user.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address1: req.body.address1,
      address2: req.body.address2,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      street: req.body.street,
      building: req.body.building,
      floor: req.body.floor,
      apartment: req.body.apartment,
      phoneNumber: req.body.phoneNumber,
      postalCode: req.body.postalCode,
      isPrimary: false,
    });

    const newAddress = await address.save();
    // User.address.push(newAddress);
    res.json(newAddress);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 3: Update an existing product using: PUT "http://localhost:5000/api/product/updateproduct".
router.put(
  "/updateAddress/:id",
  validateAddress.validateUpdate,
  async (req, res) => {
    const {
      firstName,
      lastName,
      address1,
      address2,
      country,
      state,
      city,
      street,
      building,
      floor,
      apartment,
      phoneNumber,
      postalCode,
      isPrimary,
    } = req.body;
    try {
      // Create a newNote object
      const newaddress = {};
      if (firstName) {
        newaddress.firstName = firstName;
      }
      if (lastName) {
        newaddress.lastName = lastName;
      }
      if (address1) {
        newaddress.address1 = address1;
      }
      if (address2) {
        newaddress.address2 = address2;
      }
      if (country) {
        newaddress.country = country;
      }
      if (state) {
        newaddress.state = state;
      }
      if (city) {
        newaddress.city = city;
      }
      if (street) {
        newaddress.street = street;
      }
      if (building) {
        newaddress.building = building;
      }
      if (floor) {
        newaddress.floor = floor;
      }
      if (apartment) {
        newaddress.apartment = apartment;
      }
      if (phoneNumber) {
        newaddress.phoneNumber = phoneNumber;
      }
      if (postalCode) {
        newaddress.postalCode = postalCode;
      }
      if (isPrimary) {
        newaddress.isPrimary = isPrimary;
      }

      // Find the product to be updated and update it
      let address = await User.address.findById(req.params.id);
      if (!address) {
        return res.status(404).send("Not Found");
      }
      address = await User.address.findByIdAndUpdate(
        req.params.id,
        { $set: newaddress },
        { new: true }
      );
      res.json({ address });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
////////delete the address
router.delete("/deleteaddress/:id", async (req, res) => {
  try {
    // Find the address to be delete and delete it
    const id = req.params.id;
    let address = await User.address.findById(id);
    if (!address) {
      return res.status(404).send("Not Found");
    }

    address = await User.address.findByIdAndDelete(id);
    res.json({ Success: "product has been deleted", data: product });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
