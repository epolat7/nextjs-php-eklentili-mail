import axios from 'axios'
import React, { useRef, useState } from 'react'
import {CgSpinner} from 'react-icons/cg'

const Form = () => {
  const uname = useRef()
  const umail = useRef()
  const umessage = useRef()
  const sfile = useRef()
  const [ufile, setUfile] = useState()
  const [progress,setProgress]=useState(false)
  const [message,setMessage]=useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setProgress(true)
    const detail={
        name:uname.current.value,
        mail:umail.current.value,
        message:umessage.current.value,
        sfile:ufile,
        check:'777'
    }
    
    axios({
        method:"post",
        url:process.env.NEXT_PUBLIC_MAIL_URL,
        headers:{'Content-Type':'multipart/form-data'},
        data:detail
    })
    .then((res)=>{
        console.log(res.data)
        setProgress(false)
        if(res.data=="elma"){
            setMessage("Mailiniz Gönderildi")
            uname.current.value=''
            umail.current.value=''
            umessage.current.value=''
            sfile.current.value=''

        }else{
            setMessage("Hata Oluştu Tekrar Deneyiniz")
        }
    })
    .catch((err)=>{
        setMessage("Hata Oluştu Tekrar Deneyiniz")
        setProgress(false)
    })
  }


  return (
    <div>
      <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-slate-200">
        
        <form
          onSubmit={handleSubmit}
          className="bg-slate-400 p-10 w-1/2 rounded-md relative"
        >
        <div className={
            message
            ? 'mb-3 block text-center'
            : 'hidden'
        }>{message}</div>
          <input
            type="text"
            ref={uname}
            placeholder="İsim ve Soyisim"
            required
            onFocus={()=>{setMessage('')}}
          />          
          <input type="email" ref={umail} placeholder="Mailiniz" required />
          <textarea
            className="resize-none"
            cols="30"
            rows="10"
            placeholder="Mesajınız"
            required
            ref={umessage}
          ></textarea>
          <input type="file" ref={sfile} required accept="text/plain" onChange={(e)=>{setUfile(e.target.files[0])}}/>
          <button
            type="submit"
            className="bg-slate-200 hover:bg-slate-500 hover:text-white"
          >
            Gönder
          </button>
          <div className={
            progress
            ? 'absolute w-full h-full bg-black/70 left-0 top-0 rounded-md flex items-center justify-center'
            : 'hidden'
          }>
            <div className='animate-spin'><CgSpinner size={50} color={'white'} /></div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Form
