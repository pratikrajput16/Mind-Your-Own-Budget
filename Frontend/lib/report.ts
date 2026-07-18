import api from "./api";

export const downloadPdfReport = async () => {
  const response = await api.get("/reports/pdf", {
    responseType: "blob",
  });

  return response.data;
};

export const downloadCsvReport = async () => {
  const response = await api.get("/reports/csv", {
    responseType: "blob",
  });

  return response.data;
};