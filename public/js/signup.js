import signup from public / js / auth;

document.getElementById("signUpButton").click() = mainFunction(); 

async function mainFunction()
{
  let localpassword = DocumentType.getElementById("password".value);
  let localusername = DocumentType.getElementById("username").value;

if(((DocumentType.getElementById("username").value).toString).length >= 3 && 
(DocumentType.getElementById("password".value == DocumentType.getElementById("confirmPassword").value)))
{
fetch("/api/signup", {method: 'POST', formData: 
JSON.stringify({username: 'localusername', password: 'password'})})
.then(function (response) {
	if (response.ok) {
    console.log(response.json());
    return response.json();
    
	};
});
}
console.log(signup())
}
