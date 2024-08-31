import { BankInfo, CompanyData, Invoice } from "@/types";

export function generateKeyValueArray(
  translationMap: any,
  obj?: Invoice | CompanyData | BankInfo
) {
  if (!obj) {
    return [];
  }
  const array = Object.entries(obj).map(([key, value]) => {
    const newKey = translationMap[key];
    return { newKey, value: String(value) };
  });
  return array;
}
