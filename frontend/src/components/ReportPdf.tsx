import dayjs from "dayjs";
import React from "react";

const rubrik_penilaian = [
  {
    id: "1",
    label: "Pemahaman konsep",
    sangat_baik: "Menjelaskan secara mendalam dan jelas bagaimana perangkat keras dan lunak bekerja serta dampaknya di berbagai bidang.",
    baik: "Menjelaskan konsep dengan cukup jelas, meskipun ada sedikit ketidakjelasan dalam detailnya.",
    cukup: "Menunjukkan pemahaman dasar, tetapi kurang mendalam atau kurang relevan.",
    perlu_ditingkatkan: "Tidak menunjukkan pemahaman yang jelas tentang perangkat keras dan lunak.",
  },
  {
    id: "2",
    label: "Kelengkapan Isi",
    sangat_baik: "Menjelaskan satu bidang dengan sangat jelas dan mendalam atau beberapa bidang dengan cukup baik.",
    baik: "Menjelaskan satu bidang dengan cukup baik atau beberapa bidang tapi kurang jelas.",
    cukup: "Menjelaskan bidang yang dipilih dengan sedikit contoh atau kurang mendalam.",
    perlu_ditingkatkan: "Tidak menjelaskan bidang yang diminta atau tidak memberikan contoh.",
  },
  {
    id: "3",
    label: "Penyusunan Ide",
    sangat_baik: "Tulisan tersusun dengan rapi, mudah dibaca, dan mengalir dengan baik.",
    baik: "Tulisan cukup rapi, tapi ada bagian yang kurang terhubung dengan baik.",
    cukup: "Tulisan kurang rapi, ada bagian yang sulit dipahami.",
    perlu_ditingkatkan: "Tulisan tidak rapi dan sulit dimengerti.",
  },
  {
    id: "4",
    label: "Kebenaran Informasi",
    sangat_baik: "Informasi yang diberikan benar dan sesuai dengan kenyataan.",
    baik: "Sebagian besar informasi benar, tetapi ada beberapa kesalahan kecil.",
    cukup: "Ada beberapa informasi yang kurang tepat atau kurang jelas.",
    perlu_ditingkatkan: "Banyak informasi yang salah atau tidak sesuai dengan kenyataan.",
  },
]

interface ReportPdfProps {
  values: {
    kelas: string;
    semester: string;
    waktu: string;
    profil_kelulusan?: string[];
    tujuan_pembelajaran?: string;
    praktik_pedagogis?: string;
    kemitraan_pembelajaran?: string;
    lingkugan_pembelajaran?: string;
    pemanfaatan_digital?: string;
    memahami_berkesadaran?: string;
    mengaplikasi?: string;
    refleksi?: string;
    pertemuan_ke?: string;
    referensi_guru?: string;
    media_pembelajaran?: string;
    nama_materi?: string;
    nama_murid?: string;
    tanggal?: Date;
    rubrik_penilaian?: string[];
    assessments: SanitizerAssessment;
  };
}

interface AssessmentRow {
  key: string;
  aspek: string;
  kurang: string;
  cukup: string;
  baik: string;
  sangatBaik: string;
}

interface SanitizerAssessment {
  awal: AssessmentData;
  proses: AssessmentData;
  akhir: AssessmentData;
}

interface AssessmentData {
  description: string;
  rows: AssessmentRow[];
}

