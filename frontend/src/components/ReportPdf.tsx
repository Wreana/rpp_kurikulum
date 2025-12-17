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
  <div
    style={{
      backgroundColor: "#BBD1DF",
      padding: "10px 14px",
      marginTop: 24,
      marginBottom: 12,
      fontWeight: 700,
      fontSize: 14,
      textTransform: "uppercase",
    }}
  >
    {title}
  </div>
);

const cellHeader = {
  border: "1px solid #999",
  padding: "8px",
  textAlign: "center" as const,
};

const cell = {
  border: "1px solid #999",
  padding: "8px",
  verticalAlign: "top" as const,
};

const checkCell = {
  ...cell,
  height: "32px",
};

const DividerLine = () => (
  <div
    style={{
      borderBottom: "2px solid #9DB4C0",
      margin: "16px 0",
    }}
  />
);


const ReportPdf: React.FC<ReportPdfProps> = ({ values }) => {
  const match = values.pertemuan_ke?.match(/Pertemuan ke-(\d+)/);
  const pertemuanNumber = match ? Number(match[1]) : null;
  return (
    <div
      id="pdf-report"
      style={{
        fontFamily: "Arial, sans-serif",
        fontSize: 12,
        color: "#000",
        lineHeight: 1.6,
        padding: 32,
        width: 794,
      }}
    >
      <style>
        {`
.pdf-quill {
font-family: Arial, sans-serif;
font-size: 12px;
line-height: 1.6;
color: #000;
}

.pdf-quill * {
all: revert;
}

.pdf-quill h1 { font-size: 18px; font-weight: 700; margin: 12px 0; }
.pdf-quill h2 { font-size: 16px; font-weight: 700; margin: 10px 0; }
.pdf-quill p  { margin: 6px 0; }

.pdf-quill ul,
.pdf-quill ol {
  list-style-position: inside;
  margin-left: 10px;
  padding-left: 0;
}

.pdf-quill li {
  padding-left: 10px;
  text-indent: -10px;
  margin-bottom: 4px;
}
.pdf-quill strong { font-weight: 700; }
.pdf-quill em { font-style: italic; }
.pdf-quill u { text-decoration: underline; }

.pdf-quill .ql-align-center { text-align: center; }
.pdf-quill .ql-align-right { text-align: right; }
.pdf-quill .ql-align-justify { text-align: justify; }

.pdf-quill img {
max-width: 100%;
height: auto;
}

.pdf-quill span[style],
.pdf-quill font {
all: unset;
}
      `}
      </style>
      <SectionHeader title="Informasi Umum" />

      <table style={{ width: "100%", borderCollapse: "collapse", marginLeft: "18px" }}>
        <tbody>
          <tr>
            <td style={{ width: 160 }}>Kelas</td>
            <td>: {values.kelas}</td>
          </tr>
          <tr>
            <td>Semester</td>
            <td>: {values.semester}</td>
          </tr>
          <tr>
            <td>Alokasi Waktu</td>
            <td>: {values.waktu}</td>
          </tr>
        </tbody>
      </table>

      <DividerLine />

      <SectionHeader title="Dimensi Profil Lulusan" />

      <ul style={{ marginLeft: 18 }}>
        {(values.profil_kelulusan || []).map((item, idx) => (
          <li key={idx}>•<span style={{ marginLeft: "10px" }}>{item}</span></li>
        ))}
      </ul>

      <DividerLine />

      <SectionHeader title="Tujuan Pembelajaran" />
      <div style={{ marginLeft: 18 }}>
        <p>Tujuan Pembelajaran:</p>
        <p><i>Murid dapat memahami perangkat keras dan perangkat lunak komputer.</i></p>
        <p>
          Kriteria Ketercapaian Tujuan Pembelajaran:
        </p>
        <div className="pdf-quill"
          dangerouslySetInnerHTML={{
            __html: values.tujuan_pembelajaran || "",
          }}
        />
      </div>

      <DividerLine />

      <SectionHeader title="Kerangka Pembelajaran" />
      <div
        style={{
          maxWidth: "776px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          marginLeft: "18px"
        }}
      >
        <div>
          <p><strong>Praktik Pedagogis</strong></p>
          <p>
            Metode Pembelajaran: Pembelajaran berbasis
            inkuiri dan eksploratif
          </p>
          <br />
          <br />
          <p>
            Strategi: Diskusi kelompok, demonstrasi, dan
            eksplorasi langsung perangkat keras & lunak
          </p>
        </div>
        <div>
          <p><strong>Lingkungan Pembelajaran</strong></p>
          <div
            dangerouslySetInnerHTML={{
              __html: values.lingkugan_pembelajaran || "",
            }}
          />
        </div>
      </div>

      <DividerLine />

      <div
        style={{
          maxWidth: "776px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          marginLeft: "18px"
        }}
      >
        <div>
          <p><strong>Kemitraan Pembelajaran</strong></p>
          <p>
            Kolaborasi dengan guru mata pelajaran lain
            dalam menjelaskan konsep perangkat keras
            dan lunak di dalam sistem komputer, serta
            pemanfaatannya di berbagai bidang.
          </p>
          <br />
          <p>
            Melibatkan orang tua dalam kegiatan
            eksplorasi perangkat komputer di rumah.
          </p>
        </div>
        <div>
          <p><strong>Pemanfaatan Digital</strong></p>
          <div
            dangerouslySetInnerHTML={{
              __html: values.pemanfaatan_digital || "",
            }}
          />
        </div>
      </div>
      <DividerLine />

      <h1 style={{ fontSize: "20px", color: "#174C7A", marginTop: "50px", marginBottom: "30px" }}>LANGKAH-LANGKAH PEMBELAJARAN</h1>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: "#174C7A",
          fontWeight: 600,
          fontSize: "15px",
          borderBottom: "2px solid #BBD1DF",
          marginBottom: "14px",
        }}
      >
        <p
          style={{
            width: "22px",
            height: "22px",
            backgroundColor: "#9DBE6B",
            borderRadius: "50%",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "13px",
            paddingBottom: "13px",
            fontWeight: 700,
            color: "#fff",
          }}
        >
          {pertemuanNumber}
        </p>
        <span style={{ paddingBottom: "13px" }}>
          {values.pertemuan_ke}
        </span>
      </div>

      <SectionHeader title="Memahami (Berkesabaran)" />
      <div
        className="pdf-quill"
        dangerouslySetInnerHTML={{
          __html: values.memahami_berkesadaran || "",
        }}
      />

      <DividerLine />

      <SectionHeader title="Mengaplikasi (Berkesabaran dan Menggembirakan)" />
      <div
        className="pdf-quill"
        dangerouslySetInnerHTML={{
          __html: values.mengaplikasi || "",
        }}
      />

      <DividerLine />
      <SectionHeader title="Merefleksi (Berkesadaran, Bermakna, dan Menggembirakan)" />
      <div
        className="pdf-quill"
        dangerouslySetInnerHTML={{
          __html: values.refleksi || "",
        }}
      />
      {values.questions && values.questions.length > 0 && (
        <>
          <SectionHeader title="Soal Evaluasi" />

          <div style={{ marginLeft: 18 }}>
            {values.questions.map((q) => (
              <div key={q.no} style={{ marginBottom: 16 }}>
                <p>
                  <strong>{q.no}. </strong>{q.soal}
                </p>

                <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                  {Object.entries(q.pilihan).map(([key, text]) => (
                    <li key={key} style={{ marginBottom: 4 }}>
                      <strong>{key}.</strong> {text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}
      {/* CATATAN & UMPAN BALIK */}
      <h2
        style={{
          fontSize: "14px",
          fontWeight: 700,
          marginTop: "24px",
          marginBottom: "8px",
        }}
      >
        Catatan & Umpan Balik Pendidik:
      </h2>

      <div style={{ marginBottom: "24px" }}>
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            style={{
              borderBottom: "1px dashed #555",
              height: "16px",
              marginBottom: "6px",
            }}
          />
        ))}
      </div>

      <SectionHeader title="ASESMEN PEMBELAJARAN" />

      <ul style={{ paddingLeft: "18px", marginBottom: "24px" }}>
        <li style={{ marginBottom: "8px" }}>
          <strong>Asesmen Awal:</strong> Tanya jawab terkait pengalaman menggunakan
          komputer (terlampir di langkah pembelajaran).
        </li>
        <li style={{ marginBottom: "8px" }}>
          <strong>Asesmen Proses:</strong> Observasi saat diskusi, tugas kelompok, dan
          simulasi.
        </li>
        <li>
          <strong>Asesmen Akhir:</strong> Kuis dan tugas proyek esai singkat
          (terlampir di langkah pembelajaran).
        </li>
      </ul>

      {/* ASESMEN PROSES */}
      <h2
        style={{
          fontSize: "16px",
          fontWeight: 700,
          color: "#0B4F8A",
          marginBottom: "6px",
        }}
      >
        Asesmen Proses
      </h2>

      <div
        style={{
          fontSize: "13px",
          fontWeight: 600,
          color: "#0B4F8A",
          borderBottom: "2px solid #6C8CFF",
          paddingBottom: "4px",
          marginBottom: "16px",
        }}
      >
        Contoh Lembar Observasi Murid
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "12px",
        }}
      >
        <tbody>
          <tr>
            <td style={{ width: "120px", paddingBottom: "10px" }}>
              Nama murid
            </td>
            <td style={{ paddingBottom: "10px" }}>
              : ____________________
            </td>
          </tr>
          <tr>
            <td style={{ paddingBottom: "10px" }}>Tanggal</td>
            <td style={{ paddingBottom: "10px" }}>
              : ____________________
            </td>
          </tr>
          <tr>
            <td style={{ paddingBottom: "10px" }}>Kegiatan</td>
            <td style={{ paddingBottom: "10px" }}>
              : (Diskusi / Tugas Kelompok / Simulasi)
            </td>
          </tr>
          <tr>
            <td>Petunjuk</td>
            <td>
              : Beri tanda ✓ pada kategori yang sesuai dengan penilaian murid.
            </td>
          </tr>
        </tbody>
      </table>

      {/* RUBRIK OBSERVASI */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "12px",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#C7D9E5", fontWeight: 700 }}>
            <th style={cellHeader}>Aspek yang Diamati</th>
            <th style={cellHeader}>Sangat Baik<br />4</th>
            <th style={cellHeader}>Baik<br />3</th>
            <th style={cellHeader}>Cukup Baik<br />2</th>
            <th style={cellHeader}>Perlu Ditingkatkan<br />1</th>
            <th style={cellHeader}>Catatan Pendidik<br />(opsional)</th>
          </tr>
        </thead>

        <tbody>
          {[
            "Partisipasi dalam Diskusi",
            "Kerjasama dalam Kelompok",
            "Keaktifan dalam Simulasi",
          ].map((label, idx) => (
            <tr key={idx}>
              <td style={cell}>{label}</td>
              <td style={checkCell}></td>
              <td style={checkCell}></td>
              <td style={checkCell}></td>
              <td style={checkCell}></td>
              <td style={cell}></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TOTAL SKOR */}
      <div style={{ marginTop: "12px", fontWeight: 700 }}>
        TOTAL SKOR: ________ / 20
      </div>

      {/* KETERANGAN */}
      <div style={{ marginTop: "10px", fontSize: "12px" }}>
        <strong>Keterangan:</strong>
        <ul style={{ listStyle: "none", paddingLeft: 0, marginTop: "6px" }}>
          <li>17 – 20 : Sangat Baik</li>
          <li>13 – 16 : Baik</li>
          <li>9 – 12 : Cukup</li>
          <li>1 – 8 : Perlu Bimbingan</li>
        </ul>
      </div>

      <SectionHeader title="MEDIA PEMBELAJARAN" />
      <div
        className="pdf-quill"
        dangerouslySetInnerHTML={{
          __html: values.media_pembelajaran || "",
        }}
      />

      <DividerLine />
      <SectionHeader title="REFERENSI PEMBELAJARAN GURU" />
      <div
        className="pdf-quill"
        dangerouslySetInnerHTML={{
          __html: values.referensi_guru || "",
        }}
      />
    </div>
  );
};

export default ReportPdf;

