import { Button, Card } from "@mui/material";
import React from "react";

export const OrderCard = () => {
  return (
    <Card className="flex justify-between items-center p-5">
      <div className="flex items-center space-x-5">
        <img
          className="h-16 w-16"
          src="https://media.istockphoto.com/id/1482650278/photo/juicy-ground-pork-and-bacon-cheeseburger-with-fries.jpg?s=2048x2048&w=is&k=20&c=y6MZUSsyMe29RzE4J3MT9H4JtZd4PwYf7x0BEnyVTqc="
          alt=""
        />
        <div>
          <p>Biryani</p>
          <p>$399</p>
        </div>
      </div>
      <div>
        <Button className="cursor-not-allowed"> Colmplted</Button>
      </div>
    </Card>
  );
};
