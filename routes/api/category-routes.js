const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
  const allCategories = await Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['product_name']
      }
    ],
  }).catch((err) => {
    res.json(err);
  });
  res.json(allCategories);
});


router.get('/:id', async (req, res) => {
  const categoryByID = await Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ['product_name']
      }
    ],
  }).catch((err) => {
    res.json(err);
  });
  res.json(categoryByID);
});

router.post('/', async (req, res) => {
  const newCategory = await Category.create(
    {
      category_name: req.body.category_name,
    }).catch((err) => {
      res.json(err);
    });
  res.json(newCategory);
});

router.put('/:id', (req, res) => {
  Category.update({
    category_name: req.body.category_name,
  },
  {
    where: {
      id: req.params.id,
    },
  })
  .then((updatedCategory) => {
    res.json(updatedCategory);
  })
  .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    },
  })
  .then((deletedCategory) => {
    res.json(deletedCategory);
  }).catch((err) => { res.json(err);
  });
}); 
  
module.exports = router;