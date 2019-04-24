var db = require("../models");

module.exports = function(app) {
   
  app.post("/api/jobs", function (req, res) {
    db.Job.create(req.body).then(function (data) {
      res.json(data)
    })
  })

  app.get("/api/jobs", function (req, res) {
    db.Job.findAll({}).then(function (data) {
      res.json(data)
    });
  });

  app.put("/api/jobs", function(req, res) {
    db.Job.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(data) {
      res.json(data);
    });
  });
  };
