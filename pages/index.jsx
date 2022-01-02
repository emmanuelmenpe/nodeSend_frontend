import React, {useContext, useEffect, Fragment} from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import authContext from '../context/auth/authContext';
import Dropzone from '../components/Dropzone';
import appContext from '../context/app/appContext';
import Alerta from '../components/Alerta';

const index = () => {
  const AuthContext = useContext(authContext);
  const {usuarioAutenticado} = AuthContext;

  const Appcontext = useContext(appContext);
  const {mensaje_archivo, url} = Appcontext;

  useEffect(() => {
    usuarioAutenticado();
  }, []);

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        {
          url? (
            <Fragment>
              <p
                className="text-center text-2xl mt-10"
              >
                <span
                  className="font-bold text-red-700 text-3xl uppercase"
                >Tu URL es: </span>{`${process.env.frontendURL}/enlaces/${url}`}
                <button 
                  className="bg-red-500 hover:bg-red-600 w-full p-2 text-white uppercase font-bold mt-10"
                  onClick={() => navigator.clipboard.writeText(`${process.env.frontendURL}/enlaces/${url}`)}
                >
                  Copiar enlace
                </button>
              </p>
            </Fragment>
          ) : (
            <Fragment>
              {
                mensaje_archivo? <Alerta /> : null
              }
              <div className="lg:flex md:shadow-lg p-5  bg-white rounded-lg py-10">
              <Dropzone />
                <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                  <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">compartir archivo</h2>
                  <p className="text-lg leading-loose">
                    <span className="text-red-500 font-bold">ReactNodeSend</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pellentesque risus at purus imperdiet placerat. Aenean eget neque lacinia, lacinia metus congue, tincidunt tortor. Mauris lacinia sed nunc at bibendum. Nullam lobortis, orci et semper ornare, orci diam interdum leo, at tempor leo metus et mi. Mauris posuere orci vitae.
                  </p>
                  <Link href="/crearcuenta">
                    <a className="text-red-500 font-bold text-lg hover:text-red-700">Crear una cuenta para mejores beneficios</a>
                  </Link>
                </div>
              </div>
            </Fragment>
          )
        }
      </div>
    </Layout>
  )
};

export default index
