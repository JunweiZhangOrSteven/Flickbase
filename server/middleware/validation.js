const { check, validationResult } = require('express-validator');
const httpStatus = require('http-status');

//add validator to verify the input article
const addArticleValidator = [
    //title is not empty and minimum 3 characters
    check('title')
        .trim().not().isEmpty().withMessage('You need to add a title').bail()
        .isLength({min:3}).withMessage('Minimum 3 required').bail(),
    //director is not empty
    check('director')
        .trim().not().isEmpty().withMessage('You need to add a director').bail()
        .not().isBoolean().withMessage('You cannot add a bool here').bail()
        .isLength({min:3,max:100}).withMessage('Too long').bail(),
    (req,res,next)=>{
        //check the validation result
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            //send error messages
            return res.status(httpStatus.BAD_REQUEST).json({
                errors: errors.array()
            })
        }
        next()
    }
]


module.exports = {
    addArticleValidator
}