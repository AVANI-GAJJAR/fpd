import { useEffect,useState } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Table} from 'antd'
const DashboardPage = () => {
const logout = () => {
  localStorage.clear()
  window.location.replace('/login')

}
const [data,setData] = useState([])
const [name,setName] = useState('')
const [pagination,setPagination] = useState(1)
const [pageSize,setPageSize] = useState(5)
const proxyUrl = 'http://localhost:8080/';

  const fetchData = async () => {
    try{
    const response = await axios.get('http://127.0.0.1:8000/api/predictions')
    const data = await response
    if(data){
    setData(data.data)
    }
  }
  catch(error){

    console.log(error)
  }

  }

  const fetchUser = async () => {
    try{
    const id = localStorage.getItem("id")
    const response = await axios.get(`http://127.0.0.1:8000/api/user/${id}`)
    const data = await response
    if(data){
    setName(data.data.name)
    }}
    catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(!token){
        window.location.replace('/login')
    }
    fetchUser()
    fetchData()
  },[])
  const columns = [
    {
      title: 'Index',
      dataIndex: 'id',
      key: 'id',
      render: (text, record, index) => pagination * pageSize + index + 1 - pageSize,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Profile Photo',
      dataIndex: 'profilePhoto',
      key: 'profilePhoto',
      render: (text, record) => (
        <img src={`${proxyUrl}${record?.profilePhoto}`}
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        headers={{ "X-Requested-With": "XMLHttpRequest" }}
        alt={record.username} className="w-12 h-12 rounded-full" />
      ),
    },
    {
      title:'Prediction',
      dataIndex:'prediction',
      key:'prediction',
      render:(text,record)=>(
        <span>{record.prediction?"Fake":"Not Fake"}</span>
      )
    },
    {
      title:'Timestamp',
      dataIndex:'timestamp',
      key:'timestamp',
      render:(text,record)=>(
        new Date(record.timestamp).toLocaleString()
      )    
    }
  ];
  
  return (
    <div className="flex bg-[#fff] text-white min-h-screen">
      <div className="w-60 fixed min-h-screen bg-[#4a4a4a] p-4 transition-all">
        <ul className="list-none">
          <li className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full overflow-hidden border-4 border-white">
              <img src="https://i.postimg.cc/SxbYPS5c/userimg.webp" alt="User" className="w-full" />
            </div>
            <h2 className="text-white text-lg ml-3">{name}</h2>
          </li>         
          <li>
            <a href="#" className="flex items-center hover:bg-[#242424] bg-opacity-25 rounded p-2 transition duration-500">
              <Link className="text-white ml-3" to={"/predict"}>Prediction</Link>
            </a>
          </li>
          <li>
              <button className="flex items-center hover:bg-[tomato] bg-opacity-25 rounded p-2 transition duration-500 ml-3" onClick={logout}>Log Out</button>
          
          </li>          
        </ul>
      </div>

      <div className="flex-1 p-10 ml-64">
        <Table columns={columns} dataSource={data}
          pagination={{ pageSize: 5 }}
          onChange={(pagination, filters, sorter, extra) => {
            setPagination(pagination.current)
            console.log('params', pagination, filters, sorter, extra);
          }
          }
        />       
      </div>
    </div>
  );
};

export default DashboardPage;
