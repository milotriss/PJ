import { PrivateAxios } from "../configs/axios.config";

class ApiService {
  async POST(endpoint: string, data: any) {
    return await PrivateAxios.post(endpoint, data);
  }
  async POSTID(endpoint: string, id: number, data: any) {
    return await PrivateAxios.post(`${endpoint}/${id}`, data);
  }
  async GET(endpoint: string, params?: any) {
    if (params) {
      return await PrivateAxios.get(endpoint, { params: params });
    } else {
      return await PrivateAxios.get(endpoint);
    }
  }
  async LOGOUT(endpoint: string) {
    await PrivateAxios.get(endpoint);
  }
  async GETBYID(endpoint: string, id?: number, data?: any) {
    if (data) {
      return await PrivateAxios.get(`${endpoint}/${id}`, {
        params: { code: data },
      });
    } else {
      return await PrivateAxios.get(`${endpoint}/${id}`);
    }
  }
  async SEARCH(endpoint: string, searchValue: string, id?: number) {
    if (id) {
      return await PrivateAxios.get(`${endpoint}/${id}`, {
        params: { search: searchValue },
      });
    } else {
      return await PrivateAxios.get(endpoint, {
        params: { search: searchValue },
      });
    }
  }
  async CPASS(endpoint: string, password: string) {
    return await PrivateAxios.patch(endpoint, { password });
  }
  async CREATEOTP(endpoint: string, email: any) {
    return await PrivateAxios.post(endpoint, { email });
  }
  async PATCH(endpoint: string, id: number, data: any) {
    return await PrivateAxios.patch(`${endpoint}/${id}`, data);
  }
  async DELETE(endpoint: string, id: number) {
    return await PrivateAxios.delete(`${endpoint}/${id}`);
  }
}
export default ApiService;
