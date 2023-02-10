import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Post from '../components/post/Post';
import { Context } from '../context/Context';
import { getData, patchData, postData } from '../helpers/data-helper';
import './Rent.scss';

function Rent() {
  const navigate = useNavigate();
  const context = useContext(Context);
  const { state: oldSelectedCar } = useLocation();
  const { id } = useParams();
  const [selectedCar, setSelectedCar] = useState(oldSelectedCar || {});
  const [formValue, setFormValue] = useState({ 
    start: new Date().toLocaleDateString('sv'), 
    end: new Date(new Date().setHours(new Date().getHours() + 24)).toLocaleDateString('sv'),
  });
  const [isMvp, setIsMvp] = useState(false);

  useEffect(() => {
    if (!id) { 
      navigate('/');
      return;
    } else if (id !== 'new' && !oldSelectedCar) getData('vehicles', { id }).then( ({ data }) => setSelectedCar(data[0]));
    calculateIsMvp()
  }, [])

  async function calculateIsMvp() {
    const { data } = await getData('rental-events', { customerId: context.user.id });
    if (!data || !data.length) return;

    const sixtyDaysAgo = new Date().setDate(new Date().getDate() - 60);
    const dates = data.map(event => new Date(event.end));
    let eventsInPastSixtyDays = 0;
    
    for(let date of dates ) {
      if (date > sixtyDaysAgo) eventsInPastSixtyDays++;
      if (eventsInPastSixtyDays > 2) {
        setIsMvp(true);
        return;
      }
    }
  }

  function validateDates() {
    const start = new Date(formValue.start);
    const end = new Date(formValue.end);
    
    if (start < new Date().setHours(0, 0, 0, 0)) return false; // Start is before today
    if (start >= end) return false;
    if (end > new Date().setMonth(new Date().getMonth() + 1)) return false; // end is after over 1 month

    return true;
  }

  function getNumberOfDays() {
    const start = new Date(formValue.start);
    const end = new Date(formValue.end);
    return (end - start) / (1000 * 3600 * 24) ;
  }

  function getDiscount() {
    if (isMvp) return 15;
    const days = getNumberOfDays();
    if (days >= 10) return 10;
    if (days >= 5) return 7;
    if (days >= 3) return 5;
    return 0;
  }

  function getTotal() {
    const days = getNumberOfDays();
    const discount = getDiscount();
    const pricePerDay = selectedCar.price - (selectedCar.price * discount / 100);
    return (pricePerDay * days).toFixed(2);
  }

  async function rent() {
    const body = { 
      start: formValue.start,
      end: formValue.end,
      vehicleId: selectedCar.id,
      customerId: context.user.id 
    };

    await postData('rental-events', body);
    selectedCar.count -= 1;
    await patchData('vehicles', selectedCar);
    navigate('/');
  }

  return (
    <div className='Rent'>
      <div className='container-xl'>
        <Post data={selectedCar} isPreview={true} />
        <form className='card'>
          <div className='dates card-header'>
            <div className='mb-3'>
              <label htmlFor='start-date' className='col-form-label'>Start date:</label>
              <input type='date' className='form-control' id='start-date' value={formValue.start} onChange={({ target: { value: start } }) => setFormValue({ ...formValue, start }) } />
            </div>
            <div className='mb-3'>
              <label htmlFor='end-date' className='col-form-label'>End date:</label>
              <input type='date' className='form-control' id='end-date' value={formValue.end} onChange={({ target: { value: end } }) => setFormValue({ ...formValue, end }) } />
            </div>
          </div>
          <div className='card-body'>
            { !validateDates() && <p className='text-danger'>Invalid dates! Start date must be today or in the future and End date must be after start date and at most 1 month in the future!</p> }
            <p>Price per day: <b className='text-primary'>${ selectedCar.price }</b></p>
            <p>Amount of days: <b className='text-primary'>{ getNumberOfDays() }</b></p>
            <p>Current discount: <b className='text-primary'>{ getDiscount() }%</b></p>
            <p className='info-text'><i className='bi bi-info-square-fill text-primary'></i>
              { isMvp ? ' You have the MVP discount of 15% since you rented 3 times in the last 60 days' : ' 5% over 3 days, 7% over 5 days and 10% over 10 days' }
            </p>
          </div>
          <div className='card-footer'>
            { validateDates() 
              ?<b className='total'>Total: 
                { !!getDiscount() && <span className='text-danger text-decoration-line-through'> ${ (selectedCar.price * getNumberOfDays()).toFixed(2) }</span> }
                <span> ${ getTotal() }</span>
              </b>
              :<b className='total'>Total: <span className='text-danger'>Invalid Dates</span></b>
            }
          </div>
        </form>

        <button className='btn btn-primary' disabled={!validateDates()} onClick={rent}>Rent</button>
        <p className='info-text'><i className='bi bi-info-square-fill'></i> You will be able to pay at pick up</p>
      </div>
    </div>
  )
}

export default Rent;