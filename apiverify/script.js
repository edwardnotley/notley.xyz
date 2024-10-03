document.getElementById("inputForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent the form from submitting the traditional way

    const inputText = document.getElementById("inputText").value;

    // Example of an API call using ReqBin's test API endpoint
    fetch('https://api.reqbin.com/v1/echo/post/json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: inputText })
    })
    .then(response => response.json())
    .then(data => {
        // ReqBin will echo back the data you sent, for testing purposes
        const responseText = JSON.stringify(data);
        const apiLink = "https://reqbin.com"; // This can be replaced with an actual link from the API response
        document.getElementById("apiLink").href = apiLink;
        document.getElementById("apiLink").textContent = apiLink;
        document.getElementById("responseLink").style.display = 'block';
        console.log("Response from ReqBin:", responseText);  // For debugging purposes
    })
    .catch(error => {
        console.error("Error:", error);
        alert("There was an error processing your request.");
    });
});
