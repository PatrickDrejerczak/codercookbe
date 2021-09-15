const utilsHelper = require("../helpers/utils.helper");
const Unit = require("../models/Units");
const unitController = {};

unitController.createUnit = async (req, res, next) => {
  try {
    let { name } = req.body;

    let units = await Unit.findOne({ name });
    if (!units) return;
    units = await Unit.create({
      name,
    });

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { units },
      null,
      "Created new unit successfully."
    );
  } catch (error) {
    next(error);
  }
};

module.exports = unitController;
