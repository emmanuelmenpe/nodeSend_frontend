import clienteAxios from "./axios";

const tokenAuth = (token) => {
    if (token){
        //con axios enviar token por autorizacion bearer en header Authorization 
        clienteAxios.defaults.headers.common['Authorization'] = `Bearer ${token} `;
        console.log('1111: token : '+token);
    }else{
        delete clienteAxios.defaults.headers.common['Authorization'];
        console.log('22222');
    }
}

export default tokenAuth;