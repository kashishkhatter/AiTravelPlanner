const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = 'AIzaSyCk4qR3Y8oX3vmrb_yqSismy1wkZs6DNBQ';
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json", //our res is in json
  };
  
  
   export const chatSession = model.startChat({
      generationConfig,
  
      history: [ //to refer to prev responses to train better
        {
            role: "user",
            parts: [
              {text: "Generate Travel Plan for Location: AJS, Les Aimereaux, Rue Charles Tellier, 85310 La Chaize-le-Vicomte, France, for 3 and 2 Night for A Couple with a Moderate budget with a Flight details, Flight Price with Booking url, Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating. descriptions and Places to visit nearby with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for 3 days and 2 night with each day plan with best time to visit in JSON format.\n\n\n"},
            ],
          },
          {
            role: "model",
            parts: [
              {text: "```json\n{\n  \"flight\": {\n    \"details\": {\n      \"departure_airport\": \"Your Departure Airport\",\n      \"arrival_airport\": \"Nantes Atlantique Airport (NTE)\",\n      \"departure_date\": \"2024-03-15\",\n      \"return_date\": \"2024-03-18\"\n    },\n    \"price\": {\n      \"currency\": \"EUR\",\n      \"amount\": \"200\"\n    },\n    \"booking_url\": \"https://www.example-flight-booking.com/\"\n  },\n  \"hotel\": [\n    {\n      \"name\": \"Hotel Le Relais de la Chaize\",\n      \"address\": \"Rue du Moulin, 85310 La Chaize-le-Vicomte\",\n      \"price\": {\n        \"currency\": \"EUR\",\n        \"amount\": \"70\"\n      },\n      \"image_url\": \"https://example.com/hotel-le-relais-de-la-chaize.jpg\",\n      \"geo_coordinates\": {\n        \"latitude\": 46.7123,\n        \"longitude\": -1.4567\n      },\n      \"rating\": 4.5,\n      \"description\": \"A charming hotel located in the heart of La Chaize-le-Vicomte, offering comfortable rooms and a friendly atmosphere.\"\n    },\n    {\n      \"name\": \"Gite du Château\",\n      \"address\": \"Route de la Forêt, 85310 La Chaize-le-Vicomte\",\n      \"price\": {\n        \"currency\": \"EUR\",\n        \"amount\": \"90\"\n      },\n      \"image_url\": \"https://example.com/gite-du-chateau.jpg\",\n      \"geo_coordinates\": {\n        \"latitude\": 46.7234,\n        \"longitude\": -1.4356\n      },\n      \"rating\": 4.0,\n      \"description\": \"A cozy countryside gîte with beautiful views of the surrounding countryside.\"\n    }\n  ],\n  \"places_to_visit\": [\n    {\n      \"name\": \"Château de la Chaize-le-Vicomte\",\n      \"details\": \"A historical castle with a rich history dating back to the 15th century.\",\n      \"image_url\": \"https://example.com/chateau-de-la-chaize-le-vicomte.jpg\",\n      \"geo_coordinates\": {\n        \"latitude\": 46.7112,\n        \"longitude\": -1.4435\n      },\n      \"ticket_pricing\": {\n        \"adult\": \"10 EUR\",\n        \"child\": \"5 EUR\"\n      },\n      \"time_to_travel\": \"2 hours\"\n    },\n    {\n      \"name\": \"Église Saint-Martin\",\n      \"details\": \"A beautiful Romanesque church known for its impressive architecture and stained glass windows.\",\n      \"image_url\": \"https://example.com/eglise-saint-martin.jpg\",\n      \"geo_coordinates\": {\n        \"latitude\": 46.7098,\n        \"longitude\": -1.4456\n      },\n      \"ticket_pricing\": \"Free\",\n      \"time_to_travel\": \"1 hour\"\n    },\n    {\n      \"name\": \"Musée d'Art et d'Histoire\",\n      \"details\": \"A museum showcasing local art, history, and culture.\",\n      \"image_url\": \"https://example.com/musee-d-art-et-d-histoire.jpg\",\n      \"geo_coordinates\": {\n        \"latitude\": 46.7105,\n        \"longitude\": -1.4423\n      },\n      \"ticket_pricing\": {\n        \"adult\": \"5 EUR\",\n        \"child\": \"3 EUR\"\n      },\n      \"time_to_travel\": \"1.5 hours\"\n    },\n    {\n      \"name\": \"Parc de la Chaize\",\n      \"details\": \"A picturesque park with walking trails, gardens, and a playground.\",\n      \"image_url\": \"https://example.com/parc-de-la-chaize.jpg\",\n      \"geo_coordinates\": {\n        \"latitude\": 46.7134,\n        \"longitude\": -1.4389\n      },\n      \"ticket_pricing\": \"Free\",\n      \"time_to_travel\": \"2 hours\"\n    },\n    {\n      \"name\": \"Le Marais Poitevin\",\n      \"details\": \"A beautiful wetland area known as the \"Green Venice\" with opportunities for boat trips and nature walks.\",\n      \"image_url\": \"https://example.com/le-marais-poitevin.jpg\",\n      \"geo_coordinates\": {\n        \"latitude\": 46.4879,\n        \"longitude\": -0.8875\n      },\n      \"ticket_pricing\": \"Varies depending on boat trip\",\n      \"time_to_travel\": \"3 hours\"\n    },\n    {\n      \"name\": \"Nantes\",\n      \"details\": \"A vibrant city known for its historical center, art scene, and unique architecture.\",\n      \"image_url\": \"https://example.com/nantes.jpg\",\n      \"geo_coordinates\": {\n        \"latitude\": 47.2184,\n        \"longitude\": -1.5536\n      },\n      \"ticket_pricing\": \"Varies depending on attractions\",\n      \"time_to_travel\": \"1 hour\"\n    }\n  ],\n  \"travel_plan\": {\n    \"day1\": {\n      \"morning\": {\n        \"time\": \"9:00 AM\",\n        \"activity\": \"Visit Château de la Chaize-le-Vicomte\",\n        \"details\": \"Explore the castle, its gardens, and learn about its history.\"\n      },\n      \"afternoon\": {\n        \"time\": \"1:00 PM\",\n        \"activity\": \"Lunch at a local restaurant in La Chaize-le-Vicomte\",\n        \"details\": \"Enjoy traditional French cuisine at a charming local restaurant.\"\n      },\n      \"evening\": {\n        \"time\": \"6:00 PM\",\n        \"activity\": \"Visit Église Saint-Martin\",\n        \"details\": \"Admire the architecture and stained glass windows of this beautiful church.\"\n      }\n    },\n    \"day2\": {\n      \"morning\": {\n        \"time\": \"9:00 AM\",\n        \"activity\": \"Visit Musée d'Art et d'Histoire\",\n        \"details\": \"Learn about the local art, history, and culture.\"\n      },\n      \"afternoon\": {\n        \"time\": \"1:00 PM\",\n        \"activity\": \"Relax in Parc de la Chaize\",\n        \"details\": \"Enjoy a picnic or stroll through the park's gardens and trails.\"\n      },\n      \"evening\": {\n        \"time\": \"6:00 PM\",\n        \"activity\": \"Dinner at a restaurant in La Chaize-le-Vicomte\",\n        \"details\": \"Experience a delicious meal at a local restaurant.\"\n      }\n    },\n    \"day3\": {\n      \"morning\": {\n        \"time\": \"9:00 AM\",\n        \"activity\": \"Day trip to Le Marais Poitevin\",\n        \"details\": \"Take a boat trip through the canals of the Green Venice and enjoy the natural beauty.\"\n      },\n      \"afternoon\": {\n        \"time\": \"1:00 PM\",\n        \"activity\": \"Lunch at a restaurant in Le Marais Poitevin\",\n        \"details\": \"Enjoy a meal with a view of the beautiful wetlands.\"\n      },\n      \"evening\": {\n        \"time\": \"6:00 PM\",\n        \"activity\": \"Return to La Chaize-le-Vicomte\",\n        \"details\": \"Relax and enjoy the evening in your hotel or explore the town.\"\n      }\n    }\n  }\n}\n```\n\n**Notes:**\n\n* This itinerary is a suggestion and can be customized based on your preferences.\n* Flight prices and hotel prices are estimates and may vary depending on the time of year and availability.\n* It is recommended to book flights and accommodation in advance, especially during peak season.\n* You can easily find detailed information about each place and activity online.\n* Remember to check opening hours and ticket prices before visiting.\n* Consider bringing comfortable walking shoes as you'll be doing a lot of walking.\n* Enjoy your trip! \n"},
            ],
          },
    
      ],
    });
  
   //const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    //console.log(result.response.text());
  
  
