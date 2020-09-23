const router = require('express').Router();
let Worklog = require('../models/worklog.model');

//Test, views all worklogs
router.route('/').get((req,res) => {
    Worklog.find()
    .then(worklogs => res.json(worklogs))
    .catch(err => res.status(400).json('Error: '+err));
});

//Add Worklog Post //TODO: add session check
router.route('/add').post((req,res) => {
    const username = req.body.username;
    const hours = Number(req.body.hours);
    const date = Date.parse(req.body.date);
    const description = req.body.description;

    const newWorklog = new Worklog({username, description, hours, date});

    newWorklog.save()
        .then(() => res.json('Worklog Added!'))
        .catch(() => res.status(400).json('Error: '+err));
});
//View Worklog //TODO: add session check
router.route('/:id').get((req,res) => {
    const id = req.params.id;

    Worklog.findById(id)
    .then((worklog)=> res.json(worklog))
    .catch(()=>res.status(400).json('Error: '+err));
});
//Edit Worklog //TODO: add session check
router.route('/:id').post((req,res) => {
    const id = req.params.id;
    const hours = Number(req.body.hours);
    const date = Date.parse(req.body.date);
    const description = req.body.description;
    
    Worklog.findByIdAndUpdate(id, {hours, date, description})
    .then((worklog)=> res.json('Worklog Updated!'))
    .catch(()=>res.status(400).json('Error: '+err));
});
//Remove Worklog //TODO: add session check
router.route('/:id').delete((req,res) => {
    const id = req.params.id;

    Worklog.findByIdAndDelete(id)
    .then((worklog)=> res.json('Worklog Removed!'))
    .catch(()=>res.status(400).json('Error: '+err));
});

module.exports = router;