const express = require("express");
const router = express.Router();

const apiRoute = require("./product.routes");
const productRoutes = require("./product/productPage.routes");
const addProductRoutes = require("./product/addProductPage.routes");
const editProductRoutes = require("./product/editProductPage.routes");
const softDeleteRoutes = require("./product/softDelete.routes");
const trashRoutes = require("./product/trashPage.routes");
const authRoutes = require("./auth/auth.routes");
const userRouter = require("./user/userPage.routes");
const categoryRouter = require("./category/category.routes");
const addCategoryRouter = require("./category/addCategoryPage.routes");
const editCategoryRouter = require("./category/editCategoryPage.routes");
const softDeleteCategoryRouter = require("./category/softDeleteCategory.routes");
const trashCategoryRouter = require("./category/trashCategory.routes");
const purchaseRouter = require("./user/productDetails.routes");

router.use("/api", apiRoute);
router.use("/products", productRoutes);
router.use("/products", addProductRoutes);
router.use("/products", editProductRoutes);
router.use("/products", softDeleteRoutes);
router.use("/products", trashRoutes);

router.use("/auth", authRoutes);

router.use("/userPage", userRouter);
router.use("/userPage", purchaseRouter);

router.use("/categories", categoryRouter);
router.use("/categories", addCategoryRouter);
router.use("/categories", editCategoryRouter);
router.use("/categories", softDeleteCategoryRouter);
router.use("/categories", trashCategoryRouter);

module.exports = router;
