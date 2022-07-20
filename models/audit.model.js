const sequelize = require('./connection_pool');
const Sequelize = require('sequelize');
const { DataTypes, QueryTypes } = Sequelize;
const Op = Sequelize.Op;
const DISABLE_SEQUELIZE_DEFAULTS = {
    timestamps: false,
    freezeTableName: true,
};
const ipService = require('../services/ip.service');
class AuditLog {
    constructor() { }

    audit_log_tbl = sequelize.define('audit_log', {
        audit_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        user_id: { type: DataTypes.INTEGER },
        action: { type: DataTypes.STRING },
        old_value: { type: DataTypes.STRING },
        new_value: { type: DataTypes.STRING },
        description: { type: DataTypes.STRING },
        created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        updated_by: { type: DataTypes.STRING },
        ip_address:{type: DataTypes.STRING},
        geo_location:{type: DataTypes.STRING}
    }, DISABLE_SEQUELIZE_DEFAULTS);

    async create_audit_log(req) {
        let data = req.body;
        console.log(data);
        let ip_info = null;
        if(data.method == 'LOGIN'){
            console.log('Login Log')
            let ipData = await ipService.get_ip_Info(req)
            if(ipData){
                ip_info = ipData.ipInfo ? {
                    ip_address:ipData.ip,
                    geo_location:`${ipData.ipInfo.country}_${ipData.ipInfo.region}_${ipData.ipInfo.city}`
                }:null

                console.log(ip_info);
            }
        }
        try {
            const auditRes = await this.audit_log_tbl.create({
                user_id: data.user_id,
                action: data.method,
                old_value: data.method == 'UPDATED' ? data.old_value : null,
                new_value: data.method == 'UPDATED' ? data.new_value : null,
                updated_by: data.method == 'UPDATED' ? data.updated_by : null,
                description: data.description,
                ip_address:ip_info?ip_info.ip_address:null,
                geo_location:ip_info?ip_info.geo_location:null
            })
            return auditRes;
        }
        catch (err) {
            throw new Error('Error while inserting data', err.message);
        }
    }

    async get_audit_log_with_user_id(data){
        try{
            const auditRes = await this.audit_log_tbl.findAll({where:{user_id:data.user_id},order: [['created_at','DESC']]});
            return auditRes;
        }catch (err) {
            throw new Error('Error while getting data', err.message);
        }
    }
}

module.exports = AuditLog;
