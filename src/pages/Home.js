import './Home.scss';
import Post from '../components/post/Post';
import { React, useContext, useEffect, useState } from 'react';
import { getData, deleteData } from '../helpers/data-helper';
import { Context } from '../context/Context';
import { Link } from "react-router-dom";

function Home() {
  const [ vehicles, setVehicles ] = useState([]);
  const context = useContext(Context);

  useEffect(() => {
    getData('vehicles').then( ({ data }) => setVehicles(data));
  }, []);

  async function deletePost(id) {
    await deleteData('vehicles', id);
    setVehicles(vehicles.filter(v => v.id !== id));
  }

  return (
    <div className='Home'>
      { !context.user.isAdmin
        ? !context.user.id && <div className='container-xl'>
          <div className='admin-controls'>
            <div className='text-danger'><i className="bi bi-info-square-fill"></i> You need to be signed in to rent cars</div>
          </div>
        </div>
        :<div className='container-xl'>
          <div className='admin-controls'>
            <div className='text-danger'><i className="bi bi-info-square-fill"></i> Your account has admin rights to manage customers, edit/add cars</div>
            <div>
              <Link to={'/customers'} className='btn btn-secondary'><i className="bi bi-person-circle"></i> Manage Customers</Link>
              <Link to={'/edit/new'} className='btn btn-success'><i className="bi bi-pencil-square"></i> Add Car</Link>
            </div>
          </div>
        </div>
      }
      <div className='container-xl posts'>
        { vehicles.map(data => <Post data={ data } key={ data.id } deleteCb={() => deletePost(data.id)} />) }
      </div>
    </div>
  );
}

export default Home;
