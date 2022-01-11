import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { User } from '../../actions/types';
import Loading from '../../components/Loading';
import { config } from '../../actions/config';
import axios from 'axios';

export interface IAppProps {}

function ListUsersPage(props: IAppProps) {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsersList();
  }, [dispatch]);

  const getUsersList = async () => {
    await axios.get(`${config.URL}/users`).then((res) => {
      setLoading(false);
      setUsers(res.data);
    });
  };

  const renderBody = () => {
    return users.map((user: User) => (
      <tr>
        <td>
          <img
            src={config.IMG_URL + user.avatar}
            alt='User Avatar'
            className='w-16 h-16'
          />
        </td>
        <td>
          <a href=''>{user.name}</a>
        </td>
        <td>{user.email}</td>
        <td>
          <div>
            <a href='#' className='btn btn-info'>
              Follow
            </a>
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <div className='overflow-x-auto mt-4'>
      <table className='table w-3/4 table-zebra mx-auto'>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        {loading ? <Loading size={8} /> : null}
        <tbody>{users ? renderBody() : ''}</tbody>
      </table>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {};
};

export default connect(mapStateToProps, {})(ListUsersPage);
