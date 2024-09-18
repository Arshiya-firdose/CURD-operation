import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const [userData, setUserData] = useState([]);
  const fetchAllUsersData = async () => {
    try {
      const result = await axios.get("http://localhost:5000/readAllUser");
      console.log(result);
      setUserData(result?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllUsersData();
  }, []);

  // handling form
  const [inputUser, setInputUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setInputUser({
      ...inputUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(inputUser);
    const result = await axios.post(
      "http://localhost:5000/createUser",
      inputUser
    );
    console.log(result);
    fetchAllUsersData();
  };
  const handleDelete = async (id) => {
    const result = await axios.delete(`http://localhost:5000/deleteUser/${id}`);
    if (result.status == 200) {
      fetchAllUsersData();
    }
  };
  return (
    <div className="main">
      <form onSubmit={handleSubmit}>
        <h2>Create User</h2>
        <label htmlFor="">Name</label> <br />
        <input
          type="text"
          value={inputUser.name}
          onChange={handleChange}
          name="name"
        />{" "}
        <br />
        <label htmlFor="">Email</label> <br />
        <input
          type="text"
          value={inputUser.email}
          onChange={handleChange}
          name="email"
        />{" "}
        <br />
        <label htmlFor="">Password</label> <br />
        <input
          type="text"
          value={inputUser.password}
          onChange={handleChange}
          name="password"
        />{" "}
        <br />
        <button>Add User</button>
      </form>
      <div className="main-table">
        <div className="table">
          <table>
            <div className="thead">
              <thead>
                <div className="tr">
                  {" "}
                  <tr className="trp">
                    <th>SN.</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>PASSWORD</th>
                    <th>ACTIONS</th>
                  </tr>
                </div>
              </thead>
            </div>
            <div className="tbody">
              <tbody>
                <div className="t-data">
                  {" "}
                  {userData.map((item, i) => (
                    <tr className="t-content" key={item._id}>
                      <th>{i + 1}</th>
                      <th>{item?.name}</th>
                      <td>{item?.email}</td>
                      <td>{item?.password}</td>

                      <td className="navlink">
                        <NavLink to={`/readSingleUser/${item._id}`}>
                          Read
                        </NavLink>
                        <NavLink to={`/updateUser/${item._id}`}>Edit</NavLink>
                        <button className="btn" onClick={() => handleDelete(item._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </div>
              </tbody>
            </div>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
