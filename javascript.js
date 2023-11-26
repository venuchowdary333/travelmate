function loadXMLDoc(dname)
{
	if (window.XMLHttpRequest)
	{
		xhttp=new XMLHttpRequest();
		var allproducts = document.getElementById("flightdestination").innerHTML = "";
		var previousresults = document.getElementById("flightarea").innerHTML ="";
	}
	else
	{
		xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.open("GET",dname,false);
	xhttp.send();
	return xhttp.responseXML;
} 
function searchXML()
{
	var txt = "";
	xmlDoc=loadXMLDoc("flights.xml");
	//var searchterm = document.getElementById("origin").value;
	//productquery = document.getElementById("origin");
	//path = productquery.value;
	//console.log(path);
	var searchterm1 = document.getElementById("origin").value;
	var searchterm2 = document.getElementById("depart").value;
var allitems = xmlDoc.getElementsByTagName("firstname");
var alldepart = xmlDoc.getElementsByTagName("lastname");
var persons = xmlDoc.getElementsByTagName("person");
results = new Array;
var count = 1;
var resultDiv = new Array();

for (var i=0;i<allitems.length;i++)
{
var name1 = allitems[i].lastChild.nodeValue;
var exp1 = new RegExp(searchterm1,"i");

for (var j=0;j<alldepart.length;j++){


var name2 = alldepart[j].lastChild.nodeValue;

var exp2 = new RegExp(searchterm2,"i");
if ((searchterm1 == null || searchterm1 == "") || (searchterm2 == null || searchterm2 == ""))
{
	console.log("Please fill all the inputs");
}


else{
	//console.log("inside else");
if ( name1.match(exp1) != null && name2.match(exp2) != null)
{	
resultDiv[j] = document.createElement('div');
resultDiv[j].id = 'result' + j;
resultDiv[j].className = 'product';
resultDiv[j].textContent = 'RESULT ' + (j);
document.getElementById("flightarea").appendChild(resultDiv[j]);
	//results.push(allitems[j]);
	//results.push(persons[j]);
	console.log("count" + j);
	document.getElementById("result"+j).innerHTML =
																// DIV TAGS IN ARRAY TO CREATE INDIVIDUAL RESULT BOXES
							
		'<div class="brand"><b>' + new XMLSerializer().serializeToString(persons[j]) + '</b></div>' + 
		i++	
	}
	
	
}	

}

}
//console.log(results);
//showResults(results, searchterm);
}
function showResults(results, query)
{ 
		console.log(results);
	} 
//document.getElementById("resultarea").innerHTML = txt;


// LOADING PRODUCTS FROM XML FILE

function loadXML1(query) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200 && query == "") {
			displayXML1(this);
			// CLEARS PRODUCTS CURRENTLY DISPLAYING ON THR SCREEN
		} else if (this.readyState == 4 && this.status == 200 && query !== "") { 
			var allproducts = document.getElementById("hoteldestinations").innerHTML = "";
			var previousresults = document.getElementById("hotelarea").innerHTML ="";
			showResult1(xhttp.responseXML, query);
		}
	};
	// LAPTOPS.XML = PRODUCTS FILE
	xhttp.open("GET", 'hotels.xml', true);
	xhttp.send();
}

//  DISPLAYING PRODUCTS FROM XML INTO DIVS FOR STYLING

function displayXML1(xml) {
	var i;
	var xmlDoc = xml.responseXML;
	//var PRODUCTSGRID = document.getElementById("products").innerHTML;
	var x = xmlDoc.getElementsByTagName("DESTINATION");
	var productDiv = new Array();
	for (i = 0; i <x.length; i++) { 
		
		productDiv[i] = document.createElement('div');
		productDiv[i].id = 'product' + i;
		productDiv[i].className = 'product';
		// setting the textContent to the 'i' variable:
		productDiv[i].textContent = 'Laptop: ' + (i + 1);
		document.getElementById("products").appendChild(productDiv[i]);
		document.getElementById('product'+ i).innerHTML = 
																// DIV TAGS IN ARRAY TO CREATE INDIVIDUAL PRODUCT BOXES

			'<div class="brand"><b>' + x[i].getElementsByTagName("COUNTRY")[0].childNodes[0].nodeValue + '</b></div>' +
			'<div class="model"><b>' + x[i].getElementsByTagName("PLACE")[0].childNodes[0].nodeValue + '</b></div>'
			
		//x[i].getElementsByTagName("BRAND")[0].childNodes[0].nodeValue + "<BR>" + x[i].getElementsByTagName("MODEL")[0].childNodes[0].nodeValue;
	}
}

