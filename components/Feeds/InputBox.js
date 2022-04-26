import { CameraIcon, EmojiHappyIcon, VideoCameraIcon } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { storage, db, collection, addDoc, serverTimestamp, ref, uploadString, doc, getDownloadURL, updateDoc } from '../../firebase';

function InputBox() {
  const session = useSession();
  const inputRef = useRef(null);
  const filepickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);

  const sendPost = (e) => {
      e.preventDefault();
      if(!inputRef.current.value) return;

        addDoc(collection(db, "post"), {
          message: inputRef.current.value,
          name: session.data.user.name,
          email: session.data.user.email,
          image: session.data.user.image,
          timestamp: serverTimestamp()
        }).then(docu => {
            if(imageToPost) {
                const docRef = doc(db, "post", docu.id)

                const storageRef = ref(storage, `post/${docu.id}`)
                const uploadTask = uploadString(storageRef, imageToPost, 'data_url');
                removeImage();

                uploadTask.then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((downloadURL) => {
                        updateDoc(docRef, {
                            postImage: downloadURL
                        })
                    });
                })
            }
        })
        inputRef.current.value = "";
  }

  const addImageToPost = (e) => {
      const reader = new FileReader();
      if(e.target.files[0]) {
          reader.readAsDataURL(e.target.files[0]);
      }
      reader.onload = (readerEvent) => {
          setImageToPost(readerEvent.target.result);
      }
  }

  const removeImage = () => {
      setImageToPost(null);
  }

  return (
    <div className='bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6'>
        <div className='flex space-x-4 items-center pb-2'>
            <Image 
                className='rounded-full'
                src={session.data.user.image}
                width={40}
                height={40}
                layout="fixed"
            />
            <form className='flex flex-1'>
                <input 
                    type="text" 
                    ref={inputRef}
                    placeholder={`What's on your mind, ${(session.data.user.name).split(" ")[0]}?`} 
                    className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
                />
                <button hidden type='submit' onClick={sendPost}>
                    Submit
                </button>
            </form>

            {imageToPost && (
                <div onClick={removeImage} className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer">
                    <img className='h-10 object-contain' src={imageToPost} alt=""/>
                    <p className='text-xs text-red-500 text-center'>Remove</p>
                </div>
            )}
        </div>

        <div className='flex justify-evenly border-t'>
            <div className='inputIcon'>
                <VideoCameraIcon className='h-7 text-red-500' />
                <p className='text-xs sm:text-sm xl:text-base'>Live Video</p>
            </div>

            <div onClick={()=> filepickerRef.current.click()} className='inputIcon'>
                <CameraIcon className='h-7 text-green-400' />
                <p className='text-xs sm:text-sm xl:text-base'>Photo/Video</p>
                <input
                    type="file"
                    hidden
                    onChange={addImageToPost}
                    ref={filepickerRef}
                />
            </div>

            <div className='inputIcon'>
                <EmojiHappyIcon className='h-7 text-yellow-300' />
                <p className='text-xs sm:text-sm xl:text-base'>Feeling/Activity</p>
            </div>
        </div>
    </div>
  )
}

export default InputBox
