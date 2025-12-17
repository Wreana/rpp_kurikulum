export const exportPdfFromElement = async (
  elementId: string,
  filename = "document.pdf"
) => {
  if (typeof window === "undefined") return;

  const element = document.getElementById(elementId);
  if (!element) {
    console.error("PDF element not found");
    return;
  }

  const html2pdf = (await import("html2pdf.js")).default;

  await html2pdf()
    .set({
      filename,
      margin: [0, 0, 15, 0],
      image: { type: "png", quality: 1 },
      html2canvas: {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
      pagebreak: {
        mode: ["avoid-all", "css", "legacy"],
      },
    } as unknown as Record<string, unknown>)
    .from(element)
    .save();
};

