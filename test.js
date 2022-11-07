const axios = require("axios").default || require("axios"),
base_url = "http://localhost/",
headers = {
    headers:{
        "Content-Type":"application/x-www-form-urlencoded"
    }
};

axios.get(base_url + "books").then(res => console.log(res.data));