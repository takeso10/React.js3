import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { url } from '../const'
import { Header } from '../components/Header'
import { useCookies } from 'react-cookie'
import {useForm} from 'react-hook-form';
import './Profile.scss'

export function Profile(){
    const [errorMessage, setErrorMessage] = useState('')
    const [name,setName]=useState('')
    const [cookies, setCookie] = useCookies()
    const {register, handleSubmit,formState: { errors }}=useForm();

    useEffect(()=>{
        axios
        .get(`${url}users`,{
          headers:{
            authorization:`Bearer ${cookies.token}`,
          },
        })
        .then((res)=>{
          setName(res.data.name)
          console.log(res.data.name)
        })
        .catch((err) => {
          setErrorMessage(`リストの取得に失敗しました。${err}`)
        })
      },[])

    function onSubmit(data) {
        axios
            .put(`${url}users`, data,{
                headers:{
                    authorization:`Bearer ${cookies.token}`,
                },
            })
            .catch((err) => {
                setErrorMessage(`サインアップに失敗しました。 ${err}`)
            })
    }
   
    return(
        <>
        <Header/>
        <main>
            <h2>ユーザー情報編集</h2>
            <p className="error-message">{errorMessage}</p>
            <br/>
            <form className="userData-update" onSubmit ={handleSubmit(onSubmit)}>
                <label htmlFor='username'>ユーザー名</label>
                <br />
                <input
                    type="text"
                    placeholder="username"
                    defaultValue={name}
                    onChange={(e)=>setName(e.target.value)}
                    className="name-input" 
                    {...register('name',{
                        required:{
                            value:true,
                            message:'入力が必須の項目です。'
                        }
                    })}/>
                <br/>
                <button type="submit"  className="signup-button">更新</button>
            </form>
        </main>
        </>
    )
}