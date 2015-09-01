/**
 *	On Document load 
 *
 */
 $(document).ready(function() {		
	 
	 //Call the API to get the JSON data
	 //Chrome currently blocks this request from the file system.  Either host the json file on a web server, or use this workaround: http://stackoverflow.com/questions/18586921/how-to-launch-html-using-chrome-at-allow-file-access-from-files-mode
	 //Firefox does not block this FYI, and IE blocks it completely.
	 //Reading from the file system would not work in a real environment obviously.
	 $.ajax({
        type : 'GET',
        dataType : 'json',
        url: 'code-test.json',
		contentType: "application/json; charset=utf-8",
        success : function(data) {
			//Create the Rate table html with the JSON data
            createTable(data);
        },
		error: function(xhr, textStatus, errorThrown) {
			var errorMessage = "Ajax error: " + this.url + " textStatus: " + textStatus + " errorThrown: " + errorThrown + " : " + xhr.statusText + " : " + xhr.status;
			console.log(errorMessage);
		}
    });
	
	
	/**
	 *	When the user clicks the login button, show the login window
	 *
	 */
	$('.loginButton').on('click', function() {	
		//Fade out everything that is not the login window
		$("body  > :not(#loginWindow)").fadeTo(100, 0.3);
		$("#loginWindow").show();	
		
		//Scroll to the login window.  Especially useful on Mobile
		$('html, body').animate({ scrollTop: 0 }, 1000);
	});


	/**
	 *	If the user clicks the cancelLogin button, close the login window
	 *
	 */
	$('#cancelLogin').on('click', function() {
		$("#loginWindow").hide();
		//Fade the site back into view
		$("body  > :not(#loginWindow)").fadeTo(100, 1);
	});


	/**
	 *	When the form is submitted get the username and password entered by the user
	 *
	 */
	$('#form').submit(function(e) {
		e.preventDefault();
		//Hide the login window on submit
		$("#loginWindow").hide();
		$("body  > :not(#loginWindow)").fadeTo(100, 1);	
		//Now we have the username and password values, to do what we want with.
		var username = e.target.username.value;
		var password = e.target.password.value;
	});


	/**
	 *	Loads new tabs into the sidebar when clicked
	 *	
	 */
	 $("#tabSidebar a").click(function(e) {
		e.preventDefault();
		//Remove all active classes
		$("#tabSidebar .active").removeClass('active');
		//Set the selected tab's class to active
		$(this).parent().addClass('active');	
		
		//Show hide news and archive tabs based on what was clicked
		//-I originally wanted to use HTML5 Templates here, but IE9 does not support them, boo!
		if (this.id === "archive") {
			$("#newsTemplate").hide();
			$("#archiveTemplate").show();
		}
		else{//news
			$("#archiveTemplate").hide();
			$("#newsTemplate").show();
		}
	});
	
//End document.ready()	
 });
 
 
 /**
  * Creates the Rates table from the JSON data
  *
  */
function createTable(data) {
	var tableRows = '';
	
	//If the API did not return any data then add a table placeholder
	if (!data) {
		$("#ratesTable").html('Table data not available.');
		return;
	}
	
	//Create the table row for each property in data
	for (prop in data) {
		//Ignore any potential user/framework defined prototypes
		if (data.hasOwnProperty(prop)) {
			tableRows +=
				'<tr>' +
				'	<td>' + data[prop].name + '</td>' +
				'	<td>' + (data[prop].apy || 'N/A') + ' %</td>' +
				'	<td>$' + (parseFloat(data[prop].earnings).toFixed(2) || 'N/A') + '</td>' +
				'</tr>';
		}		
	}
	
	//If there were no objects to iterate through, add a table placeholder
	if (!tableRows) {
		$("#ratesTable").html('Table data not available.');
		return;
	}

	//Insert the table rows after the header row
	$("#tableHeader").eq(0).after(tableRows);

}

















