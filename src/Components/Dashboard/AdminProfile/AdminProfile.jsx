import React from 'react'
import useAuth from '../../../Hooks/useAuth'
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();
  const {user,handleUpdateUser} = useAuth();
 
  // the time section 
  const hour = new Date().getHours();
  let timeGreeting = 'Hello';
  if (hour < 12) timeGreeting = 'Good Morning';
  else if (hour < 18) timeGreeting = 'Good Afternoon';
  else timeGreeting = 'Good Evening';


  const handleSubmit =(e)=>{
    e.preventDefault()
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const contact = form.contact.value
    const updateData = {
      name,photo,contact
    }

    axiosSecure.patch(`/update-user/${user?.email}`, updateData)
    .then(res=>{
      if(res.data.modifiedCount > 0){
        toast.success("profile updated Success")
        handleUpdateUser(name,photo,contact)
        .then(()=>{

        })
      }
    })



  }




  return (
    <div>
       <div className="bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 p-6 rounded-xl shadow-lg w-fit mx-auto my-8 text-center border-2 border-white">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-red-500 to-orange-400 drop-shadow-lg">
        {timeGreeting}, {user?.displayName}! 👋
      </h2>
      <p className="mt-2 text-lg text-purple-800 font-medium">
        Hope you're having a <span className="text-pink-600 font-semibold">wonderful</span> day!
      </p>
    </div>
      
      <div className='w-full'>
        <form 
        onSubmit={handleSubmit} 
        className="space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold">Update Your Profile</h2>
      <input
        type="text"
        name="name"
        defaultValue={user?.displayName}
        // value={profile.name}
        // onChange={handleChange}
        placeholder="Your Name"
        className="input input-bordered w-full"
      />
      <input
        type="text"
        name="photo"
        defaultValue={user?.photoURL}
        // value={profile.photo}
        // onChange={handleChange}
        placeholder="Photo URL"
        className="input input-bordered w-full"
      />
      <input
        type="number"
        name="contact"
        defaultValue={user?.phoneNumber}
        // value={profile.contact}
        // onChange={handleChange}
        placeholder="Contact Number"
        className="input input-bordered w-full"
      />
      <button type="submit" className="btn btn-primary w-full">
        Save Changes
      </button>
    </form>
      </div>
    </div>
  )
}

export default AdminProfile