import {React, useState, useEffect} from 'react'
import './ReviewDetail.scss'
import {Header} from '../components/Header'
import { useLocation } from 'react-router-dom';
import {Loading} from './Loading'

export function ReviewDetail (){
    const state = useLocation().state
    const [resData, setResData ] = useState([]);
    const [isLoading,setIsLoading]=useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(()=>{
        setIsLoading(true)
        setResData(state.reviewData)
        setIsLoading(false)
        console.log(state)
    },[])
    
    return(
        <>
        <Header/>
        {isLoading ? <Loading/>
        :(
        <main>
            <h2>レビュー詳細</h2>
            <p className="error-message">{errorMessage}</p>
            <div className='review'>
                <label htmlFor="title" className='titleLabel'></label>
                <h1 className='review-title'>{resData.title}</h1>
                <label htmlFor="url">URL：</label>
                <a href={resData.url} className='bookURL'>{resData.url}</a>
                <br/>
                <label htmlFor="detail" className='detailLabel'>詳細</label>
                <p>{resData.detail}</p>
                <br/>
                <label htmlFor="review" className='reviewLabel'>レビュー</label>
                <p className='review'>{resData.review}</p>
                <br/>
                <label htmlFor="reviewer"className='reviewerLabel'>作成者</label>
                <p>{resData.reviewer}</p>
            </div>
        </main>
        )}
        </>
    )
}