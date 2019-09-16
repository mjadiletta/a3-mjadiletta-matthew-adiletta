var USERNAME = ""
var PASSWORD = ""
var edit_data = {}
var fields = ["carbohydrates", "fruits", "vegetables", "protein", "oil"];

function returnHome(){
  setUsernameAndPassword()
  document.getElementById("VIEW_DATA").innerHTML = '\
            <div class="subtitle is-4" style="color:#2f2f2f">\
              <p>The purpose of this website is to allow WPI athletes to keep track of major food groups in their diet such as carbohydrates, proteins, vegetables, oils, and more. A user can input data into the database and retrieve it at any time.</p>\
              <p>Select a button on the navigation panel to the left to view, edit, or upload data.</p> \
              <p>To delete a user select "Sign Out" then select "Remove User" and submit the user to delete. </p> \
              <p>The current model for this website only allows the user to log a single day of information. In the future, this will be expanded for multiple days, and the "score" field will be used as a comparison metric for comparing athletes dieting habits.</p>\
            </div>'
}

function addEntry(){
  var new_date = document.getElementById("NEW_DATE").value;
  var checkboxes = document.getElementsByName("NEW_DATA_CHECKBOXES");
  var json_data = edit_data;
  
  for (var c in json_data){
    for(var user in json_data[c]) {
      for(var field in json_data[c][user]){
        if(field === "username"){
          if(json_data[c][user][field] === USERNAME){
            
            json_data[c][user]["data"][new_date] = {}
            
            for (var i=0; i<checkboxes.length; i++) {
              if(checkboxes[i].checked){
                json_data[c][user]["data"][new_date][checkboxes[i].id] = "true"
              }
              else{
                json_data[c][user]["data"][new_date][checkboxes[i].id] = "false"
              }
            }
            
            var myRequest = new Request('/updateUser', {
                method: 'POST', 
                body: JSON.stringify({ username:USERNAME, password:PASSWORD, data:json_data}), 
                headers: { 'Content-Type': 'application/json' }
            });

            fetch(myRequest).then(
              function(response) {
              response.text().then(function(info) {
                document.getElementById("VIEW_DATA").innerHTML = info;
              });
            });
            
          }
        }
      }
    }
  }
}


function setupAddData(){
  setUsernameAndPassword()
  let myRequest = new Request('/getDatabase', { method:'GET'} );
  fetch(myRequest).then(function(response) {
    response.json().then(function(json_data) {
      var output = '<h1> Add Entry </h1>'
      output += '<input class="input is-large" type="text" id="NEW_DATE" placeholder="New Date (month/day)" style="margin: 10px 20px">'
      
      for(var i = 0; i < fields.length; i++){
        output += '<p class="subtitle is-5" style="padding: 5px 20px; margin: 0px 0px 0px 0px; color:black"><input type="checkbox" id="' + fields[i] + '" name="NEW_DATA_CHECKBOXES"> '+ fields[i] + '</p>';  
      }
      
      edit_data = json_data;
      output += '<button class="button" style="margin:10px 20px" id="SUBMIT_EDITS" onclick="addEntry()">Submit New Entry</button>';
      document.getElementById("VIEW_DATA").innerHTML = output
    });
   });
}




function submitEdits(){
  var checkboxes = document.getElementsByName("USER_EDIT_CHECKBOXES");
  var json_data = edit_data;
  
  for (var c in json_data){
    for(var user in json_data[c]) {
      for(var field in json_data[c][user]){
        if(field === "username"){
          if(json_data[c][user][field] === USERNAME){
            for (var date in json_data[c][user]["data"]){
                for (var i=0; i<checkboxes.length; i++) {
                  if(checkboxes[i].value === date){
                    if(checkboxes[i].checked){
                      json_data[c][user]["data"][date][checkboxes[i].id] = "true"
                    }
                    else{
                      json_data[c][user]["data"][date][checkboxes[i].id] = "false"
                    }
                  }
                }
            }
            
            var myRequest = new Request('/updateUser', {
                method: 'POST', 
                body: JSON.stringify({ username:USERNAME, password:PASSWORD, data:json_data}), 
                headers: { 'Content-Type': 'application/json' }
            });

            fetch(myRequest).then(
              function(response) {
              response.text().then(function(info) {
                document.getElementById("VIEW_DATA").innerHTML = info;
              });
            });
            
            
            
          }
        }
      }
    }
  }
}

