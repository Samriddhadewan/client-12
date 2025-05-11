import { format } from 'date-fns'
import { Link } from 'react-router-dom'

const CampCard = ({camps}) => {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
  <figure className="">
    <img
      src={camps?.photo_url}
      alt="Shoes"
      className="rounded-lg  h-[220px] w-full object-cover"/>
  </figure>
  <div className=" p-4">
    <h2 className="card-title">{camps?.camp_name}</h2>
    <p className='text-gray-500 my-1 '>{camps?.description}</p>
    <p className='text-gray-500'><span className='text-gray-800 font-semibold'>Fees</span>: {camps?.fees} $</p>
    <p className='text-gray-500 my-1'><span className='text-gray-800 font-semibold  '>Date</span>: {format(new Date(camps?.date), 'MMMM dd, yyyy')}</p>
    <p className='text-gray-500'><span className='text-gray-800 font-semibold'>Time</span>: {camps?.time}</p>
    <p className='text-gray-500'><span className='text-gray-800 font-semibold'>participant Count</span>: {camps?.participant_count}</p>
    <div className="flex justify-center items-center mt-2 ">
        <Link to={`/camp/${camps?._id}`}>
      <button className="btn mt-2 mx-auto bg-[#0E7A81] text-white">Details</button>
        </Link>
    </div>
  </div>
</div>
  )
}

export default CampCard