// USING XPATH TO FILTER PRODUCTS AND OUTPUT RESULTS INTO DIVS

function showResult1(xml, query) {
    var txt = "";
	console.log("XPATH RAN");
    /* <!-- path = "//BRAND[@brand='ACER']/following-sibling::*"; -->
	<!-- path = "//LAPTOP[@id='PredHeli700']" -->
	<!-- path = "//LAPTOP"; -->
	<!-- "//DESC[contains(text(),'15.6')]/parent::node()"; --> */
	if (query !== "") {
		productquery = document.getElementById("hotelquery");
		path = productquery.value;
		console.log(path);
	
		if (xml.evaluate) {
			var nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
			var count = 1;
			var resultDiv = new Array();
			
			//var xy = nodes.getElementsByTagName("LAPTOP");
			//var resultlength = xy.length;		
			//console.log(resultlength);
			var result = nodes.iterateNext();
			while (result) {
				resultDiv[count] = document.createElement('div');
				resultDiv[count].id = 'h' + count;
				resultDiv[count].className = 'product';
				resultDiv[count].textContent = 'RESULT ' + (count);
				document.getElementById("hotelarea").appendChild(resultDiv[count]);
				document.getElementById("h"+count).innerHTML =
																		// DIV TAGS IN ARRAY TO CREATE INDIVIDUAL RESULT BOXES
									
				'<div class="brand"><b>' + result.getElementsByTagName("COUNTRY")[0].childNodes[0].nodeValue + '</b></div>' +
				'<div class="model"><b>' + result.getElementsByTagName("PLACE")[0].childNodes[0].nodeValue + '</b></div>'
				 
				console.log(result.childNodes[0].nodeValue);
				count++;
				result = nodes.iterateNext();
			} 
		//document.getElementById("resultarea").innerHTML = txt;
		}
	}
} 




// LOADING PRODUCTS FROM XML FILE

function loadXML(query) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200 && query == "") {
			displayXML(this);
			// CLEARS PRODUCTS CURRENTLY DISPLAYING ON THR SCREEN
		} else if (this.readyState == 4 && this.status == 200 && query !== "") { 
			var allproducts = document.getElementById("destinations").innerHTML = "";
			var previousresults = document.getElementById("resultarea").innerHTML ="";
			showResult(xhttp.responseXML, query);
		}
	};
	// LAPTOPS.XML = PRODUCTS FILE
	xhttp.open("GET", 'destinations.xml', true);
	xhttp.send();
}

//  DISPLAYING PRODUCTS FROM XML INTO DIVS FOR STYLING

function displayXML(xml) {
	var i;
	var xmlDoc = xml.responseXML;
	//var PRODUCTSGRID = document.getElementById("products").innerHTML;
	var x = xmlDoc.getElementsByTagName("DESTINATION");
	var productDiv = new Array();
	for (i = 0; i <x.length; i++) { 
		
		productDiv[i] = document.createElement('div');
		productDiv[i].id = 'product' + i;
		productDiv[i].className = 'product';
		// setting the textContent to the 'i' variable:
		productDiv[i].textContent = 'Laptop: ' + (i + 1);
		document.getElementById("products").appendChild(productDiv[i]);
		document.getElementById('product'+ i).innerHTML = 
																// DIV TAGS IN ARRAY TO CREATE INDIVIDUAL PRODUCT BOXES

			'<div class="brand"><b>' + x[i].getElementsByTagName("COUNTRY")[0].childNodes[0].nodeValue + '</b></div>' +
			'<div class="model"><b>' + x[i].getElementsByTagName("PLACE")[0].childNodes[0].nodeValue + '</b></div>'
			
		//x[i].getElementsByTagName("BRAND")[0].childNodes[0].nodeValue + "<BR>" + x[i].getElementsByTagName("MODEL")[0].childNodes[0].nodeValue;
	}
}

