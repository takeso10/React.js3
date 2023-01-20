import {React,useState,useEffect} from 'react'
import {useForm} from 'react-hook-form'
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import { url } from '../const'
import { useCookies } from 'react-cookie'
import{useNavigate} from 'react-router-dom'

export function ReviewForm(props){
    const [errorMessage, setErrorMessage] = useState('')
    const {register, handleSubmit,formState: { errors }}=useForm();
    const [cookies] = useCookies()
    const navigate = useNavigate()
    const [bookData,setBookData]=useState([])
    console.log(props)
    const onSubmit=(data)=>{
        if(props.bookData.reviewData.title===null){
            axios
            .post(`${url}books`,data,{
            headers:{
                authorization:`Bearer ${cookies.token}`
            }})
            .then(()=>{
                navigate('/')
            })
            .catch((err)=>{
                setErrorMessage(`レビューの投稿に失敗しました。 ${err}`)
            })
        }
        else{
            axios 
            .put(`${url}books/${props.bookData.reviewData.reviewid}`,data,{
                headers:{
                    authorization:`Bearer ${cookies.token}`
                }})
            .then(()=>{
                navigate('/')
            })
            .catch((err)=>{
                setErrorMessage(`レビューの更新に失敗しました。 ${err}`)
            })
        }

    }

    
    const deleteReview=()=>{
        axios
            .delete(`${url}books/${props.bookData.reviewData.reviewid}`,{
                headers:{
                    authorization:`Bearer ${cookies.token}`
            }})
            .then(()=>{
                navigate('/')
            })
            .catch((err)=>{
                setErrorMessage(`レビューの更新に失敗しました。 ${err}`)
            })
    }

    return(
        <main className='edit-review'>
                <h2>書籍レビュー編集</h2>
                <p className='error-message'>{errorMessage}</p>
                <form className='review-form' onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor='title'>タイトル</label>
                    <br/>
                    <input
                        type='text'
                        placeholder='title'
                        className='title-input'
                        defaultValue={props.bookData.reviewData.title}
                        {...register('title',{
                            reequired:{
                                value:true,
                                message:'入力が必須の項目です。',
                            }
                    })}/>
                    {errors.title && <div>入力が必須の項目です</div>}                
                    <br/>
                    <label htmlFor='url'>url</label>
                    <br/>
                    <input
                        type='text'
                        placeholder='url'
                        className='url-input'
                        defaultValue={props.bookData.reviewData.url}
                        {...register('url',{
                            required:{
                                value:true,
                                message:'入力が必須の項目です。',
                        }
                    })}/>
                    {errors.url && <div>入力が必須の項目です</div>} 
                    <br/>
                    <label htmlFor='detail'>詳細</label>
                    <br/>
                    <textarea
                        type='text'
                        placeholder='detail'
                        className='detail-input'
                        defaultValue={props.bookData.reviewData.detail}
                        {...register('detail',{
                            required:{
                                value:true,
                                message:'入力が必須の項目です。',
                        }
                    })}/>
                    {errors.detail && <div>入力が必須の項目です</div>} 
                    <br/>
                    <label htmlFor='review'>レビュー</label>
                    <br/>
                    <textarea
                        type='text'
                        placeholder='review'
                        className='review-input'
                        defaultValue={props.bookData.reviewData.review}
                        {...register('review',{
                            required:{
                                value:true,
                                message:'入力が必須の項目です。',
                        }
                    })}/>
                    <br/>
                    {errors.review && <div>入力が必須の項目です</div>}
                    {props.bookData.reviewData.title===null
                        ?<button className='new-review-button'>作成</button>
                        :<button className='new-review-button'>更新</button>
                    }
                </form>
                {props.bookData.reviewData.title===null
                    ?<></>
                    :<button className='delete-review' onClick={deleteReview}>削除</button>
                }
            </main>
    )
}