import React from 'react'
import ReactDOM from 'react-dom/client'
import {Route, Routes,BrowserRouter, ScrollRestoration} from "react-router-dom"
import Layout from './Layout/Layout.jsx'
import Home from './Home.jsx'
import Login  from './UserAuth/Login.jsx'
import SignUp from './UserAuth/SignUp.jsx'	
import AllList from './SneakerList/AllList.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import MenList from './SneakerList/MenList.jsx'
import WomenList from './SneakerList/WomenList.jsx'
import KidsList from './SneakerList/KidsList.jsx'
import DetailedView from './DetailedView/DetailedView.jsx'
import SearchedList from './SneakerList/SearchedList.jsx'
import FavoritesList from './ProductsTable/FavoritesList.jsx'
import CartList from './ProductsTable/CartList.jsx'
import RunningList from './SneakerList/RunningList.jsx'
import CasualList from './SneakerList/CasualList.jsx'
import FootballList from './SneakerList/FootballList.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Layout />}>

          <Route index element={<Home />} />

          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />

          <Route path="sneakers" element={<AllList />} />
          <Route path="men" element={<MenList/>} />
          <Route path='women' element={<WomenList/>} />
          <Route path="kids" element={<KidsList />} />
          <Route path="running" element={<RunningList />} />
          <Route path="casual" element={<CasualList />} />
          <Route path="football" element={<FootballList />} />

          <Route path='sneaker/:productId' element={<DetailedView/>}/>
          <Route path='search/:term' element={<SearchedList/>}/>
          <Route path=':userId/favorites' element={<FavoritesList/>}/>
          <Route path=':userId/cart' element={<CartList/>}/>
          <Route path="*" element={<h1>Not Found</h1>} />

        </Route>

      </Routes>

    </BrowserRouter>
)
