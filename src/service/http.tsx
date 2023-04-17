import axios from "axios";

// const baseUrl = "http://localhost:3000/api/v1";
const baseUrl = "https://ticket-management-system.onrender.com/api/v1";

class Services {
  getRequest(url: string) {
    return axios.get(baseUrl + url);
  }

  postRequest(url: string, data: any) {
    return axios.post(baseUrl + url, data);
  }

  getRequestUsingParamId(url: string, id: string) {
    return axios.get(baseUrl + `${url}/${id}`);
  }

  putRequestUsingParamIdAndBody(url: string, data: any, id: string) {
    return axios.put(baseUrl + `${url}/${id}`, data);
  }

  deleteRequestUsingTwoParamIds(url: string, tid: string, cid: string) {
    return axios.delete(baseUrl + `${url}/${tid}/${cid}`);
  }

  deleteRequestParamId(url: string, id: string) {
    return axios.delete(baseUrl + `${url}/${id}`);
  }

  deleteRequestUsingTwoParamId(url: string, id1: string, id2: string) {
    return axios.delete(baseUrl + `${url}/${id1}/${id2}`);
  }

  getPaginatedTickets(page: any, perPage: any) {
    return axios.get(baseUrl + `/ticket?page=${page}&limit=${perPage}`);
  }
}

// Below we are exporting the object of employee, so that we acan directly use object in component.
// So we don't have to instantial a class object.
const serviceClass = new Services();

export default serviceClass;
