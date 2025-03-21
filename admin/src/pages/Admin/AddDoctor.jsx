import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [about, setAbout] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  
    if (!docImg) {
      return toast.error("Please upload doctor image");
    }
  
    if (!name || !email || !password || !degree || !address1 || !address2 || !about) {
      return toast.error("Please fill in all the required fields.");
    }
  
    if (isNaN(fees) || fees <= 0) {
      return toast.error("Please enter valid fees.");
    }
  
    try {
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("address", JSON.stringify({ line1: address1, line2: address2 }));
      formData.append("about", about);
  
      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });
  
      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        { headers: { aToken: aToken } }
      );
  
      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setFees("");
        setDegree("");
        setAddress1("");
        setAddress2("");
        setAbout("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };
  
  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Add Doctor</p>

      <div
        className='bg-white py-8 px-8 border-none rounded w-full max-w-4xl max-h-[80vh]
       overflow-y-scroll'
      >
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor='doc-img'>
            <img
              className='w-16 h-16 bg-gray-100 rounded-full cursor-pointer object-cover'
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt='Doctor'
            />
          </label>
          <input
            type='file'
            id='doc-img'
            accept='image/*'
            hidden
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setDocImg(e.target.files[0]);
              }
            }}
          />
          <p>Upload Doctor Picture</p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className='border rounded px-3 py-2'
                type='text'
                placeholder='Name'
                required
              />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className='border rounded px-3 py-2'
                type='email'
                placeholder='Email'
                required
              />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className='border rounded px-3 py-2'
                type='password'
                placeholder='Password'
                required
              />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Experience</p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className='border rounded px-3 py-2'
                name=''
              >
                <option value='1 Year'>1 Year</option>
                <option value='2 Year'>2 Year</option>
                <option value='3 Year'>3 Year</option>
                <option value='4 Year'>4 Year</option>
                <option value='5 Year'>5 Year</option>
                <option value='6 Year'>6 Year</option>
                <option value='7 Year'>7 Year</option>
                <option value='8 Year'>8 Year</option>
                <option value='9 Year'>9 Year</option>
                <option value='10 Year'>10 Year</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Fees</p>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className='border rounded px-3 py-2'
                type='number'
                placeholder='Fees'
                required
              />
            </div>
          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Speciality</p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className='border rounded px-3 py-2'
                name=''
              >
                <option value='General physician'>General physician</option>
                <option value='Gynecologist'>Gynecologist</option>
                <option value='Dermatologist'>Dermatologist</option>
                <option value='Pediatricians'>Pediatricians</option>
                <option value='Neurologist'>Neurologist</option>
                <option value='Gastroenterologist'>Gastroenterologist</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Education</p>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                className='border rounded px-3 py-2'
                type='text'
                placeholder='Education'
                required
              />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Address</p>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className='border rounded px-3 py-2'
                type='text'
                placeholder='Address 1'
                required
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className='border rounded px-3 py-2'
                type='text'
                placeholder='Address 2'
                required
              />
            </div>
          </div>
        </div>

        <div>
          <p className='mt-4 mb-2'>About Doctor</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className='w--full px-4 pt-2 border rounded'
            placeholder='About Doctor'
            rows={5}
          ></textarea>
        </div>

        <button className='bg-[#5F6FFF] text-white px-10 py-3 mt-4 rounded-full'>
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
