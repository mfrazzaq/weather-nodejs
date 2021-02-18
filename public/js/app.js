// console.log("Javascript is working");
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const fore = document.querySelector('#forcast');
const loc = document.querySelector("#location");
const er = document.querySelector("#error");
weatherForm.addEventListener('submit',(e) => {
    e.preventDefault();
    const value = search.value;
    if(value){
        fetch('http://localhost:3000/weather?address=' + value.toString()).then((response) => {
            response.json().then((data) => {
                if(data.error){
                    console.log(data.error);
                    er.textContent = data.error;
                }else{
                    console.log(data.location);
                    console.log(data.forcast);
                    fore.textContent  = data.forcast;
                    loc.textContent = data.location;

                }
            });
        });        
    }else {
        console.log("Please enter a value");
    }
    
} );

