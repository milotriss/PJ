export interface IProduct {
    id?: number
    name: string
    desc: string
    price: number
    stock:number
    image:string
    isDelete: boolean
    category:string
}

export interface ICart extends IProduct {
    quantity: number
}

export interface IOrder {
    id?: number
    idUser: number
    userName:string
    phone:string
    address: string
    totalPrice: number
    status: number
    date: string
    orderDetails: ICart[]
}
export interface IUser {
    id?:number
    email:string
    fullName:string
    password:string
    confirm?:string
    avatar:string
    role:number
    status:boolean
    phone:string
    address:string
    cart:ICart[]
}
export interface IRate {
    id?: number
    idUser: number
    idProduct: number
    star:number
}
export interface IComment {
    id?: number
    idUser: number
    idProduct: number
    content: string
    date: string
}
