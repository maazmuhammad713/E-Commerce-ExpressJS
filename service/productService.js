const { models } = require("../models");

module.exports = {
  getProducts: async () => {
    const result = await models.product.findAll();
    return result;
  },
  getProductById: async (id) => {
    const result = await models.product.findByPk(parseInt(id));
    if (!result) {
      return "The product with the given ID was not found."; //404
    } else {
      return result;
    }
  },

  createProduct: async (data, categoryID) => {
    const result = await models.product.create({
      title: data.title,
      image: data.image,
      description: data.description,
      price: data.price,
      rating: data.rating,
    });
    if (Array.isArray(categoryID) && categoryID.length > 0) {
      await result.addCategory(categoryID);
    }
    return result;
  },
  updateProduct: async (productID, data, categoryID) => {
    const product = await models.product.findByPk(parseInt(productID));
    if (!product) {
      throw new Error("Product not found");
    }

    product.title = data.title;
    product.image = data.image;
    product.description = data.description;
    product.price = data.price;
    product.rating = data.rating;

    await product.save();

    if (Array.isArray(categoryID) && categoryID.length > 0) {
      await product.setCategory(categoryID);
    }

    return product;
  },
  deleteProduct: async (id) => {
    const result = await models.product.findByPk(parseInt(id));
    if (!result) {
      return "The product with the given ID was not found."; //404
    } else {
      await result.destroy();
      return result;
    }
  },
};
