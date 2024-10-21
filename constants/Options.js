export const SelectTravelersList=[ //arr of objects (items of the list) for traveler
    {    
        id:1,
        title:'Just Me',
        desc: 'A solo traveler exploring',
        icon:'💁‍♀️',
        people:'1'
     },

     {
        id:2,
        title:'A Couple',
        desc: 'Two travelers in tandem',
        icon:'👩‍❤️‍👨',
        people:'2 People'
     },
     {
        id:3,
        title:'Family',
        desc: 'A group of fun loving adventurers',
        icon:'👨‍👩‍👧‍👦',
        people:'3 to 5 People'
     },
     {
        id:4,
        title:'Friends',
        desc: 'A bunch of thrill-seeks',
        icon:'🤸',
        people:'5 to 10 People'
     },
     
]

export const selectBudgetOptions=[ //arr of obj for list of budget options
   {    
      id:1,
      title:'Cheap',
      desc: 'Cost concious',
      icon:'💵',
     
   },

   {
      id:2,
      title:'Moderate',
      desc: 'Average costs',
      icon:'💰',
   
   },
   {
      id:3,
      title:'Luxury',
      desc: 'No worry about costs',
      icon:'💸',
    
   }
]

//prompt for ai to generate trips with variables as choosen by user(budget,traveler,days,nights)
export const AI_PROMPT='Generate Travel Plan for Location: {location}, for {totalDays} and {totalNights} Night for {Traveler} with a {budget} budget with a Flight details, Flight Price with Booking url, Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating. descriptions and Places to visit nearby with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for {totalDays} days and {totalNights} night with each day plan with best time to visit in JSON format.'