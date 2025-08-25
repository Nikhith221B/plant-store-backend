const express = require('express');
const router = express.Router();
const Plant = require('../models/Plant');
const verifyToken = require('../middleware/auth');

// GET /plants
router.get('/', async (req, res) => {
    try {
        const { search = '', category = '' } = req.query;
        let query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { categories: { $regex: search, $options: 'i' } }
            ];
        }

        if (category) {
            query.categories = category;
        }

        const plants = await Plant.find(query);
        res.json(plants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /plants
router.post('/', verifyToken, async (req, res) => {
    try {
        const { name, price, categories, inStock } = req.body;
        const plant = new Plant({ name, price, categories, inStock });
        await plant.save();
        res.status(201).json(plant);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


module.exports = router;
