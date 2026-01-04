
import React, { useEffect, useState } from 'react';
import { Button, Card, Table, Form } from 'antd';
import ReactQuill from 'react-quill';

interface AssessmentRow {
  key: string;
  aspek: string;
  kurang: string;
  cukup: string;
  baik: string;
  sangatBaik: string;
}

interface AssessmentData {
  description: string;
  rows: AssessmentRow[];
}

export type AssessmentType = 'Awal' | 'Proses' | 'Akhir';
interface AssessmentSectionProps {
  type: string;
  initialData: AssessmentData;
  onChange: (data: AssessmentData) => void;
}

const QuillCellEditor: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      theme="snow"
      style={{
        height: '100px',
        width: '300px',
        maxHeight: '100px',
        overflowY: 'auto',
      }}
      modules={{
        toolbar: [['bold', 'italic', 'underline']],
      }}
    />
  );
};

const AssessmentSection: React.FC<AssessmentSectionProps> = ({
  type,
  initialData,
  onChange,
}) => {
  const [description, setDescription] = useState<string>(initialData.description);
  const [rows, setRows] = useState<AssessmentRow[]>(initialData.rows.length > 0
    ? initialData.rows
    : [{ key: Date.now().toString(), aspek: '', kurang: '', cukup: '', baik: '', sangatBaik: '' }]);

  useEffect(() => {
    setDescription(initialData.description);
    setRows(initialData.rows && initialData.rows.length > 0
      ? initialData.rows
      : [{ key: Date.now().toString(), aspek: '', kurang: '', cukup: '', baik: '', sangatBaik: '' }]);
  }, [initialData]);

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
    onChange({ description: value, rows });
  };

  const addRow = () => {
    const newRow: AssessmentRow = {
      key: Date.now().toString(),
      aspek: '',
      kurang: '',
      cukup: '',
      baik: '',
      sangatBaik: '',
    };
    const newRows = [...rows, newRow];
    setRows(newRows);
    onChange({ description, rows: newRows });
  };

  const updateCell = (key: string, field: keyof AssessmentRow, value: string) => {
    const newRows = rows.map((row) =>
      row.key === key ? { ...row, [field]: value } : row
    );
    setRows(newRows);
    onChange({ description, rows: newRows });
  };

  const columns = [
    {
      title: 'Aspek',
      dataIndex: 'aspek',
      key: 'aspek',
      width: 300,
      render: (_: unknown, record: AssessmentRow) => (
        <QuillCellEditor
          value={record.aspek}
          onChange={(val) => updateCell(record.key, 'aspek', val)}
        />
      ),
    },
    {
      title: 'Kurang',
      dataIndex: 'kurang',
      key: 'kurang',
      width: 300,
      render: (_: unknown, record: AssessmentRow) => (
        <QuillCellEditor
          value={record.kurang}
          onChange={(val) => updateCell(record.key, 'kurang', val)}
        />
      ),
    },
    {
      title: 'Cukup',
      dataIndex: 'cukup',
      key: 'cukup',
      width: 300,
      render: (_: unknown, record: AssessmentRow) => (
        <QuillCellEditor
          value={record.cukup}
          onChange={(val) => updateCell(record.key, 'cukup', val)}
        />
      ),
    },
    {
      title: 'Baik',
      dataIndex: 'baik',
      key: 'baik',
      width: 300,
      render: (_: unknown, record: AssessmentRow) => (
        <QuillCellEditor
          value={record.baik}
          onChange={(val) => updateCell(record.key, 'baik', val)}
        />
      ),
    },
    {
      title: 'Sangat Baik',
      dataIndex: 'sangatBaik',
      key: 'sangatBaik',
      width: 300,
      render: (_: unknown, record: AssessmentRow) => (
        <QuillCellEditor
          value={record.sangatBaik}
          onChange={(val) => updateCell(record.key, 'sangatBaik', val)}
        />
      ),
    },
    {
      title: 'Aksi',
      key: 'action',
      width: 80,
      render: (_: unknown, record: AssessmentRow) => (
        <Button
          type="text"
          danger
          size="small"
          onClick={() => {
            const newRows = rows.filter((r) => r.key !== record.key);
            setRows(newRows);
            onChange({ description, rows: newRows });
          }}
        >
          Hapus
        </Button>
      ),
    }
  ];

  return (
    <Card
      title={`Asesmen ${type}`}
      extra={
        <Button type="primary" onClick={addRow}>
          + Tambah Baris
        </Button>
      }
      style={{ marginBottom: '24px' }}
    >
      <Form layout="vertical">
        <Form.Item label="Deskripsi Asesmen">
          <ReactQuill
            placeholder="Isi Jika Ada.."
            value={description}
            onChange={handleDescriptionChange}
            theme="snow"
            style={{ height: '150px', marginBottom: '16px' }}
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                ['link', 'image'],
                ['clean'],
              ],
            }}
          />
        </Form.Item>

        <Table
          className="mt-10"
          dataSource={rows}
          columns={columns}
          pagination={false}
          bordered
          scroll={{ x: 'max-content' }}
          rowKey="key"
        />
      </Form>
    </Card>
  );
};

export default AssessmentSection;
