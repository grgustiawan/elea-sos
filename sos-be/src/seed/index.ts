import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seed() {
  try {
    const foodCategories = [
      { name: 'Appetizers', image: 'appetizers.jpg' },
      { name: 'Main Course', image: 'main_course.jpg' },
      { name: 'Desserts', image: 'desserts.jpg' },
      { name: 'Drinks', image: 'drinks.jpg' },
      { name: 'Salads', image: 'salads.jpg' },
      { name: 'Vegetarian', image: 'vegetarian.jpg' },
      { name: 'Seafood', image: 'seafood.jpg' },
      { name: 'Pasta', image: 'pasta.jpg' },
      { name: 'Grilled', image: 'grilled.jpg' },
      { name: 'Bakery', image: 'bakery.jpg' },
    ];

    const foodData = [
      { name: "Spaghetti Carbonara", description: "Classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.", price: 60000, image: "spaghetti-carbonara.jpg", categoryId: 2 },
      { name: "Chicken Caesar Salad", description: "Crispy romaine lettuce tossed with Caesar dressing, croutons, and grilled chicken.", price: 45000, image: "chicken-caesar-salad.jpg", categoryId: 5 },
      { name: "Margherita Pizza", description: "Traditional pizza with fresh mozzarella, tomatoes, and basil.", price: 50000, image: "margherita-pizza.jpg", categoryId: 7 },
      { name: "Grilled Salmon", description: "Fresh salmon fillet grilled to perfection, served with lemon.", price: 70000, image: "grilled-salmon.jpg", categoryId: 7 },
      { name: "Chocolate Lava Cake", description: "Decadent chocolate cake with a gooey molten center, served with ice cream.", price: 35000, image: "chocolate-lava-cake.jpg", categoryId: 3 },
      { name: "Tiramisu", description: "Classic Italian dessert made with coffee-soaked ladyfingers and mascarpone cheese.", price: 30000, image: "tiramisu.jpg", categoryId: 3 },
      { name: "French Fries", description: "Crispy golden fries, perfect as a side or snack.", price: 20000, image: "french-fries.jpg", categoryId: 1 },
      { name: "Caesar Wrap", description: "Grilled chicken, romaine lettuce, and Caesar dressing wrapped in a tortilla.", price: 40000, image: "caesar-wrap.jpg", categoryId: 5 },
      { name: "Vegetable Stir Fry", description: "Mixed vegetables stir-fried with soy sauce and served with rice.", price: 35000, image: "vegetable-stir-fry.jpg", categoryId: 6 },
      { name: "Beef Burger", description: "Juicy beef patty served in a bun with lettuce, tomato, and cheese.", price: 45000, image: "beef-burger.jpg", categoryId: 2 },
      { name: "Chicken Noodle Soup", description: "Hearty chicken soup with noodles and vegetables.", price: 35000, image: "chicken-noodle-soup.jpg", categoryId: 5 },
      { name: "Shrimp Fried Rice", description: "Fried rice with shrimp, vegetables, and egg.", price: 40000, image: "shrimp-fried-rice.jpg", categoryId: 4 },
      { name: "Stuffed Bell Peppers", description: "Bell peppers stuffed with rice, ground meat, and spices, then baked.", price: 45000, image: "stuffed-bell-peppers.jpg", categoryId: 2 },
      { name: "Chocolate Chip Cookies", description: "Freshly baked cookies with chocolate chips.", price: 15000, image: "chocolate-chip-cookies.jpg", categoryId: 3 },
      { name: "Vanilla Ice Cream", description: "Creamy vanilla-flavored ice cream, perfect for any dessert.", price: 20000, image: "vanilla-ice-cream.jpg", categoryId: 3 },
      { name: "Fruit Salad", description: "Fresh mixed fruits, seasonal and delicious.", price: 25000, image: "fruit-salad.jpg", categoryId: 4 },
      { name: "Cheese Platter", description: "A selection of gourmet cheeses served with crackers.", price: 30000, image: "cheese-platter.jpg", categoryId: 1 },
      { name: "Mediterranean Quinoa Salad", description: "Quinoa mixed with cucumbers, tomatoes, olives, and feta cheese.", price: 35000, image: "mediterranean-quinoa-salad.jpg", categoryId: 6 },
      { name: "Pulled Pork Sandwich", description: "Tender pulled pork served on a bun with barbecue sauce.", price: 45000, image: "pulled-pork-sandwich.jpg", categoryId: 2 },
      { name: "BBQ Ribs", description: "Slow-cooked pork ribs smothered in barbecue sauce.", price: 80000, image: "bbq-ribs.jpg", categoryId: 2 },
      { name: "Beef Tacos", description: "Tacos filled with seasoned ground beef and fresh toppings.", price: 45000, image: "beef-tacos.jpg", categoryId: 2 },
      { name: "Mixed Berry Smoothie", description: "A refreshing smoothie made with assorted berries and yogurt.", price: 30000, image: "mixed-berry-smoothie.jpg", categoryId: 4 },
      { name: "Pasta Primavera", description: "Pasta tossed with fresh seasonal vegetables.", price: 50000, image: "pasta-primavera.jpg", categoryId: 2 },
      { name: "Pumpkin Soup", description: "Creamy pumpkin soup flavored with spices.", price: 30000, image: "pumpkin-soup.jpg", categoryId: 5 },
      { name: "Egg Salad Sandwich", description: "Egg salad topped with lettuce and tomato in a sandwich.", price: 25000, image: "egg-salad-sandwich.jpg", categoryId: 5 },
      { name: "Lemon Tart", description: "Tangy lemon tart with a flaky crust, served chilled.", price: 30000, image: "lemon-tart.jpg", categoryId: 3 },
      { name: "Chicken Teriyaki", description: "Grilled chicken glazed with teriyaki sauce and served with rice.", price: 50000, image: "chicken-teriyaki.jpg", categoryId: 2 },
      { name: "Chocolate Mousse", description: "Rich chocolate mousse served with whipped cream.", price: 30000, image: "chocolate-mousse.jpg", categoryId: 3 },
      { name: "Banana Bread", description: "Moist banana bread made with ripe bananas.", price: 20000, image: "banana-bread.jpg", categoryId: 3 },
      { name: "Stuffed Mushrooms", description: "Mushrooms stuffed with cheese and herbs, then baked.", price: 30000, image: "stuffed-mushrooms.jpg", categoryId: 1 },
      { name: "Grilled Cheese Sandwich", description: "Classic grilled cheese sandwich, golden brown and crispy.", price: 25000, image: "grilled-cheese-sandwich.jpg", categoryId: 5 },
      { name: "Teriyaki Salmon", description: "Salmon marinated in teriyaki sauce and grilled.", price: 70000, image: "teriyaki-salmon.jpg", categoryId: 7 },
      { name: "Fettuccine Alfredo", description: "Pasta in a creamy Alfredo sauce with Parmesan cheese.", price: 60000, image: "fettuccine-alfredo.jpg", categoryId: 2 },
      { name: "Baked Ziti", description: "Pasta baked with marinara sauce and cheese.", price: 50000, image: "baked-ziti.jpg", categoryId: 2 },
      { name: "Fruit Tart", description: "Sweet tart filled with custard and topped with fresh fruit.", price: 40000, image: "fruit-tart.jpg", categoryId: 3 },
      { name: "Vegetable Samosas", description: "Spicy vegetable-filled pastry, deep-fried to crispy perfection.", price: 25000, image: "vegetable-samosas.jpg", categoryId: 6 },
      { name: "Shrimp Cocktail", description: "Chilled shrimp served with cocktail sauce.", price: 50000, image: "shrimp-cocktail.jpg", categoryId: 4 },
      { name: "Cheeseburger", description: "Juicy beef burger topped with cheese, pickles, and onions.", price: 50000, image: "cheeseburger.jpg", categoryId: 2 },
      { name: "Clam Chowder", description: "Creamy soup made with clams and potatoes.", price: 40000, image: "clam-chowder.jpg", categoryId: 5 },
      { name: "Bacon-Wrapped Asparagus", description: "Tender asparagus wrapped in crispy bacon.", price: 30000, image: "bacon-wrapped-asparagus.jpg", categoryId: 1 },
      { name: "Vegetarian Chili", description: "Hearty chili made with beans and vegetables.", price: 35000, image: "vegetarian-chili.jpg", categoryId: 4 },
      { name: "Sushi Platter", description: "Assorted sushi rolls and sashimi served on a platter.", price: 75000, image: "sushi-platter.jpg", categoryId: 7 },
      { name: "Falafel Sandwich", description: "Falafel balls served in a pita with vegetables and sauce.", price: 35000, image: "falafel-sandwich.jpg", categoryId: 6 },
      { name: "Spicy Tuna Roll", description: "Sushi roll made with spicy tuna and cucumber.", price: 40000, image: "spicy-tuna-roll.jpg", categoryId: 7 },
      { name: "Cauliflower Rice Bowl", description: "Healthy bowl with riced cauliflower, vegetables, and protein.", price: 40000, image: "cauliflower-rice-bowl.jpg", categoryId: 6 },
      { name: "Mango Sticky Rice", description: "Sweet sticky rice served with fresh mango and coconut milk.", price: 30000, image: "mango-sticky-rice.jpg", categoryId: 4 },
      { name: "Chicken Parmesan", description: "Breaded chicken breast topped with marinara sauce and cheese.", price: 60000, image: "chicken-parmesan.jpg", categoryId: 2 },
      { name: "Minestrone Soup", description: "Vegetable soup with pasta and beans, hearty and satisfying.", price: 30000, image: "minestrone-soup.jpg", categoryId: 5 },
      { name: "Chili Cheese Fries", description: "Fries topped with chili and melted cheese.", price: 30000, image: "chili-cheese-fries.jpg", categoryId: 1 },
      { name: "Honey Garlic Chicken", description: "Chicken glazed with honey and garlic, served over rice.", price: 50000, image: "honey-garlic-chicken.jpg", categoryId: 2 },
      { name: "Beef Stroganoff", description: "Tender beef cooked in a creamy sauce served over noodles.", price: 70000, image: "beef-stroganoff.jpg", categoryId: 2 },
      { name: "Eggplant Parmesan", description: "Breaded eggplant slices layered with marinara sauce and cheese.", price: 50000, image: "eggplant-parmesan.jpg", categoryId: 6 },
      { name: "Beef Wellington", description: "Tender beef wrapped in pastry and baked until golden.", price: 80000, image: "beef-wellington.jpg", categoryId: 2 },
      { name: "Pasta Salad", description: "Cold pasta salad with olives, peppers, and a tangy dressing.", price: 40000, image: "pasta-salad.jpg", categoryId: 6 },
      { name: "Seafood Risotto", description: "Creamy risotto loaded with seafood and herbs.", price: 70000, image: "seafood-risotto.jpg", categoryId: 7 },
      { name: "Rice Pudding", description: "Creamy rice pudding flavored with cinnamon and vanilla.", price: 25000, image: "rice-pudding.jpg", categoryId: 3 },
      { name: "Gnocchi with Pesto", description: "Soft potato dumplings tossed with basil pesto.", price: 50000, image: "gnocchi-with-pesto.jpg", categoryId: 2 },
      { name: "Lasagna", description: "Layers of pasta, cheese, and meat in a marinara sauce.", price: 60000, image: "lasagna.jpg", categoryId: 2 },
      { name: "Popcorn", description: "Light and fluffy popcorn, perfect for snacking.", price: 15000, image: "popcorn.jpg", categoryId: 1 },
      { name: "Mushroom Risotto", description: "Creamy risotto with sautéed mushrooms and Parmesan cheese.", price: 40000, image: "mushroom-risotto.jpg", categoryId: 2 },
      { name: "Duck Confit", description: "Slow-cooked duck leg served with crispy skin.", price: 80000, image: "duck-confit.jpg", categoryId: 2 },
      { name: "Seafood Paella", description: "Traditional Spanish rice dish with seafood and saffron.", price: 70000, image: "seafood-paella.jpg", categoryId: 7 },
      { name: "Chili Queso", description: "Creamy cheese dip with chili and spices, served with tortilla chips.", price: 30000, image: "chili-queso.jpg", categoryId: 1 },
      { name: "Olive Tapenade", description: "Savory spread made from finely chopped olives, capers, and anchovies.", price: 25000, image: "olive-tapenade.jpg", categoryId: 1 },
      { name: "Pesto Pasta", description: "Pasta tossed in a fresh basil pesto sauce.", price: 40000, image: "pesto-pasta.jpg", categoryId: 2 },
      { name: "Sweet Potato Fries", description: "Crispy sweet potato fries, a delicious alternative.", price: 25000, image: "sweet-potato-fries.jpg", categoryId: 1 },
      { name: "Crab Cakes", description: "Delicate crab cakes served with remoulade sauce.", price: 60000, image: "crab-cakes.jpg", categoryId: 7 },
      { name: "Pancakes", description: "Fluffy pancakes served with syrup and fresh berries.", price: 30000, image: "pancakes.jpg", categoryId: 3 },
      { name: "Crispy Tofu Stir-fry", description: "Crispy tofu stir-fried with vegetables and soy sauce.", price: 35000, image: "crispy-tofu-stir-fry.jpg", categoryId: 6 },
      { name: "ShrimpSpring Roll", description: "Crispy spring rolls filled with shrimp and vegetables.", price: 35000, image: "shrimp-spring-roll.jpg", categoryId: 1 },
      { name: "Lobster Bisque", description: "Rich and creamy soup made with lobster.", price: 50000, image: "lobster-bisque.jpg", categoryId: 5 },
      { name: "Beef Yakitori", description: "Grilled skewers of beef marinated in teriyaki sauce.", price: 50000, image: "beef-yakitori.jpg", categoryId: 2 },
      { name: "Caprese Salad", description: "Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze.", price: 40000, image: "caprese-salad.jpg", categoryId: 5 },
      { name: "Grilled Veggie Wrap", description: "Grilled vegetables wrapped in a tortilla with hummus.", price: 35000, image: "grilled-veggie-wrap.jpg", categoryId: 6 },
      { name: "Chicken Fajitas", description: "Sizzling chicken served with peppers and onions in a tortilla.", price: 45000, image: "chicken-fajitas.jpg", categoryId: 2 },
      { name: "Baked Beans", description: "Slow-cooked beans in a savory sauce.", price: 30000, image: "baked-beans.jpg", categoryId: 4 },
      { name: "Potato Skins", description: "Crispy potato skins topped with cheese and chives.", price: 20000, image: "potato-skins.jpg", categoryId: 1 },
      { name: "Cream Brulee", description: "Rich custard topped with a layer of caramelized sugar.", price: 35000, image: "cream-brulee.jpg", categoryId: 3 },
      { name: "Beef Stroganoff", description: "Tender beef cooked in a creamy sauce, served over egg noodles.", price: 70000, image: "beef-stroganoff.jpg", categoryId: 2 },
      { name: "Falafel Plate", description: "Falafel served with hummus, salad, and pita bread.", price: 40000, image: "falafel-plate.jpg", categoryId: 6 },
      { name: "Chicken Piccata", description: "Chicken breast sautéed with lemon, capers, and white wine sauce.", price: 55000, image: "chicken-piccata.jpg", categoryId: 2 },
      { name: "Beef Jerky", description: "Dried and seasoned beef strips, perfect for snacking.", price: 20000, image: "beef-jerky.jpg", categoryId: 1 },
      { name: "Mushroom Tacos", description: "Tacos filled with sautéed mushrooms and avocado.", price: 40000, image: "mushroom-tacos.jpg", categoryId: 2 },
      { name: "BBQ Chicken Pizza", description: "Pizza topped with BBQ chicken, cilantro, and cheese.", price: 50000, image: "bbq-chicken-pizza.jpg", categoryId: 7 },
      { name: "Strawberry Shortcake", description: "Layered cake with strawberries and whipped cream.", price: 35000, image: "strawberry-shortcake.jpg", categoryId: 3 },
      { name: "Cheesy Garlic Bread", description: "French bread topped with cheese and garlic, baked until golden.", price: 25000, image: "cheesy-garlic-bread.jpg", categoryId: 1 },
      { name: "Bacon Cheeseburger", description: "Beef burger topped with bacon, cheese, and condiments.", price: 60000, image: "bacon-cheeseburger.jpg", categoryId: 2 },
      { name: "Peach Cobbler", description: "Warm peach filling topped with a flaky crust.", price: 40000, image: "peach-cobbler.jpg", categoryId: 3 },
      { name: "Butternut Squash Soup", description: "Creamy soup made with roasted butternut squash.", price: 30000, image: "butternut-squash-soup.jpg", categoryId: 5 },
      { name: "Saffron Risotto", description: "Creamy risotto flavored with saffron and Parmesan.", price: 60000, image: "saffron-risotto.jpg", categoryId: 7 },
      { name: "Chocolate Fondue", description: "Melted chocolate served with fruits and marshmallows for dipping.", price: 50000, image: "chocolate-fondue.jpg", categoryId: 3 },
      { name: "Turmeric Rice", description: "Flavored rice cooked with turmeric and spices.", price: 20000, image: "turmeric-rice.jpg", categoryId: 4 },
      { name: "Zucchini Noodles", description: "Vegetables carved into noodles and served with marinara sauce.", price: 35000, image: "zucchini-noodles.jpg", categoryId: 2 },
      { name: "Honey Sesame Chicken", description: "Tender chicken coated in a honey sesame sauce.", price: 50000, image: "honey-sesame-chicken.jpg", categoryId: 2 },
      { name: "Chicken Shawarma", description: "Spiced chicken served in pita with garlic sauce and vegetables.", price: 40000, image: "chicken-shawarma.jpg", categoryId: 6 },
      { name: "Peanut Butter Cookies", description: "Soft cookies made with peanut butter.", price: 25000, image: "peanut-butter-cookies.jpg", categoryId: 3 },
      { name: "Carrot Cake", description: "Moist cake made with carrots, topped with cream cheese frosting.", price: 40000, image: "carrot-cake.jpg", categoryId: 3 },
      { name: "Bangers and Mash", description: "Sausages served with mashed potatoes and gravy.", price: 50000, image: "bangers-and-mash.jpg", categoryId: 2 },
      { name: "Taco Salad", description: "Salad topped with taco ingredients: meat, cheese, and salsa.", price: 45000, image: "taco-salad.jpg", categoryId: 5 },
      { name: "Chocolate Smoothie", description: "Creamy smoothie made with chocolate and banana.", price: 30000, image: "chocolate-smoothie.jpg", categoryId: 4 },
      { name: "Korean Fried Chicken", description: "Crispy fried chicken coated in a sweet and spicy sauce.", price: 60000, image: "korean-fried-chicken.jpg", categoryId: 1 },
      { name: "Shrimp and Grits", description: "Shrimp served on creamy grits with spices.", price: 50000, image: "shrimp-and-grits.jpg", categoryId: 2 },
      { name: "Stuffed cabbage Rolls", description: "Cabbage leaves stuffed with rice and beef, baked in tomato sauce.", price: 45000, image: "stuffed-cabbage-rolls.jpg", categoryId: 4 },
      { name: "Caprese Skewers", description: "Skewers with cherry tomatoes, basil, and mozzarella.", price: 30000, image: "caprese-skewers.jpg", categoryId: 5 },
      { name: "Vegetable Curry", description: "Mixed vegetables cooked in a spicy curry sauce.", price: 40000, image: "vegetable-curry.jpg", categoryId: 6 },
      { name: "Berry Smoothie Bowl", description: "Smoothie bowl topped with mixed berries and granola.", price: 40000, image: "berry-smoothie-bowl.jpg", categoryId: 4 },
      { name: "Buffalo Wings", description: "Spicy chicken wings served with blue cheese dressing.", price: 50000, image: "buffalo-wings.jpg", categoryId: 1 },
      { name: "Potato Salad", description: "Creamy potato salad with herbs and spices.", price: 25000, image: "potato-salad.jpg", categoryId: 4 },
      { name: "Cornbread", description: "Sweet cornbread baked to golden perfection.", price: 20000, image: "cornbread.jpg", categoryId: 3 },
      { name: "Ratatouille", description: "Vegetable stew made with zucchini, eggplant, and peppers.", price: 40000, image: "ratatouille.jpg", categoryId: 6 },
      { name: "Pork Tenderloin", description: "Juicy pork tenderloin seasoned and grilled to perfection.", price: 70000, image: "pork-tenderloin.jpg", categoryId: 2 },
      { name: "Pork Schnitzel", description: "Breaded and fried pork cutlet served with lemon.", price: 60000, image: "pork-schnitzel.jpg", categoryId: 2 },
      { name: "Beef Tacos", description: "Tacos filled with seasoned ground beef and fresh toppings.", price: 45000, image: "beef-tacos.jpg", categoryId: 2 },
      { name: "Maple Bacon Donuts", description: "Fluffy donuts topped with maple icing and crispy bacon.", price: 30000, image: "maple-bacon-donuts.jpg", categoryId: 3 },
      { name: "Eggs Benedict", description: "Poached eggs served on English muffins with hollandaise sauce.", price: 50000, image: "eggs-benedict.jpg", categoryId: 2 },
      { name: "Pulled Pork Sandwich", description: "Tender pulled pork served on a bun with barbecue sauce.", price: 45000, image: "pulled-pork-sandwich.jpg", categoryId: 2 },
      { name: "Thai Green Curry", description: "Spicy curry with chicken and vegetables in coconut milk.", price: 60000, image: "thai-green-curry.jpg", categoryId: 2 },
      { name: "Chili con Carne", description: "Hearty chili made with beef, beans, and spices.", price: 40000, image: "chili-con-carne.jpg", categoryId: 4 },
      { name: "Barbecue Chicken", description: "Grilled chicken brushed with barbecue sauce.", price: 50000, image: "barbecue-chicken.jpg", categoryId: 2 },
      { name: "Pork Fried Rice", description: "Fried rice with pork, vegetables, and soy sauce.", price: 35000, image: "pork-fried-rice.jpg", categoryId: 4 },
      { name: "Stuffed Acorn Squash", description: "Roasted acorn squash filled with quinoa, cranberries, and nuts.", price: 40000, image: "stuffed-acorn-squash.jpg", categoryId: 6 },
      { name: "Baked Salmon", description: "Oven-baked salmon fillet topped with herbs.", price: 70000, image: "baked-salmon.jpg", categoryId: 7 },
      { name: "Chicken Noodle Soup", description: "Comforting chicken soup with noodles and vegetables.", price: 35000, image: "chicken-noodle-soup.jpg", categoryId: 5 },
      { name: "Beef Wellington", description: "Tender beef wrapped in pastry and baked until golden.", price: 80000, image: "beef-wellington.jpg", categoryId: 2 },
      { name: "Crab Cakes", description: "Delicate crab cakes served with remoulade sauce.", price: 60000, image: "crab-cakes.jpg", categoryId: 7 },
      { name: "Pumpkin Spice Latte", description: "Coffee latte flavored with pumpkin spices and topped with whipped cream.", price: 25000, image: "pumpkin-spice-latte.jpg", categoryId: 4 },
      { name: "Lamb Chops", description: "Grilled lamb chops served with mint sauce.", price: 80000, image: "lamb-chops.jpg", categoryId: 2 },
      { name: "Paella Valenciana", description: "Traditional Spanish rice dish with chicken, rabbit, and vegetables.", price: 70000, image: "paella-valenciana.jpg", categoryId: 7 },
      { name: "Chimichurri Steak", description: "Grilled steak topped with chimichurri sauce.", price: 75000, image: "chimichurri-steak.jpg", categoryId: 2 },
      { name: "Sesame Noodles", description: "Cold noodles tossed in sesame dressing with vegetables.", price: 40000, image: "sesame-noodles.jpg", categoryId: 6 },
      { name: "Nyotaimori", description: "Sushi served on a naked model, a unique dining experience.", price: 150000, image: "nyotaimori.jpg", categoryId: 7 },
      { name: "Shrimp Scampi", description: "Shrimp sautéed in garlic butter sauce and served over pasta.", price: 60000, image: "shrimp-scampi.jpg", categoryId: 7 },
      { name: "Cranberry Orange Muffin", description: "Moist muffin flavored with cranberries and orange zest.", price: 25000, image: "cranberry-orange-muffin.jpg", categoryId: 3 },
      { name: "Falafel Plate", description: "Falafel served on a platter with hummus, salad, and pita bread.", price: 40000, image: "falafel-plate.jpg", categoryId: 6 },
      { name: "Coconut Curry", description: "Spicy coconut curry with chickpeas and vegetables.", price: 50000, image: "coconut-curry.jpg", categoryId: 2 },
      { name: "Stuffed Eggplant", description: "Eggplant filled with spiced meat and baked.", price: 45000, image: "stuffed-eggplant.jpg", categoryId: 6 },
      { name: "Chili Lime Corn on the Cob", description: "Grilled corn brushed with chili lime sauce.", price: 20000, image: "chili-lime-corn-on-the-cob.jpg", categoryId: 1 },
      { name: "Jalapeño Poppers", description: "Cream cheese-filled jalapeños, breaded and fried.", price: 30000, image: "jalapeno-poppers.jpg", categoryId: 1 },
      { name: "Mango Salsa", description: "Fresh salsa made with mango, onions, and cilantro.", price: 20000, image: "mango-salsa.jpg", categoryId: 4 },
      { name: "Pineapple Upside Down Cake", description: "Rich cake layered with pineapple and cherries.", price: 40000, image: "pineapple-upside-down-cake.jpg", categoryId: 3 },
      { name: "Baklava", description: "Sweet dessert made of layers of filo pastry and honey.", price: 30000, image: "baklava.jpg", categoryId: 3 },
      { name: "Tandoori Chicken", description: "Spiced chicken marinated in yogurt and cooked in a tandoor.", price: 60000, image: "tandoori-chicken.jpg", categoryId: 2 },
      { name: "Zaatar Manakish", description: "Flatbread topped with zaatar seasoning, baked until crisp.", price: 20000, image: "zaatar-manakish.jpg", categoryId: 10 },
    ];    

    const branchData = [
      {
        branchName: 'Downtown Delight',
        address: '123 Main St',
        city: 'Metropolis',
        state: 'NY',
        postalCode: '10001',
        country: 'USA',
        phoneNumber: '555-0101',
        email: 'downtown@galihrakagustiawan.site',
      },
      {
        branchName: 'Seaside Spot',
        address: '456 Ocean Ave',
        city: 'Seaview',
        state: 'CA',
        postalCode: '90210',
        country: 'USA',
        phoneNumber: '555-0202',
        email: 'seaside@galihrakagustiawan.site',
      },
      {
        branchName: 'Mountain View',
        address: '789 Alpine Rd',
        city: 'Hilltop',
        state: 'CO',
        postalCode: '80302',
        country: 'USA',
        phoneNumber: '555-0303',
        email: 'mountain@galihrakagustiawan.site',
      },
      {
        branchName: 'City Central',
        address: '321 Market St',
        city: 'Big City',
        state: 'TX',
        postalCode: '75201',
        country: 'USA',
        phoneNumber: '555-0404',
        email: 'central@galihrakagustiawan.site',
      },
      {
        branchName: 'Lakeside Lounge',
        address: '654 Lake St',
        city: 'Lakeside',
        state: 'MI',
        postalCode: '49036',
        country: 'USA',
        phoneNumber: '555-0505',
        email: 'lakeside@galihrakagustiawan.site',
      },
    ]

    console.log('Start Seeding categories...');
    const createdCategories: { id: number; name: string }[] = [];

    for (const { name, image } of foodCategories) {
      const category = await prisma.category.create({
        data: {
          name: name,
          image: image,
          description: faker.lorem.sentence(),
        },
      });

      createdCategories.push({ id: category.id, name: category.name });
    }

    console.log('Categories seeded:', createdCategories.map(c => c.name));

    console.log('Start Seeding menus...');

    for(const food of foodData){
      await prisma.menu.create({
        data: {
          name: food.name,
          description: food.description,
          price: food.price,
          image: food.image,
          categoryId: food.categoryId,
        },
      });
    }

    for(const branch of branchData){
      await prisma.restaurantBranch.create({
        data: {
          branchName: branch.branchName,
          address: branch.address,
          city: branch.city,
          state: branch.state,
          postalCode: branch.postalCode,
          country: branch.country,
          phoneNumber: branch.phoneNumber,
          email: branch.email,
        }
      })
    }

    console.log(`${foodData.length} food menus seeded successfully.`);
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
