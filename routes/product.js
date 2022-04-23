const express = require("express");
const auth_user = require("../middlewares/Auth_user");

const router = express.Router();
const Product = require("../models/product");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get All the products using: GET "http://localhost:5000/api/product/product".
router.get("/product", async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add a new product using: POST "http://localhost:5000/api/product/addproduct".
router.post(
  "/addproduct",
  [
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { product_name, description, category, price, quantity, active } =
        req.body;

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      ////create a new product
      const product = new Product({
        product_name,
        description,
        category,
        price,
        quantity,
        active,
      });
      const addproduct = await product.save();

      res.json(addproduct);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
// ROUTE 3: Update an existing product using: PUT "http://localhost:5000/api/product/updateproduct".
router.put("/updateproduct/:id", async (req, res) => {
  const { product_name, description, category, price, quantity, active } =
    req.body;
  try {
    // Create a newNote object
    const newProduct = {};
    if (product_name) {
      newProduct.product_name = product_name;
    }
    if (description) {
      newProduct.description = description;
    }
    if (category) {
      newProduct.category = category;
    }
    if (price) {
      newProduct.price = price;
    }
    if (quantity) {
      newProduct.quantity = quantity;
    }
    if (active) {
      newProduct.active = active;
    }

    // Find the product to be updated and update it
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Not Found");
    }
    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: newProduct },
      { new: true }
    );
    res.json({ product });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
// ROUTE 4: Delete an existing product using: DELETE "http://localhost:5000/api/product/deleteproduct".
router.delete("/deleteproduct/:id", async (req, res) => {
  try {
    // Find the product to be delete and delete it
    const id = req.params.id;
    let product = await Product.findById(id);
    if (!product) {
      return res.status(404).send("Not Found");
    }

    product = await Product.findByIdAndDelete(id);
    res.json({ Success: "product has been deleted", data: product });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
// router.delete("/delete/:id",(req,res)=>{
//     const id=req.params.id;
//      Product.deleteOne({_id:id}).then((data)=>{
//       res.json({message:"deleted successfull", data:data})
//     }).catch(err=>{
//       res.json({message:"error"})
//       console.log(err)
//     })
//     })

module.exports = router;
