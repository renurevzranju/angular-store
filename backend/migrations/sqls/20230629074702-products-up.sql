CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL,
    category VARCHAR(200) NOT NULL,
    description VARCHAR,
    imagecode VARCHAR(50) NOT NULL
);

INSERT INTO products (name, price, category, description, imagecode)
VALUES
    ('Peach', 120, 'fruits', 'The peach is a species of the Prunus persica, and is a fruit tree of the rose family Rosaceae. They grow in the warm regions of both the northern and southern hemispheres.', 'pec.png' ),
    ('Papaya', 90, 'fruits', 'Papaya is a Diabetic friendly fruit,rich in antioxidants,lowers cholestrol levels,helps in digestion.', 'pap.png' ),
    ('Stawberry', 70, 'fruits', 'Extremely juicy and syrupy, these conical heart shaped fruits have seeds on the skin that give them a unique texture. With a blend of sweet-tart flavour, these are everyone favourite berries.', 'sta.png' ),
    ('Pomegranate 4pcs', 176, 'fruits', 'With a ruby colour and an intensely floral, sweet-tart flavour, the pomegranate delivers both taste and beauty. You can remove the skin and the membranes to get at the delicious fruit with nutty seeds.', 'pom.png' ),
    ('Mango', 70, 'fruits', 'Mango a super healthy fruit which supports immune system, low in calories, rich in healthy plant compounds', 'man.png' ),
    ('Pear', 185, 'fruits', 'Pear helps to prevent Cancer, reduces the risk of Diabetics, helps in weight loss.', 'pea.png' ),
    ('Kiwi 4pcs', 150, 'fruits', 'Kiwis are oval shaped with a brownish outer skin. Their flesh is bright green and juicy with tiny, edible black seeds. It is better for juice and smoothies, with its distinct sweet-sour taste and aroma. One Kiwi contains a full daily requirement of vitamin C. It is the perfect fruit for pregnant women as it contains a good amount of folate that prevents neural tube defects and helps in brain growth in infants. It maintains healthy and smooth skin.', 'kiw.png' ),
    ('Mangosteen 2 pcs', 62, 'fruits', 'Mangosteen fruit (Garcinia mangostana) is a unique pear-shaped, sweet, juicy and tangy tropical fruit that has a deep reddish-purple colored exocarp (rind) when ripe. Natives in these parts of the world also refer to mangosteen as queen of fruits or fruit of the gods. This fruit has been a major part in almost every aspect of the traditional medicine in these cultures. The rind of this fruit is used for its medicinal value for generations. Here are some of the most notable mangosteen.', 'gos.png' ),
    ('Onion, 1kg', 40, 'vegetables', 'Onion is a vegetable which is almost like a staple in Indian food. This is also known to be one of the essential ingredients of raw salads. They come in different colours like white, red or yellow and are quite in demand in cold salads and hot soups.', 'oni.png' ),
    ('Tomato, 1kg', 150, 'vegetables', 'Local tomatoes are partly sour and partly sweet and contain many seeds inside which are edible. The red colour present in tomatoes is due to lycopene, an anti-oxidant.', 'tom.png' ),
    ('Broccoli, 1pc (Approx. 250g-500g)', 68, 'vegetables', 'With a shape resembling that of a cauliflower, Brocollis have clusters of small, tight flower heads. These heads turn bright green on cooking and tastes slightly bitter.', 'bro.png' ),
    ('Cabbage, 1 pc (approx. 500g-800g)', 26, 'vegetables', 'With a texture of crispness and juiciness the moment you take the first bite, cabbages are sweet and grassy flavoured with dense and smooth leafy layers.', 'cab.png' ),
    ('Avocado, 1kg', 212, 'vegetables', 'Avocados are oval shaped fruits with a thick green and a bumpy, leathery outer skin. They have a unique-texture, with a creamy and light green coloured flesh that has a buttery flavour and special aroma. Avocados are also known as an alligator pear or butter fruit.', 'ava.png' ),
    ('Bell peppers mix', 150, 'vegetables', 'Capsicum is wealthy in several phytonutrients especially antioxidants, minerals and dietary fiber like manganese, copper, potassium, and magnesium. It is wealthy in Vitamin A, B6, C, E, K and lesser amounts of Thiamin, Niacin and Folate.', 'cap.jpg' ),
    ('Izze Sparkling Juice', 300, 'beverages', 'IZZE Sparkling Juices are 70% fruit juice with a splash of sparkling water. No added sugar, preservatives or artificial ingredients, the perfect feel-good drink to brighten up your day', 'ize.png' ),
    ('Raw Pressery Coconut Water Packed With Electrolytes', 185, 'beverages', 'Every athletes go-to natural energy drink; Coconut Water is a complete win-win for your everyday rehydration needs. #iaminlovewiththecoco! It is sourced carefully & responsibly, packed with electrolytes and boosts hydration. Moreover, coconut water being great for health will keep you feeling refreshed throughout the day.', 'coc.jpg' ),
    ('Paper Boat Aamras Mango Fruit Juice', 20, 'beverages', 'An honest treat for an honest days work. A silkesque ale cascading down your throat - Soothing, serenading and more importantly, lingering. Sometimes enveloped in rotis, sometimes guzzled with milk but the best way to go about Aamras is to have it directly as-is.', 'boa.jpg' ),
    ('Bagels', 97, 'bakery', 'Bagel - Plain is a classic gourmet breakfast staple. Spread some cream cheese or butter for a lip-smacking treat. With a crumbly, yet soft texture, its easy to bite into. Bagels are loaded with nutrients & make for a wholesome & fulfilling meal.', 'bag.jpg' ),
    ('Croissant', 115, 'bakery', 'A croissant is a laminated, yeast-leavened bakery product that contains dough/roll-in fat layers to create a flaky, crispy texture.', 'cro.png' ),
    ('Marble Tea Cake', 146, 'bakery', 'Marble Tea Cake can replace all your other fancy cakes. Although made with premium quality ingredients, it has a very homely taste and can be a great accompaniment for that cup of chai youre having. With a soft, spongy and melt in your mouth texture, it is sure to become a staple at home', 'tea.png' ),
    ('Cup Cake', 89, 'bakery', 'Cup Cake - Choco Chip is baked to perfection. Topped with choco chips, soft on the inside and with a crumbly texture, this sweet goes well during a mini snack break or can even be enjoyed as a dessert after a meal. You can also have it with a warm cup of coffee.', 'cup.png' ),
    ('The Bakers Dozen Garlic Bread', 193, 'bakery', 'Garlic bread is the way it should be, made with 100% whole wheat (atta). Made without any added preservatives or chemicals, the whole wheat garlic bread is packed using a special German packaging technology that retains its oven-baked freshness.', 'gab.png' ),
    ('Danish Blueberry', 172, 'fruits', 'Danish - Blueberry pack. Indulge in a gourmet experience with the goodness of blueberries wrapped in multiple layers of the danish pastry.', 'dab.jpg' ),
    ('Prawn', 300, 'fish & meat', 'We take utmost care in selecting the best suppliers to provide you with high quality and succulent products. Every product is stored in our cold storage right until your doorstep ensuring freshness and utmost hygiene. Additionally, every product is packed using food grade plastic which provides a nourishing and wholesome environment. Chef special marination which is very authentic and has a fragnence which will delight your pallet, its a mixture of exotic flavour & Indian spices.', 'pra.jpg' ),
    ('Rohu', 191, 'fish & meat', 'We take utmost care in selecting the best suppliers to provide you with high quality and succulent products. Every product is stored in our cold storage right until your doorstep ensuring freshness and utmost hygiene. Additionally, every product is packed using food grade plastic which provides a nourishing and wholesome environment. Chef special marination which is very authentic and has a fragnence which will delight your pallet, its a mixture of exotic flavour & Indian spices.', 'roh.jpg' ),
    ('Pomfrey', 922, 'fish & meat', 'We take utmost care in selecting the best suppliers to provide you with high quality and succulent products. Every product is stored in our cold storage right until your doorstep ensuring freshness and utmost hygiene. Additionally, every product is packed using food grade plastic which provides a nourishing and wholesome environment. Chef special marination which is very authentic and has a fragnence which will delight your pallet, its a mixture of exotic flavour & Indian spices.', 'poe.jpg' ),
    ('Tilapia', 250, 'fish & meat', 'We take utmost care in selecting the best suppliers to provide you with high quality and succulent products. Every product is stored in our cold storage right until your doorstep ensuring freshness and utmost hygiene. Additionally, every product is packed using food grade plastic which provides a nourishing and wholesome environment. Chef special marination which is very authentic and has a fragnence which will delight your pallet, its a mixture of exotic flavour & Indian spices.', 'til.jpg' ),
    ('Steak', 580, 'fish & meat', 'We take utmost care in selecting the best suppliers to provide you with high quality and succulent products. Every product is stored in our cold storage right until your doorstep ensuring freshness and utmost hygiene. Additionally, every product is packed using food grade plastic which provides a nourishing and wholesome environment. Chef special marination which is very authentic and has a fragnence which will delight your pallet, its a mixture of exotic flavour & Indian spices.', 'ste.jpg' );