import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const CampDetails = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    age: "",
    phone: "",
    gender: "",
    emergencyContact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const data = useLoaderData();
  const {
    camp_name,
    date,
    description,
    fees,
    health_care_professional_name,
    participant_count,
    photo_url,
    time,
    _id,
    location
  } = data;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const registerData = {
      camp_id: _id,
      camp_name: camp_name.trim(),
      fees,
      location,
      health_care_professional_name: health_care_professional_name.trim(),
      participant_name: user?.displayName,
      participant_email: user?.email,
      ...formData,
    };
    console.log(registerData);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl overflow-hidden mt-10">
      <img
        src={photo_url}
        alt={camp_name.trim()}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {camp_name.trim()}
        </h1>
        <p className="text-gray-600 mb-4">{description.trim()}</p>

        <div className="space-y-2 text-gray-700 text-sm">
          <p>
            <span className="font-semibold">Doctor:</span>{" "}
            {health_care_professional_name.trim()}
          </p>
          <p>
            <span className="font-semibold">Date:</span>{" "}
            {new Date(date).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold">Time:</span> {time}
          </p>
          <p>
            <span className="font-semibold">Fees:</span> ${fees}
          </p>
          <p>
            <span className="font-semibold">Location:</span> {location}
          </p>
          <p>
            <span className="font-semibold">Participants:</span>{" "}
            {participant_count}
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="mt-6 bg-[#0E7A81] text-white px-5 py-2 rounded "
        >
          Join Camp
        </button>
      </div>

      {/* Modal with smooth transition and blur */}
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out
        ${showModal ? "opacity-100 backdrop-blur-sm bg-black/30" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className={`bg-white rounded-xl p-6 w-full max-w-lg relative transform transition-all duration-300 ease-in-out
          ${showModal ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        >
          <h2 className="text-xl font-bold mb-4">Register as Participant</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <input
              type="text"
              value={camp_name.trim()}
              readOnly
              className="w-full input input-bordered"
            />
            <input
              type="text"
              value={`$${fees}`}
              readOnly
              className="w-full input input-bordered"
            />
            <input
              type="text"
              value={`${location}`}
              readOnly
              className="w-full input input-bordered"
            />

            <input
              type="text"
              value={health_care_professional_name.trim()}
              readOnly
              className="w-full input input-bordered"
            />
            <input
              type="text"
              value={user?.displayName}
              readOnly
              className="w-full input input-bordered"
            />
            <input
              type="email"
              value={user?.email}
              readOnly
              className="w-full input input-bordered"
            />
            <input
              type="number"
              name="age"
              placeholder="Your Age"
              className="w-full input input-bordered"
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="w-full input input-bordered"
              onChange={handleChange}
              required
            />
            <select
              name="gender"
              onChange={handleChange}
              required
              className="w-full input input-bordered"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="tel"
              name="emergencyContact"
              placeholder="Emergency Contact Number"
              className="w-full input input-bordered"
              onChange={handleChange}
              required
            />
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CampDetails;
