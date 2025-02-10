$(document).ready(function() {
    const data = [
        // Add your data here from the Excel file
        { Name: "George William", Mobile: "96555407079", Agency: "AL FRDOUS TOURISM AND TRAVEL COMPANY", Email: "info@alfirdoustravel.com", Guests: 2, show: "no" },
        { Name: "Aicha Alsaghir", Mobile: "96597864486", Agency: "Foremost Agency", Email: "gm@foremost.com.kw", Guests: 2, show: "no" },
        // Add the rest of the data entries
    ];

    let scanner;

    $('#scan-btn').click(function() {
        startScanner();
    });

    $('#winner-btn').click(function() {
        const candidates = data.filter(entry => entry.show === "yes");
        if (candidates.length > 0) {
            const winner = candidates[Math.floor(Math.random() * candidates.length)];
            $('#winner-result').html(`Winner: ${winner.Name} from ${winner.Agency}`);
        } else {
            $('#winner-result').html("No candidates available.");
        }
    });

    function startScanner() {
        scanner = new Instascan.Scanner({ video: document.createElement('video') });
        scanner.addListener('scan', function(content) {
            const entry = data.find(entry => entry.Mobile === content);
            if (entry) {
                entry.show = "yes";
                $('#result').html(`Name: ${entry.Name}<br>Agency: ${entry.Agency}<br>Guests: ${entry.Guests}`);
            } else {
                $('#result').html("No match found.");
            }
            scanner.stop();
        });
        Instascan.Camera.getCameras().then(function(cameras) {
            if (cameras.length > 0) {
                scanner.start(cameras[0]);
            } else {
                console.error('No cameras found.');
            }
        }).catch(function(e) {
            console.error(e);
        });
    }
});