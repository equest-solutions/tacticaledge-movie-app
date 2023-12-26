import axios from "axios";
import { alerts } from "../common/alertService";
import ApiTypes from "./APItypes";
import getRequestBody from "./GetRequestBody";

let cancelTokensHashMap = new Map();
export default async function APICall({
  url,
  method = "post",
  data = null,
  param = null,
  header =null
}) {

  const WithoutCancelToken =[
  ] 


  try {
    if (cancelTokensHashMap.has(url)) {
      cancelTokensHashMap.get(url).cancel();
      cancelTokensHashMap.delete(url);
    }

    let cancelToken =null;
    if(!WithoutCancelToken.includes(url)){
      cancelToken = axios.CancelToken.source();
      cancelTokensHashMap.set(url, cancelToken);
    }
    

    const response = await axios(
      getRequestBody(url, data, param , cancelToken, method , header)
    );
    if(response.data.status === 0){
     alerts.notifyError(response.data.message)
     return response;
    }else{
      return response.data;
    }
    
  } catch (e) {
  if (e.response) {
    if (e.response.status == 500) {
      alerts.notifyError("Internal server error.")
    } else if (e.response.status == 400) {
      alerts.notifyError(e.response.message)
    } else if (e.response.status == 404) {
      alerts.notifyError("Not found")
    } else if (e.response.status == 401) {
      alerts.notifyError("You are unauthorized.")
      localStorage.clear();
      window.location.pathname =  '/'
    } else if (e.response.status == 403) {
      alerts.notifyError("Access denied for this request.")
    }
  }
  alerts.notifyError(e)
  return false;
}
}
