exports.routes = (modelName) => {
     return `const router = require('express').Router();

const {
  getAll,
  add${modelName},
  delet${modelName},
  deletAll${modelName}s,
  getOne,
  update${modelName},
} = require('../controllers/${modelName}.controllers');

/// * ------------------------- ${modelName} Route

/* ! @Route  : GET => api/${modelName}
     Desc    : Get all ${modelName}s 
     @Access : Pubic
*/
router.get('/', getAll);

/* ! @Route  : GET => api/${modelName}/:id
     Desc    : Get One  ${modelName}
     @Access : Pubic
*/
router.get('/:id', getOne);

/* ! @Route  : POST => api/${modelName}
     Desc    : Create ${modelName}
     @Access : Pubic
*/

router.post('/add${modelName}', add${modelName});

/* ! @Route  : POST => api/${modelName}/id
     Desc    : Delete One ${modelName}
     @Access : Pubic
*/
router.delete('/:id', delet${modelName});

/* ! @Route  : DELETE => api/${modelName}/
     Desc    : Delete All ${modelName}s
     @Access : Pubic
*/
router.delete('/', deletAll${modelName}s);

/* ! @Route  : UPDATE => api/${modelName}/:id
     Desc    : UPDATE  ${modelName}
     @Access : Pubic
*/
router.put('/:id', update${modelName});

module.exports = router;`
}