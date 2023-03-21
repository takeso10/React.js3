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
                <Route path="React.js3" element={<Home />} />
                <Route path="React.js3/signup" element={<Navigate replace to="/"/>} />
                <Route path="React.js3/login" element={<Navigate replace to="/"/>} />
                <Route path='React.js3/profile' element={<Profile/>}/>
                <Route path='React.js3/new' element={<NewReview/>}/>
                <Route path='React.js3/detail/:id' element={<ReviewDetail/>}/>
                <Route path='React.js3/edit/:id' element={<EditReview/>}/>
              </>
            ):(
              <>
                <Route path="React.js3" element={<Navigate replace to="/login" />} />
                <Route path="React.js3/login" element={<Login />} />
                <Route path="React.js3/signup" element={<SignUp />} />
                <Route path='React.js3/profile' element={<Navigate replace to="/"/>}/>
              </>
            )}
            <Route component={NotFound} />
          </Routes>
        </BrowserRouter>
    )
}