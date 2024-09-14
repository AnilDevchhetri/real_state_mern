import { useRef, useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable}  from 'firebase/storage'
import { app } from '../firebase'
import { updateUserStart,updateUserSuccess,updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, signOutUserFailure, signOutUserSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
const Profile = () => {
  const fileRef = useRef(null)
  const {currentUser,loading,error} = useSelector((state)=>state.user)
  const [file,setFile] = useState(undefined)
  const  [filePerc,setFilePerc] = useState(0)
  const [fileUploadError,setFileUploadError]  = useState(false)
  const [formData, setFormData] = useState({})
  const [updateSuccess,setUpdateSuccess] = useState(false)
  const dispatch = useDispatch();


   useEffect(() =>{
    if(file){
      handleFileUpload(file);
    }
  },[file])
  console.log(currentUser._id)
  const handleFileUpload = (file)=>{
    const storage =  getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef =  ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef,file);
  
    uploadTask.on('state_changed',
      (snapshot)=>{
        setFileUploadError(false)
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes)* 100;
        setFilePerc(Math.round(progress))
       
      },
      (error)=>{
        setFileUploadError(true)
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then
        ((download)=>{
           setFormData({...formData,avatar:download})
           setFileUploadError(false)
        })
      }
    )

  }
  const handleChange = (e) =>{
    setFormData({...formData, [e.target.id]:e.target.value})
  }


  const handleSubmit = async (e) =>{
    e.preventDefault();
    try { 
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data)
      if(data.success === false){
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }
  const handleDeleteUser = async () =>{
    try {
      dispatch(deleteUserStart())
      const res  = await fetch(`/api/user/delete/${currentUser._id}`,{
        method:"DELETE",
      });
      const data =  await res.json();
      if(data.success === false){
        dispatch(deleteUserFailure(data.message))
        return
      }
      dispatch(deleteUserSuccess(data))
       
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignOut = async() =>{
    try {
      dispatch(signOutUserStart())
      const  res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success === false){
        dispatch(signOutUserFailure(data.message))
        return
      }
      dispatch(signOutUserSuccess(data))
    } catch (error) {
      dispatch(signOutUserFailure(data.message))
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="file" ref={fileRef} hidden accept='image/*' onChange={(e)=>setFile(e.target.files[0])}/>
        <img src={formData.avatar || currentUser.avatar} alt="" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' onClick={()=>fileRef.current.click()} />
        <p className='text-sm self-center'>{
          fileUploadError ?
          <span className='text-red-700'>Error Image Upload(Image cant be larger than 2MB)</span>
          :filePerc > 0 && filePerc < 100 ? <span className='text-green-700'>`Uploading ${filePerc}%`</span>
          :filePerc ===  100 ?<span className='text-green-700'>Image Uploaded</span>
          :''
          }</p>
        <input type="text"placeholder='User name' defaultValue={currentUser.username} onChange={handleChange} className='border p-3 rounded-lg'  id='username'/>
        <input type="email"placeholder='Email' defaultValue={currentUser.email} onChange={handleChange} className='border p-3 rounded-lg'  id='email'/>
        <input type="password"placeholder='password ' className='border p-3 rounded-lg' onChange={handleChange} id='password' />
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-85'>
          {loading ? 'Loading...':'Update'}
        </button>
        <Link to={'/create-listing'} className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95' >Create Property</Link>
      </form>
      <div className='flex justify-between mt-5'>
         <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
         <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>SignOut</span>
      </div>
      <p className='text-red-700 mt-5'>{error ? error: ''}</p>
      <p className='text-green-700 mt-5'>{updateSuccess ? "Profile Updated": ''}</p>
    </div>
  )
}

export default Profile