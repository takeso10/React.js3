import React, { useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import { Header } from '../components/Header'
import './Login.scss'
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../authSlice'
import { url } from '../const'
import { useForm } from 'react-hook-form'


export function Login() {
    const auth = useSelector((state) => state.auth.isSignIn)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState()
    const [cookies, setCookie] = useCookies()
    const {register, handleSubmit,formState: { errors }}=useForm();

    const onSignIn = (data) => {
      axios
        .post(`${url}signin`,data)
        .then((res) => {
          setCookie('token', res.data.token)
          console.log(cookies)
          dispatch(signIn())
          navigate('/')
        })
        .catch((err) => {
          setErrorMessage(`サインインに失敗しました。${err}`)
        })
    }

    if (auth) return <Navigate to="/" />

    return (
        <>
        <Header/>
        <main className="login-form">
            <h2>ログイン</h2>
            <p className="error-message">{errorMessage}</p>
            <form className='signup-form' onSubmit={handleSubmit(onSignIn)}> 
                <label htmlFor="email-input">メールアドレス</label>
                <br />
                <input
                    type="email"
                    id="email-input"
                    placeholder="email"
                    className="email-input"
                    {...register('email',{
                        required:{
                            value:true,
                            message:'入力が必須の項目です。',
                        }
                    })}
                />
                {errors.email && <div>入力が必須の項目です</div>}
                <br />
                <label htmlFor="password-input">パスワード</label>
                <br/>
                <input
                    type="password"
                    id="password-input"
                    placeholder="password"
                    className="password-input"
                    {...register('password',{
                        required:{
                            value:true,
                            message:'入力が必須の項目です。'
                        },
                        minLength:{
                            value:8,
                            message:'8文字以上入力してください。'
                        }

                    })}
                />
                {errors.password && <div>入力が必須の項目です</div>}
                <br />
                <button type="submit" className="signin-button" onClick={onSignIn}>login</button>
            </form>
            <Link to="/signup" className="new-account">新規作成</Link>
        </main>
        </>
    )
}