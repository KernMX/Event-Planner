function dateattrs() {
  var todaysDate = new Date(); // Gets today's date
  // Min date attribute is in "YYYY-MM-DD".  Need to format today's date accordingly
  var year = todaysDate.getFullYear();                        // YYYY
	var month = ("0" + (todaysDate.getMonth() + 1)).slice(-2);  // MM
  var day = ("0" + todaysDate.getDate()).slice(-2);           // DD
	var minDate = (year +"-"+ month +"-"+ day); // Results in "YYYY-MM-DD" for today's date
  alert("Todays Date: " + minDate);
	// Now to set the max date value for the calendar to be today's date
	document.getElementById('date').setAttribute("min", minDate);
  document.getElementById('date').setAttribute("value", "mmm-dd-yyyy");
}
