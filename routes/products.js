const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const multer = require('multer');
const productsController = require('../controllers/products');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// const upload = multer({dest: 'uploads/'});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const Product = require('../models/product');

router.get('/', productsController.get_products);
 
router.post('/', checkAuth, upload.single('productImage'), productsController.post_product);

router.get('/:productId', productsController.get_single_product);

router.patch('/:productId', checkAuth, productsController.patch_product);

router.delete('/:productId', checkAuth, productsController.delete_product);

module.exports = router;