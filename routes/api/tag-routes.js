const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const data = await Tag.findAll({ include: Product, });
    if (!data) {
      res.status(404).json({ message: "No data found", });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const data = await Tag.findOne({
      where: { id: req.params.id, },
      include: Product,
    });
    if (!data) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  const { tag_name } = req.body;
  try {
    const data = await Tag.create({ tag_name });
    if (!data) {
      res.status(404).json({ message: "Failed to create tag", });
      return;
    }
    res.status(200).json({ message: "Successfully created tag", data });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const { tag_name } = req.body;
  try {
    const data = await Tag.create({ tag_name });
    if (!data) {
      res.status(404).json({ message: "Tag not found", });
      return;
    }
    res.status(200).json({ message: "Successfully updated tag", data });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const data = await Tag.destroy({ where: { id: req.params.id }});
    if (!data) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }
    res.status(204).json({ message: "Successfully deleted tag", data });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
