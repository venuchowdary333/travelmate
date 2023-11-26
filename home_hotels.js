// LOADING PRODUCTS FROM XML FILE

function loadXML1(query) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200 && query == "") {
			displayXML(this);
			// CLEARS PRODUCTS CURRENTLY DISPLAYING ON THR SCREEN
		} else if (this.readyState == 4 && this.status == 200 && query !== "") { 
			//var allproducts = document.getElementById("destinations").innerHTML = "";
			var previousresults = document.getElementById("hotelarea").innerHTML ="";
			showResult(xhttp.responseXML, query);
		}
	};
	// LAPTOPS.XML = PRODUCTS FILE
	xhttp.open("GET", 'hotels.xml', true);
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