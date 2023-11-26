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
		document.getElementById("resultarea").appendChild(resultDiv[j]);
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