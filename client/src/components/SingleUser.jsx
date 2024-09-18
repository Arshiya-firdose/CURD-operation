import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SingleUser = () => {
  const [userData, setUserData] = useState([]);
  const { id } = useParams();

  const fetchSingleUserData = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/readSingleUserData/${id}`);
      console.log(result);
      setUserData(result?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleUserData();
  }, []);

  return (
      <div className='S-User'>
        <table className='S-table' >
          <thead className='S-thead'>
            <tr className='S-tr'>
              <th>SN.</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PASSWORD</th>
            </tr>
          </thead>
          <tbody className='S-tbody'>
            <tr>
              <td>1</td>
              <td>{userData?.name}</td>
              <td>{userData?.email}</td>
              <td>{userData?.password}</td>
            </tr>
          </tbody>
        </table>
      </div>
  );
};

export default SingleUser;






