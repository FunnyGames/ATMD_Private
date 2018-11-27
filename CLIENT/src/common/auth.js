import axios from '../axios/axios';
import jwt from 'jsonwebtoken';
import{
    setInStorage,
    getFromStorage,
}from '../utils/storage';

//import axios from 'axios';

export const auth = (id, password ) => {
        const authData ={
            id,
            password,
        } 
       axios.post('/users/login', authData).then(response => {
            alert("enter");
            const decoded = jwt.decode(response.data.token);
            console.log(response);
            if(response.status == 200){
               alert("Respones ok");
           }
        }).catch(error =>{
            alert(error);
            return false;
     }).then (()=>{console.log("bye")});       

}
