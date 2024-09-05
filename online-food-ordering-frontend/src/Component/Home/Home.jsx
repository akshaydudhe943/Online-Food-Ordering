import React, { useEffect } from 'react'
import "../Home/Home.css"
import { MultiItemCarousel } from './MultiItemCarousel'
import { RestaurantCard } from '../Restaurant/RestaurantCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRestaurantsAction } from '../../State/Restaurant/Action'
const restaurants= [1,1,1,1]

export const Home = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {restaurant} = useSelector(store=>store);

  console.log("restaurant --->>",restaurant);

  useEffect(() => {
    dispatch(getAllRestaurantsAction(jwt));
  }, []);
  return (
    <div>
        <div className='pb-10'>
            <section className='banner -z-50 relative flex flex-col justify-center items-center'>
                <div className='w-[50vw] z-10 text-center'>
                    <p className='text-2xl lg:text-6xl font-bold z-10 py-5'>
                      Akshay Food
                    </p>
                    <p className='z-10 text-gray-300 text-xl lg:text-4xl'>
                      Taste the Convenience: Food, Fast and Delivered.
                    </p>
                </div>
                <div className='cover absolute top-0 right-0'>

                </div>
                <div className='fadeout'>

                </div>

            </section>
            <section className='p-10 lg:py-10 lg:px-20'>
              <p className='text-2xl font-semibold text-gray-400 py-3 pb-10' >Top Meels</p>
              <MultiItemCarousel/>
            </section>
            <section className='px-5 lg:px-20 pt-10'>
              <h1 className='text-2xl font-semibold text-gray-400 py-8'>
                Order From Our Handpicked Favorites
              </h1>
              <div className='flex flex-wrap items-center justify-around gap-5'>
                {
                  restaurants.map((item)=><RestaurantCard item={item}/>)
                }
              </div>
            </section>
        </div>
    </div>
  )
}
