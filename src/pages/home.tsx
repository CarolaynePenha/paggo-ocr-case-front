import { useState } from "react";
import InputUploadFiles from "@/components/InputUploadFiles";
import TableOcrResults from "@/components/TableOcrResults";
import SkeletonAnimation from "@/utils/loadingns";
import Image from "next/image";

import { getSession, signOut } from "next-auth/react";
import { GetServerSideProps } from "next";

export default function Home() {
  const uploadStates = {
    wait: "wait",
    send: "sending",
    ocrProcessing: "ocr",
    done: "done",
  };
  const [uploadState, setUploadState] = useState(uploadStates.wait);
  const [tableData, setTableData] = useState("");

  function handlerViewPage() {
    const divClass = "flex flex-col items-center justify-center flex-grow";
    if (uploadState === uploadStates.wait) {
      return (
        <div className="h-screen flex flex-col w-screen">
          <div className={divClass}>
            <Image
              src="/img/paggoLogo.svg"
              alt="Paggo Logo"
              width={100}
              height={100}
              className="mb-10"
            />
            <div className="text-center">
              <InputUploadFiles
                label={"Faça upload da imagem da sua nota fiscal."}
                setUploadState={setUploadState}
                uploadStates={uploadStates}
                setTableData={setTableData}
              />
            </div>
          </div>
        </div>
      );
    }
    if (uploadState === uploadStates.send) {
      return (
        <div className={divClass}>
          <p className="text-[#2c00cc]  font-bold text-xl mb-6">
            Seu documento está sendo salvo, aguarde!
          </p>
          <SkeletonAnimation />
        </div>
      );
    }

    if (uploadState === uploadStates.ocrProcessing) {
      return (
        <div className={divClass}>
          <p className="text-[#364B45] font-bold text-xl mb-6">
            Seu documento está sendo processado, aguarde!
          </p>
          <SkeletonAnimation />
        </div>
      );
    }
    if (uploadState === uploadStates.done) {
      return (
        <div className={divClass}>
          <div className="mb-10">
            <InputUploadFiles
              label={"Faça upload de outra imagem de nota fiscal."}
              setUploadState={setUploadState}
              uploadStates={uploadStates}
              setTableData={setTableData}
            />
          </div>
          <div className="w-full ">
            <TableOcrResults extractedInfos={tableData} />
          </div>
        </div>
      );
    }
  }

  return (
    <>
      <main className="flex pt-10 flex-col items-center h-screen bg-gray-300">
        <div className="absolute top-6 right-6">
          <button
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 "
            onClick={() => signOut()}
          >
            Deslogar
          </button>
        </div>
        {handlerViewPage()}
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: { session } };
};
