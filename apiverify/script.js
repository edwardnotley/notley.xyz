document.getElementById("inputForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent the form from submitting the traditional way

    const inputText = document.getElementById("inputText").value;

    // Example of an API call using JSONPlaceholder for testing
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: inputText })
    })
    .then(response => response.json())
    .then(data => {
        // JSONPlaceholder returns an ID with the data submitted
        const apiLink = `https://jsonplaceholder.typicode.com/posts/${data.id}`;
        document.getElementById("apiLink").href = apiLink;
        document.getElementById("apiLink").textContent = apiLink;
        document.getElementById("responseLink").style.display = 'block';
        console.log("Response from JSONPlaceholder:", data);  // For debugging purposes
    })
    .catch(error => {
        console.error("Error:", error);
        alert("There was an error processing your request.");
    });
});
