import Admin from "../entities/admin.entities";

class AdminRepository {
  async login(userName: string) {
    return await Admin.findOne({ where: { userName } });
  }
  async createAdmin(createForm: any) {
    await Admin.create(createForm);
  }
  async getAdminUserName(data: any) {
    const result = await Admin.findOne({ where: { userName: data } });
    return result;
  }
  async getAllAdmins(){
    return await Admin.findAll();
  }
  async deleteAdmin(id:number){
    return await Admin.destroy({ where: {id}})
  }
}
export default AdminRepository;
