import React from 'react';
import Link from 'next/link';

const Header = () => {
    return (
        <div className="py-8 flex flex-col md:flex-row items-center justify-between">
            <Link href="/">
                <img src="logo.svg" alt="LOGO" className='w-64 md:mb-0' />
            </Link>
            <div>
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
            </div>
        </div>
    )
}

export default Header