const AssessmentTable = ({ rows }: { rows: AssessmentData['rows'] }) => {
  if (!rows || rows.length === 0) return null;

  return (
    <div className="mt-2 overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-blue-100">
            <th className="border border-gray-300 px-3 py-2 text-left font-bold">Aspek</th>
            <th className="border border-gray-300 px-3 py-2 text-left font-bold">Kurang</th>
            <th className="border border-gray-300 px-3 py-2 text-left font-bold">Cukup</th>
            <th className="border border-gray-300 px-3 py-2 text-left font-bold">Baik</th>
            <th className="border border-gray-300 px-3 py-2 text-left font-bold">Sangat Baik</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key}>
              <td className="border border-gray-300 px-3 py-2 bg-blue-100">
                <div
                  className="quill-content"
                  dangerouslySetInnerHTML={{ __html: row.aspek || "" }}
                />
              </td>
              <td className="border border-gray-300 px-3 py-2">
                <div
                  className="quill-content"
                  dangerouslySetInnerHTML={{ __html: row.kurang || "" }}
                />
              </td>
              <td className="border border-gray-300 px-3 py-2">
                <div
                  className="quill-content"
                  dangerouslySetInnerHTML={{ __html: row.cukup || "" }}
                />
              </td>
              <td className="border border-gray-300 px-3 py-2">
                <div
                  className="quill-content"
                  dangerouslySetInnerHTML={{ __html: row.baik || "" }}
                />
              </td>
              <td className="border border-gray-300 px-3 py-2">
                <div
                  className="quill-content"
                  dangerouslySetInnerHTML={{ __html: row.sangatBaik || "" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <div className="bg-blue-100 px-3 py-2 mt-4 mb-2 font-bold text-sm uppercase tracking-wide">
    {title}
  </div>
);

const DividerLine = () => <div className="border-b-2 border-blue-200 my-2"></div>;

const hasAssessmentContent = (assessment: AssessmentData | undefined): boolean => {
  if (!assessment) return false;
  const hasDesc = assessment.description?.trim() !== '';
  const hasRows = assessment.rows?.length > 0;
  return hasDesc || hasRows;
};

const ReportPdf: React.FC<ReportPdfProps> = ({ values }) => {
  console.log(values)
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

      <h1 className="flex justify-center items-center text-xl font-bold">{values.nama_materi}</h1>

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

      <div className="mt-10">
        <SectionHeader title="Dimensi Profil Lulusan" />
        <ul className="ml-4 mt-1 space-y-1">
          {(values.profil_kelulusan || []).map((item, idx) => (
            <li key={idx} className="list-disc pl-1">{item}</li>
          ))}
        </ul>
      </div>

      <DividerLine />

      {values.tujuan_pembelajaran && (
        <>
          <div className="mt-10">
            <SectionHeader title="Tujuan Pembelajaran" />
            <div className="ml-2 mt-1">
              <div
                className="quill-content mt-1"
                dangerouslySetInnerHTML={{ __html: values.tujuan_pembelajaran || "" }}
              />
            </div>
          </div>
          <DividerLine />
        </>
      )}

      <div className="mt-10">
        <SectionHeader title="Kerangka Pembelajaran" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-2 mt-2">
          <div>
            <p className="font-bold">Praktik Pedagogis</p>
            <div
              className="quill-content mt-1"
              dangerouslySetInnerHTML={{ __html: values.praktik_pedagogis || "" }}
            />
          </div>
          <div>
            <p className="font-bold">Lingkungan Pembelajaran</p>
            <div
              className="quill-content mt-1"
              dangerouslySetInnerHTML={{ __html: values.lingkugan_pembelajaran || "" }}
            />
          </div>
        </div>

      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-2 mt-2">
        <div>
          <p className="font-bold">Kemitraan Pembelajaran</p>
          <div
            className="quill-content mt-1"
            dangerouslySetInnerHTML={{ __html: values.kemitraan_pembelajaran || "" }}
          />
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

      <div className="mt-10">
        <div className="flex items-center gap-2 text-[#174C7A] font-semibold text-base border-b-2 border-blue-200 pb-1.5 mb-3">
          <div className="w-5 h-5 rounded-full bg-[#9DBE6B] flex items-center justify-center text-white text-xs font-bold">
            {pertemuanNumber}
          </div>
          <span>{values.pertemuan_ke}</span>
        </div>
      </div>

      {values.memahami_berkesadaran && (
        <div className="mt-10">
          <SectionHeader title="Memahami (Berkesadaran)" />
          <div
            className="quill-content"
            dangerouslySetInnerHTML={{ __html: values.memahami_berkesadaran || "" }}
          />
        </div>
      )}

      {values.mengaplikasi && (
        <>
          <DividerLine />
          <div className="mt-10">
            <SectionHeader title="Mengaplikasi (Berkesadaran dan Menggembirakan)" />
            <div
              className="quill-content"
              dangerouslySetInnerHTML={{ __html: values.mengaplikasi || "" }}
            />
          </div>
        </>
      )}

      <DividerLine />
      <div className="mt-10">
        <SectionHeader title="Merefleksi (Berkesadaran, Bermakna, dan Menggembirakan)" />
        <div
          className="quill-content"
          dangerouslySetInnerHTML={{ __html: values.refleksi || "" }}
        />

        {values.rubrik_penilaian && values.rubrik_penilaian.length > 0 && (
          <>
            <h1 className="flex justify-center items-center text-xl mb-10 font-bold">Rubrik Penulisan Tugas Akhir Esai Singkat</h1>

            <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
              <div><span className="font-medium">Nama Murid:</span> {values.nama_murid || "____________________"}</div>
              <div>
                <span className="font-medium">Tanggal:</span>{" "}
                {values.tanggal
                  ? dayjs(values.tanggal).format("DD MMMM YYYY")
                  : "____________________"}
              </div>
            </div>

            <SectionHeader title="Rubrik Penilaian Tugas Akhir Esai Singkat" />
            <div className="mt-2">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-blue-50 font-bold">
                    <th className="border border-gray-400 p-1">Kriteria</th>
                    <th className="border border-gray-400 p-1">Sangat Baik</th>
                    <th className="border border-gray-400 p-1">Baik</th>
                    <th className="border border-gray-400 p-1">Cukup</th>
                    <th className="border border-gray-400 p-1">Perlu Ditingkatkan</th>
                    <th className="border border-gray-400 p-1">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {rubrik_penilaian
                    .filter(item =>
                      Array.isArray(values.rubrik_penilaian) &&
                      values.rubrik_penilaian.includes(item.id)
                    )
                    .map((item) => (
                      <tr key={item.id}>
                        <td className="border border-gray-400 p-1 align-top">{item.label}</td>
                        <td className="border border-gray-400 p-1 align-top">{item.sangat_baik}</td>
                        <td className="border border-gray-400 p-1 align-top">{item.baik}</td>
                        <td className="border border-gray-400 p-1 align-top">{item.cukup}</td>
                        <td className="border border-gray-400 p-1 align-top">{item.perlu_ditingkatkan}</td>
                        <td className="border border-gray-400 p-1 align-top"></td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="font-bold mt-3">TOTAL SKOR: ________ / 20</div>
            <div className="text-sm mb-20 mt-2">
              <strong>Keterangan:</strong>
              <ul className="list-none mt-1 space-y-0.5">
                <li>17 – 20 : Sangat Baik</li>
                <li>13 – 16 : Baik</li>
                <li>9 – 12 : Cukup</li>
                <li>1 – 8 : Perlu Bimbingan</li>
              </ul>
            </div>
          </>
        )}
      </div>

      <h2 className="text-base font-bold mt-10 mb-2">Catatan & Umpan Balik Pendidik:</h2>
      <div className="space-y-1 min-h-[70px]">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="border-b border-dashed border-gray-500 min-h-[14px]"></div>
        ))}
      </div>

      {
        (
          hasAssessmentContent(values.assessments.awal) ||
          hasAssessmentContent(values.assessments.proses) ||
          hasAssessmentContent(values.assessments.akhir)
        ) && (
          <>
            <SectionHeader title="Asesmen Pembelajaran" />
            <ul className="ml-4 mt-1 space-y-2">
              {hasAssessmentContent(values.assessments.awal) && (
                <li>
                  <span className="font-bold text-[#174C7A]">Asesmen Awal</span>
                  <div
                    className="quill-content"
                    dangerouslySetInnerHTML={{ __html: values.assessments.awal.description || "" }}
                  />
                  <AssessmentTable rows={values.assessments.awal.rows} />
                </li>
              )}

              {hasAssessmentContent(values.assessments.proses) && (
                <li>
                  <span className="font-bold text-[#174C7A]">Asesmen Proses</span>
                  <div
                    className="quill-content"
                    dangerouslySetInnerHTML={{ __html: values.assessments.proses.description || "" }}
                  />
                  <AssessmentTable rows={values.assessments.proses.rows} />
                </li>
              )}

              {hasAssessmentContent(values.assessments.awal) && (
                <li>
                  <span className="font-bold text-[#174C7A]">Asesmen Akhir</span>
                  <div
                    className="quill-content"
                    dangerouslySetInnerHTML={{ __html: values.assessments.akhir.description || "" }}
                  />
                  <AssessmentTable rows={values.assessments.akhir.rows} />
                </li>
              )}
            </ul>
          </>
        )
      }

      <SectionHeader title="Lembar Observasi Murid" />
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

      {
        values.media_pembelajaran && (
          <>
            <SectionHeader title="Media Pembelajaran" />
            <div
              className="quill-content"
              dangerouslySetInnerHTML={{ __html: values.media_pembelajaran || "" }}
            />
          </>
        )
      }

      <DividerLine />
      {
        values.referensi_guru && (
          <>
            <SectionHeader title="Referensi Pembelajaran Guru" />
            <div
              className="quill-content"
              dangerouslySetInnerHTML={{ __html: values.referensi_guru || "" }}
            />
          </>
        )
      }
    </div >
  );
};

export default ReportPdf
