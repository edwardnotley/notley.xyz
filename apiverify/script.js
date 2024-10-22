document.getElementById("verificationForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent the form from submitting the traditional way

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const projectKey = "PRJ:a997ebf8-54b8-41f0-9bf0-182186421f44";  // Replace with your actual project key

    // Step 1: Get the Bearer token
    fetch('https://login.meshid.app/oauth/token', {  // Replace with the real authentication URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            client_id: 'l5sYzNJ4HEWZeq2BkF20gZ3sDnV7hFcO',    // Replace with the actual Client ID
			realm: 'affinity',
            audience: 'https://prod.finos.app/api',      // Replace with your Audience
            grant_type: 'http://auth0.com/oauth/grant-type/password-realm',         // Grant type for username/password
            scope: 'openid profile email',            // Replace with the requested scope
            username: 'harneys-verify@meshid.app',      // Replace with the actual Username
            password: 'N9tMPt^DnHe8lgde'       // Replace with the actual Password
        })
    })
    .then(response => response.json())
    .then(data => {
        const accessToken = data.access_token;

        // Step 2: First API call to create the person
        return fetch(`https://meshid.app/api/v1/projects/${projectKey}/people/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`  // Pass the token here
            },
            body: JSON.stringify({ firstName: firstName, lastName: lastName })
        })
        .then(response => response.json())
        .then(personData => {
            const personKey = personData.personKey;

            // Step 3: Second API call to get the identity verification link
            return fetch(`https://meshid.app/api/v1/projects/${projectKey}/people/${personKey}/verifications/identity`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`  // Reuse the token here
                }
            });
        });
    })
    .then(response => response.json())
    .then(verificationData => {
        // Step 4: Display the verification URL
        const verificationUrl = verificationData.verificationUrl;
        document.getElementById("apiLink").href = verificationUrl;
        document.getElementById("apiLink").textContent = verificationUrl;
        document.getElementById("responseLink").style.display = 'block';
    })
    .catch(error => {
        console.error("Error:", error);
        alert("There was an error processing your request.");
    });
});
