
const destinations = [
    { name: "Samarqand", type: "Ziyorat", budget: 1000 , duration: 5 },
    { name: "Zomin", type: "Davolanish", budget: 1000, duration: 5 },
    { name: "Andijon", type: "Gastronomik", budget: 1000, duration: 5 },
    { name: "Toshkent", type: "Ko'ngilochar", budget: 1000, duration: 5 },
    { name: "Xorazm", type: "Tarixiy", budget: 1000, duration: 5 }
];


function generateItinerary() {
   
    const preference = document.getElementById('preference').value;
    const budget = parseInt(document.getElementById('budget').value);
    const days = parseInt(document.getElementById('days').value);

  
    const itinerary = destinations.filter(destination => 
        destination.type === preference && 
        destination.budget <= budget && 
        destination.duration <= days
    );

  
    const itineraryList = document.getElementById('itinerary-list');
    itineraryList.innerHTML = '';  

    if (itinerary.length > 0) {
        itinerary.forEach(destination => {
            const listItem = document.createElement('li');
           
            listItem.textContent = `${destination.name} - ${destination.type} (Budget: $${destination.budget}, Duration: ${destination.duration} days)`;
            itineraryList.appendChild(listItem);
        });
    } else {
        const listItem = document.createElement('li');
        listItem.textContent = "Kechirasiz , tanlanganlar asosida tur mavjud emas. Ro'yhat asosida urunib koring.";
        itineraryList.appendChild(listItem);
    }
}