// USING XPATH TO FILTER PRODUCTS AND OUTPUT RESULTS INTO DIVS

function showResult(xml, query) {
    var txt = "";
	console.log("XPATH RAN");
    /* <!-- path = "//BRAND[@brand='ACER']/following-sibling::*"; -->
	<!-- path = "//LAPTOP[@id='PredHeli700']" -->
	<!-- path = "//LAPTOP"; -->
	<!-- "//DESC[contains(text(),'15.6')]/parent::node()"; --> */
	if (query !== "") {
		productquery = document.getElementById("productquery");
		path = productquery.value;
		console.log(path);
	
		if (xml.evaluate) {
			var nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
			var count = 1;
			var resultDiv = new Array();
			
			//var xy = nodes.getElementsByTagName("LAPTOP");
			//var resultlength = xy.length;		
			//console.log(resultlength);
			var result = nodes.iterateNext();
			while (result) {
				resultDiv[count] = document.createElement('div');
				resultDiv[count].id = 'result' + count;
				resultDiv[count].className = 'product';
				resultDiv[count].textContent = 'RESULT ' + (count);
				document.getElementById("resultarea").appendChild(resultDiv[count]);
				document.getElementById("result"+count).innerHTML =
																		// DIV TAGS IN ARRAY TO CREATE INDIVIDUAL RESULT BOXES
									
				'<div class="brand"><b>' + result.getElementsByTagName("COUNTRY")[0].childNodes[0].nodeValue + '</b></div>' +
				'<div class="model"><b>' + result.getElementsByTagName("PLACE")[0].childNodes[0].nodeValue + '</b></div>'
				
				console.log(result.childNodes[0].nodeValue);
				count++;
				result = nodes.iterateNext();
			} 
		//document.getElementById("resultarea").innerHTML = txt;
		}
	}
} 

//FORM VALIDATION //

// SWITCHES FORM IF USER WANTS TO REGISTER / LOG IN 
function switchForm(x) {
	if(x==1) {
		document.getElementById("loginform").style.display="none";
		document.getElementById("registerform").style.display="block";
		document.getElementById("loginsubmitmessage").innerHTML ="";
	} else {
		document.getElementById("registerform").style.display="none";
		document.getElementById("loginform").style.display="block";
		document.getElementById("registersubmitmessage").innerHTML = "";
	}
}

// ENSURES USER ENTERS DATA INTO ALL BOXES
function loginValidateForm() {
	var emailcheck = document.forms["loginform"]["logemail"].value;
	var passwordcheck = document.forms["loginform"]["logpassword"].value;
	if (emailcheck == "") {
		document.getElementById("loginsubmitmessage").innerHTML = "Email is required.";
		document.getElementById("loginsubmitmessage").style.color = "red";
		document.getElementById("logemail").style.border = "1px solid red";
	} else if (passwordcheck == "") {
		document.getElementById("loginsubmitmessage").innerHTML = "Password is required.";
		document.getElementById("loginsubmitmessage").style.color = "red";
		document.getElementById("logpassword").style.border = "1px solid red";
		
	} else {
		// GIVES SUCCESS MESSAGE
		document.forms["loginform"].reset();
		document.getElementById("loginsubmitmessage").innerHTML = "You are now logged in.";
		document.getElementById("loginsubmitmessage").style.color = "green";
		document.getElementById("logpassword").style.border = "";
		document.getElementById("logemail").style.border = "";
	}
}

