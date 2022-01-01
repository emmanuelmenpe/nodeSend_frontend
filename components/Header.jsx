import React, {useContext, useEffect, Fragment} from 'react';
import Link from 'next/link';
import authContext from '../context/auth/authContext';

const Header = () => {

    const AuthContext = useContext(authContext);
    const {usuario, autenticado, token, cerrarSesion} = AuthContext;

    useEffect(() => {
        usuario;
    }, []);

    return (
        <div className="py-8 flex flex-col md:flex-row items-center justify-between">
            <Link href="/">
                <img src="logo.svg" alt="LOGO" className='w-64 md:mb-0' />
            </Link>
            <div>
                {
                    usuario && autenticado && token?
                    <Fragment>
                        <div className="flex items-center">
                            <p className="mr-2">hola {usuario.nombre}</p>
                            <button
                                className="bg-black px-5 py-3 hover:bg-gray-800 rounded text-white font-bold uppercase"
                                onClick={()=>cerrarSesion()}
                            >Cerrar sesión</button>
                        </div>
                    </Fragment>
                    :
                    <Fragment>
                        <Link href="/login">
                            <a 
                                className="bg-red-500 px-5 py-3 hover:bg-red-600 rounded text-white font-bold uppercase mr-2"
                            >Iniciar sesión</a>
                        </Link>
                        <Link href="/crearcuenta">
                            <a 
                                className="bg-black px-5 py-3 hover:bg-gray-800 rounded text-white font-bold uppercase"
                            >Crear cuenta</a>
                        </Link>
                    </Fragment>
                }
                
            </div>
        </div>
    )
}

export default Header
