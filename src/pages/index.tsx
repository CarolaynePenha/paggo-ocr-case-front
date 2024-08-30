import Head from "next/head";
import { useState } from "react";

import InputUploadFiles from "@/components/InputUploadFiles";
import TableOcrResults from "@/components/TableOcrResults";
import SkeletonAnimation from "@/utils/loadingns";

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
    if (uploadState === uploadStates.wait) {
      return (
        <div className="flex justify-center pt-[25vh] text-2xl">
          <InputUploadFiles
            label={"Faça upload da imagem da sua nota fiscal."}
            setUploadState={setUploadState}
            uploadStates={uploadStates}
            setTableData={setTableData}
          />
        </div>
      );
    }
    if (uploadState === uploadStates.send) {
      return (
        <>
          <div className="flex flex-col justify-center items-center">
            <p className="text-[#A33E00] text-[20px]  pt-[25vh] pb-6">
              "Seu documento está sendo salvo, aguarde!"
            </p>
            <SkeletonAnimation />
          </div>
        </>
      );
    }
    if (uploadState === uploadStates.ocrProcessing) {
      return (
        <>
          <div className="flex justify-center pt-[20vh]">
            <InputUploadFiles
              label={"Faça upload da imagem da sua nota fiscal."}
              setUploadState={setUploadState}
              uploadStates={uploadStates}
              setTableData={setTableData}
            />
          </div>
          <div>"Seu documento está sendo processado, aguarde!"</div>
        </>
      );
    }
    if (uploadState === uploadStates.done) {
      return (
        <>
          <div className="flex justify-center">
            <InputUploadFiles
              label={"Faça upload da imagem da sua nota fiscal."}
              setUploadState={setUploadState}
              uploadStates={uploadStates}
              setTableData={setTableData}
            />
          </div>
          <div className="flex justify-center h-[70vh]">
            <TableOcrResults extractedInfos={tableData} />
          </div>
        </>
      );
    }
  }

  return (
    <>
      <Head>
        <title>paggo-ocr-case</title>
      </Head>
      <main className="flex pt-10 flex-col items-center h-screen bg-gray-300">
        {handlerViewPage()}
      </main>
    </>
  );
}
