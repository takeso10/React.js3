import axios from 'axios'
import {React,useEffect,useState} from 'react'
import { useCookies } from 'react-cookie'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { useNavigate} from 'react-router-dom'
import { signOut } from '../authSlice'
import './Header.scss'
import { url } from '../const'

export function Header(){
  const auth = useSelector((state) => state.auth.isSignIn)
  const [userdata,setUserData]=useState({name:'t'})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies()
  const [errorMessage, setErrorMessage] = useState('')
  const handleSignOut = () => {
    dispatch(signOut())
    removeCookie('token')
    navigate('/React.js3/login')
  }

  const handleLogin=()=>{
    navigate('/React.js3/login')
  }



  useEffect(()=>{
    axios
    .get(`${url}users`,{
      headers:{
        authorization:`Bearer ${cookies.token}`,
      },
    })
    .then((res)=>{
      setUserData(res.data)
      console.log(res.data.name)
    })
    .catch((err) => {
      setErrorMessage(`リストの取得に失敗しました。${err}`)
    })
  },[])

  return (
    <header className="header">
      <h1>書籍レビューアプリ</h1>
      {auth ? (
        <>
          <p>{userdata.name} さん</p>
          <button onClick={()=>{navigate('/React.js3/profile')}} className="edit-button">ユーザー情報編集</button>
          <button onClick={handleSignOut} className="signout-button">
          サインアウト
          </button>
        </>
      ) :(
        <button onClick={handleLogin} className="login-button">
          ログイン</button>
      )}
    </header>
  )
}
