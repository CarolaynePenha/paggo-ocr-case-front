import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";

type InputUploadFilesParamns = {
  label: string;
};
export default function InputUploadFiles({ label }: InputUploadFilesParamns) {
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
  });
  async function post(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    try {
      const invoice = event.target.files?.[0];
      if (invoice) {
        const { data } = await axios.get(
          `/api/aws-s3-upload?fileName=${invoice.name}&fileType=${invoice.type}`
        );

        await axios.put(data.signedUrl, invoice, {
          headers: { "Content-Type": invoice.type },
        });

        const { data: ocrResponse } = await axios.post("/api/send-to-ocr", {
          uniqueName: data.uniqueName,
        });
        console.log("ocrResponse: ", ocrResponse);
      }
    } catch (err: any) {
      console.log(err.response);
      alert("Algo deu errado, tente novamente");
    }
  }

  return (
    <div className="flex flex-col justify-center items-center  h-fit">
      <p>{label}</p>
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
