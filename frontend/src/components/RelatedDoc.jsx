import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoc = ({ docId, speciality }) => {
  const { doctors } = useContext(AppContext);

  const [relDoc, setRelDoc] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );

      setRelDoc(doctorData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 px-5'>
      <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
      <p className='sm:w-1/3 text-center text-gray-600 text-sm'>
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 pt-5'>
        {relDoc.slice(0, 5).map((doctor, idx) => (
          <div
            onClick={() => {navigate(`/appointment/${doctor._id}`); scrollTo(0,0)}}
            key={idx}
            className='border border-gray-200 rounded-2xl shadow-lg bg-white overflow-hidden 
                     cursor-pointer transition-transform transform hover:-translate-y-2'
          >
            <div className='bg-blue-50 p-4 flex justify-center'>
              <img
                className='w-32 h-32 object-cover rounded-full'
                src={doctor.image}
                alt={doctor.name}
              />
            </div>
            <div className='p-4 text-center'>
              <div className='flex items-center justify-center gap-2 text-sm text-green-500 font-medium'>
                <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                <p>Available</p>
              </div>
              <p className='text-lg font-medium text-gray-900'>{doctor.name}</p>
              <p className='text-gray-600 text-sm'>{doctor.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className='mt-6 px-5 py-2 bg-blue-100 text-gray-600 rounded-full shadow-md hover:bg-blue-50 transition'
      >
        More
      </button>
    </div>
  );
};

export default RelatedDoc;
