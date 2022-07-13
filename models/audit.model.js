const sequelize = require('./connection_pool');
const Sequelize = require('sequelize');
const { DataTypes, QueryTypes } = Sequelize;
const Op = Sequelize.Op;
const DISABLE_SEQUELIZE_DEFAULTS = {
    timestamps: false,
    freezeTableName: true,
};

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
        updated_by: { type: DataTypes.STRING }
    }, DISABLE_SEQUELIZE_DEFAULTS);

    async create_audit_log(data) {
        console.log(data);
        try {
            const auditRes = await this.audit_log_tbl.create({
                user_id: data.user_id,
                action: data.method,
                old_value: data.method == 'UPDATED' ? data.old_value : null,
                new_value: data.method == 'UPDATED' ? data.new_value : null,
                updated_by: data.method == 'UPDATED' ? data.updated_by : null,
                description: data.description
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
