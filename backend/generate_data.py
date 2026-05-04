import json
import random

categories = {
    "technology": ["Laptop", "Smartphone", "Tablet", "Smartwatch", "Monitor", "Keyboard", "Mouse"],
    "music": ["Guitar", "Piano", "Drum Set", "Microphone", "DJ Controller", "Headphones"],
    "fitness": ["Dumbbells", "Yoga Mat", "Treadmill", "Protein Powder", "Running Shoes"],
    "gaming": ["PlayStation", "Xbox", "Gaming Chair", "VR Headset", "Controller"],
    "fashion": ["T-Shirt", "Jeans", "Sneakers", "Jacket", "Watch"],
    "food": ["Coffee", "Green Tea", "Protein Bars", "Snacks", "Dry Fruits"],
    "travel": ["Backpack", "Suitcase", "Travel Pillow", "Camera", "Power Bank"],
    "study": ["Notebook", "Books", "Desk Lamp", "Stationery Kit"],
    "lifestyle": ["Water Bottle", "Air Purifier", "Humidifier"],
    "home": ["Sofa", "Dining Table", "Bed", "Curtains", "Carpet"],
    "kitchen": ["Mixer Grinder", "Microwave", "Cookware", "Knife Set"],
    "beauty": ["Face Wash", "Moisturizer", "Lipstick", "Perfume"],
    "automobile": ["Car Accessories", "Bike Helmet", "Car Charger"],
    "sports": ["Football", "Cricket Bat", "Badminton Racket"],
    "office": ["Office Chair", "Desk Organizer", "Printer"],
    "pets": ["Dog Food", "Cat Toy", "Pet Bed"],
    "kids": ["Toys", "School Bag", "Story Books"],
    "books": ["Fiction Book", "Self Help Book", "Biography"],
    "electronics": ["TV", "Refrigerator", "Washing Machine"],
    "subscriptions": ["Netflix Subscription", "Spotify Subscription", "Amazon Prime"]
}

brands = [
    "Apple", "Samsung", "Sony", "Dell", "HP",
    "Lenovo", "Asus", "Nike", "Adidas", "Puma",
    "Boat", "JBL", "Logitech", "Canon", "Nikon", "GoPro",
    "Under Armour", "Reebok", "New Balance", "Columbia", "The North Face", "Patagonia", "Garmin", "Fitbit", "Xiaomi", "OnePlus", "Google", "Microsoft", "Amazon", "Netflix", "Spotify", "Apple Music"
]

variants = ["Pro", "Max", "Plus", "Ultra", "Edition", "Series"]

products = set()

# 🔥 generate 1200+ UNIQUE products
while len(products) < 2000:
    category = random.choice(list(categories.keys()))
    item = random.choice(categories[category])
    brand = random.choice(brands)
    variant = random.choice(variants)

    name = f"{brand} {item} {variant}"

    products.add((name, category))

# convert to list
data = [{"name": name, "category": cat} for name, cat in products]

# save
with open("data.json", "w") as f:
    json.dump(data, f, indent=2)

print(f"✅ Generated {len(data)} unique products")