function registerValidateForm() {
	var firstnamecheck = document.forms["registerform"]["firstname"].value;
	var lastnamecheck = document.forms["registerform"]["lastname"].value;
	var emailcheck = document.forms["registerform"]["regemail"].value;
	var passwordcheck = document.forms["registerform"]["regpassword"].value;
	var repeatpasswordcheck = document.forms["registerform"]["regrptpassword"].value;
	var termsaccepted = document.forms["registerform"]["terms"].checked;
	
	if (firstnamecheck == "") {
		document.getElementById("registersubmitmessage").innerHTML = "First Name is required.";
		document.getElementById("registersubmitmessage").style.color = "red";
		document.getElementById("firstname").style.border = "1px solid red";
		console.log(termsaccepted);
	} else if (lastnamecheck == "") {
		document.getElementById("registersubmitmessage").innerHTML = "Last Name is required.";
		document.getElementById("registersubmitmessage").style.color = "red";
		document.getElementById("lastname").style.border = "1px solid red";
	} else if (emailcheck == "") {
		document.getElementById("registersubmitmessage").innerHTML = "Email is required.";
		document.getElementById("registersubmitmessage").style.color = "red";
		document.getElementById("regemail").style.border = "1px solid red";
	} else if (passwordcheck == "") {
		document.getElementById("registersubmitmessage").innerHTML = "Password is required.";
		document.getElementById("registersubmitmessage").style.color = "red";
		document.getElementById("regpassword").style.border = "1px solid red";
	} else if (repeatpasswordcheck !== passwordcheck) {
		document.getElementById("registersubmitmessage").innerHTML = "Passwords do not match.";
		document.getElementById("registersubmitmessage").style.color = "red";
		document.getElementById("regrptpassword").style.border = "1px solid red";
	} else if (termsaccepted != true) {
		document.getElementById("registersubmitmessage").innerHTML = "You have not agreed to the Terms and Conditions.";
		document.getElementById("registersubmitmessage").style.color = "red";
		/* <!-- document.getElementById("checkboxterms").style.border = "1px solid red"; -->
		<!-- console.log("NOT CHECKED" + "PROPERTY: " + termsaccepted); --> */
	} else {
		// SUCCESS MESSAGE AND RETURNS BORDERS TO DEFAULT STYLE
		document.forms["registerform"].reset();
		document.getElementById("registersubmitmessage").innerHTML = "You have successfully created an account. <br>Please check your email inbox for an activation link.";
		document.getElementById("registersubmitmessage").style.color = "green";
		document.getElementById("firstname").style.border = "";
		document.getElementById("lastname").style.border = "";
		document.getElementById("regpassword").style.border = "";
		document.getElementById("regrptpassword").style.border = "";
		document.getElementById("regemail").style.border = "";
	}
}
// REVEALS PASSWORD WHEN CHECK BOX IS CHECKED
function showPassword() {
  var x = document.getElementById("logpassword");
  if (x.type === "password") {
    x.type = "text";
	console.log("visible");
  } else {
    x.type = "password";
	console.log("hidden");
  }
}



//SLIDESHOW

// FUNCTION TO GENERATE RANDOM SLIDE NUMBER WHEN BUTTON IS PRESSED
function randomSlides() {
	rand = Math.ceil(Math.random() * 7);
			// IF RANDOM NUMBER = PREVIOUS RANDOM NUMBER, GENERATE ANOTHER
	if (rand == slideNumber) {
		rand = Math.ceil(Math.random() * 7); 
	} 
	console.log(rand);
	slideNumber = 0;
	displaySlide(slideNumber += rand);
}

//SETS DEFAULT SLIDE NUMBER WHEN LANDING ON PAGE
var slideNumber = 1;


// FUNCTION TO CHANGE WHICH SLIDE IS BEING DISPLAYED
function displaySlide(s) {
	 var i;
	 var slides = document.getElementsByClassName("slideImages");
	 var thumbnails = document.getElementsByClassName("thumbnail");
	 var caption = document.getElementById("caption");
	 if (s > slides.length) {
		slideNumber = 1
	}
	if (s < 1) {
		slideNumber = slides.length
	}
	 for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	// FUNCTION TO CHANGE WHICH THUMBNAIL IS ACTIVE
	for (i = 0; i < thumbnails.length; i++) {
		thumbnails[i].className = thumbnails[i].className.replace(" active", "");
	}
	slides[slideNumber-1].style.display = "block";
	thumbnails[slideNumber-1].className += " active";
	caption.innerHTML = thumbnails[slideNumber-1].alt;
}

//FUNCTION RAN WHEN PREVIOUS / NEXT BUTTON PRESSED
function changeSlide(s) {
  displaySlide(slideNumber += s);
}
// FUNCTION RAN WHEN A THUMBNAIL IS PRESSED
function currentSlide(s) {
  displaySlide(slideNumber = s);
}
	 