exports.controllers = (
  modelName
) => `/// * -------------------------------------------------------------------------- ${modelName} Controllers
// ------------- require mongoose ObjectId ----//
const ObjectID = require('mongoose').Types.ObjectId;

// -------------require models----------  //
//const ${modelName} = require('../models/${modelName}.model');

// -------------require validations----------  //
//const { ${modelName}Validation } = require('../validations/${modelName}.validations');

/* ! @Route  : GET => api/${modelName}s
     Desc    : Get all ${modelName}s
     @Access : Pubic
*/
exports.getAll = async (req, res) => {
  try {
    const all = await ${modelName}.find().sort({ date: -1 });
    all && res.status(200).json(all);
  } catch (err) {
    res.status(400).json(err);
  }
};

/* ! @Route  : GET => api/${modelName}/:id
     Desc    : Get One  ${modelName}
     @Access : Pubic
*/
exports.getOne = async (req, res) => {
  !ObjectID.isValid(req.params.id) &&
    res
      .status(404)
      .json({ message: "l'ID "+req.params.id+" n'est pas reconnu" });
  ${modelName}.findById(req.params.id, (err, info) => {
    !err ? res.status(200).json(info) : res.status(400).json({ err });
  });
};

/* ! @Route  : POST => api/${modelName}s/add${modelName}
     Desc    : Create ${modelName}
     @Access : Pubic
*/
exports.add${modelName} = async (req, res) => {
  // const { error } = ${modelName}Validation(req.body);
  // error && res.status(400).json(error.details[0].message);
  const ${modelName} = new ${modelName}({ ...req.body });
  try {
    const add${modelName} = await ${modelName}.save();
    add${modelName} && res.status(201).json(${modelName});
  } catch (err) {
    res.status(400).json(err);
  }
};
/* ! @Route  : DELETE => api/${modelName}s/:id
     Desc    : Delete ${modelName}
     @Access : Pubic
*/
exports.delet${modelName} = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    res
      .status(400)
      .json({ message: "l'ID " +req.params.id+ " n'est pas reconnu" });
  try {
    await ${modelName}.remove({ _id: req.params.id }).exec();
    res.status(200).json({
      message: "l'${modelName} avec l'id "+req.params.id+" est supprimer avec succées",
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};
/* ! @Route  : DELETE => api/${modelName}/
     Desc    : Delete All ${modelName}s
     @Access : Pubic
*/

exports.deletAll${modelName}s = async (req, res) => {
  try {
    const deletMany = await ${modelName}.deleteMany();
    deletMany &&
      res.status(200).json({
        message: '0 element veiller rajouter un element a la todo liste',
      });
  } catch (err) {
    res.status(500).json({ err });
  }
};
/* ! @Route  : UPDATE => api/${modelName}/:id
     Desc    : Update ${modelName}
     @Access : Pubic
*/

exports.update${modelName} = async (req, res) => {
  !ObjectID.isValid(req.params.id) &&
    res
      .status(404)
      .json({ message: "l'ID "+req.params.id+" n'est pas reconnu" });
  // const { error } = ${modelName}Validation(req.body);
  // error && res.status(400).json(error.details[0].message);
  try {
    await ${modelName}.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true, useFindAndModify: true, upsert: true },
      (err, info) => {
        !err ? res.status(200).json(info) : res.status(400).json({ err });
      }
    );
  } catch (err) {
    res.status(400).json({ err });
  }
};
`;
