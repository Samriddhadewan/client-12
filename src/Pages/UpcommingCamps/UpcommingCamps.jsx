// src/components/UpcomingCamps.jsx

import toast from "react-hot-toast";

const UpcomingCamps = () => {
  const camps = [
    {
      id: 1,
      title: "Health Camp - Rangamati",
      date: "May 20, 2025",
      services: "General checkup, eye test, free medicine",
    },
    {
      id: 2,
      title: "Women Health Camp - Chittagong",
      date: "June 1, 2025",
      services: "Gynecology, maternal health, awareness session",
    },
    {
      id: 3,
      title: "Childcare Camp - Khagrachari",
      date: "June 15, 2025",
      services: "Pediatric checkup, nutrition guidance",
    },
  ];

  return (
    <section className="bg-white py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold  mb-4">
          Upcoming Medical Camps
        </h2>
        <p className="text-gray-600 mb-8">
          Stay updated with our latest medical camps organized to serve
          communities across different locations. Get free checkups,
          consultations, and medicines from licensed professionals.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {camps.map((camp) => (
            <div
              key={camp.id}
              className="border rounded-xl p-5 shadow-sm hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-green-700">
                {camp.title}
              </h3>
              <p className="text-sm text-gray-500">Date: {camp.date}</p>
              <p className="mt-2 text-gray-600">{camp.services}</p>
              <button onClick={()=>toast("register will be coming soon")} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Register
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingCamps;
