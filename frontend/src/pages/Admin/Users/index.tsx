import { useEffect, useState } from 'react';
import { User } from '../../../actions';
import { config } from '../../../actions/config';
import API from '../../../api/baseAPI';

interface Props {}

const AdminUsersList = (props: Props) => {
  const [adminUsers, setAdminUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminUsers();
  });

  const getAdminUsers = async () => {
    return await API.get<User[]>(`${config.URL}/users`).then((res) => {
      setLoading(false);
      return setAdminUsers(res.data.filter((user) => user.is_admin));
    });
  };

  const renderAdminUsers = () => {
    if (!adminUsers) return;
    return adminUsers.map((user) => (
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
      </tr>
    ));
  };

  return (
    <div className='overflow-x-auto'>
      <table className='table w-3/4 mx-auto'>
        <thead className='text-center'>
          <tr>
            <th>User</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody className='text-center'>{!loading && renderAdminUsers()}</tbody>
      </table>
    </div>
  );
};

export default AdminUsersList;
