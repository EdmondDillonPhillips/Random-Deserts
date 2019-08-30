const express = require("express");
const app = express();
const  unirest = require("unirest");

app.set("view engine", "ejs");

app.use(express.static(__dirname + '/public/'));


    app.get("/", (req, res)=>{
        unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=1&tags=vegetarian%2Cdessert")
        .header("X-RapidAPI-Host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com")
        .header("X-RapidAPI-Key", "792cc636f9msh0459285c97d1636p152869jsn3d3f17b6a166")
        .end((result) => {
            
            let data = result.body.recipes[0];
            let ingredients = data.extendedIngredients;
            let source = data.sourceUrl;
            let title = data.title;
            let time = data.readyInMinutes;
            let image = data.image;
            let instructions = data.instructions;
            let item = [];
            
            ingredients.forEach((ingredient) => {
                item.push(ingredient.originalString);
            });
            
            res.render("recipes", { source, title, time, image, instructions, item});
        });
    });
  
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("Random Recipes API");
});