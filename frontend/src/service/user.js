import api from "./api";


export const putUserUpdate=(userData)=>{
    api.put(`/user/update_user`,userData).then(res=>res.data);
}

export const postUserLogin=(email,password)=>{
    api.post(`/user/login`,{email,password}).then(res=>res.data);
}

export const postRegisterAccount=(email,password)=>{
    api.post(`/user/register`,{email,password}).then(res=>res.data);
}