const { lookup } = require('geoip-lite');

exports.get_ip_Info = async (req)=>{
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // let testIP = '72.95.213.75';
    try{
        let ipInfo = await lookup(ip);
        return {
            ip,
            ipInfo
        }
    }catch(err){
        return null
    }
}