import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { InputUploadFilesParamns } from "@/types";
import { alert } from "@/utils/alerts";

export default function InputUploadFiles({
  label,
  setUploadState,
  uploadStates,
  setTableData,
}: InputUploadFilesParamns) {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const VisuallyButton = styled(Button)({
    backgroundColor: "#2c00cc",
    height: "40px",
    width: "150px",
  });

  async function post(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setUploadState(uploadStates.send);
    try {
      const invoice = event.target.files?.[0];
      if (invoice) {
        const { data } = await axios.get(
          `/api/aws-s3-upload?fileName=${invoice.name}&fileType=${invoice.type}`
        );

        await axios.put(data.signedUrl, invoice, {
          headers: { "Content-Type": invoice.type },
        });

        setUploadState(uploadStates.ocrProcessing);

        const { data: ocrResponse } = await axios.post("/api/send-to-ocr", {
          uniqueName: data.uniqueName,
        });

        setTableData(ocrResponse);
        console.log("ocrResponse: ", ocrResponse);
        setUploadState(uploadStates.done);
      }
    } catch (err: any) {
      console.log(err.response);
      setUploadState(uploadStates.wait);
      alert("Algo deu errado, tente novamente");
    }
  }

  return (
    <div className="flex flex-col justify-center items-center  h-fit pb-6">
      <p className="pb-3 text-[#A33E00]">{label}</p>
      <VisuallyButton
        // @ts-ignore:next-line
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload
        <VisuallyHiddenInput
          type="file"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            console.log(event.target.files);
            post(event);
          }}
          multiple
        />
      </VisuallyButton>
    </div>
  );
}
