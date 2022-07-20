const AuditLog = require("../../models/audit.model");

exports.saveAuditLog = async (req,res)=>{
    const AuditLogTbl = new AuditLog()
    console.log("body",req.body);
    if(req.body){
       try{
            await AuditLogTbl.create_audit_log(req);
            return res.status(200).json({message:'Log Inserted !'})
       }catch(err){
            console.log('Error while inserting data', err.message);
            return res.status(500).json({message:'Log Not Inserted !',error:err})
       }
    }
}

exports.getAuditLogs = async (req,res)=>{
    const AuditLogTbl = new AuditLog();
    if(req.params.id){
        try {
            const auditRes = await AuditLogTbl.get_audit_log_with_user_id({user_id:req.params.id});
            return res.status(200).send(auditRes);
        }catch(err){
            return res.status(500).json({
                message:"Error While Getting Data.",
                error:err
            }) 
        }
    }else{
        res.status(400).json({
            message:"User Id Not Found"
        })
    }
}

exports.formatDate = (d)=>{
    let date = new Date(d);
    let fTime = date.toLocaleString().split(",")[1];
    let fDate = date.toDateString()
    return fDate + fTime; 
}