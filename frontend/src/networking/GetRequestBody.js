import { commonHelper } from "../common/commonHelper";

export default function getRequestBody(url, data, param , cancelToken , method , header) {
  
  let extraHeader  = commonHelper.getHeaders();
  if(header){
    extraHeader = {
      ...header,
      ...extraHeader
    }
  }

  if(data){

    if(cancelToken){
      return {
        url: param ? url + "?" + param : url,
        headers: extraHeader,
        method: method,
        data: data,
        cancelToken: cancelToken.token,
      };  
    }else{
      return {
        url: param ? url + "?" + param : url,
        headers: extraHeader,
        method: method,
        data: data,
      };  
    }
    
  }else{
    if(cancelToken){
      return {
        url: param ? url + "?" + param : url,
        headers: commonHelper.getHeaders(),
        method: method,
      };
    }else{
      return {
        url: param ? url + "?" + param : url,
        headers: commonHelper.getHeaders(),
        method: method,
        cancelToken: cancelToken.token,
      };
    }
    
  }
}
