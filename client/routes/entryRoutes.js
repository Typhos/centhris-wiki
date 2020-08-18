const mongoose = require('mongoose');
const Product = mongoose.model('entry');

module.exports = (app) => {

  app.get(`/api/entry`, async (req, res) => {
    console.log("test");
    let entry = await Entry.find();
    return res.status(200).send(entry);
  });

  app.post(`/api/entry`, async (req, res) => {
    let entry = await Entry.create(req.body);
    return res.status(201).send({
      error: false,
      entry
    })
  })

  app.put(`/api/entry/:id`, async (req, res) => {
    const {id} = req.params;

    let entry = await Entry.findByIdAndUpdate(id, req.body);

    return res.status(202).send({
      error: false,
      entry
    })

  });

  app.delete(`/api/entry/:id`, async (req, res) => {
    const {id} = req.params;

    let entry = await Entry.findByIdAndDelete(id);

    return res.status(202).send({
      error: false,
      entry
    })

  })

}