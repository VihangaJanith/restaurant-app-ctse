const express = require('express');
const router = express.Router();
const Foods = require('../Models/FoodsModel')

router.get("/", async(req, res) =>{
    try{
        const food = await Foods.find()
        res.send(food)

    }catch(err){
        res.send(err)
    }
})


router.get("/:id", async(req, res) =>{
    try{
        const id = req.params.id
        const food = await Foods.findById(id)
        res.send(food)

    }catch(err){
        res.send(err)
    }
})

router.put('/admin/update/:id',(req,res)=>{
    Foods.findByIdAndUpdate(req.params.id)
    .then((food )=> {
        food.foodName=req.body.foodName;
        food.description=req.body.description;
        food.price=req.body.price;
        food.foodImage=req.body.foodImage;
        food
            .save()
            .then(() => res.json("Food Details UPDATED successfully"))
            .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;