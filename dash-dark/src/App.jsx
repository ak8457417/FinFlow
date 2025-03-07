import Sidebar from "./components/Sidebar"
import "./App.css"
import Dashboard from "./pages/Dashboard.jsx";
import React, {useState} from "react";
import {Routes, Route} from "react-router-dom";
import Chatbuddy from "./pages/Chatbuddy.jsx";
import Taxbuddy from "./pages/Taxbuddy.jsx";
import Goals from "./pages/Goals.jsx";
import Market from "./pages/Market.jsx";
import ChatRecord from "./pages/ChatRecord.jsx";
import Settings from "./pages/Settings.jsx";
import Analytics from "./pages/Analytics.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import {ToastContainer} from "react-toastify";
import Template from "./pages/Template.jsx";

function App() {


  return (
    <>
        <div className={'flex w-full fixed left-0 h-full'}>
            <ToastContainer />
            <Sidebar/>
            <div className={'w-full overflow-y-auto scrollbar-none'}>
                <Routes>
                    <Route path={'/'} element={<Dashboard />} />
                    <Route path={'/chat'} element={<Chatbuddy />} />
                    <Route path={'/tax'} element={<Taxbuddy />} />
                    <Route path={'/analytics'} element={<Analytics />} />
                    <Route path={'/goals'} element={<Goals />} />
                    <Route path={'/market'} element={<Market />} />
                    <Route path={'/record'} element={<ChatRecord />} />
                    <Route path={'/settings'} element={<Settings />} />
                    <Route path={'/login'} element={<Login />} />
                    <Route path={'/signup'} element={<SignUp />} />
                    <Route path={'/template'} element={<Template />} />
                </Routes>
            </div>
        </div>
    </>
  )
}

export default App

