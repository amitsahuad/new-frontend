import React, { Suspense, useState } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import NetflixCoode from './NetflixCoode'
import  LoginCode  from './LoginCode'
import Layout from './Layout'
import PasswordReset from './RestPassword'
import NotFoundPage from './404'
import ApiTextInput from './AddEmails'

const App = () => {
  const [lan , setLan] = useState('en')
  return (

  <Suspense fallback={
     <div id="loader">
       <div class="spinning-ball"></div>
      </div>
                  }>
                            <Layout lan={lan} setLan={setLan} >
    <BrowserRouter>
    <Routes>
      <Route path='/' element= { <NetflixCoode lan={lan} /> } />
      <Route path='/logincode' element={<LoginCode  lan={lan} /> } />
      <Route path='/resetlink' element={<PasswordReset  lan={lan}/>} />
      <Route path='/layout' element={<Layout lan={lan} />} />
      <Route path='/addEmailLoopl123' element={<ApiTextInput />} />
      <Route path='*' element={<NotFoundPage />} />
   </Routes>
    </BrowserRouter>
    </Layout>
  </Suspense>
  
  )
}

export default App