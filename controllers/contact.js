const contactModel = require('../Models/contacts');

exports.saveContact = async function (req, res){
    const dataFromClient = req.body;
    console.log(dataFromClient);
    const contact = {
        "name" : dataFromClient.name,
        "email": dataFromClient.email
    };
    const userToBeSaved =  await contactModel.findOne({
        email: dataFromClient.email
    });

    if(userToBeSaved){
        const currentUser = await contactModel.findOne({
            email: dataFromClient.userEmail
        })
        currentUser.contacts.push(contact);
        await currentUser.save();
        res.statusCode = 200;
        return res.json(contact);
    }
    else{
        res.statusCode = 404;
        return res.json("User not found");
    }
}

exports.getContacts = async function (req, res) {
    const dataFromClient = req.body;
        const currentUser = await contactModel.findOne({
            email: dataFromClient.email
        })
        console.log(dataFromClient);
        return  res.json(currentUser.contacts);
}

exports.sendUSer = async function sendUser(req, res) {
    const dataFromClient = req.body;
    const userToBeSent = await contactModel.find({
        email: dataFromClient.email
    });
    console.log(userToBeSent);
    if (userToBeSent) {
        return res.json(userToBeSent);
    }
    else{
        return res.json("User not found");
    }
}