function setupEditData(){
  setUsernameAndPassword()
  let myRequest = new Request('/getDatabase', { method:'GET'} );
  fetch(myRequest).then(function(response) {
    response.json().then(function(json_data) {
      var output = '<h1> Edit Entry </h1>'
      for (var c in json_data){
        for(var user in json_data[c]) {
          var thisUsername = false;
          for(var field in json_data[c][user]){
            if(field === "username"){
              if(json_data[c][user][field] === USERNAME){
                thisUsername = true;
              }
              else{
                thisUsername = false;
              }
            }
          }
          for(var field in json_data[c][user]){
            if(field === "data" && thisUsername){
              for (var date in json_data[c][user][field]){
                output += '<h4 style="padding: 5px 0px; margin: 0px 0px 0px 0px">'+date+"</h4>"
                for (var user_info_field in json_data[c][user][field][date]){
                  if (user_info_field !== "score"){
                    if (json_data[c][user][field][date][user_info_field] === "true"){
                      output += '<p class="subtitle is-5" style="padding: 0px 20px; margin: 0px 0px 0px 0px; color:green"><input type="checkbox" id="' + user_info_field + '" name="USER_EDIT_CHECKBOXES" value="'+date+'" checked> '+ user_info_field + '</p>';
                    }
                    else{
                      output += '<p class="subtitle is-5" style="padding: 0px 20px; margin: 0px 0px 0px 0px; color:red"><input type="checkbox" id="' + user_info_field + '" name="USER_EDIT_CHECKBOXES" value="'+date+'"> '+ user_info_field + '</p>'; 
                    }
                  }
                }
              }
            }
          }
        }
      }
      edit_data = json_data;
      output += '<button class="button" style="margin:10px 20px" id="SUBMIT_EDITS" onclick="submitEdits()">Submit Edits</button>';
      document.getElementById("VIEW_DATA").innerHTML = output
    });
   });
}

function submitDeletes(){
  var checkboxes = document.getElementsByName("USER_DELETE_CHECKBOXES");

  var json_data = edit_data;
  
  for (var c in json_data){
    for(var user in json_data[c]) {
      for(var field in json_data[c][user]){
        if(field === "username"){
          if(json_data[c][user][field] === USERNAME){
            for (var i=0; i<checkboxes.length; i++) {
              if(checkboxes[i].checked){
                delete json_data[c][user]["data"][checkboxes[i].id]
              }
            }
            var myRequest = new Request('/updateUser', {
                method: 'POST', 
                body: JSON.stringify({ username:USERNAME, password:PASSWORD, data:json_data}), 
                headers: { 'Content-Type': 'application/json' }
            });
            
            fetch(myRequest).then(
              function(response) {
              response.text().then(function(info) {
                document.getElementById("VIEW_DATA").innerHTML = info;
              });
            });
          }
        }
      }
    }
  }
}


function setupDeleteData(){
  setUsernameAndPassword()
  let myRequest = new Request('/getDatabase', { method:'GET'} );
  fetch(myRequest).then(function(response) {
    response.json().then(function(json_data) {
      var output = '<h1> Delete Entry </h1>'
      for (var c in json_data){
        for(var user in json_data[c]) {
          var thisUsername = false;
          for(var field in json_data[c][user]){
            if(field === "username"){
              if(json_data[c][user][field] === USERNAME){
                thisUsername = true;
              }
              else{
                thisUsername = false;
              }
            }
          }
          for(var field in json_data[c][user]){
            if(field === "data" && thisUsername){
              for (var date in json_data[c][user][field]){
                output += '<h4 style="padding: 5px 0px; margin: 0px 0px 0px 0px"><input type="checkbox" id="' + date + '" name="USER_DELETE_CHECKBOXES"> '+date+"</h4>"
                for (var user_info_field in json_data[c][user][field][date]){
                  if (user_info_field !== "score"){
                    if (json_data[c][user][field][date][user_info_field] === "true"){
                      output += '<p class="subtitle is-5" style="padding: 0px 20px; margin: 0px 0px 0px 0px; color:green">'+ user_info_field + '</p>';
                    }
                    else{
                      output += '<p class="subtitle is-5" style="padding: 0px 20px; margin: 0px 0px 0px 0px; color:red">'+ user_info_field + '</p>'; 
                    }
                  }
                }
              }
            }
          }
        }
      }
      edit_data = json_data;
      output += '<button class="button" style="margin:10px 20px" id="SUBMIT_EDITS" onclick="submitDeletes()">Submit Dates To Delete</button>';
      document.getElementById("VIEW_DATA").innerHTML = output
    });
   });
}

