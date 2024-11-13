import { createCommentService, findCommentByIdService } from "../services/commentService.js";

export async function createComment(req, res) {
    try {
        const { content, onModel, commentableId } = req.body;
        console.log(content,onModel,commentableId)
        if(!content || !onModel || !commentableId){
            return res.json({
                success:false,
                message:"Provide all required input"
            })
        }
        const response = await createCommentService(content, req.user._id, onModel, commentableId);
        return res.status(201).json({
            success: true,
            message: "Comment created successfully",
            data: response
        });
    } catch (error) {
        console.log(error);
        console.log(error);
        if(error.status) {
            return res.status(error.status).json({
                success: false,
                message: error.message
            })
        }
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export async function getCommentById(req, res) {
    try {
        const commentId = req.params.id;
        const response = await findCommentByIdService(commentId);
        if(response.status == 404){
            return res.json({
                success: false,
                message: response.message,
            })
        }
        return res.status(200).json({
            success: true,
            message: "Comment found successfully",
            data: response
        });
    } catch (error) {
        console.log(error);
        console.log(error);
        if(error.status) {
            return res.status(error.status).json({
                success: false,
                message: error.message
            })
        }
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

