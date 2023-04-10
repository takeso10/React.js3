import {React,useState, useEffect} from 'react'
import './Home.scss'
import { Header } from '../components/Header'
import axios from 'axios'
import { url } from '../const'
import { useCookies } from 'react-cookie'
import ReactPaginate from 'react-paginate'
import { useNavigate } from 'react-router-dom'

export function Home () {
    const navigate = useNavigate()
    const createReview=()=>{
      navigate('../new')
    }

    return(
        <div>
            <Header/>
            <main className="reviewList">
                <h1 className="reviewList-title">書籍レビュー一覧</h1>
                <button onClick={createReview} className='createReview-button'>新規レビュー作成</button>
                <div className="reviews">
                  <Reviews/>
                </div>
            </main>
        </div>
    )
}

export const Reviews =()=>{
  const [lists, setLists] = useState([])
  const [cookies] = useCookies()
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get(`${url}books?offset=0`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setLists(res.data)
      })
      .catch((err) => {
        setErrorMessage(`リストの取得に失敗しました。${err}`)
      })
},[])

  // クリック時のfunction
  const handlePageChange = (data) => {
    console.log(data)
    let page_number = data['selected']; // クリックした部分のページ数が{selected: 2}のような形で返ってくる
    console.log(page_number)
    const offset=(page_number)*10; // offsetを変更し、表示開始するアイテムの番号を変更
    axios
      .get(`${url}books?offset=${offset}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setLists(res.data)
      })
      .catch((err) => {
        setErrorMessage(`リストの取得に失敗しました。${err}`)
      })
  }

  const goReview =(e)=>{
    axios  
      .get(`${url}books/${e.currentTarget.id}`,{
        headers:{
          authorization:`Bearer ${cookies.token}`,
        },
      })
      .then((res)=>{
        console.log(res.data)
        if (res.data.isMine){
          navigate(`../edit/${res.data.id}`,{state:{reviewData:res.data}})
        }
        else{
          navigate(`../detail/${res.data.id}`,{state:{reviewData:res.data}})
        }
        axios
            .post(`${url}logs`,{selectBookId:res.data.id},{
              headers:{
                authorization:`Bearer ${cookies.token}`,
              },
            })
      })
  }

  return (
    <>
      <ul>
          <p className="error-message">{errorMessage}</p>
          {lists.map((list,key)=>{
            return(
              <div className="review-items" key={key} id={list.id} onClick={goReview}>
                <h2 className="review-items__title">タイトル：{list.title}</h2>
                <p className="review-items__url">URL：{list.url}</p>
                <h4 className="review-items__reviewer">レビュワー：{list.reviewer}</h4>
                <h3 className='review-items__review'>レビュー:{list.review}</h3>
              </div>
            )
          })}
      </ul>
      {/* ページネーションを置きたい箇所に以下のコンポーネントを配置 */}
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        pageCount={10} // 全部のページ数。端数の場合も考えて切り上げに。
        marginPagesDisplayed={1} // 一番最初と最後を基準にして、そこからいくつページ数を表示するか
        pageRangeDisplayed={3} // アクティブなページを基準にして、そこからいくつページ数を表示するか
        onPageChange={handlePageChange} // クリック時のfunction
        containerClassName={'pagination'} // ページネーションであるulに着くクラス名
        subContainerClassName={'pages pagination'}
        activeClassName={'active'} // アクティブなページのliに着くクラス名
        previousClassName={'pagination__previous'} // 「<」のliに着けるクラス名
        nextClassName={'pagination__next'} // 「>」のliに着けるクラス名
        disabledClassName={'pagination__disabled'} // 使用不可の「<,>」に着くクラス名
      />
    </>
  )
}
