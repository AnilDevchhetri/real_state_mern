import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';
const Oauth = () => {

   const handleGoogleClick = async () =>{
    try {
        const provider = new GoogleAuthProvider();
        const auth  = getAuth(app);

        const result = await signInWithPopup(auth, provider)
        const res = await fetch('/api/auth/google',{
            method:"POST",
            headers
        })
    } catch (error) {
        console.log(error)
    }
   }


  return (
    <button onClick={handleGoogleClick} type='button' className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
        Contiue with Google
    </button>
  )
}

export default Oauth