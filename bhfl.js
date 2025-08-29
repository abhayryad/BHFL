const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Replace with your details
const FULL_NAME = "Abhay Yadav";
const DOB = "13122003";
const EMAIL = "abhayyadav2022@vitbhopal.ac.in";
const ROLL_NUMBER = "22BCE10722";

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data;

    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input, 'data' must be an array",
      });
    }

    // Categorize input
    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;

    data.forEach((item) => {
      if (/^-?\d+$/.test(item)) {
        // It's a number string
        let num = parseInt(item, 10);
        if (num % 2 === 0) {
          even_numbers.push(item);
        } else {
          odd_numbers.push(item);
        }
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        // Pure alphabets
        alphabets.push(item.toUpperCase());
      } else {
        // Special characters or mix
        special_characters.push(item);
      }
    });

    // Generate alternating caps concatenation (reverse order)
    let allAlphabets = data.filter((x) => /^[a-zA-Z]+$/.test(x)).join("");
    let reversed = allAlphabets.split("").reverse();
    let concat_string = reversed
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    // Final response
    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string,
    });
  } catch (err) {
    res.status(500).json({
      is_success: false,
      message: "Internal Server Error",
    });
  }
});

// Root test
app.get("/", (req, res) => {
  res.send("BFHL API is running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
