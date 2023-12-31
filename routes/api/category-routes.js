const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const data = await Category.findAll({
      include: Product,
    });
    if (!data) {
      res.status(404).json({
        message: "No data found",
      });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const data = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: Product,
    });
    if (!data) {
      res.status(404).json({
        message: "No data found",
      });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  const { category_name } = req.body;
  try {
    const data = await Category.create({ category_name });
    if (!data) {
      res.status(404).json({
        message: "Failed to create category",
      });
      return;
    }
    res.status(200).json({
      message: "Successfully created category",
      data,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  const { category_name } = req.body;
  console.log(req.body, req.params);
  try {
    const data = await Category.update(
      {
        category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!data) {
      res.status(404).json({
        message: "Category not found",
      });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const data = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!data) {
      res.status(404).json({
        message: "Category not found",
      });
      return;
    }
    res.status(204).json({
      message: "Successfully deleted category",
      data,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
