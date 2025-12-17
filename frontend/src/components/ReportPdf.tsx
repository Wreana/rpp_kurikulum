import React from "react";

interface ReportPdfProps {
  values: {
    kelas: string;
    semester: string;
    waktu: string;
    profil_kelulusan?: string[];
    tujuan_pembelajaran?: string;
    lingkugan_pembelajaran?: string;
    pemanfaatan_digital?: string;
    memahami_berkesadaran?: string;
    mengaplikasi?: string;
    refleksi?: string;
    questions?: Question[];
    pertemuan_ke?: string;
    referensi_guru?: string;
    media_pembelajaran?: string;
  };
}

interface Question {
  no: number;
  soal: string;
  pilihan: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
}

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <div className="bg-blue-100 px-3 py-2 mt-4 mb-2 font-bold text-sm uppercase tracking-wide">
    {title}
  </div>
);

const DividerLine = () => <div className="border-b-2 border-blue-200 my-2"></div>;

const ReportPdf: React.FC<ReportPdfProps> = ({ values }) => {
  const match = values.pertemuan_ke?.match(/Pertemuan ke-(\d+)/);
  const pertemuanNumber = match ? Number(match[1]) : null;

  return (
    <div
      id="pdf-report"
      className="font-sans text-sm text-gray-800 leading-relaxed p-4 md:p-6 max-w-6xl mx-auto"
    >
      <style>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          #pdf-report {
            padding: 12mm !important;
            max-width: none !important;
            margin: 0 !important;
          }
          .print-no-print {
            display: none !important;
          }
          * {
            page-break-inside: auto !important;
            break-inside: auto !important;
          }
          .section-header,
          h1, h2, h3 {
            page-break-after: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>

      <SectionHeader title="Informasi Umum" />
      <div className="ml-2">
        <div className="grid grid-cols-[140px_1fr] gap-y-1 text-sm">
          <span className="font-medium">Kelas</span>
          <span>: {values.kelas}</span>
          <span className="font-medium">Semester</span>
          <span>: {values.semester}</span>
          <span className="font-medium">Alokasi Waktu</span>
          <span>: {values.waktu}</span>
        </div>
      </div>

      <DividerLine />

      <SectionHeader title="Dimensi Profil Lulusan" />
      <ul className="ml-4 mt-1 space-y-1">
        {(values.profil_kelulusan || []).map((item, idx) => (
          <li key={idx} className="list-disc pl-1">{item}</li>
        ))}
      </ul>

      <DividerLine />

      <SectionHeader title="Tujuan Pembelajaran" />
      <div className="ml-2 mt-1">
        <p className="font-bold">Tujuan Pembelajaran:</p>
        <p className="italic">Murid dapat memahami perangkat keras dan perangkat lunak komputer.</p>
        <p className="font-bold mt-2">Kriteria Ketercapaian Tujuan Pembelajaran:</p>
        <div
          className="quill-content mt-1"
          dangerouslySetInnerHTML={{ __html: values.tujuan_pembelajaran || "" }}
        />
      </div>

      <DividerLine />

      <SectionHeader title="Kerangka Pembelajaran" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-2 mt-2">
        <div>
          <p className="font-bold">Praktik Pedagogis</p>
          <p className="mt-1">
            Metode Pembelajaran: Pembelajaran berbasis inkuiri dan eksploratif
          </p>
          <p className="mt-2">
            Strategi: Diskusi kelompok, demonstrasi, dan eksplorasi langsung perangkat keras & lunak
          </p>
        </div>
        <div>
          <p className="font-bold">Lingkungan Pembelajaran</p>
          <div
            className="quill-content mt-1"
            dangerouslySetInnerHTML={{ __html: values.lingkugan_pembelajaran || "" }}
          />
        </div>
      </div>

      <DividerLine />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-2 mt-2">
        <div>
          <p className="font-bold">Kemitraan Pembelajaran</p>
          <p className="mt-1">
            Kolaborasi dengan guru mata pelajaran lain dalam menjelaskan konsep perangkat keras
            dan lunak di dalam sistem komputer, serta pemanfaatannya di berbagai bidang.
          </p>
          <p className="mt-2">
            Melibatkan orang tua dalam kegiatan eksplorasi perangkat komputer di rumah.
          </p>
        </div>
        <div>
          <p className="font-bold">Pemanfaatan Digital</p>
          <div
            className="quill-content mt-1"
            dangerouslySetInnerHTML={{ __html: values.pemanfaatan_digital || "" }}
          />
        </div>
      </div>

      <DividerLine />

      <h1 className="text-xl font-bold text-[#174C7A] mt-5 mb-3">
        LANGKAH-LANGKAH PEMBELAJARAN
      </h1>

      <div className="flex items-center gap-2 text-[#174C7A] font-semibold text-base border-b-2 border-blue-200 pb-1.5 mb-3">
        <div className="w-5 h-5 rounded-full bg-[#9DBE6B] flex items-center justify-center text-white text-xs font-bold">
          {pertemuanNumber}
        </div>
        <span>{values.pertemuan_ke}</span>
      </div>

      <SectionHeader title="Memahami (Berkesadaran)" />
      <div
        className="quill-content"
        dangerouslySetInnerHTML={{ __html: values.memahami_berkesadaran || "" }}
      />

      <DividerLine />
      <SectionHeader title="Mengaplikasi (Berkesadaran dan Menggembirakan)" />
      <div
        className="quill-content"
        dangerouslySetInnerHTML={{ __html: values.mengaplikasi || "" }}
      />

      <DividerLine />
      <SectionHeader title="Merefleksi (Berkesadaran, Bermakna, dan Menggembirakan)" />
      <div
        className="quill-content"
        dangerouslySetInnerHTML={{ __html: values.refleksi || "" }}
      />

      {values.questions && values.questions.length > 0 && (
        <>
          <SectionHeader title="Soal Evaluasi" />
          <div className="ml-2 mt-1 space-y-4">
            {values.questions.map((q) => (
              <div key={q.no}>
                <p className="font-bold">
                  {q.no}. {q.soal}
                </p>
                <ul className="list-none mt-1 space-y-1">
                  {Object.entries(q.pilihan).map(([key, text]) => (
                    <li key={key}>
                      <span className="font-bold">{key}.</span> {text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}

      <h2 className="text-base font-bold mt-4 mb-2">Catatan & Umpan Balik Pendidik:</h2>
      <div className="space-y-1 min-h-[70px]">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="border-b border-dashed border-gray-500 min-h-[14px]"></div>
        ))}
      </div>

      <SectionHeader title="Asesmen Pembelajaran" />
      <ul className="ml-4 mt-1 space-y-2">
        <li>
          <span className="font-bold">Asesmen Awal:</span> Tanya jawab terkait pengalaman menggunakan
          komputer (terlampir di langkah pembelajaran).
        </li>
        <li>
          <span className="font-bold">Asesmen Proses:</span> Observasi saat diskusi, tugas kelompok, dan
          simulasi.
        </li>
        <li>
          <span className="font-bold">Asesmen Akhir:</span> Kuis dan tugas proyek esai singkat
          (terlampir di langkah pembelajaran).
        </li>
      </ul>

      <h2 className="text-base font-bold text-[#0B4F8A] mt-4 mb-1">Asesmen Proses</h2>
      <div className="font-semibold text-[#0B4F8A] border-b-2 border-[#6C8CFF] pb-1 mb-3">
        Contoh Lembar Observasi Murid
      </div>

      <table className="w-full text-sm border-collapse">
        <tbody>
          <tr>
            <td className="w-[110px] pb-2">Nama murid</td>
            <td className="pb-2">____________________</td>
          </tr>
          <tr>
            <td className="pb-2">Tanggal</td>
            <td>____________________</td>
          </tr>
          <tr>
            <td className="pb-2">Kegiatan</td>
            <td>(Diskusi / Tugas Kelompok / Simulasi)</td>
          </tr>
          <tr>
            <td>Petunjuk</td>
            <td>Beri tanda ✓ pada kategori yang sesuai dengan penilaian murid.</td>
          </tr>
        </tbody>
      </table>

      <table className="w-full text-sm border-collapse mt-3">
        <thead>
          <tr className="bg-blue-50 font-bold">
            <th className="border border-gray-400 p-1">Aspek yang Diamati</th>
            <th className="border border-gray-400 p-1">Sangat Baik<br />4</th>
            <th className="border border-gray-400 p-1">Baik<br />3</th>
            <th className="border border-gray-400 p-1">Cukup Baik<br />2</th>
            <th className="border border-gray-400 p-1">Perlu Ditingkatkan<br />1</th>
            <th className="border border-gray-400 p-1">Catatan Pendidik<br />(opsional)</th>
          </tr>
        </thead>
        <tbody>
          {["Partisipasi dalam Diskusi", "Kerjasama dalam Kelompok", "Keaktifan dalam Simulasi"].map(
            (label, idx) => (
              <tr key={idx}>
                <td className="border border-gray-400 p-1 align-top">{label}</td>
                {Array.from({ length: 4 }).map((_, i) => (
                  <td key={i} className="border border-gray-400 p-1 h-6"></td>
                ))}
                <td className="border border-gray-400 p-1 align-top"></td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <div className="font-bold mt-3">TOTAL SKOR: ________ / 20</div>
      <div className="text-sm mt-2">
        <strong>Keterangan:</strong>
        <ul className="list-none mt-1 space-y-0.5">
          <li>17 – 20 : Sangat Baik</li>
          <li>13 – 16 : Baik</li>
          <li>9 – 12 : Cukup</li>
          <li>1 – 8 : Perlu Bimbingan</li>
        </ul>
      </div>

      <SectionHeader title="Media Pembelajaran" />
      <div
        className="quill-content"
        dangerouslySetInnerHTML={{ __html: values.media_pembelajaran || "" }}
      />

      <DividerLine />
      <SectionHeader title="Referensi Pembelajaran Guru" />
      <div
        className="quill-content"
        dangerouslySetInnerHTML={{ __html: values.referensi_guru || "" }}
      />
    </div>
  );
};

export default ReportPdf;
