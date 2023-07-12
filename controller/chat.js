const Chat = require('../models/chat')

exports.postChat = async (req,res,next)=>{
    try{
        const message = req.body.message
        console.log(message)

        const chat = await req.user.createChat({
            message:message
        })
        res.status(200).json({success:true, message:'sent sucessfully'})
    }
    catch(err){
        console.log(err)
        res.status(500).json({success:false, message:'something went wrong'})
    }

}