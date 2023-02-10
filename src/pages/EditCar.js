import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { getData, postData, patchData } from '../helpers/data-helper';
import './EditCar.scss';
import { carProps, vehicleTypes, fuelTypes } from '../helpers/type-helper';

function EditCar() {
  const navigate = useNavigate();
  const { state: oldPost } = useLocation();
  const { id } = useParams();
  const [post, setPost] = useState(oldPost || { 
    type: vehicleTypes[0], 
    fuel: fuelTypes[0],
    ...Object.fromEntries(carProps.map(el => [ [el.prop], '' ]))
  });

  useEffect(() => {
    if (!id) { 
      navigate('/edit/new');
      return;
    } else if (id !== 'new' && !oldPost) getData('vehicles', { id }).then( ({ data }) => setPost(data[0]));
  }, [])

  const formElements = carProps.map(el => <div className="mb-3" key={el.prop}>
      <label htmlFor={ el.prop } className="col-form-label">{ el.label }</label>
      <input required type={ el.formType || 'text' } className="form-control" id={ el.prop } value={ post[el.prop] } onChange={({ target: { value } }) => setPost({ ...post, [el.prop]: value }) }/>
    </div>
  );

  const vehicles = vehicleTypes.map(type => <option key={type} value={type}>{ type[0].toUpperCase() + type.slice(1) }</option>);
  const fuels = fuelTypes.map(type => <option key={type} value={type}>{ type[0].toUpperCase() + type.slice(1) }</option>);

  async function postForm(event) {
    event.preventDefault();
    id === 'new' ? await postData('vehicles', post) : await patchData('vehicles', post);
    navigate('/');
  }

  return (
    <div className='EditCar'>
      <div className='container-xl'>
        <form onSubmit={postForm}>
          <div className="mb-3">
            <label htmlFor='vehicle-type' className="col-form-label">Type:</label>
            <select id='vehicle-type' className="form-control" value={post.type} onChange={ ({ target: { value: type } }) => setPost({ ...post, type }) }>{ vehicles }</select>
          </div>
          <div className="mb-3">
            <label htmlFor='fuel-type' className="col-form-label">Fuel:</label>
            <select id='fuel-type' className="form-control" value={post.fuel} onChange={ ({ target: { value: fuel } }) => setPost({ ...post, fuel }) }>{ fuels }</select>
          </div>
          { formElements }
          <button className='btn btn-primary'><i className="bi bi-pencil-square"></i> { id === 'new' ? 'Add' : 'Edit' }</button>
        </form>
      </div>
    </div>
  )
}

export default EditCar;