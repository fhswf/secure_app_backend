const express = require('express')
const router = express.Router()
const Message = require('../models/message')

router.get('/', async(req,res) => {
    try{
        const messages = await Message.find()
        res.json(messages)

    }catch(err){
        res.send('Error ' + err)
    }
})

router.post('/', async(req,res) => {
    const message = new Message(
    {
        name: req.body.name
    })

    try{
       const a1 = await message.save()
       res.json(a1)
    }catch(err)
    {
        res.send('error')
    }
})

module.exports = router