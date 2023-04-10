import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { SignUp } from '../pages/SignUp'
import { NotFound } from '../pages/NotFound'
import { Profile } from '../pages/Profile'
import { NewReview } from '../pages/NewReview'
import {ReviewDetail} from '../pages/ReviewDetail'
import {EditReview} from '../pages/EditReview'

export const Router = () => {
  const auth = useSelector((state) => state.auth.isSignIn)  

    return(
        <BrowserRouter>
          <Routes>
            {auth ?(
              <>
                <Route path="/" element={<Home />} />
                <Route path="signup" element={<Navigate replace to="/"/>} />
                <Route path="login" element={<Navigate replace to="/"/>} />
                <Route path='profile' element={<Profile/>}/>
                <Route path='new' element={<NewReview/>}/>
                <Route path='detail/:id' element={<ReviewDetail/>}/>
                <Route path='edit/:id' element={<EditReview/>}/>
              </>
            ):(
              <>
                <Route path="/" element={<Navigate replace to="login" />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                <Route path='profile' element={<Navigate replace to="/"/>}/>
              </>
            )}
            <Route component={NotFound} />
          </Routes>
        </BrowserRouter>
    )
}