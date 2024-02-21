import express from 'express';
import FeedbackService from '../services/feedback.service';
const feedbackService = new FeedbackService();
const feedbackController = express.Router();

feedbackController
// GetAllFeedbacks
.get('/',async (req: express.Request, res: express.Response)=> {
    try {
      const data = await feedbackService.getAllFeedbacks();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      
      res.status(500).json("Get All feedback: SERVER");
    }
})

export default feedbackController;