import {
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { MenuCart } from "./MenuCart";

const categories = [
  "pizza",
  "burger",
  "chinese",
  "mexican",
  "italian",
  "french",
];

const FoodTypes = [
  { label: "All", value: "all" },
  { label: "Veg", value: "vegetarian" },
  { label: "Non-Veg", value: "non-vegetarian" },
  { label: "Seasonal", value: "seasonal" },
];

const menu = [1,1,1,1,1,1];

export const RestaurantDetails = () => {
    const [food_type, setfood_type] = useState("all")
    const handleFilter = (e) => {
        console.log(e.target.value,e.target.name)
    }
  return (
    <div className="px-5 lg:px-20">
      <section>
        <h3 className="text-gray-500 py-2 mt-10">
          Home/India/Indian Fast Food
        </h3>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <img
                className="w-full h-[40vh] object-cover"
                src="https://cdn.pixabay.com/photo/2020/09/17/12/41/cafe-5579069_1280.jpg"
                alt=""
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <img
                className="w-full h-[40vh] object-cover"
                src="https://cdn.pixabay.com/photo/2017/01/26/02/06/platter-2009590_1280.jpg"
                alt=""
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <img
                className="w-full h-[40vh] object-cover"
                src="https://cdn.pixabay.com/photo/2021/03/16/10/04/street-6099209_1280.jpg"
                alt=""
              />
            </Grid>
          </Grid>
        </div>
        <div className="pt-3 pb-5">
          <h1 className="text-4xl font-semibold">Indian Fast Food</h1>
          <p className="text-gray-500 mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et,
            suscipit veritatis rem illum mollitia unde quibusdam blanditiis.
            Officiis adipisci illum, nisi temporibus quas doloremque
            reprehenderit ipsum aliquid laborum deserunt minima?
          </p>
          <div className="space-y-3 mt-3">
            <p className="text-gray-500 flex items-center gap-3">
              <LocationOnIcon />
              <span>Mumbai, Maharashtra</span>
            </p>
            <p className="text-gray-500 flex items-center gap-3">
              <CalendarTodayIcon />
              <span>Mon-Sat: 9:00 AM - 12:00 PM (Today)</span>
            </p>
          </div>
        </div>
      </section>
      <Divider />
      <section className="pt-[2rem] lg:flex relative">
        <div className="space-y-10 lg: w-[20%] filter">
          <div className="box space-y-5 lg:sticky top-28">
            <div>
              <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                Food Type
              </Typography>
              <FormControl className="py-10 space-y-5" component={"fieldset"}>
                <RadioGroup onChange={handleFilter} name="food_type" value={FoodTypes}>
                  {FoodTypes.map((item) => (
                    <FormControlLabel
                    key={item.value}
                      value={item.value}
                      control={<Radio />}
                      label={item.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
            <Divider/>
            <div>
              <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                Food Category
              </Typography>
              <FormControl className="py-10 space-y-5" component={"fieldset"}>
                <RadioGroup onChange={handleFilter} name="food_type" value={FoodTypes}>
                  {categories.map((item) => (
                    <FormControlLabel
                    key={item}
                      value={item}
                      control={<Radio />}
                      label={item}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="space-y-5 lg: w-[80%] filter lg: pl-10">
          {menu.map((item) =><MenuCart/>)}
        </div>
      </section>
    </div>
  );
};
