import express from "express";

import CursedItem from '../models/CursedItemModel.js'

const routes = express.Router();

routes.get('/', async (req, res) => {
    try {
        const items = await CursedItem.find();

        const itemsWithLinks = items.map(item => ({
            ...item.toObject(),
            _links: {
                self: { href: `${req.protocol}://${req.get('host')}/curseditems/${item._id}` }
            }
        }));

        const response = {
            items: itemsWithLinks,
            _links: {
                self: { href: `${req.protocol}://${req.get('host')}/curseditems` }
            },
            pagination: {
                temp: 'pagination maken we later af'
            }
        };

        // Check the Accept header
        const acceptHeader = req.get('Accept');
        if (!acceptHeader || acceptHeader.includes('application/json')) {
            res.json(response);
        } else {
            res.status(406).send('Not Acceptable: Supported format is application/json');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



routes.post('/', async (req, res) => {
    try {
        const { itemName, itemDescription, blessing, curse } = req.body;

        if (!itemName || !itemDescription || !blessing || !curse) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newItem = await CursedItem.create({
            itemName,
            itemDescription,
            blessing,
            curse,
        });

        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



routes.options('/', (req, res) => {
    res.header('Allow', 'GET, POST, OPTIONS');
    res.status(200).send();
});


routes.get('/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const item = await CursedItem.findById(itemId);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        const itemObject = item.toObject();

        const response = {
            ...itemObject,
            _links: {
                self: { href: `${req.protocol}://${req.get('host')}/curseditems/${itemId}` },
                collection: { href: `${req.protocol}://${req.get('host')}/curseditems` }
            }
        };
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

routes.options('/:id', (req, res) => {
    res.header('Allow', 'GET, PUT, DELETE, OPTIONS');
    res.status(200).end();
});



routes.put('/:id', async (req, res) => {
    try {
        const itemId = req.params.id;

        const { itemName, itemDescription, blessing, curse } = req.body;
        if (itemName === '' || itemDescription === '' || blessing === '' || curse === '') {
            return res.status(400).json({ message: 'Empty values are not allowed for update' });
        }

        const updatedItem = await CursedItem.findByIdAndUpdate(itemId, req.body, { new: true });

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        updatedItem._links = updatedItem.links;

        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



routes.delete('/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const deletedItem = await CursedItem.findByIdAndDelete(itemId);

        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




routes.post('/seed',async (req, res) => {
    console.log("Seed DB");

    await CursedItem.deleteMany({});

    for (let i = 0; i < 10; i++){
        await CursedItem.create({
            itemName: `item ${i}`,
            itemDescription: `an item with the number ${i} on it`,
            blessing: `this item has no curse`,
            curse: `this item has no blessing`,
        })
    }

    res.json({
        message: "Seeder werkt denk ik"
    })
})


export default routes;