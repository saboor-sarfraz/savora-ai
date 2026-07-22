MENU = [
    # ---------- BURGERS ----------
    {
        "id": "brg-classic",
        "name": "Classic Cheeseburger",
        "category": "Burgers",
        "price": 12.50,
        "description": "A double smash of grass-fed Angus, aged cheddar, butter-toasted brioche, and house sauce.",
        "ingredients": ["Angus beef", "aged cheddar", "brioche bun", "house sauce", "pickles", "onion"],
        "allergens": ["dairy", "gluten"],
        "spice_level": "none",
        "tags": ["popular", "non-vegetarian"]
    },
    {
        "id": "brg_spicy",
        "name": "Spicy Chicken Burger",
        "category": "Burgers",
        "price": 9.49,
        "description": "Crispy chicken fillet with spicy mayo and jalapeños",
        "ingredients": ["chicken fillet", "spicy mayo", "jalapeños", "lettuce", "bun"],
        "allergens": ["egg", "gluten"],
        "spice_level": "hot",
        "tags": ["spicy", "popular", "non-vegetarian"]
    },
    {
        "id": "brg-truffle",
        "name": "Truffle Swiss Burger",
        "category": "Burgers",
        "price": 17.00,
        "description": "Wagyu blend patty, melted Gruyère, black truffle aioli, and caramelized shallots.",
        "ingredients": ["Wagyu blend beef", "Gruyère", "truffle aioli", "caramelized shallots", "arugula"],
        "allergens": ["dairy", "gluten"],
        "spice_level": "none",
        "tags": ["popular", "non-vegetarian"]
    },
    {
        "id": "brg-spicy",
        "name": "Firecracker Burger",
        "category": "Burgers",
        "price": 14.50,
        "description": "Pepper-jack, ghost-pepper jam, jalapeños, and crispy onions for serious heat.",
        "ingredients": ["Angus beef", "pepper jack", "ghost-pepper jam", "jalapeños", "crispy onions"],
        "allergens": ["dairy", "gluten"],
        "spice_level": "hot",
        "tags": ["spicy", "popular", "non-vegetarian"]
    },
    {
        "id": "brg-veggie",
        "name": "Garden Veggie Burger",
        "category": "Burgers",
        "price": 13.00,
        "description": "House-made beet-and-quinoa patty, smoked tofu spread, and avocado on a whole-wheat bun.",
        "ingredients": ["beet-quinoa patty", "smoked tofu spread", "avocado", "tomato", "whole-wheat bun"],
        "allergens": ["gluten"],
        "spice_level": "none",
        "tags": ["vegetarian", "vegan", "healthy"]
    },

    # ---------- PIZZA ----------
    {
        "id": "pz-supreme",
        "name": "Veggie Supreme Pizza",
        "category": "Pizza",
        "price": 16.50,
        "description": "Wood-fired Margherita base with roasted peppers, mushrooms, olives, and fresh basil.",
        "ingredients": ["San Marzano tomato", "mozzarella", "roasted peppers", "mushrooms", "olives", "basil"],
        "allergens": ["dairy", "gluten"],
        "spice_level": "none",
        "tags": ["vegetarian", "popular"]
    },
    {
        "id": "pz-diavola",
        "name": "Diavola Pizza",
        "category": "Pizza",
        "price": 17.50,
        "description": "Spicy salami, Calabrian chili, mozzarella, and a drizzle of hot honey.",
        "ingredients": ["spicy salami", "Calabrian chili", "mozzarella", "hot honey", "oregano"],
        "allergens": ["dairy", "gluten"],
        "spice_level": "hot",
        "tags": ["spicy", "popular", "non-vegetarian"]
    },
    {
        "id": "pz-margherita",
        "name": "Margherita D.O.P.",
        "category": "Pizza",
        "price": 14.00,
        "description": "San Marzano tomatoes, fior di latte, extra-virgin olive oil, and fresh basil.",
        "ingredients": ["San Marzano tomato", "fior di latte", "olive oil", "basil", "sea salt"],
        "allergens": ["dairy", "gluten"],
        "spice_level": "none",
        "tags": ["vegetarian", "popular"]
    },
    {
        "id": "pz-quattro",
        "name": "Quattro Formaggi",
        "category": "Pizza",
        "price": 18.00,
        "description": "Mozzarella, gorgonzola, fontina, and Parmigiano on a white base with cracked pepper.",
        "ingredients": ["mozzarella", "gorgonzola", "fontina", "Parmigiano", "cracked pepper"],
        "allergens": ["dairy", "gluten"],
        "spice_level": "none",
        "tags": ["vegetarian"]
    },

    # ---------- WRAPS ----------
    {
        "id": "wr-firecracker",
        "name": "Firecracker Wrap",
        "category": "Wraps",
        "price": 11.50,
        "description": "Crispy chicken, sriracha slaw, pickled jalapeños, and chipotle mayo in a toasted tortilla.",
        "ingredients": ["crispy chicken", "sriracha slaw", "pickled jalapeños", "chipotle mayo", "tortilla"],
        "allergens": ["egg", "gluten"],
        "spice_level": "hot",
        "tags": ["spicy", "popular", "non-vegetarian"]
    },
    {
        "id": "wr-mediterranean",
        "name": "Mediterranean Wrap",
        "category": "Wraps",
        "price": 10.50,
        "description": "Falafel, hummus, roasted red pepper, cucumber, and tahini in a spinach wrap.",
        "ingredients": ["falafel", "hummus", "roasted red pepper", "cucumber", "tahini", "spinach wrap"],
        "allergens": ["sesame", "gluten"],
        "spice_level": "none",
        "tags": ["vegetarian", "vegan", "healthy"]
    },
    {
        "id": "wr-buffalo",
        "name": "Buffalo Chicken Wrap",
        "category": "Wraps",
        "price": 11.00,
        "description": "Grilled chicken, buffalo sauce, blue cheese crumble, romaine, and tomato.",
        "ingredients": ["grilled chicken", "buffalo sauce", "blue cheese", "romaine", "tomato"],
        "allergens": ["dairy", "gluten"],
        "spice_level": "medium",
        "tags": ["spicy", "non-vegetarian"]
    },

    # ---------- APPETIZERS ----------
    {
        "id": "ap-wings",
        "name": "Korean BBQ Wings",
        "category": "Appetizers",
        "price": 9.50,
        "description": "Double-fried wings tossed in a sticky gochujang glaze with sesame and scallion.",
        "ingredients": ["chicken wings", "gochujang glaze", "sesame", "scallion", "ginger"],
        "allergens": ["soy", "sesame"],
        "spice_level": "hot",
        "tags": ["spicy", "popular", "non-vegetarian"]
    },
    {
        "id": "ap-truffle-fries",
        "name": "Truffle Parmesan Fries",
        "category": "Appetizers",
        "price": 7.50,
        "description": "Hand-cut fries, truffle oil, shaved Parmigiano, and chives with garlic aioli.",
        "ingredients": ["russet potatoes", "truffle oil", "Parmigiano", "chives", "garlic aioli"],
        "allergens": ["dairy", "egg"],
        "spice_level": "none",
        "tags": ["vegetarian", "popular"]
    },
    {
        "id": "ap-bruschetta",
        "name": "Heirloom Bruschetta",
        "category": "Appetizers",
        "price": 6.50,
        "description": "Toasted sourdough, heirloom tomato, basil oil, and a balsamic reduction.",
        "ingredients": ["sourdough", "heirloom tomato", "basil oil", "balsamic reduction", "garlic"],
        "allergens": ["gluten"],
        "spice_level": "none",
        "tags": ["vegetarian", "vegan", "healthy"]
    },
    {
        "id": "ap-mozzarella",
        "name": "Burrata & Crostini",
        "category": "Appetizers",
        "price": 11.00,
        "description": "Creamy burrata, blistered cherry tomatoes, pesto, and toasted crostini.",
        "ingredients": ["burrata", "cherry tomatoes", "pesto", "crostini", "olive oil"],
        "allergens": ["dairy", "gluten"],
        "spice_level": "none",
        "tags": ["vegetarian", "popular"]
    },

    # ---------- DESSERTS ----------
    {
        "id": "ds-lava",
        "name": "Molten Chocolate Lava Cake",
        "category": "Desserts",
        "price": 8.50,
        "description": "Warm dark-chocolate cake with a flowing center, vanilla bean gelato, and raspberry coulis.",
        "ingredients": ["dark chocolate", "butter", "eggs", "vanilla gelato", "raspberry coulis"],
        "allergens": ["dairy", "gluten", "egg"],
        "spice_level": "none",
        "tags": ["vegetarian", "popular"]
    },
    {
        "id": "ds-tiramisu",
        "name": "Classic Tiramisu",
        "category": "Desserts",
        "price": 7.50,
        "description": "Espresso-soaked ladyfingers, mascarpone cream, and a dusting of cocoa.",
        "ingredients": ["ladyfingers", "mascarpone", "espresso", "cocoa", "marsala"],
        "allergens": ["dairy", "gluten", "egg"],
        "spice_level": "none",
        "tags": ["vegetarian", "popular"]
    },
    {
        "id": "ds-cheesecake",
        "name": "Burnt Basque Cheesecake",
        "category": "Desserts",
        "price": 7.00,
        "description": "Caramelized top, silky cream cheese center, and a hint of sea salt.",
        "ingredients": ["cream cheese", "cream", "eggs", "sugar", "sea salt"],
        "allergens": ["dairy", "egg"],
        "spice_level": "none",
        "tags": ["vegetarian"]
    },

    # ---------- DRINKS ----------
    {
        "id": "dr-shake",
        "name": "Salted Caramel Milkshake",
        "category": "Drinks",
        "price": 6.50,
        "description": "Vanilla bean ice cream, house caramel, flaky salt, and a chocolate rim.",
        "ingredients": ["vanilla ice cream", "house caramel", "milk", "sea salt", "chocolate"],
        "allergens": ["dairy"],
        "spice_level": "none",
        "tags": ["vegetarian", "popular"]
    },
    {
        "id": "dr-lemonade",
        "name": "Ginger Mint Lemonade",
        "category": "Drinks",
        "price": 4.50,
        "description": "Cold-pressed lemon, fresh ginger, mint, and a touch of cane sugar.",
        "ingredients": ["lemon", "ginger", "mint", "cane sugar", "sparkling water"],
        "allergens": [],
        "spice_level": "none",
        "tags": ["vegetarian", "vegan", "gluten-free", "healthy"]
    },
    {
        "id": "dr-coldbrew",
        "name": "Vanilla Cold Brew",
        "category": "Drinks",
        "price": 5.00,
        "description": "18-hour steeped cold brew, Madagascar vanilla, and a creamy oat finish.",
        "ingredients": ["cold brew coffee", "Madagascar vanilla", "oat milk", "ice"],
        "allergens": [],
        "spice_level": "none",
        "tags": ["vegetarian", "vegan"]
    }
]