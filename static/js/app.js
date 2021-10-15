// getting the required select elements
let city_select = document.getElementById('city')
var restaurant_select = document.getElementById('restaurant');
// console.log(restaurant_select.value)

restaurantName = restaurant_select.value

// called when user selects a city
city_select.onchange =()=>{
    // getting user selected city
    city = city_select.value;
    
    //returning the city name to the backend to get the corresponding restaurants of that city
    fetch('/restaurant/'+city).then((response)=>{
        //get the restaurants from the database
        response.json().then((data)=>{
            let optionHTML = '';
            //appending the restaurant names in the string
            for( let restaurant of data.restaurants){
                optionHTML+='<option value = "' + restaurant.id + '">' + restaurant +'</option>';
            }
            //showing these restaurants in the second dropdown
            restaurant_select.innerHTML = optionHTML;
        })
    })
    restaurant_select = document.getElementById('restaurant');
    console.log(restaurant_select.value)
}

restaurant_select.onchange =() =>{
    restaurantName = restaurant_select.value
    console.log(restaurantName)
} 

const restaurantSubmit = () =>{
    // restaurantName = restaurant_select.value;
    city = city_select.value;
    console.log(restaurantName)
    fetch('/restaurant/'+city + '/' + restaurantName).then((response)=>{
        //get the restaurants from the database
        response.json().then((data)=>{
            // let optionHTML = '';
            // //appending the restaurant names in the string
            // for( let restaurant of data.restaurants){
            //     optionHTML+='<option value = "' + restaurant.id + '">' + restaurant +'</option>';
            // }
            //showing these restaurants in the second dropdown
            console.log(data)
            // restaurant_select.innerHTML = optionHTML;
        })
    })

}


 