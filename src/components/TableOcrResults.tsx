import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { generateKeyValueArray } from "@/utils";
import { DataTableParams } from "@/types";

export default function TableOcrResults({ extractedInfos }: DataTableParams) {
  if (typeof extractedInfos === "string") {
    return [];
  }
  const translationInvoiceMap = {
    number: "Número da Nota",
    issuanceDate: "Data de emissão",
    description: "Descrição",
    netAmount: "Valor líquido",
    totalAmount: "Valor total",
    imageLink: "Link da imagem",
    textRaw: "Texto bruto extraído",
  };
  const translationCompanyMap = {
    name: "Nome",
    address: "Endereço",
    cpfCnpj: "CPF ou CNPJ",
    email: "E-mail",
    city: "Cidade",
    phoneNumber: "Telefone ou celular",
    state: "UF",
  };
  const translationBankInfoMap = {
    bankName: "Nome do banco",
    agency: "Agência",
    account: "Conta",
    pixKey: "Chave Pix",
  };
  const invoiceArray = generateKeyValueArray(
    translationInvoiceMap,
    extractedInfos.invoice
  );
  const bankInfoArray = generateKeyValueArray(
    translationBankInfoMap,
    extractedInfos.bankInfo
  );
  const payerArray = generateKeyValueArray(
    translationCompanyMap,
    extractedInfos.payerData
  );
  const receiverArray = generateKeyValueArray(
    translationCompanyMap,
    extractedInfos.receiverData
  );
  return (
    <TableContainer className="w-[80vw]" component={Paper}>
      <Table>
        <TableBody>
          {invoiceArray.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <p className="font-bold">{row.newKey}</p>
              </TableCell>
              <TableCell>
                <p className="max-h-[100px] overflow-auto">{row.value}</p>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell
              style={{
                backgroundColor: "#C3CBCC",
              }}
            ></TableCell>
            <TableCell
              style={{
                backgroundColor: "#C3CBCC",
              }}
            >
              <h1 className="font-bold text-[15px]">
                Informações do Emissor/Prestador
              </h1>
            </TableCell>
          </TableRow>
          {receiverArray.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <p className="font-bold">{row.newKey}</p>
              </TableCell>
              <TableCell>{row.value}</TableCell>
            </TableRow>
          ))}
          {extractedInfos.bankInfo ? (
            <>
              <TableRow>
                <TableCell
                  style={{
                    backgroundColor: "#C3CBCC",
                  }}
                ></TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#C3CBCC",
                  }}
                >
                  <h1 className="font-bold text-[15px]">
                    Informações para pagamento
                  </h1>
                </TableCell>
              </TableRow>
              {bankInfoArray.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <p className="font-bold">{row.newKey}</p>
                  </TableCell>
                  <TableCell>{row.value}</TableCell>
                </TableRow>
              ))}
            </>
          ) : (
            ""
          )}
          <TableRow>
            <TableCell
              style={{
                backgroundColor: "#C3CBCC",
              }}
            ></TableCell>
            <TableCell
              style={{
                backgroundColor: "#C3CBCC",
              }}
            >
              <h1 className="font-bold text-[15px]">
                Informações do Tomador/Remitente
              </h1>
            </TableCell>{" "}
          </TableRow>
          {payerArray.map((row, index) => (
            <TableRow key={index}>
              <TableCell style={{ maxHeight: 40, overflow: "hidden" }}>
                <p className="font-bold">{row.newKey}</p>
              </TableCell>
              <TableCell style={{ maxHeight: 40, overflow: "hidden" }}>
                {row.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
