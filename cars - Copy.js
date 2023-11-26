		function loadXMLDoc(dname)
		{
			if (window.XMLHttpRequest)
			{
				xhttp=new XMLHttpRequest();
				var allproducts = document.getElementById("destinations").innerHTML = "";
				var previousresults = document.getElementById("resultarea").innerHTML ="";
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
			xmlDoc=loadXMLDoc("cars.xml");
			//var searchterm = document.getElementById("origin").value;
			//productquery = document.getElementById("origin");
			//path = productquery.value;
			//console.log(path);
			var searchterm = document.getElementById("origin").value;
    var allitems = xmlDoc.getElementsByTagName("firstname");
	var persons = xmlDoc.getElementsByTagName("person");
    results = new Array;
	var count = 1;
	var resultDiv = new Array();
    for (var i=0;i<allitems.length;i++)
    {
		resultDiv[count] = document.createElement('div');
		
        var name = allitems[i].lastChild.nodeValue;
        var exp = new RegExp(searchterm,"i");
        if ( name.match(exp) != null)
        {	
			resultDiv[count].id = 'result' + count;
		resultDiv[count].className = 'product';
		resultDiv[count].textContent = 'RESULT ' + (count);
		document.getElementById("resultarea").appendChild(resultDiv[count]);
            results.push(allitems[i]);
			console.log(persons[i]);
			//document.getElementById("resultarea").appendChild(persons[i]);
			document.getElementById("result"+count).innerHTML =
																		// DIV TAGS IN ARRAY TO CREATE INDIVIDUAL RESULT BOXES
									
				'<div class="brand"><b>' + new XMLSerializer().serializeToString(persons[i]) + '</b></div>' + 
				count++
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