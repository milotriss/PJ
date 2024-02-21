import Event from "../entities/event.entity";

class EventRepository {
    async createEvent(event:any){
        await Event.create(event);
    }
    async updateEvent(id:number,data:any){
        if (data.status === 2) {
             await Event.update(data,{where:{id}})
        }else if(data.status === 3){
             await Event.update({status:data.status},{where:{id}})
        }
    }
    async deleteEvent(id:number){
        await Event.destroy({where:{id}})
    }
}
export default EventRepository;