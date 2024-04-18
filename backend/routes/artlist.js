const express = require('express');
const router = express.Router();
const Art = require('../models/art.model');
const path = require('path');

// Error handler middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
};

// Get all arts
//Tested OK -> http://localhost:5000/api/arts
router.get('/arts', async (req, res, next) => {
    try {
        const arts = await Art.find();
        res.json(arts);
    } catch (error) {
        next(error);
    }
});

// Get single art by id
//Tested OK -> with : http://localhost:5000/api/art/6621974c0af71c55c4fdaedc
router.get('/art/:id', async (req, res, next) => {
    try {
        const art = await Art.findById(req.params.id);
        res.json(art);
    } catch (error) {
        next(error);
    }
});

// Serve the edit form HTML file
router.get('/editForm', (req, res) => {
    res.sendFile(path.join(__dirname, '../../', 'editArt.html'));
});

// Serve the add form HTML file
//Tested OK -> http://localhost:5000/api/addForm
router.get('/addForm', (req, res) => {
    res.sendFile(path.join(__dirname, '../../', 'addArt.html'));
});

// Add/save art
//Tested OK 
/*{"_id":{"$oid":"6621974c0af71c55c4fdaedc"},
    "artName":"Painting 1",
    "serial":{"$numberInt":"3"},
    "src":"https://www.brandysaturley.com/wp-content/uploads/2019/05/Painting5-1536x1128.jpg",
    "alt":"mountain",
    "bids":[{
        "_id":{"$oid":"6621974c0af71c55c4fdaedd"},
        "user":"user 2",
        "bid":{"$numberInt":"650"}}],"__v":{"$numberInt":"0"}}*/

router.post('/addArt', async (req, res, next) => {
    try {
        const { artName, serial, src, alt, bids } = req.body;
        const newArt = new Art({ artName, serial, src, alt, bids });
        const savedArt = await newArt.save();
        res.json(savedArt);
    } catch (error) {
        next(error);
    }
});

// Update art by id
router.put('/art/:id/update', async (req, res, next) => {
    try {
        const { artName, serial, src, alt, bids } = req.body;
        const updatedArt = await Art.findByIdAndUpdate(req.params.id, { artName, serial, src, alt, bids }, { new: true });
        res.json(updatedArt);
    } catch (error) {
        next(error);
    }
});


// Delete art by id
router.delete('/art/:id/delete', async (req, res, next) => {
    try {
        await Art.findByIdAndDelete(req.params.id);
        res.json({ message: 'Art deleted' });
    } catch (error) {
        next(error);
    }
});

router.use(errorHandler);

module.exports = router;
