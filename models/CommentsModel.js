module.exports = (sequelize, DataTypes)=>{
    const Comments = sequelize.define(
        "comment",
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userid:{
                type: DataTypes.INTEGER,
            },
            photoid:{
                type: DataTypes.INTEGER,
            },
            content:{
                type: DataTypes.STRING,
            },
        }
    );
    return Comments;
};