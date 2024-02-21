import Catalog from "./catalog.entity";
import Event from "./event.entity";
import Feedback from "./feedbacks.entity";
import OrderItem from "./orderItems.entity";
import Point from "./point.entity";
import Product from "./products.entity";
import Rate from "./rates.entity";
import UserInfo from "./userInfo.entity";
import User from "./users.entity";
import Voucher from "./voucher.entity";
import Payment from "./payments.entity";
import Admin from "./admin.entities";

const createEntity = () => {
    User.sync().then(()=> console.log('Created table User'))
    UserInfo.sync().then(()=> console.log('Created table UserInfo'))
    Catalog.sync().then(()=> console.log('Created table Catalog'))
    Product.sync().then(()=> console.log('Created table Product'))
    OrderItem.sync().then(()=> console.log('Created table OrderItem'))
    Payment.sync().then(()=> console.log('Created table Cart'))
    Event.sync().then(()=> console.log('Created table Event'))
    Feedback.sync().then(()=> console.log('Created table Feedback'))
    Point.sync().then(()=> console.log('Created table Point'))
    Rate.sync().then(()=> console.log('Created table Rate'))
    Voucher.sync().then(()=> console.log('Created table Voucher'))
    Admin.sync().then(()=> console.log('Created table Admin'))
}
export default createEntity;