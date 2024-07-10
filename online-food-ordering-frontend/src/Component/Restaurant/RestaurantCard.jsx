import React from "react";
import { Card, Chip, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export const RestaurantCard = () => {
  return (
    <div>
      <Card className="w-[18rem]">
        <div className={`${true ? "cursor-pointer" : "cursor-not-allowed"} relative`}>
          <img
            className="w-full h-[10rem] rounded-t-md object-cover"
            src="https://cdn.pixabay.com/photo/2017/07/15/13/45/french-restaurant-2506490_1280.jpg"
            alt=""
          />
        

            <Chip
            size="small"
            className="absolute top-2 left-2"
            color={true ? "success" : "error"}
            label={true ? "Open" : "Close"}
            />
        </div>
        <div className="p-4 textPart lg:flex w-full justify-between">
            <div className="space-y-1">
                <p className="font-semibold text-lg">Indian Fast Food</p>
                <p className="text-gray-500 text-sm">
                    Craving it all? Dive into global flavor...
                </p>
            </div>
            <div>
                <IconButton>
                    {true?<FavoriteIcon/>:<FavoriteBorderIcon/>}
                </IconButton>
            </div>
        </div>
      </Card>
    </div>
  );
};
