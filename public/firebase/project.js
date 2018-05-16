import {config,init,database,auth} from './conn.js';
let firebaseUserId;
$(function()
{
    auth.onAuthStateChanged( user => {
        if (user) 
        { firebaseUserId= user.uid ;
        
     
  
    const users=database.child('users');
    const project=database.child('projects');


   



      //add project to FIREBASE
$('.create-project').click(function(e){
    var projectName=$('#InputProject').val();
    var flag=true;
    for(var i=0;i<$(".project").length;i++){
        var name=$(".project:eq("+i+")").text();
        if(name == projectName ){
            flag=false;
        }
        
    }
    
    if(projectName != ""){ 
        if(flag){
    CreateProject(projectName);//add to FIREBASE 
    $('#id01').css('display','none');
        }else{ $("#InputProject").val("");
            $(".wrap-login100").before("<small style='color:#c80000; position:relative; top:250px; left:20px ; font-size:11px;'>please enter another project name,this name is exist.</small>");
    }

    }else {

    $(".wrap-login100").before("<small style='color:#c80000; position:relative; top:250px; left:20px ; font-size:11px;'>please enter project name</small>");
    }
});



    ////Add project to FIREBASE
function CreateProject(name) {
    var key=project.push().key;
        project.child(key).set({
         name:name
     });
     ///add FIRST user and his information to his team -FIRSTUSER----->teamLeader


     project.child(key).child("team").child(firebaseUserId).set({
        role:"teamLeader",
        color:"red"
     });

     users.child(firebaseUserId).child("UserProjects").push(key);//add project key to user with project id

$("#InputProject").val("");
    
     
 }

 ////////////////////////added project LISTENIER//////////////////////////

project.on('child_added',snap =>{
    var projectKey=snap.key;
    users.child(firebaseUserId).child("UserProjects").once('value',function(snapshot) {
        snapshot.forEach(function(childSnapshot) {   
            var projectForUser=childSnapshot.val();
            if (projectKey != "pId" && projectKey == projectForUser){////here we check the projects that user has
            var projectName=snap.val().name;                
                ///add project icon on fronend
            $(".projects ").last().after("<a href='diagram.html?pId="+projectKey+"'><div class='project'><h1>"+projectName +"</h1></div> </a>");
            }

        });
    });
 
 });






 
     
  
    
    $('#signoutbtn').on('click',function(){
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            window.location.href='index.html';
        }).catch(function(error) {
            alert("error");
        });
      
        
    });
}else {
window.location.href='index.html';}
});

/////create project modal
$("#display-modal").click(function(){
    $("small").remove();
    $("#id01").css("display","block");
    
    
 });

 
 



});