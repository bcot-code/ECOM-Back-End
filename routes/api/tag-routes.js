const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../Develop/models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAndCountAll({
    include: [Product],
  })
    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: { id: req.params.id },
    include: [{ model: Product }],
  }).then((dbTagData) => {
    if (!dbTagData) {
      return res.status(404).json({ message: "No tag found with this id" });
    }
    res.json(dbTagData);
  });
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: { id: req.params.id },
  }).then((dbTagData) => {
    if (!dbTagData[0]) {
      return res.status(404).json({ message: "No tag found with this id" });
    }
    res.json(dbTagData);
  });
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  }).then((tagDta) => {
    if (!tagDta) {
      return res.status(404).json({ message: "No tag found with this id!" });
    }
  });
});

module.exports = router;
