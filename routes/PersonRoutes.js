const express = require("express");
const router = express.Router();

const Person = require("../models/Person");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const person = new Person(data);
    const savedPerson = await person.save();
    console.log("Person data saved successfully:", savedPerson);
    res.status(200).json(savedPerson);
  } catch (err) {
    res.status(500).json({
      message: "Error in saving person data",
      error: err.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const personData = await Person.find();
    res.status(200).json(personData);
  } catch (err) {
    res.status(500).json({
      message: "Error in fetching the data",
      error: err.message,
    });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (!["Manager", "Chef", "waiter"].includes(workType)) {
      return res.status(400).json({ message: "Invalid work type" });
    }
    const personData = await Person.find({ work: workType });
    if (!personData)
      return res
        .status(404)
        .json({ message: "No person found with this work type" });
    res.status(200).json(personData);
  } catch (err) {
    res.status(500).json({
      message: "Error in fetching person data",
      error: err.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const person = await Person.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
    if (!person)
      return res.status(404).json({ message: "Person not found with this ID" });
    res
      .status(200)
      .json({ message: "Person data updated successfully", person });
  } catch (err) {
    res.status(500).json({
      message: "Error in updating person data",
      error: err.message,
    });
  }
});

router.delete('/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const deletedPerson= await Person.findByIdAndDelete(id)
        if(!deletedPerson)return res.status(404).json({message:"Person with this id is not found"})
        res.status(200).json({message:"Person data deleted successfully", deletedPerson});
    }
    catch(err){
        res.status(500).json({
            message:"Error in deleting person data",
            error:err.message
        })
    }
})

module.exports = router;
