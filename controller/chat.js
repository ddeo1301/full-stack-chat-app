const Message = require('../models/chat');

exports.sendMessage = async (req,res,next) => {
    try {
      const { msg } = req.body;
      console.log(msg)

      // if (msg == undefined || msg.length === 0) {
      //   return res.status(400).json({ err: "Parameters Missing" });
      // } else {
        await Message.create({ msg, userId:req.user.id });
        console.log("message sent from controller")
        res.status(200).json({ success:true , username:req.user.name , msg:msg});
      //}

    } catch (err) {
      console.error(err);
      res.status(500).json({ err: "Something went wrong" });
    }
  }