function sendMessage(event) {
    event.preventDefault();//prevent the page from reloading
    let message = document.getElementById("chat-input").value;//value are extracted

    let obj = {
      message: message,
    };

    const token = localStorage.getItem("token");// retrieves token stored in loclstorage with key "token"

    axios.post("http://localhost:5000/user/message", obj, { headers: { Authorization: token }})
       .then((response) => {
           alert("Message Sent");
       }).catch((err) => {
           console.log(err);
      });
  }