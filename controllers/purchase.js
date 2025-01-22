// controller for purchases

const save = (request,response) => {
    // save order to database
    var order = request.body;
    response.json({mensaje:'Order saved', order:order});
  }

  module.exports = {  save  };