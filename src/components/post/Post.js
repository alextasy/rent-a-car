import './Post.scss';
import React, { useContext } from 'react';
import { Context } from '../../context/Context';
import { Link } from 'react-router-dom';

function Post({ data, deleteCb, isPreview = false }) {
  const context = useContext(Context);
  return (
    <div className='Post card position-relative'>
      <h5 className='card-header bg-white'>{ `${data.brand} ${data.model}` }</h5>
      <div className='card-body'>
        <div className='info'>
          <ul>
            <li><strong>Price per day:</strong> ${ data.price.toFixed(2) }</li>
            <li><strong>Type:</strong> { data.type }</li>
            <li><strong>Brand:</strong> { data.brand }</li>
            <li><strong>Model:</strong> { data.model }</li>
            <li><strong>Manufactured:</strong> { data.year }</li>
            <li><strong>Fuel type:</strong> { data.fuel }</li>
            <li><strong>Number of seats:</strong> { data.seats }</li>
            <li><strong>Available currently:</strong> { data.count }</li>
          </ul>
        </div>
        <img src={ data.picture } alt={ `${data.brand} ${data.model} image` }/>
      </div>
      { context.user.isAdmin 
        ? !isPreview && <div className='card-footer'>
          <Link to={`/edit/${data.id}`} state={data} className='btn btn-primary'><i className='bi bi-pencil-square'></i> Edit</Link>
          <button className='btn btn-danger' onClick={deleteCb}><i className='bi bi-trash-fill'></i> Delete</button>
        </div> 
        : !isPreview && <div className='card-footer'>
          <Link to={`/rent/${data.id}`} state={data} className={ context.user.id && data.count ? 'btn btn-primary' : 'btn btn-primary disabled' }><i className='bi bi-pencil-square'></i> Rent</Link>
          { context.user.id && data.count
            ?<div className='text-success'><i className='bi bi-check-circle-fill'></i> Car is available to be rented</div>
            :<div className='text-danger'><i className={ data.cout ? 'bi bi-person-fill' : 'bi bi-bag-x-fill' }></i> { data.count ? 'Sign in required to rent' : 'All vehicles are currently rented out' } </div>
          }
        </div>
      }
    </div>
  )
}
export default Post;
