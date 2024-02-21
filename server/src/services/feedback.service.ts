import FeedbackRepository from "../repositories/feedback.repository";
import { IFeedback } from "../types/emtities.types";

class FeedbackService {
    private _feedbackRepository: FeedbackRepository;
    constructor() {
        this._feedbackRepository = new FeedbackRepository();
    }
    async getAllFeedbacks(): Promise<IFeedback[]> {
        return await this._feedbackRepository.getAllFeedbacks();
    }
}
export default FeedbackService;