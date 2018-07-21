//Parameters
function scraper() {
  var category = document.getElementById('category').value;
  var max_price = document.getElementById('max_price').value;
  var location = document.getElementById('location').value;
  var date = document.getElementById('date').value;

  var scraper = require('google-search-scraper');
  var DeathByCaptcha = require('deathbycaptcha');

  var dbc = new DeathByCaptcha('username', 'password');

  var options = {
    query: category + "near" + location + "under" + max_price,
    age: 'y', // less than a year,
    solver: dbc
  };
  alert("inside scraper");
  scraper.search(options, function(err, url)) {
    // This is called for each result
    if(err) {
      throw err;
    } else {
      console.log(url)
    }
  }
}
