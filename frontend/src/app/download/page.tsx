"use client";

import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import { useRouter } from "next/navigation";
import ReportPdf from "@/components/ReportPdf";

const PreviewPage = () => {
  const [data, setData] = useState<any>(null);
  const [assessments, setAssessments] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    try {
      const formData = localStorage.getItem("rpp-form-cache");
      const assesmentsData = localStorage.getItem("rpp-asesmen");

      if (!formData) {
        message.error("Tidak ada data formulir. Silakan isi form terlebih dahulu.");
        router.push("/rpp");
        return;
      }

      setData(JSON.parse(formData));
      setAssessments(assesmentsData ? JSON.parse(assesmentsData) : []);
    } catch (e) {
      console.error("Gagal memuat data preview", e);
      message.error("Gagal memuat data. Silakan coba lagi.");
      router.push("/rpp");
    }
  }, [router]);

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    router.push("/");
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Memuat...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          <Button type="primary" onClick={handlePrint} size="large" className="bg-[#00ADB5]">
            🖨️ Simpan sebagai PDF
          </Button>
          <Button onClick={handleBack} size="large">
            ← Kembali ke Form
          </Button>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <ReportPdf values={{ ...data, assessments }} />
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }
          .ant-btn {
            display: none !important;
          }
          #root, .min-h-screen, .max-w-4xl, .bg-gray-50 {
            all: unset !important;
          }
        @page {
        size: A4;
        margin: 10mm;
        }
        body {
        margin: 0 !important;
        padding: 0 !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        }
        /* Hide any element that might be mistaken for header */
        .print-no-header {
        display: none !important;
        }
        }
      `}</style>
    </div>
  );
};

export default PreviewPage;
