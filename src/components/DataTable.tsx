import React from 'react';
import { Table, Divider, Tag } from 'antd';
import { IComponent } from '../state/components';

interface DataTableProps {
  component: IComponent;
}

function DataTable(props: DataTableProps) {
  const data = [
    { id: '1', name: 'Corey', location: 'San Francisco, CA' },
    { id: '2', name: 'Corey', location: 'San Francisco, CA' },
    { id: '3', name: 'Corey', location: 'San Francisco, CA' },
    { id: '4', name: 'Corey', location: 'San Francisco, CA' },
  ];

  const columns = Object.keys(data[0]).map((c) => ({
    title: c,
    dataIndex: c,
    key: c,
  }));

  return (
      <div className="Component DataTableComponent">
        <Table columns={columns} dataSource={data} rowKey="id" size="small" />
      </div>
  );
}

export default DataTable;
