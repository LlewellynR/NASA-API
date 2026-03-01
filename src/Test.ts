import key from './Key.js';
async function API() {
  const url =
    'https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=' +
    key;
  try {
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    const data = document.getElementById('data') as HTMLElement;

    var hazard;
    const neo = result.near_earth_objects['2015-09-08'];
    if (neo[0].is_potentially_hazardous_asteroid === true) {
      hazard = 'yes';
    } else {
      hazard = 'no';
    }
    data.innerHTML = 'Was it dangerous: ' + hazard;
    //asteroid name
    const Asteroid = document.getElementById('Ast-name') as HTMLElement;
    Asteroid.innerText = 'Name: ' + neo[0].name;

    //link to the asteroid
    const output = document.getElementById('output') as HTMLElement;
    const link = document.createElement('a');
    link.href = neo[0].nasa_jpl_url;
    link.innerText = 'Click here for more details';
    output.append(link);
    //magnitude
    const magnitude = document.getElementById('magnitude') as HTMLElement;
    magnitude.innerText = 'Magnitude: ' + neo[0].absolute_magnitude_h;
    //size
    const size=document.getElementById('Ast-size') as HTMLElement;
    const diameter=neo[0].estimated_diameter;
    const est_diameter_max=diameter.feet.estimated_diameter_max;
    const est_diameter_min=diameter.feet.estimated_diameter_min;
    size.innerText = 'Size(ft): ' + est_diameter_min +", " + est_diameter_max;
    //date
    const Ast_date=document.getElementById('Ast-date') as HTMLElement;
    const Approach_data=neo[0].close_approach_data[0];
    console.log(Approach_data);
    Ast_date.innerText = 'Asteroid date: '+Approach_data.close_approach_date_full;
  } catch (err) {
    console.log(err);
  }
}
API();
