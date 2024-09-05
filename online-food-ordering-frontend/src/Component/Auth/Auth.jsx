import { Box, Modal } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { style } from '../Cart/Cart';
import RegisterForm from '../Auth/RegisterForm';
import LoginForm from '../Auth/loginForm';

export const Auth = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const HandleOnClose =() => {
        navigate("/");
    }
  return (
    <>
        <Modal onClose={HandleOnClose} open={
            location.pathname === '/account/register' ||
            location.pathname === '/account/login' 
        }>
            <Box sx={style}>
            {location.pathname === '/account/register'? <RegisterForm/> : <LoginForm/>}
            </Box>
        </Modal>
    </>
  )
}
