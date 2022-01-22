const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userName: {type: DataTypes.STRING, unicode: true},
    email: {type: DataTypes.STRING, unicode: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}
})

const Basket = sequelize.define('basket',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const BasketProduct = sequelize.define('basket_item',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Product = sequelize.define('product',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
    // price: {type: DataTypes.INTEGER},
    // system: {type: DataTypes.STRING},
    //     manufacturer: {type: DataTypes.STRING},
    //     processorType: {type: DataTypes.STRING},
    //     processorFrequency: {type: DataTypes.STRING},
    //     numberOfCores: {type: DataTypes.STRING},
    //     memoryStorage: {type: DataTypes.STRING},
    //     memoryRam: {type: DataTypes.STRING},
    //     typeOfScreen: {type: DataTypes.STRING},
    //     screenResolution: {type: DataTypes.STRING},
    //     screenDiagonal: {type: DataTypes.STRING},
    //     pcCommunicationCable: {type: DataTypes.STRING},
    //     charger: {type: DataTypes.STRING},
    //     protectiveFilm: {type: DataTypes.STRING},
    // camera: {type: DataTypes.STRING},
    // weight: {type: DataTypes.INTEGER},
    // batteryCapacity: {type: DataTypes.STRING},
    // color: {type: DataTypes.STRING},
    // category: {type: DataTypes.STRING},
    // rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING},
    // typeImg: {type: DataTypes.STRING},
    // nameImg: {type: DataTypes.STRING},
})

const Type = sequelize.define('type',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false}
})

const Brand = sequelize.define('brand',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false}
})

const Rating = sequelize.define('rating',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

const ProductInfo = sequelize.define('product_info',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING}
})

const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Menu = sequelize.define('menu', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING},
    link: {type: DataTypes.STRING}
})


User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

Type.hasMany(Product)
Product.belongsTo(Type)

Brand.hasMany(Product)
Product.belongsTo(Brand)

Product.hasMany(BasketProduct)
BasketProduct.belongsTo(Product)

Product.hasMany(ProductInfo, {as: 'info'})
ProductInfo.belongsTo(Product)

Type.belongsToMany(Brand, {through: TypeBrand})
Brand.belongsToMany(Type, {through: TypeBrand})

module.exports = {
    User,
    Basket,
    BasketProduct,
    Product,
    Type,
    Brand,
    Rating,
    TypeBrand,
    ProductInfo,
    Menu
}