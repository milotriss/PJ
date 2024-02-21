import Feedback from "../entities/feedbacks.entity";
import UserInfo from "../entities/userInfo.entity";
import User from "../entities/users.entity";
import { IFeedback } from "../types/emtities.types";

class FeedbackRepository {
  async createFeedback(data: any) {
    await Feedback.create(data);
  }
  async getAllFeedbacks(): Promise<any> {
    return await Feedback.findAll({
      include: [
        {
          model: User,
          attributes: ["firstName", "lastName"],
          include: [{ model: UserInfo, attributes: ["avatar"] }],
        },
      ],
      order:[
        ['id' , 'DESC']
      ],
      limit: 4
    });
  }
}
export default FeedbackRepository;
