const btnlogout = document.getElementById('logoutbtn');
var selectedFile;
var firebaseuser;
var selText;
var progressdiv = $('.progressdiv');
var result = $('#result');
var uploadbtn = $("#uploadButton");
var selectedFile;
var fileArray;
var filecount;
var noOfFiles;

btnlogout.addEventListener('click',logout,false);

window.onload = function() {
    uploadbtn.hide();
    progressdiv.hide();
    result.hide();    
    onCheck();    
};

function onCheck(){	
	firebase.auth().onAuthStateChanged(function(user) {
        
        if (user) {
        	console.log(user.email);       	
          firebaseuser = user;
        }
 //TODO:correct window behaviour.....
		else{
        	
        	if(btnlogout.clicked == false && user == null)
           		alert("Please login first..");
        	else
        		window.location ="./";
  			}    
});
};



function logout(){
     console.log('logout........');
     firebase.auth().signOut();
      window.location.assign('./');
      goBack();
  
};

function goBack(){
    jQuery(document).ready(function($) {

    if (window.history && window.history.pushState) {

    window.history.pushState('forward', null, './');

    $(window).on('popstate', function() {
    window.location.assign('./');
    });

    }
    });
}

                    
$("#file").on("change", function(event) {  
fileArray = event.target.files;
noOfFiles= event.target.files.length;

  document.getElementById('fileCount').innerHTML = noOfFiles + " images selected";
  uploadbtn.show();
});


$("#categorymenu a").click(function(event){
    event.preventDefault(); // cancel the link behaviour
    selText = $(this).text();
    console.log(selText);
    $("#categorybtn").text(selText);
});


function uploadFile() {
  for(i=0; i<noOfFiles; i++){
  // Create a root reference
  var filename = fileArray.item(i).name;
  console.log("filename "+filename);
  var storageRef = firebase.storage().ref(selText + '/' + filename);
  var uploadTask = storageRef.put(fileArray.item(i));

  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on('state_changed',function(snapshot){
    // Observe state change events such as progress, pause, and resume
    // See below for more detail
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    uploadbtn.hide();
    progressdiv.show();    
    $(".progress-bar").css("width", progress + "%").text(progress + " %");
    if(progress==100){
    result.show();
    $("#result").text("File successfully uploaded");
    progress =0;    


    //TODO: solve input file issue
    
    console.log('Upload is ' + progress + '% done');
  }    
  },function(error) {
    // Handle unsuccessful uploads
    switch (error.code) {
    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      break;

    case 'storage/canceled':
      // User canceled the upload
      break;

    case 'storage/unknown':
      // Unknown error occurred, inspect error.serverResponse
      break;
    }
  }, function() {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    var postKey = firebase.database().ref('/'+ selText +'/').push().key;
    var downloadURL = uploadTask.snapshot.downloadURL;
    console.log(downloadURL);
    var updates = {};
    var postData = {
      user: firebaseuser.uid,
      category: selText,
      url: downloadURL,
      caption: $("#imageCaption").val(),      
    };
    updates['/'+selText+'/'+postKey] = postData;
    firebase.database().ref().update(updates);
   });

}
}

