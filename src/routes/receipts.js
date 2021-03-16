const router = require('express').Router();
const Receipt = require('../models/receipt.model');
// modules for file upload
const multer = require('multer');
const upload = multer({ dest: './uploads/'});
const { parseFileToArray, parseArrayToObject } = require('../utils');

/* get all receipts from user */
router.route('/').get((req, res) => {
    const username = req.session.username;

    Receipt.find({ "username": username })
        .then(receipts => res.json(receipts))
        .catch(err => res.status(400).json('Error: ', err));
});

/* add new receipts */
router.route('/add').post((req, res) => {
    const receiptId = req.body.receiptId;
    const date = req.body.date;
    const tag = req.body.tag;
    const total = req.body.total;
    const username = req.session.username;
    if(!username){
        console.log("Please login first");
        res.send('Please login first');
        return;
    }

    console.log("Receipt: ", req.body);
    console.log("Username: ", username)

    const newReceipt = new Receipt({
        receiptId: receiptId,
        tag: tag,
        date: date,
        total: total,
        username: username,
    })
    console.log("New Receipt: ", newReceipt);
    
    newReceipt.save()
        .then(() => res.send(`Receipt added, receipt id: ${receiptId}`))
        .catch(err => res.status(400).json('Error: ', err));
})

/* upload receipt */
// 'upload' is the key of the form data from POST request
router.route('/upload').post(upload.single('upload'),(req, res, next) => {
    // console.log(req.body);
    let array = []
    let receiptObject = {
        receiptId:"",
        date:"",
        tag:"",
        total:"",
        username:""
    }
    console.log(req.file);
    console.log('Filename: ', req.file.filename);
    const fileName = req.file.filename;
    try{
        array = parseFileToArray('./uploads/'+ fileName);
        console.log('Array: ', array);
        
        setTimeout(() => {
            console.log('Array in timeout: ', array);
            console.log('Length of array: ', array.length);
            receiptObject = parseArrayToObject(array, receiptObject);
            console.log("Temp", receiptObject);
            
            const username = req.session.username;
            if(!username){
                res.send('Please login first');
                return;
            }
            const receiptId = receiptObject['receiptId'];
            const tag = receiptObject['tag'];
            const date = receiptObject['date'];
            const total = receiptObject['total'];
            
            console.log('Constants: ', receiptId, tag, date, total, username);

            const newReceipt = new Receipt({
                receiptId: receiptObject.receiptId,
                tag: receiptObject.tag,
                date: receiptObject.date,
                total: parseInt(receiptObject.total),
                username: username,
            });

            console.log('new receipt: ', newReceipt);
            newReceipt.save()
                .then(() => res.send(`File Uploaded and Receipt added, receipt id: ${receiptId}`))
                .catch(err => res.status(600).json('Error: ', err));

        },1000)
        
        // res.send('file uploaded');
    }catch(err){
        res.status(500).json('Error: ', err);
    }

    
})

/* get specific receipt */
router.route('/id/:id').get((req, res) => {
    const id = req.params.id;
    Receipt.findOne({ 'receiptId': id })
        .then(receipt => {
            if(receipt){
                res.json(receipt)
            }else{
                res.json(`Cannot find receipt with receiptId: ${id}`);
            }
            
        })
        .catch(err => res.status(400).json('Error: ', err));
})


/* update specific receipt */
router.route('/id/:id').post((req, res) => {
    const id = req.params.id;
    // const newReceipt = req.body;
    const tag = req.body.tag;
    const date = req.body.date;
    const total = req.body.total;
    console.log('id:', id, 'tag:', tag, 'date:', date, 'total:', total);


    Receipt.findOne({'receiptId': id})
        .then(receipt => {
            console.log('Fetched Receipt', receipt);
            if(receipt){
                if(tag) {receipt.tag = tag}
                if(date) {receipt.date = date}
                if(total) {receipt.total = total}
                receipt.save()
                    .then(() => res.json('Receipt updated!'))
                    .catch(err => status(400).json('Error inner: ' + err));
            }else{
                res.json(`Cannot find receipt with receiptId: ${id}`);
            }
        })
        .catch(err => res.status(400).json('Error outer: ' + err)); 
});

/* get receipts based on tags */
router.route('/tag/:tag').get((req, res) => {
    const tag = req.params.tag;
    // find receipts based on tags, case insentive
    Receipt.find({ "tag": new RegExp(tag, 'i')})
        .then(receipts => {
            res.json(receipts)
        })
        .catch(err => status(400).json('Error: ' + err));
})


module.exports = router;