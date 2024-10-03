document.getElementById("inputForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent the form from submitting the traditional way

    const inputText = document.getElementById("inputText").value;

    // Example of an API call using fetch. Replace with the actual API URL and request format.
    fetch('https://api.example.com/check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer your_api_key'  // Add your authorization token if required
        },
        body: JSON.stringify({ text: inputText })
    })
    .then(response => response.json())
    .then(data => {
        // Assuming the API returns an object with a "link" field
        const link = data.link;
        document.getElementById("apiLink").href = link;
        document.getElementById("apiLink").textContent = link;
        document.getElementById("responseLink").style.display = 'block';
    })
    .catch(error => {
        console.error("Error:", error);
        alert("There was an error processing your request.");
    });
});
