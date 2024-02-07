const { DataTypes } = require("sequelize")
const sequelize = require("../../sequlize");

const OrderPaymentDetail = sequelize.define("OrderPaymentDetail", {
    currencyType: {
        type: DataTypes.STRING
    },
    amountSubtotal: {
        type: DataTypes.INTEGER
    },
    paymentMode: {
        type: DataTypes.STRING
    }
})

module.exports = OrderPaymentDetail