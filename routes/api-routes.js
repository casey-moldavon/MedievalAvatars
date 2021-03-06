const db = require("../models");

module.exports = app => {
    app.post("/api/create/:userId", function(req,res){
        db.Avatars.create(req.body).then(function(data){
            db.UsersAvatars.create({
                UserId: req.params.userId,
                AvatarId: data.id
            }).then(function(response) {
                res.json(response);
            })
        });

    });

    app.get("/api/classes/:name", function(req, res) {
        db.AvatarClasses.findAll(
            {
                where:{
                    socialClass: req.params.name
                }
        }).then(function(data){
            res.json(data);
        })
    });

    // login route
    app.post("/api/login/", function(req,res){
        // We query the database to find the username
        // and password we received in the request
        db.Users.findAll({
            where: {
                userName: req.body.userName,
                password: req.body.password
            }
        }).then(function(login) {
            res.json(login);
        });
    });

    // Create a new User
    app.post("/api/createAccount", function(req, res) {
        db.Users.findOrCreate({
            where: {
                userName: req.body.userName
            },
            defaults: {
                userName: req.body.userName,
                password: req.body.password
            }
        }).then(function(data) {    

            res.json(data);
        });
    });

    app.post("/api/save/:id", function(req, res) {
        db.UsersAvatars.create({
            UserId: req.body.user,
            AvatarId: req.params.id
        }).then(function(data){
            res.json(data);
        });
    });

    app.post("/api/delete/:id", function(req, res) {
        db.UsersAvatars.destroy({
            where:{
                UserId: req.body.user,
                AvatarId: req.params.id
            }
        }).then(function(data){
            res.json(data);
        });
    });

}

