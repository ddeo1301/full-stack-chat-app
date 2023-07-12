async function login(event) {
    try{
        event.preventDefault();
        const loginDetails = {
            email: event.target.email.value,
            password: event.target.password.value
        }

        console.log(loginDetails);
        const token = localStorage.getItem('token');
        const  response = await axios.post('http://localhost:3000/user/login', loginDetails, {headers:{"Authorization":token}})
 
        alert(response.data.message);
        localStorage.setItem("token",response.data.token);
        window.location.href="../chat/chat.html"
       
    }
    catch(err){
        console.log(err);
        alert(err.response.data.message);
        document.body.innerHTML += `<div style="color:red;">${err} <div>`;
    }
} 