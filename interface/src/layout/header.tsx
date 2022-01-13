import { FaPowerOff } from 'react-icons/fa';
import { HiDotsHorizontal } from 'react-icons/hi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useObservable } from 'react-use';
import orderService from '../services/order.service';
import { IoMdAdd } from 'react-icons/io';
import { useEffect, useState } from 'react';
function setDate(dateInfo: Date) {
  const day_index = dateInfo.getDay();
  let day_in_letter = '';
  let day_in_number = dateInfo.getDate();
  switch (day_index) {
    case 0:
      day_in_letter = 'Sun';
      break;
    case 1:
      day_in_letter = 'Mon';
      break;
    case 2:
      day_in_letter = 'Tue';
      break;
    case 3:
      day_in_letter = 'Wed';
      break;
    case 4:
      day_in_letter = 'Thu';
      break;
    case 5:
      day_in_letter = 'Fri';
      break;
    case 6:
      day_in_letter = 'Sat';
      break;
  }
  const month = dateInfo.getMonth() + 1;
  const hours = dateInfo.getHours();
  const minutes = dateInfo.getMinutes();

  const res = day_in_letter + ' ' + day_in_number + ' / ' + month + ' ' + hours + ':' + minutes;
  return res;
}

export default function Header() {
  const dateInfo = new Date();
  const [dateValue, setDateValue] = useState(setDate(dateInfo));
  useEffect(() => {
    setInterval(() => setDateValue(setDate(new Date())), 1000);
  }, []);
  const orders = useObservable(orderService.ordersList$);
  const navigate = useNavigate();
  const active = useParams()['id'];
  const createOrder = () => {
    const id = orderService.createOrder();
    navigate(`/order/${id}`);
  };
  return (
    <header className='h-14 bg-gray-500 p-5 flex items-center text-white justify-between'>
      <HiDotsHorizontal size={22} />
      <div className='flex space-x-4 items-center'>
        <div className="flex" style={{ maxWidth: '550px', overflowX: 'scroll' }}>
          {orders?.map((order) => (
            <Link key={order} to={`/order/${order}`}>
              <div
                style={{ justifyContent: 'center', minWidth: '90px' }}
                className={`m-3 px-3 h-9 flex items-center bg-opacity-20 bg-white ${order == active && 'primary border border-white'}
                          rounded hover:bg-opacity-40 cursor-pointer hover:text-white`}
              >
                Clt #{order}
              </div>
            </Link>
          ))}
        </div>
        <div
          onClick={createOrder}
          className='px-5 h-9 flex items-center bg-opacity-20 bg-white rounded hover:bg-opacity-40 cursor-pointer hover:text-white'
        >
          Nouveau client
        </div>
        <div className='date'>{dateValue}</div>
        <Link to='/'>
          <FaPowerOff size={22} />
        </Link>
      </div>
    </header>
  );
}
