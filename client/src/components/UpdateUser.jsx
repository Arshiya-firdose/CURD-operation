import {React,useEffect,useState} from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
const UpdateUser = () => {
    const {id}= useParams()
    const [inputUser, setInputUser] = useState({
        name: "",
        email: "",
        password: "",
      });
      const fetchSingleUserData = async () => {
        try {
          const result = await axios.get(`http://localhost:5000/readSingleUserData/${id}`);
          console.log(result);
          setInputUser({
            name: result.data.name,
            email:result.data.email,
            password: result.data.password,
          });
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        fetchSingleUserData();
      }, []);
    
    
      const handleChange = (event) => {
        setInputUser({
          ...inputUser,
          [event.target.name]: event.target.value,
        });
      };
    
    const handleSubmit=async(event)=>{
        event.preventDefault();
        console.log(inputUser);
        const result = await axios.put(`http://localhost:5000/updateUser/${id}`,inputUser);
        console.log(result);
        if(result.status ==200){
            window.location="/"
        }
    
    }
  return (
    <div>     
    <form onSubmit={handleSubmit}>
    <h2>Update User</h2>
    <label htmlFor="">Name</label>
    <input
      type="text"
      value={inputUser.name}
      onChange={handleChange}
      name="name"
    />

    <label htmlFor="">Email</label>
    <input
      type="text"
      value={inputUser.email}
      onChange={handleChange}
      name="email"
    />

    <label htmlFor="">Password</label>
    <input
      type="text"
      value={inputUser.password}
      onChange={handleChange}
      name="password"
    />

    <button>Update User</button>
  </form></div>
  )
}

export default UpdateUser