function viewUserData(){
  setUsernameAndPassword()
  let myRequest = new Request('/getDatabase', { method:'GET'} );
  fetch(myRequest).then(function(response) {
    response.json().then(function(json_data) {
      var output = '<h1> User Info </h1>'
      for (var c in json_data){
        for(var user in json_data[c]) {
          var thisUsername = false;
          for(var field in json_data[c][user]){
            if(field === "username"){
              if(json_data[c][user][field] === USERNAME){
                thisUsername = true;
              }
              else{
                thisUsername = false;
              }
            }
          }
          for(var field in json_data[c][user]){
            if(field === "data" && thisUsername){
              for (var date in json_data[c][user][field]){
                output += '<h4 style="padding: 5px 0px; margin: 0px 0px 0px 0px">'+date+"</h4>"
                for (var user_info_field in json_data[c][user][field][date]){
                  if (user_info_field !== "score"){
                    if (json_data[c][user][field][date][user_info_field] === "true"){
                      output += '<p class="subtitle is-5" style="padding: 0px 20px; margin: 0px 0px 0px 0px; color:green">'+ user_info_field + '</p>';
                    }
                    else{
                      output += '<p class="subtitle is-5" style="padding: 0px 20px; margin: 0px 0px 0px 0px; color:red">'+ user_info_field + '</p>'; 
                    }
                  }
                  else{
                    output += '<p style="color:black; padding: 0px 10px;">Score: '+ json_data[c][user][field][date][user_info_field] + '</p><br>'; 
                  }
                }
              }
            }
          }
        }
      }
      
      document.getElementById("VIEW_DATA").innerHTML = output
    });
   });
}

function viewAllData(){
  setUsernameAndPassword()
  let myRequest = new Request('/getDatabase', { method:'GET'} );
  fetch(myRequest).then(function(response) {
    response.json().then(function(json_data) {
      var output = '<h1> All User Info </h1>'
      for (var c in json_data){
        for(var user in json_data[c]) {
          output += '<h3 style="margin: 0px 0px 10px 0px">' + json_data[c][user]["displayName"] + '</h3>'
          for(var field in json_data[c][user]){
            if(field === "data"){
              for (var date in json_data[c][user][field]){
                output += '<h4 style="padding: 0px 20px; margin: 0px 0px 0px 0px">'+date+"</h4>"
                for (var user_info_field in json_data[c][user][field][date]){
                  if (user_info_field !== "score"){
                    if (json_data[c][user][field][date][user_info_field] === "true"){
                      output += '<p class="subtitle is-5" style="padding: 0px 40px; margin: 0px 0px 0px 0px; color:green">'+ user_info_field + '</p>';
                    }
                    else{
                      output += '<p class="subtitle is-5" style="padding: 0px 40px; margin: 0px 0px 0px 0px; color:red">'+ user_info_field + '</p>'; 
                    }
                  }
                  else{
                    output += '<p style="color:black; padding: 0px 30px;">Score: '+ json_data[c][user][field][date][user_info_field] + '</p><br>'; 
                  }
                }
              }
            }
          }
        }
      }
      
      document.getElementById("VIEW_DATA").innerHTML = output
    });
   });
}

function loginUser(){
  setUsernameAndPasswordFromLogin()
  var myRequest = new Request('/login_a_user', {
      method: 'POST', 
      body: JSON.stringify({ username:USERNAME, password:PASSWORD}), 
      headers: { 'Content-Type': 'application/json' }
  });
  fetch(myRequest).then( res => res.json() ).then( 
    window.location.pathname = '/'
  );
}
  
function setUsernameAndPasswordFromLogin(){
  USERNAME = document.getElementById("LOGIN_USERNAME").value;
  PASSWORD = document.getElementById("LOGIN_PASSWORD").value;
}

function setUsernameAndPassword(){
  USERNAME = document.getElementById("VIEW_DATA").value;
  PASSWORD = document.getElementById("VIEW_DATA").name;
}

function viewUserGraph(){
  
}
