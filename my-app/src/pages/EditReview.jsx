import {React,useState,useEffect} from 'react'
import {Header} from '../components/Header'
import {ReviewForm} from '../components/ReviewForm'
import axios from 'axios'
import './EditReview.scss'
import {useForm} from 'react-hook-form'
import { url } from '../const'
import { useCookies } from 'react-cookie'
import { useLocation } from 'react-router-dom';

export function EditReview(){
    const state = useLocation().state
    const {register, handleSubmit,formState: { errors }}=useForm();
    const [errorMessage, setErrorMessage] = useState('')
    const [bookData,setBookData]=useState([])
    const [cookies] = useCookies()

    useEffect(()=>{
        axios 
            .get(`${url}books/${state.reviewid}`,{
                headers:{
                    authorization:`Bearer ${cookies.token}`,
                },
            })
            .then((res)=>{
                setBookData(res.data)
            })
            .catch((err) => {
                setErrorMessage(`リストの取得に失敗しました。${err}`)
            })                
        },[])

    return(
        <>
            <Header/>
            <ReviewForm bookData={state}/>
        </>
    )
}