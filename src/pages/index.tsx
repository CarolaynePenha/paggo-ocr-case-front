import Head from "next/head";

import InputUploadFiles from "@/components/InputUploadFiles";

export default function Home() {
  return (
    <>
      <Head>
        <title>paggo-ocr-case</title>
      </Head>
      <main className="flex justify-center h-screen bg-gray-300">
        <div className="flex justify-center pt-[20vh]">
          <InputUploadFiles
            label={"Faça upload da imagem da sua nota fiscal."}
          />
        </div>
      </main>
    </>
  );
}
