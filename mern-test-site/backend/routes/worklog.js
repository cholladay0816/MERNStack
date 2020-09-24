const router = require('express').Router();
let Worklog = require('../models/worklog.model');

//Test, views all worklogs
router.route('/').get((req,res) => {
    const username = req.session.user.username;
    Worklog.find({'username':username})
    .then(worklogs => res.json(worklogs))
    .catch(err => res.status(400).json('Error: '+err));
});

//Add Worklog Post
router.route('/add').post((req,res) => {
    if(!req.session.user)
    {
        return res.status(400).json('Error: must be logged in.');
    }
    const username = req.session.user.username;
    const hours = Number(req.body.hours);
    const date = Date.parse(req.body.date);
    const description = req.body.description;

    const newWorklog = new Worklog({username, description, hours, date});

    newWorklog.save()
        .then(() => res.json('Worklog Added!'))
        .catch(() => res.status(400).json('Error: '+err));
});
//View Worklog 
router.route('/:id').get((req,res) => {
    if(!req.session.user)
    {
        return res.status(400).json('Error: must be logged in.');
    }
    const username = req.session.user.username;
    const id = req.params.id;
    
    Worklog.findOne({"_id":id, "username":username})
    .then((worklog)=> {
        if(worklog)
        {
            res.json(worklog);
        }
        else
        {
            res.status(400).json('Error: Access Denied')
        }
    })
    .catch(()=>res.status(400).json('Error: '+err));
});
//Edit Worklog
router.route('/:id').post((req,res) => {
    if(!req.session.user)
    {
        return res.status(400).json('Error: must be logged in.');
    }
    const username = req.session.user.username;
    const id = req.params.id;
    const hours = Number(req.body.hours);
    const date = Date.parse(req.body.date);
    const description = req.body.description;
    
    Worklog.findOneAndUpdate({'username': username, '_id' : id}, {hours, date, description})
    .then((worklog)=> {
        if(worklog)
        {
            return res.json('Worklog Updated!');
        }
        else
        {
            return res.status(400).json('Error: Access Denied');
        }
    })
    .catch(()=>res.status(400).json('Error: '+err));
});
//Remove Worklog
router.route('/:id').delete((req,res) => {
    if(!req.session.user)
    {
        return res.status(400).json('Error: must be logged in.');
    }
    const username = req.session.user.username;
    const id = req.params.id;
    Worklog.findOneAndDelete({"_id":id, "username":username})
    .then((worklog)=> {
        if(worklog)
        {
            res.json('Worklog Removed!');
        }
        else 
        {
            res.status(400).json('Error: Access Denied');
        }
    })
    .catch(()=>res.status(400).json('Error: '+err));
});

module.exports = router;