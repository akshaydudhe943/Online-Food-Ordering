import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  ListItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

const ingeredients = [
  {
    category: "Nuts & seeds",
    ingeredients: "Cashews",
  },
  {
    category: "Proteins",
    ingeredients: "ground beef",
  },
  {
    category: "Proteins",
    ingeredients: "bacon strips",
  },
];

const demo = [
  {
    category: "Nuts & seeds",
    ingeredients: ["Cashews"],
  },
  {
    category: "Proteins",
    ingeredients: ["ground beef", "bacon strips"],
  },
];

export const MenuCart = () => {
  const handleCheckboxChange= (value) => {
    console.log(value);
  }
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className="lg:flex items-center justify-between">
          <div className="lg:flex items-center lg:gap-5">
            <img
              className="w-[7rem] h-[7rem] object-cover"
              src="https://media.istockphoto.com/id/1482650278/photo/juicy-ground-pork-and-bacon-cheeseburger-with-fries.jpg?s=2048x2048&w=is&k=20&c=y6MZUSsyMe29RzE4J3MT9H4JtZd4PwYf7x0BEnyVTqc="
              alt=""
            />
            <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
              <p className="font-semibold text-xl">Burger</p>
              <p>₹499</p>
              <p className="text-gray-400">Nice type of Food</p>
            </div>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <form>
          <div className="flex gap-5 flex-wrap">
            {demo.map((item) => (
              <div>
                <p>{item.category}</p>
                <FormGroup>
                  {item.ingeredients.map((item) => (
                    <FormControlLabel control={<Checkbox onChange={()=>
                      handleCheckboxChange(item)
                    }/>} label={item} />
                  ))}
                </FormGroup>
              </div>
            ))}
          </div>
          <div className="pt-5">
            <Button variant="outlined" disabled={false} type="submit" >{true?"Add To Cart":"Out of Stock"}</Button>
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};
