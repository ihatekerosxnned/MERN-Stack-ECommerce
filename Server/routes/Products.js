const express = require('express');
const router = express.Router();
const Products = require('../models/product');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadFolder = path.join(__dirname, '../uploads');
      if (!fs.existsSync(uploadFolder)) {
        fs.mkdirSync(uploadFolder); // Create the uploads folder if it doesn't exist
      }
      cb(null, uploadFolder); // Set the destination folder for file uploads
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Set the file name with a timestamp prefix
    },
  });
  
  const upload = multer({ storage });

  //GET PRODUCTS FROM MONGODB
  router.get('/display', async (req, res) => {
    try {
      const products = await Products.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
//SEARCH BY ID
  router.get('/:productId', async (req, res) => {
    try {
      const productId = req.params.productId;
      const product = await Products.findById(productId);
      
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  //SEARCH FOR CATEGORY
  router.get('/search', async (req, res) => {
    const query = req.query.q;
    try {
      const products = await Products.find({ product_category: query });
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

    //DELETE PRODUCT BY ID
    router.delete('/delete/:id', async(req,res)=>{
        try{
            const deletedProduct = await
            Products.findByIdAndDelete(req.params.id);
            if(!deletedProduct){
            return res.status(404).json({message: 'Product not found'});
            }
            res.json({message: 'Product has been deleted! Gago', product:deletedProduct});
        }
        catch(err){
            res.status(500).json({message: err.message});
        }
    });

    //UPDATE PRODUCT BY ID
    router.patch('/update/:id', upload.single('image'), async (req, res) => {
      try {
        const { id } = req.params;
        const {
          product_name,
          product_code,
          product_category,
          product_description,
          product_price,
          sku,
          status,
        } = req.body;
        
        let updatedProduct = {
          product_name,
          product_code,
          product_category,
          product_description,
          product_price,
          sku,
          status,
        };
    
        if (req.file) {
          updatedProduct.image = req.file.filename;
        }
    
        const product = await Products.findByIdAndUpdate(id, updatedProduct, {
          new: true,
        });
    
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
    
        res.json(product);
      } catch (err) {
        res.status(500).json({ error: err.message || 'Internal Server Error' });
      }
    });
    

    
    //ADD NEW DATA FROM FORMS
    router.post('/add', upload.single('image'), async (req, res) => {
    try {
      const {
        product_name,
        product_code,
        product_category,
        product_description,
        product_price,
        sku,
        status
        } = req.body;
      const image = req.file ? req.file.filename : ''; // Get the uploaded file name or set it to an empty string if no file was uploaded
  
      const product = new Products({
        product_name,
        product_code,
        product_category,
        product_description,
        product_price,
        sku,
        status,
        image,
      });
  
      const savedProduct = await product.save();
      res.json(savedProduct);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });


module.exports = router;