import Head from "next/head";
import { getSession, signIn } from "next-auth/react";
import { GetServerSideProps } from "next";

import Image from "next/image";

export default function Component() {
  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-b from-gray-200 to-gray-400">
      <div className="p-10 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col items-center">
        <Image
          src="/img/paggoLogo.svg" // Substitua pelo caminho da sua logo
          alt="Paggo Logo"
          width={100}
          height={100}
        />
        <h1 className="mt-5 text-2xl font-bold text-gray-800">
          Bem-vindo a OCR Case da Paggo
        </h1>
        <p className="mt-2 text-gray-600">Faça login para continuar</p>
        <button
          className="mt-8 w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-300"
          onClick={() => signIn()}
        >
          Login
        </button>
      </div>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }
  return { props: { session } };
};
