import axios from '../axiosSetup';

export const allMessages = async(name?:string)=>{
    try{
        const response = await axios.get(`/users?name=${name}`)
        return response
    }catch(error:any){
        return error.response
      }
}

export const singleMessage = async(id:string)=>{
    try{
        const response = await axios.get(`/users/${id}`)
        return response
    }catch(error:any){
        return error.response
      }
}

export const createMessage = async(body:any)=>{
    try{
        const response = await axios.post('/users', body)
        return response
    }catch(error:any){
        return error.response
      }
}