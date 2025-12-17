// eslint-disable-next-line @typescript-eslint/no-explicit-any
"use client"

import React, { useState } from "react"
import { Form, Input, message, Button, Checkbox, Upload, Typography, Row, Col, Select, Divider } from 'antd';
import 'react-quill/dist/quill.snow.css';
import RichTextEditor from "@/components/ReactQuill";
import { exportPdfFromElement } from "@/utils/exportPdf";
import ReportPdf from "@/components/ReportPdf";
import * as XLSX from "xlsx";

const { Title } = Typography;

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

const semester_options = [
  { "value": "1 / Ganjil", "label": "1 / Ganjil" },
  { "value": "2 / Genap", "label": "2 / Genap" }
]
const profil_kelulusan = [
  "DPL 1 Keimanan dan Ketaqwaan terhadap Tuhan YME",
  "DPL 2 Kewarganegaraan",
  "DPL 3 Penalaran Kritis",
  "DPL 4 Kreativitas",
  "DPL 5 Kolaborasi",
  "DPL 6 Kemandirian",
  "DPL 7 Kesehatan",
  "DPL 8 Komunikasai",
]

const parseExcelQuestions = async (file: File): Promise<Question[]> => {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data, { type: "array" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const json = XLSX.utils.sheet_to_json<any>(sheet);

  return json.map((row) => ({
    no: Number(row["No"]),
    soal: row["Soal"],
    pilihan: {
      A: row["Pilihan A"],
      B: row["Pilihan B"],
      C: row["Pilihan C"],
      D: row["Pilihan D"],
    },
  }));
};

const MyForm: React.FC = () => {
  const [form] = Form.useForm();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [pdfData, setPdfData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const FORM_CACHE_KEY = "rpp-form-cache";

  const onValuesChange = (_: any, allValues: any) => {
    localStorage.setItem(FORM_CACHE_KEY, JSON.stringify(allValues));
  };

  const handleExcelUpload = async (file: File) => {
    const parsed = await parseExcelQuestions(file);
    setQuestions(parsed);
    return false;
  };

  React.useEffect(() => {
    const cached = localStorage.getItem(FORM_CACHE_KEY);
    if (cached) {
      form.setFieldsValue(JSON.parse(cached));
    }
  }, [form]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      setPdfData(values);

      await new Promise((r) => setTimeout(r, 300));

      await exportPdfFromElement("pdf-report", "RPP.pdf");
    } catch (err) {
      console.error(err);
      message.error("Gagal Menggenerate RPP!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[900px] m-auto p-[20px] bg-[#fff] rounded-[8px]">
      <Title level={3} style={{ color: '#00ADB5', textAlign: 'center' }}>
        Educourse Kurikulum RPP
      </Title>
      <Form onValuesChange={onValuesChange} form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={16}>
          <Col md={8}>
            <Form.Item
              name="pertemuan_ke"
              label="Pertemuan dan Deskripsi Pertemuan"
              rules={[{ required: true, message: 'Tolong Masukkan Kelas!' }]}
            >
              <Input placeholder="Pertemuan ke-1: Mengenal Perangkat Keras dan Perangkat Lunak Komputer" style={{ borderColor: '#00ADB5' }} />
            </Form.Item>
          </Col>
          <Col md={8}>
            <Form.Item
              name="kelas"
              label="Kelas"
              rules={[{ required: true, message: 'Tolong Masukkan Kelas!' }]}
            >
              <Input placeholder="Masukkan Kelas" style={{ borderColor: '#00ADB5' }} />
            </Form.Item>
          </Col>

          <Col md={8}>
            <Form.Item
              name="waktu"
              label="Alokasi Waktu"
              rules={[{ required: true, message: 'Tolong masukkan Alokasi Waktu!' }]}
            >
              <Input placeholder="Masukkan Alokasi Waktu" style={{ borderColor: '#00ADB5' }} />
            </Form.Item>
          </Col>

          <Col md={24}>
            <Form.Item
              name="semester"
              label="Semester"
              rules={[{ required: true, message: 'Tolong masukkan Semester!' }]}
            >
              <Select placeholder="Masukkan Semester" options={semester_options} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="profil_kelulusan"
              label="Dimensi Profile Kelulusan"
              rules={[
                {
                  required: true,
                  message: "Minimal pilih satu dimensi",
                },
              ]}
            >
              <Checkbox.Group style={{ width: "100%" }}>
                <Row gutter={[16, 8]}>
                  {profil_kelulusan.map((item) => (
                    <Col span={6} key={item}>
                      <Checkbox value={item}>{item}</Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </Col>

          <Col className="mb-5" span={24}>
            <Form.Item
              name="tujuan_pembelajaran"
              label="Tujuan Pembelajaran"
            >
              <RichTextEditor />
            </Form.Item>
          </Col>


          <Divider />
          <Title level={4} style={{ color: '#00ADB5', textAlign: 'center' }}>
            KERANGKA PEMBELAJARAN
          </Title>

          <Col className="mb-8" span={24}>
            <Form.Item
              name="lingkugan_pembelajaran"
              label="Lingkungan Pembelajaran"
            >
              <RichTextEditor />
            </Form.Item>
          </Col>

          <Col className="mb-8" span={24}>
            <Form.Item
              name="pemanfaatan_digital"
              label="Pemanfaatan Digital"
            >
              <RichTextEditor />
            </Form.Item>
          </Col>

          <Divider />

          <Form.Item shouldUpdate>
            {({ getFieldValue }) => (
              <Title level={3} style={{ color: "#00ADB5", textAlign: "center" }}>
                {getFieldValue("pertemuan_ke") || "Pertemuan ke-..."}
              </Title>
            )}
          </Form.Item>

          <Col className="mb-8" span={24}>
            <Form.Item
              name="memahami_berkesadaran"
              label="Memahami Berkesadaran"
            >
              <RichTextEditor />
            </Form.Item>
          </Col>

          <Col className="mb-8" span={24}>
            <Form.Item
              name="mengaplikasi"
              label="Mengaplikasi (Berkesadaran dan Menggembirakan)"
            >
              <RichTextEditor />
            </Form.Item>
          </Col>

          <Col className="mb-8" span={24}>
            <Form.Item
              name="refleksi"
              label="Merefleksi (Berkesadaran, Bermakna, dan Menggembirakan)"
            >
              <RichTextEditor />
            </Form.Item>
          </Col>

          <Col className="mb-8" span={24}>
            <Form.Item
              name="media_pembelajaran"
              label="MEDIA PEMBELAJARAN"
            >
              <RichTextEditor />
            </Form.Item>
          </Col>

          <Col className="mb-8" span={24}>
            <Form.Item
              name="referensi_guru"
              label="REFERENSI PEMBELAJARAN GURU"
            >
              <RichTextEditor />
            </Form.Item>
          </Col>

          <Col className="mb-8" span={24}>
            <Form.Item
              name="soal"
              label="Asesmen Siswa"
            >
              <Upload
                beforeUpload={handleExcelUpload}
                accept=".xlsx,.xls"
                maxCount={1}
              >
                <Button>Upload Soal (Excel)</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: '#00ADB5', borderColor: '#00ADB5', width: '100%' }}
              loading={loading}
            >
              Submit
            </Button>
          </Form.Item>
        </Row>
      </Form>
      {pdfData && (
        <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
          <ReportPdf values={{ ...pdfData, questions }} />
        </div>
      )}
    </div>
  );
};

export default MyForm;

