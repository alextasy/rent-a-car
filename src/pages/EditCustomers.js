import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getData, patchData } from '../helpers/data-helper';
import './EditCustomers.scss';

function EditCustomers() {
  const navigate = useNavigate();
  const { state: oldCustomer } = useLocation();
  const { id } = useParams();
  const [customer, setCustomer] = useState(oldCustomer || {});

  useEffect(() => {
    if (!id) { 
      navigate('/customers');
      return;
    } else if (id !== 'new' && !oldCustomer) getData('users', { id }).then( ({ data }) => setCustomer(data[0]));
  }, [])

  async function edit(event) {
    event.preventDefault();
    await patchData('users', customer);
    navigate('/customers');
  }

  return (
    <div className='EditCustomers'>
      <div className='container-xl'>
        <form onSubmit={edit}>                  
          <div className="mb-3">
            <label htmlFor="full-name" className="col-form-label">Full Name:</label>
            <input type="text" className="form-control" id="full-name" value={customer.name} onChange={({ target: { value: name } }) => setCustomer({ ...customer, name }) }/>
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="col-form-label">Phone number:</label>
            <input type="text" className="form-control" id="phone" value={customer.phone} onChange={({ target: { value: phone } }) => setCustomer({ ...customer, phone }) }/>
          </div>
          <div className="mb-3">
            <label htmlFor="sign-up-email" className="col-form-label">Email:</label>
            <input type="email" className="form-control" id="sign-up-email" value={customer.email} onChange={({ target: { value: email } }) => setCustomer({ ...customer, email }) }/>
          </div>
          <div className="mb-3">
            <label htmlFor="sign-up-password" className="col-form-label">Password:</label>
            <input type="text" className="form-control" id="sign-up-password" value={customer.password} onChange={({ target: { value: password } }) => setCustomer({ ...customer, password }) }/>
          </div>
          <button className='btn btn-primary'><i className="bi bi-pencil-square"></i> Edit</button>
        </form>
      </div>
    </div>
  )
}

export default EditCustomers;