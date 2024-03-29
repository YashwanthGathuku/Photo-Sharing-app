const express = require('express');
const CommentsRouter = express.Router();
const db = require('../models');


CommentsRouter.route('/photoId')
    .get((request, response)=>{
        const photoid = request.params.photoId
        db.comment.findAll({ where : {photoId: photoId}})
        .then((comment)=>{
            db.photo.findAll({where: { Id: photoId}})
            .then((photo)=>{
                response.render("comment", {photo, photo, comment: comment, requestURL: request.url})
            })
            .catch((error)=>{
                console.log(error)
                response.send(error)
            })
        })
    })

CommentsRouter.route('/:photoId').post((request, response)=>{
    const photoId = request.params.photoId
    const content = request.body.comment
    db.comment
        .create({photoId: photoId, content: content})
        .then((comment)=>{
            response.redirect(`/comment ${request.url}`)
        })
        .catch((error)=>{
            response.send(erroe)
        })
    
})
    


module.exports = CommentsRouter;