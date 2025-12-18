// app/rpp/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Form, Input, message, Button, Checkbox, Upload, Typography, Row, Col, Select, Divider } from 'antd';
import RichTextEditor from "@/components/ReactQuill";
import * as XLSX from "xlsx";
import { useRouter } from 'next/navigation';

const { Title } = Typography;

interface Question {
  no: number;
  soal: string;
  pilihan: { A: string; B: string; C: string; D: string };
}

const semester_options = [
  { value: "1 / Ganjil", label: "1 / Ganjil" },
  { value: "2 / Genap", label: "2 / Genap" }
];

const profil_kelulusan = [
  "DPL 1 Keimanan dan Ketaqwaan terhadap Tuhan YME",
  "DPL 2 Kewarganegaraan",
  "DPL 3 Penalaran Kritis",
  "DPL 4 Kreativitas",
  "DPL 5 Kolaborasi",
  "DPL 6 Kemandirian",
  "DPL 7 Kesehatan",
  "DPL 8 Komunikasai",
];

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

const RPPFormPage = () => {
  const [form] = Form.useForm();
  const [questions, setQuestions] = useState<Question[]>([]);
  const router = useRouter();
  const FORM_CACHE_KEY = "rpp-form-cache"
  const QUESTIONS_CACHE_KEY = "rpp-questions";

  useEffect(() => {
    const cached = localStorage.getItem(FORM_CACHE_KEY);
    const cachedQuestions = localStorage.getItem(QUESTIONS_CACHE_KEY);
    if (cached) {
      try {
        form.setFieldsValue(JSON.parse(cached));
      } catch (e) {
        console.warn("Failed to restore form cache", e);
      }
    }
    if (cachedQuestions) {
      try {
        setQuestions(JSON.parse(cachedQuestions));
      } catch (e) {
        console.warn("Failed to restore questions", e);
      }
    }
  }, [form]);

  const onValuesChange = (_: any, allValues: any) => {
    localStorage.setItem(FORM_CACHE_KEY, JSON.stringify(allValues));
  };

  const resetFields = () => {
    form.resetFields();
    localStorage.removeItem(FORM_CACHE_KEY);
    localStorage.removeItem(QUESTIONS_CACHE_KEY);
    setQuestions([]);
    message.success("Form berhasil dikosongkan");
  };

  const handleExcelUpload = async (file: File) => {
    const parsed = await parseExcelQuestions(file);
    setQuestions(parsed);
    localStorage.setItem(QUESTIONS_CACHE_KEY, JSON.stringify(parsed));
    return false;
  };

  const onFinish = (values: any) => {
    localStorage.setItem(FORM_CACHE_KEY, JSON.stringify(values));
    if (questions.length > 0) {
      localStorage.setItem(QUESTIONS_CACHE_KEY, JSON.stringify(questions));
    }
    router.push('/download');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <Title level={3} className="text-center text-[#00ADB5] mb-6">
        Educourse Kurikulum RPP
      </Title>

      <Form onValuesChange={onValuesChange} form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={16}>
          <Col md={24}>
            <Form.Item
              name="nama_materi"
              label="Materi RPP"
              rules={[{ required: true, message: 'Tolong Masukkan Materi!' }]}
            >
              <Input placeholder="E.g: Perencanaan Pembelajaran Koding dan KA Fase C (Kelas 5-6)" style={{ borderColor: '#00ADB5' }} />
            </Form.Item>
          </Col>
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


          <Col xs={24}>
            <Divider />
            <Title level={4} className="text-center text-[#00ADB5]">KERANGKA PEMBELAJARAN</Title>
          </Col>

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

          <Col xs={24}>
            <Divider />
            <Form.Item shouldUpdate>
              {({ getFieldValue }) => (
                <Title level={3} className="text-center text-[#00ADB5]">
                  {getFieldValue("pertemuan_ke") || "Pertemuan ke-..."}
                </Title>
              )}
            </Form.Item>
          </Col>

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
          <Col xs={24}>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="primary"
                htmlType="submit"
                className="flex-1 bg-[#00ADB5] border-[#00ADB5]"
              >
                Preview & Cetak
              </Button>
              <Button danger onClick={resetFields} className="flex-1">
                Kosongkan Form
              </Button>
            </div>
          </Col>
        </Row>
      </Form >
    </div >
  );
};

export default RPPFormPage;
