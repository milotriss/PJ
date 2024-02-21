import EventRepository from "../repositories/events.repository";
import { IEvent } from "../types/emtities.types";

class EventService {
    private _eventRepository: EventRepository;
    constructor() {
        this._eventRepository = new EventRepository();
    }
    async createEvent(event: IEvent){
        await this._eventRepository.createEvent(event);
    }
    async updateEvent(id:number, data:any){
        await this._eventRepository.updateEvent(id, data);
    }
    async deleteEvent(id:number){
        await this._eventRepository.deleteEvent(id);
    }
}
export default EventService;