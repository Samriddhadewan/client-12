import { useForm } from "react-hook-form";
import SectionTitle from "../../SectionTitle/SectionTitle";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UpdateCamp = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [startDate, setStartDate] = useState(
    new Date(data?.date || new Date())
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      camp_name: data?.camp_name,
      photo_url: data?.photo_url,
      fees: Number(data?.fees),
      date: data?.date,
      time: data?.time,
      location: data?.location,
      health_care_professional_name: data?.health_care_professional_name,
      participant_count: data?.participant_count || 0,
      description: data?.description,
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        camp_name: data?.camp_name,
        photo_url: data?.photo_url,
        fees: Number(data?.fees) ||0,
        date: data?.date,
        time: data?.time,
        location: data?.location,
        health_care_professional_name: data?.health_care_professional_name,
        participant_count: data?.participant_count || 0,
        description: data?.description,
      });
      setStartDate(new Date(data?.date));
    }
  }, [reset, data]);

  const onSubmit = (formData) => {
    const updateData = {
      ...formData,
      fees: Number(formData.fees),
      date: startDate,
    };
    console.log("submitted camp data", updateData);
    console.log("🧾 Submitted data:", formData);
console.log("✅ Fees value (raw):", formData.fees);
    axiosSecure.patch(`/camps/${data._id}`, updateData).then((response) => {
      console.log("response from the server", response.data);
      if (response.data.modifiedCount > 0) {
        toast.success("Camp updated successfully");
        navigate("/dashboard/manageCamp");
      }
    });
  };

  return (
    <div>
      <SectionTitle
        heading={"Update Camp"}
        subHeading={"Update Camp"}
      ></SectionTitle>

      <div>
        <div className="min-h-[80vh] flex my-7 justify-center items-center">
          <div className="card bg-base-100 w-full max-w-xl p-14 shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="">
              <h1 className="text-4xl mb-4 text-center font-bold">
                Update the Camp
              </h1>
              <fieldset className="fieldset">
                <label className="fieldset-label">Camp Name</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Enter the camp name"
                  {...register("camp_name", { required: true })}
                />
                {errors.camp_name && (
                  <span className="text-red-500">Camp name is required</span>
                )}

                <label className="fieldset-label">Photo URL</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Enter the photo URL"
                  {...register("photo_url", { required: true })}
                />
                {errors.photo_url && (
                  <span className="text-red-500">Photo URL is required</span>
                )}

                {/* camp fees  */}
                <div>
                  <label className="text-gray-700 " htmlFor="max_price">
                    camp fees
                  </label>
                  <input
                    {...register("fees", {
                      required: true,
                      valueAsNumber: true,
                      min: {
                        value: 1,
                        message: "Fees must be at least 1",
                      },
                    })}
                    type="number"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                  />
                  {errors.fees && (
                    <span className="text-red-500">Fees required</span>
                  )}
                </div>
                {/* camp fees  */}
                <div>
                  <label className="text-gray-700 " htmlFor="max_price">
                    Location
                  </label>
                  <input
                    {...register("location", {
                      required: true,
                    })}
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                  />
                  {errors.location && (
                    <span className="text-red-500">Location required</span>
                  )}
                </div>
                {/* pick a date section  */}
                <div className="flex flex-col gap-2 ">
                  <label className="text-gray-700">Date</label>

                  {/* Date Picker Input Field */}
                  <DatePicker
                    className=" p-2 rounded-md w-full border"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
                {/* time  */}
                <div>
                  <label className="text-gray-700 " htmlFor="max_price">
                    Time
                  </label>
                  <input
                    id="health_care_professional_name"
                    name="health_care_professional_name"
                    type="text"
                    {...register("time", {
                      required: true,
                    })}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                  />
                  {errors.time && (
                    <span className="text-red-500">Required</span>
                  )}
                </div>

                {/* health care profesonal name  */}
                <div>
                  <label className="text-gray-700 " htmlFor="max_price">
                    Health Care Professional Name
                  </label>
                  <input
                    id="health_care_professional_name"
                    name="health_care_professional_name"
                    type="text"
                    {...register("health_care_professional_name", {
                      required: true,
                    })}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                  />
                  {errors.health_care_professional_name && (
                    <span className="text-red-500">Required</span>
                  )}
                </div>
                {/* participant COUNT  */}
                <div>
                  <label className="text-gray-700 " htmlFor="max_price">
                    participant count
                  </label>
                  <input
                    {...register("participant_count")}
                    name="participant_count"
                    type="number"
                    readOnly
                    defaultValue={0}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2 ">
                  <label className="text-gray-700 " htmlFor="description">
                    Description
                  </label>
                  <textarea
                    className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                    name="description"
                    id="description"
                    {...register("description", { required: true })}
                  ></textarea>
                </div>
                {errors.description && (
                  <span className="text-red-500">Required</span>
                )}

                <button className="btn bg-[#0E7A81] text-white mt-4">
                  Update
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCamp;
