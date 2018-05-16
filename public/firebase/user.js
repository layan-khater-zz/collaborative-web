import {config,init,database,auth} from './conn.js';

 let userId;
$(function()
{  
  
// sign-up modal inputs
var txtname=$('#usname-signup');
var txtemail_signup=$('#email-signup');
var txtpass_siginup=$('#pass-signup');
var txtconfpass=$('#confpass-signup');
var signup_btn=$('#signupbtn');


// sign-in modal inputs
var txtemail_signin=$('#email-signin');
var txtpass_signin=$('#pass-signin');
var signinp_btn=$('#signinbtn');
 

 
    
signup_btn.on('click',e=>{

  $("small").remove();
 
//get values
var email=txtemail_signup.val();
var password=txtpass_siginup.val();
var cpass=txtconfpass.val();
if(txtname.val() != "" && txtemail_signup.val() != "" && txtpass_siginup.val() != "" && txtconfpass.val() != ""){
  if(txtpass_siginup.val() == txtconfpass.val()){
//create account
const consle=auth.createUserWithEmailAndPassword(email, password);
var m=consle.catch(e=>{ 
  console.log(e.message);
  if(e.message =="The email address is badly formatted."){
    $(".wrap-signup100").before("<small class='false' style='color:#c80000;  position:relative; top:450px; left:20px ;'>The email address is badly formatted.Email@example.com</small>");
    }else if(e.message=="The password must be 6 characters long or more." &&  e.message != "The email address is already in use by another account."){

      $(".wrap-signup100").before("<small class='false' style='color:#c80000;  position:relative; top:450px; left:20px ;'>The password must be 6 characters long or more.</small>");
    }else if(e.message == "The email address is already in use by another account."){

      $(".wrap-signup100").before("<small class='false' style='color:#c80000;  position:relative; top:450px; left:20px ;'>The email address is already in use by another account.</small>");
    txtname.val()="";
    txtemail_signup.val()="";
    txtpass_siginup.val()="";
    txtconfpass.val()="";
  }



});
  
auth.onAuthStateChanged( user => {
  if(user){
    var user=database.child('users');
    var cUser=auth.currentUser;
    cUser.sendEmailVerification().catch(e=>{
    
    }); 
    var userKey=cUser.uid;
    var e=cUser.email;
    var name=txtname.val();
  
      user.child(userKey).set({
        name:name,
      email:e
  
      });

      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location.href='index.html';
      });

      $(".signupbox").css("display","none");
      
   
 

  }
});
}else{ $(".wrap-signup100").before("<small style='color:#c80000;  position:relative; top:450px; left:20px ;'>your password doesn't match,try again!</small>");}//else }
}else{     $(".wrap-signup100").before("<small style='color:#c80000; position:relative; top:440px; left:20px ; '>Please fill all fields</small>");    } 


});







//method of sign-in button 

//add sign-in event
 

signinp_btn.on('click',e=>{
 
  $("small").remove();
   //get values
    var email=txtemail_signin.val();
    var password=txtpass_signin.val();
    if( email != "" && password != ""){
      
    //sign-in 
    const consle=auth.signInWithEmailAndPassword(email,password).catch(function(error){
      var errorMessage=error.message;
      var errorCode=error.code;
      if( errorMessage == "The email address is badly formatted."){
        $(".wrap-login100").before("<small style='color:#c80000; position:relative; top:450px; left:20px ;'>The email address is badly formatted.</small>");
      }
       else if(errorMessage == "The password is invalid or the user does not have a password."){
     $(".wrap-login100").before("<small style='color:#c80000; position:relative; top:450px; left:20px ;'>wrong-password</small>");}
     else if(errorMessage=="There is no user record corresponding to this identifier. The user may have been deleted."){
      $(".wrap-login100").before("<small style='color:#c80000; position:relative; top:450px; left:20px ;'>There is no user record corresponding to this identifier.</small>");
       
     }
    });
  
      
    auth.onAuthStateChanged( user => {
      if (user) 
    {
        window.location.href='project.html'; 
        }
      });
    
    }else{     
      $(".wrap-login100").before("<small style='color:#c80000; position:relative; top:450px; left:20px ;'>Please fill all fields</small>");}

         
    });
  
//Send Password Reset Email
$('#a').on( 'click',function(e) {
  var email=txtemail_signin.val();
  auth.sendPasswordResetEmail(email).then(function() {
  }).catch(function(error) {
  });
      });




});




















