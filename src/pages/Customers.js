import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getData, deleteData } from '../helpers/data-helper';
import './Customers.scss';

function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(()=> {
    getData('users', { isAdmin: false }).then(({ data })=> setCustomers(data));
  }, []);

  async function deleteCustomer(id) {
    await deleteData('users', id);
    setCustomers(customers.filter(c => c.id !== id));
  }

  console.log(customers);

  const tableInfo = customers.map(customer => {
    return <tr key={customer.id}>
      <th style={{ lineHeight: '40px' }}>{ customer.name }</th>
      <td style={{ lineHeight: '40px' }}>{ customer.email }</td>
      <td style={{ lineHeight: '40px' }}>{ customer.phone }</td>
      <td className='text-warning fw-bold'>
        <Link to={`/customers/edit/${customer.id}`} state={customer} className='btn btn-primary'><i className="bi bi-pencil-square"></i> Edit</Link>
      </td>
      <td>
        <button className='btn btn-danger' onClick={ ()=> deleteCustomer(customer.id) }><i className="bi bi-trash-fill"></i> Delete</button>
      </td>
    </tr>
  });

  return (
    <div className='Customers'>
      <div className='customers-container'>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col' style={{ minWidth: '100px' }} className='text-primary'>Full Name</th>
              <th scope='col' className='text-primary'>Email</th>
              <th scope='col' style={{ minWidth: '140px' }} className='text-primary'>Phone number</th>
              <th scope='col' style={{ width: '90px', minWidth: '90px' }}>Actions</th>
              <th scope='col' style={{ width: '110px', minWidth: '110px' }}></th>
            </tr>
          </thead>
          <tbody>{ tableInfo }</tbody>
        </table>
      </div>
    </div>
  )
}

export default Customers;