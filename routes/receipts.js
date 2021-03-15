const router = require('express').Router();
const Receipt = require('../models/receipt.model');

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