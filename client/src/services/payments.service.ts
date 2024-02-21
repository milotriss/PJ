import PaymentRepository from "../repositories/payment.repository";

class PaymentService {
    private _paymentRepository: PaymentRepository;
    constructor(){
        this._paymentRepository = new PaymentRepository();
    }
    async createPayment(id:number,data:any){
        try {
            const result = await this._paymentRepository.createPayment(id,data)
            if (result.status === 201) {
                return 1
            }else {
                return 2
            }
        } catch (error) {
            console.log(error);
            return 2
        }
    }
}
export default PaymentService;