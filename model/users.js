module.exports = function (sequelize, DataTypes) {
  //테이블을 정의
  return sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    //각 컬럼들에 대한 정보
    //컬럼 데이터 크기 조정 가능
    user_name: {
      type: DataTypes.STRING(100),
      defaultValue: "",
      allowNull: true,
    },
    user_phone: {
      type: DataTypes.STRING(100),
      defaultValue: "",
      allowNull: true,
    },
  });
};
