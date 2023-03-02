const { Article } = require('../models/article');
const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apiError')


const addArticle =  async(body) => {
    try{
        //create an article
        const article = new Article({
            ...body,
            score:parseInt(body.score)
        })
        //save
        await article.save();
        return article;
    } catch(error){
        throw error
    }
}

const getArticleById = async(_id,user) => {
    try{
        //find the article
        const article = await Article.findById(_id);
        if(!article) throw new ApiError(httpStatus.NOT_FOUND,'Article not found');
        //only admin could access draft article
        if(user.role === 'user' && article.status === 'draft'){
            throw new ApiError(httpStatus.NOT_FOUND,'Sorry you are not allowed');
        }
        return article;
    } catch(error){
        throw error
    }
}


const getUsersArticleById = async(_id) => {
    try{
        //find the article
        const article = await Article.findById(_id);
        if(!article) throw new ApiError(httpStatus.NOT_FOUND,'Article not found');

        //user can not access draft
        if(article.status === 'draft'){
            throw new ApiError(httpStatus.NOT_FOUND,'Sorry you are not allowed');
        }
        return article;
    } catch(error){
        throw error
    }
}

const updateArticleById = async(_id,body) => {
    try{
        //find one and update 
        const article = await Article.findOneAndUpdate(
            {_id},
            { "$set": body },
            { new: true }
        );
        if(!article) throw new ApiError(httpStatus.NOT_FOUND,'Article not found');
        return article;
    } catch(error){
        throw error
    }
}


const deleteArticleById = async(_id) => {
    try{
        //find by id and remove
        const article =await Article.findByIdAndRemove(_id);
        if(!article) throw new ApiError(httpStatus.NOT_FOUND,'Article not found');
        return article;
    } catch(error){
        throw error
    }
}

const allArticles = async(req) => {
    
    const sortby = req.query.sortby || "_id";
    const order = req.query.order || "desc";
    const limit = req.query.limit || 2;

    try{
        //find public articles and sort them by _id and order
        const articles = await Article
        .find({status:'public'})
        .sort([
            [sortby,order]
        ])
        .limit(parseInt(limit));
        return articles;
    } catch(error){
        throw error
    }
}


const moreArticles = async(req) => {
    const sortby = req.body.sortby || "_id";
    const order = req.body.order || "desc";
    const limit = req.body.limit || 3;
    //how many elements do we want to skip
    const skip = req.body.skip || 0;

    try{
        const articles = await Article
        .find({status:'public'})
        .sort([[sortby,order]])
        .skip(skip)
        .limit(parseInt(limit));
        return articles;
    } catch(error){
        throw error
    }
}


const paginateAdminArticles = async(req) => {
    try{
        //create aggQuery
        let aggQuery = Article.aggregate();
        //pass some keywords
        if(req.body.keywords && req.body.keywords != ''){
            //query the keywords
            const re = new RegExp(`${req.body.keywords}`,'gi')
            //match the keywords
            aggQuery = Article.aggregate([
                { $match: { title:{ $regex:re}}}
            ]);
        } else {
            aggQuery = Article.aggregate();
        }


        //set the limit
        const limit = req.body.limit ?  req.body.limit : 5;
        //criteria
        const options = {
            page: req.body.page,
            limit,
            //sort by what, descending or ascending
            sort:{ _id:'desc'}
        }
        const articles = await Article.aggregatePaginate(aggQuery,options);
        return articles;
    } catch(error){
        throw error
    }
}

module.exports = {
    addArticle,
    getArticleById,
    getUsersArticleById,
    updateArticleById,
    deleteArticleById,
    allArticles,
    moreArticles,
    paginateAdminArticles
}