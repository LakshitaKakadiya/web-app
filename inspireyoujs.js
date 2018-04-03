const txtemail = document.getElementById('inputEmail');
const txtpassword = document.getElementById('inputPassword');
const btnSignin = document.getElementById('btnSignin');

//document.getElementById('btnSignin').addEventListener('click', SignIn, false);
window.onload = function() {
      onstartup();
    };
function onstartup(){

		console.log('onstartup fncrion start');
	// Listening for auth state changes.
      // [START authstatelistener]
      firebase.auth().onAuthStateChanged(function(user) {
        
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // [START_EXCLUDE]
          document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
          document.getElementById('btnSignin').textContent = 'Sign Out';
          document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
          // [END_EXCLUDE]
      }
          else {
          // User is signed out.
          // [START_EXCLUDE]
          document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
          document.getElementById('btnSignin').textContent = 'Sign in';
          document.getElementById('quickstart-account-details').textContent = 'null';
          // [END_EXCLUDE]
        }
        // [START_EXCLUDE silent]
        document.getElementById('btnSignin').disabled = false;
        // [END_EXCLUDE]
      });
      // [END authstatelistener]
      document.getElementById('btnSignin').addEventListener('click', SignIn, false);
      
}

function SignIn(){

		console.log('signin function starts...');
	if (firebase.auth().currentUser) {		
        // [START signout]
        firebase.auth().signOut();  
       // window.location.assign('./upload.html');      
        // [END signout]
      } else {
        var email = txtemail.value;
        var password = txtpassword.value;
        
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).then(function (){
            window.location.assign('./upload.html');  
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode == 'auth/wrong-password') {
            alert('Wrong password.');
          }
          else {
            alert(errorMessage);
          }
          console.log(error);
          document.getElementById('btnSignin').disabled = false;
          // [END_EXCLUDE]
        });
        // [END authwithemail]
        }
      document.getElementById('btnSignin').disabled = true;
      console.log('signed-in');
      

    }





function loginError(){

 alert("You are not Authenticated... ","This google account is not authenticated with this site");

 };