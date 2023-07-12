const form = document.getElementById('messageForm');
form.addEventListener('submit',postMessage)

async function postMessage(e){
    try{
        e.preventDefault();
        const token = localStorage.getItem('token')
        const message = document.getElementById('message').value;
        const obj = {message};
        
        const response = await axios.post('http://localhost:3000/chat/send',obj, {headers:{'Authorization':token}})
        console.log(response)
    }
    catch(err){
        console.log(err)

    }
}