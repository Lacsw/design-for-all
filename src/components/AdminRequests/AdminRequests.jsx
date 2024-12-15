import { AdminApplicationsNav } from 'components';
import './AdminRequests.css';
import { useState } from 'react';
import AdminTable from 'components/AdminTable/AdminTable';

const AdminRequests = ({ hash }) => {
  const [pagination, setPagination] = useState('20');
  return (
    <div className="admin-requests">
      <AdminApplicationsNav hash={hash} setPagination={setPagination} />
      <AdminTable hash={hash} pagination={pagination} />
    </div>
  );
};

export default AdminRequests;
