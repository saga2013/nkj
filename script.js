const countryInput = document.getElementById('countryInput')
const searchButton =document.getElementById('searchButton')
const countryInfo = document.getElementById('countryInfo')
async function fetchCountries(countryName) {
    try{
        const url = `https://restcountries.com/v3.1/name/${countryName}`
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
        if (data && data.length > 0) {
            const country = data[0];
            const languages = country.languages ? Object.values(country.languages).join(', ') : 'Нет данных';
            countryInfo.innerHTML = `
                <h1>${country.name.common}</h1>
                <img src="${country.flags[1] || country.flags[0]}" > 
                <p><strong>population:</strong>${country.population}</p>
                <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'Нет данных'}</p> 
                <p><strong>Region:</strong> ${country.region}</p> 
                <p><strong>languages:</strong> ${languages}</p>
            `;  
              } else {
            countryInfo.innerHTML = `<p>Страна не найдена.</p>`;
        }
    }catch(error){
        console.log("ошибка", error)
    }
}
searchButton.addEventListener('click', ()=>{
    const countryNameInput = countryInput.value.trim().toLowerCase();
    if(countryNameInput){
        fetchCountries(countryNameInput)
    }
})



