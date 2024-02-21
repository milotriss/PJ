export interface IUser {
    id?:number
    firstName:string
    lastName:string
    email:string
    password:string
    status?:number
    createdAt?:string
    updatedAt?:string
}
export interface IUserInfo{
    id?:number
    userId:number
    gender:number
    birthDay:string
    address:string
    phone:string
}
export interface ILogin{
    email:string
    password:string
}
export interface IProduct{
    id?:number
    catalogId:number
    name:string
    price:number
    desc:string
    images:string
    ingredients:string
    allergens:string
    stock:number
    isDelete?:number
}
export interface IOrderItem {
    id?:number
    productId:number
    userId:number
    name:string
    images:string
    quantity:number
    price:number
    totalPrice:number
    isPayment?:number
    codePayment?:string
}
export interface IOrderItemSend {
    productId:number
    userId:number
    quantity:number
}
export interface IOrderDetailByUser {
    firstName:string
    lasName:string
    name:string
    images:string
    desc:string
    ingredients:string
    allergens:string
    quantity:number
    price:number
    totalPrice:number
    codePayment:string
}
export interface IPayment {
    id?:number
    userId:number
    status?:number
    typePayment:number
    name:string
    email:string
    address:string
    phone:number
    subTotal:number
    lastPrice:number
    codePayment:string
    createdAt?:string
    updatedAt?:string
}
export interface IFeedback {
    id?:number
    userId:number
    content:string
    emotion:number
    createdAt?:string
    updatedAt?:string
}
export interface IRate {
    id?:number
    userId:number
    productId:number
    rateStar:number
    review:string
    createdAt?:string
    updatedAt?:string
}
export interface IEvent {
    id?:number
    userId:number
    status?:number
    typePayment:number
    name:string
    email:string
    address:string
    phone:number
    price?:number
    receiveAt:string
    createdAt?:string
    updatedAt?:string
}
export interface IPoint {
    id?:number
    userId:number
    point:number
}