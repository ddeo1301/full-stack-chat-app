async function signup(event) {
    try{
        event.preventDefault();
        console.log(event.target.name.value)

        const obj = {
            name: event.target.name.value,
            email: event.target.email.value,
            phone: event.target.phone.value,
            password: event.target.password.value
        }

        console.log(obj)
        const response= await axios.post('http://localhost:3000/user/signup', obj);
        console.log(response);

        if(response.status = 201){
            alert ("Successfull Signup")
            window.location.href="../Login/login.html"
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