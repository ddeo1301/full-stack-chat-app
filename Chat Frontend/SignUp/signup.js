async function signup(event) {// async keyword allows the use of await keyword inside the function body
    // function receives event object 'e' as parameter
    try{
        event.preventDefault();// prevents the default form submission behaviour, which allows
        // to handle the form submission manually using javascript
        console.log(event.target.name.value)

        const obj = {
            name: event.target.name.value,
            email: event.target.email.value,
            phone: event.target.phone.value,
            password: event.target.password.value
        }

        console.log(obj)
        const response= await axios.post('http://localhost:3000/user/signup', obj);
        // send POST request to "ht..." endpoint with signupDetails object as the request body. await 
        // keyword is used to wait for the response to be received before proceeding
        console.log(response);

        if(response.status = 201){//indicate successful signup. window.location assumes that user is in web environment
            alert ("Successfull Signup")
            window.location.href="../Login/login.html"// change the page on successful login
            console.log(response);
        }
        else{
            throw new Error('failed to signup')
        }

    }catch(err){
        alert("User alredy Exist, please login");
        document.body.innerHTML=`<div style="color:red;">${err}</div>`;
    }
}