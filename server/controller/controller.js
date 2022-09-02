var Userdb = require('../model/model');

// create and save new user
exports.create = (req, res) => {
    // validate request
    if(!req.body){
        res.status(400).send({message: "Content cannot be empty"});
        return;
    }
    // new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })
    //save user in db
    user
      .save(user)
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred during create operation"
        });
      });
}

// retrive and return single/all user/s
exports.find = (req, res) => {

    if(req.query.id){
      const id = req.query.id;
      Userdb.findById(id)
        .then(data => {
          if(!data){
            res.status(404).send({message: `User ${id} not found`})
          }else{
            res.send(data)
          }
        })
        .catch(err => {
          res.status(500).send({message: `Error with retriving user ${id}`})
        })
    }else{
      Userdb.find()
      .then(user => {
        res.send(user)
      })
      .catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred during retrive operation"
        });
      });
    }   
}

// update user 
exports.update = (req, res) => {
    if(!req.body){
        return res
          .status(400)
          .send({message: "Data to update cannot be empty"});
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
      .then(data => {
        if(!data){
          res.status(404).send({message: `Please check userid ${id}`})
        }else{
          res.send(data)
        }
      })
      .catch(err => {
        res.status(500).send({message: "Error update user info"})
      })
}

// delete user
exports.delete = (req, res) => {
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
    .then(data => {
      if(!data){
        res.status(404).send({message: `Cannot delete user ${id}`})
      }else{
        res.send({message: "User deleted successfully"})
      }
    })
    .catch(err => {
      res.status(500).send({message: `Could not delete user ${id}`});
    });
}