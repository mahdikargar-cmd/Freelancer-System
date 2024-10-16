const createProjectController=require('../controllers/createProjectController')
const {Router} = require("express");
const router=Router();
const upload=require('../middleware/upload')
router.post('/create',upload.single('file'),createProjectController.createProject)


module.exports=router;