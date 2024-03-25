// JavaScript to listen for refresh signals and reload the page
const eventSource = new EventSource("/refresh");
eventSource.onmessage = function(event) {
    console.log("Received refresh signal. Reloading the page.");
    location.reload(true);
};