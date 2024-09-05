import React from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Chip, IconButton } from '@mui/material';

export const CartItem = () => {
  return (
    <div className='px-5'>
        <div className='lg:flex items-center lg:space-x-5'>
            <div>
                <img className='w-[5rem] h-[5rem] object-cover' src="https://media.istockphoto.com/id/1473452859/photo/tasty-cheeseburger-glass-of-cola-and-french-fries-on-wooden-tray-close-up.jpg?s=2048x2048&w=is&k=20&c=jV9XHKwVs3Os8QCbv_BTqd6GsQi8cfLDsl47937pIkA=" alt="" />
            </div>
            <div className="flex items-center justify-between lg:w-[70%]">
                <div className="space-y-1 lg:space-y-3 w-full">
                    <p>biryani</p>
                    <div className="flex justify-between items-center" >
                        <div className="flex items-center space-x-1">
                            <IconButton>
                                <RemoveCircleOutlineIcon/>
                            </IconButton>
                            <div className='w-5 h-5 text-xs flex items-center justify-center'>
                                {5}
                            </div>
                            <IconButton>
                                <AddCircleOutlineIcon/>
                            </IconButton>
                        </div>
                    </div>
                </div>
                <p>₹1252</p>
            </div>
        </div>
        <div className='pt-3 space-x-2'>
            {[1,1,1].map(()=><Chip label="bread"/>)}
        </div>
    </div>
  )
}
