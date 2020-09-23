const router = require('express').Router();
let Worklog = require('../models/worklog.model');

router.route('/').get((req,res) => {
    Worklog.find()
    .then(worklogs => res.json(worklogs))
    .catch(err => res.status(400).json('Error: '+err));
});




module.exports = router;