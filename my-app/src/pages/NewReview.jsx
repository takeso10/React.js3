import React ,{useState} from 'react'
import axios from 'axios'
import './NewReview.scss'
import {Header} from '../components/Header'
import {useForm} from 'react-hook-form';
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { url } from '../const'
import { useCookies } from 'react-cookie'
import {ReviewForm} from '../components/ReviewForm'


export const NewReview=()=>{
    const {register, handleSubmit,formState: { errors }}=useForm();
    const bookData={reviewData:{title:null,url:null,detail:null,review:null}}

    return(
        <>
        <Header/>
        <ReviewForm bookData={bookData}/>
        </>
    )
}