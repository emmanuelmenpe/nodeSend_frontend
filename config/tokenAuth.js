import clienteAxios from "./axios";

const tokenAuth = (token) => {
    if (token){
        //con axios enviar token por autorizacion bearer en header Authorization 
        clienteAxios.defaults.headers.common['Authorization'] = `Bearer ${token} `;
    }else{
        delete clienteAxios.defaults.headers.common['Authorization'];
    }
}

export default tokenAuth;