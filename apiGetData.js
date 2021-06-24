// https://covid19-api.weedmark.systems/
var cvid19Stats;
var key = "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=";
function onLoad(land){
  console.log(land);
  key = key + land;
  console.log(key);
  var settings = {
  	"async": true,
  	"crossDomain": true,
  	"url": key,
  	"method": "GET",
  	"headers": {
  		"x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
  		"x-rapidapi-key": "c2b8ee4093mshfc60a8b6aae99f9p17b372jsnfe9a7b744b4d"
  	}
  }
  $.ajax(settings).done(function (response) {

  })
  .always(function(response){
    cvid19Stats = response.data.covid19Stats;
    //console.log(cvid19Stats);
  })
  .then(function (){
    var addition = 0;
    var additionDeaths = 0;
    var additionRecovered = 0;
    for (var i = 0; i < cvid19Stats.length; i++) {
      var countryColumn = cvid19Stats[i];
      addition += Math.floor(countryColumn.confirmed);
      additionRecovered += Math.floor(countryColumn.recovered);
      additionDeaths += Math.floor(countryColumn.deaths);
    }
    var tts = Math.floor(addition - additionRecovered).toLocaleString();
    $("#totalCases").append("<b>" + addition.toLocaleString() + "</b>");
    $("#totalRecovered").append("<b>" + additionRecovered.toLocaleString() + "</b>");
    $("#totalDeaths").append("<b>" + additionDeaths.toLocaleString() + "</b>");
    $("#totalSick").append("<b>" + tts + "</b>");
  })
  $('select').on('change', function(){
    var countryColumn;
    var userInput = document.formCountry.country.value;
    var addition = 0;
    var additionDeaths = 0;
    var additionRecovered = 0;
    if (userInput != "null") {
      for (var index = 0; index < cvid19Stats.length; index++) {
        countryColumn = cvid19Stats[index];
        if (userInput == countryColumn.country && userInput != "null" && countryColumn.province != "null") {
            addition += Math.floor(countryColumn.confirmed);
            additionRecovered += Math.floor(countryColumn.recovered);
            additionDeaths += Math.floor(countryColumn.deaths);
            document.getElementById('countrySelected').innerHTML = '';
            document.getElementById('countryCases').innerHTML = '';
            document.getElementById('countryRecovered').innerHTML = '';
            document.getElementById('countryDeaths').innerHTML = '';
            document.getElementById('countrySick').innerHTML = '';
            if (countryColumn.recovered != null) {
              var tts = Math.floor(addition - additionRecovered).toLocaleString();
              $("#countrySelected").append("Country: " + "<b>" + userInput + "</b>");
              $("#countryCases").append("Total Cases count:  " + "<b>" + addition.toLocaleString() + "</b>");
              $("#countryRecovered").append("Total recovered count:  " + "<b>" + additionRecovered.toLocaleString() + "</b>");
              $("#countryDeaths").append("Total death count:  " + "<b>" + additionDeaths.toLocaleString() + "</b>");
              $("#countrySick").append("Total sick count:  " + "<b>" + tts + "</b>");
            }
            if (countryColumn.recovered == null) {
              $("#countrySelected").append("Country: " + "<b>" + userInput + "</b>");
              $("#countryCases").append("Total Cases count:  " + "<b>" + addition.toLocaleString() + "</b>");
              $("#countryRecovered").append("Total recovered count:  " + "<b>" + "No Count" + "</b>");
              $("#countryDeaths").append("Total death count:  " + "<b>" + additionDeaths.toLocaleString() + "</b>");
              $("#countrySick").append("Total sick count:  " + "<b>" + "No Count" + "</b>");
            }
        }
        if (userInput == countryColumn.country && userInput != "null" && countryColumn.province == "null") {
          addition += Math.floor(countryColumn.confirmed);
          additionRecovered += Math.floor(countryColumn.recovered);
          additionDeaths += Math.floor(countryColumn.deaths);
          document.getElementById('countrySelected').innerHTML = '';
          document.getElementById('countryCases').innerHTML = '';
          document.getElementById('countryRecovered').innerHTML = '';
          document.getElementById('countryDeaths').innerHTML = '';
          document.getElementById('countrySick').innerHTML = '';
          if (countryColumn.recovered != null) {
            var tts = Math.floor(addition - additionRecovered).toLocaleString();
            $("#countrySelected").append("Country: " + "<b>" + userInput + "</b>");
            $("#countryCases").append("Total Cases count:  " + "<b>" + addition.toLocaleString() + "</b>");
            $("#countryRecovered").append("Total recovered count:  " + "<b>" + additionRecovered.toLocaleString() + "</b>");
            $("#countryDeaths").append("Total death count:  " + "<b>" + additionDeaths.toLocaleString() + "</b>");
            $("#countrySick").append("Total sick count:  " + "<b>" + tts + "</b>");
          }
          if (countryColumn.recovered == null) {
            $("#countrySelected").append("Country: " + "<b>" + userInput + "</b>");
            $("#countryCases").append("Total Cases count:  " + "<b>" + addition.toLocaleString() + "</b>");
            $("#countryRecovered").append("Total recovered count:  " + "<b>" + "No Count" + "</b>");
            $("#countryDeaths").append("Total death count:  " + "<b>" + additionDeaths.toLocaleString() + "</b>");
            $("#countrySick").append("Total sick count:  " + "<b>" + "No Count" + "</b>");
          }
        }
      }
    }
    if (userInput == "null") {
      alert("Country selected is not in database");
    }
  });
}
onLoad("");
