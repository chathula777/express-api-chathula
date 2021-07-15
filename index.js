const express = require("express");
const server = express();
server.use(express.json())
const {db : destinations} = require("./DB")
const {getRandomId} = require("./HELPERS");

//post
server.post("/destinations", (req, res) => {
    //generate uniqu id
    const _id = getRandomId();
    const{name, location, photo, description} = req.body

    destinations[_id] = {_id, name, location, photo, description};
    

    res.send({status: "success"})
});
//read//get
server.get("/destinations", (req, res) => {
   res.send(destinations);
});

// UPDATE => PUT
server.put("/destinations", (req, res) => {
    const { _id } = req.query;

    if (_id === undefined){
        return res.status(400).send({message: "?_id required"});  
}
if (destinations[_id] === undefined) {
    return res
    .status(410)
    .send({message: "no destination with that _id to update" });
}
const dest = destinations[_id];
console.log(dest);
const { name, location, photo, description} = req.body;

if (name !== undefined){
    dest.name = name;
}
if (location !== undefined){
    dest.location = location;
}
if (photo !== undefined){
    dest.photo = photo;
}
if (description !== undefined){
    dest.description = description;
}
});
//DELETE => DELETE
server.delete("/destinations", (req, res) => {
    const { _id } = req.query;

    if (_id === undefined){
        return res.status(400).send({message: "?_id required"});  
}
if (destinations[_id] === undefined) {
    return res
    .status(410)
    .send({message: "no destination with that _id to update" });
}
delete destinations[_id]
res.send("Deleted Successfully")
});

server.listen(3000, () => {  
    console.log("Server listening");
});