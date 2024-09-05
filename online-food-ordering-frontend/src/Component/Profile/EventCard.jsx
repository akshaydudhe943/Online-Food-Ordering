import { CardMedia, Card, CardContent, Typography, CardActions, IconButton } from "@mui/material";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

export const EventCard = () => {
  return (
    <div>
      <Card sx={{ width: 345 }}>
        <CardMedia
          sx={{ height: 345 }}
          image="https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=2048x2048&w=is&k=20&c=rRlOrFqCQn8kBDwvZnN75XFxiD0CA6S2LkgVKQRYJ3k="
        />
        <CardContent>
          <Typography variant="h5">Indian Fast Food</Typography>
          <Typography variant="body2">50% off on your first order</Typography>
          <div className="py-2 space-y-2">
            <p>{"mumbai"}</p>
            <p className="text-sm text-blue-500">August 15, 2024 12:00 am</p>
            <p className="text-sm text-red-500">August 20, 2024 12:00 am</p>
          </div>
        </CardContent>
        {false && <CardActions>
            <IconButton>
                <DeleteIcon />
            </IconButton>
        </CardActions>}
      </Card>
    </div>
  );
};
