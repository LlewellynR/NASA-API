import key from './Key.js';
async function API() {
  const url =
    'https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key='+key;
  try {
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    const data=(document.getElementById('data') as HTMLElement);

    const neo=result.near_earth_objects["2015-09-08"];
    if(neo[0].is_potentially_hazardous_asteroid===true){
      data.innerHTML = "yes";
    } else{
      data.innerHTML = "no";
    }
    const Asteroid=document.getElementById('Ast-name') as HTMLElement;
    Asteroid.innerHTML=neo[0].name;

    const output=document.getElementById('output') as HTMLElement;
    const link=document.createElement("a");
    link.href=neo[0].nasa_jpl_url;
    link.innerText="Click here for more details";
    output.append(link);


  } catch (err) {
    console.log(err);
  }
}
API();