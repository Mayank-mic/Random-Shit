const apiKey = 'AIzaSyAC2hjVqsvc4EEwOE52ljgNQoLcYjxqS6E';
const channelIds = {
    channel1: 'UCmGHPSbzO6sZtdwZZ8X_P_Q',
    channel2: 'UCtxD0x6AuNNqdXO9Wp5GHew'
};

function fetchSubscriberCount(channelId, elementId) {
    fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`, {
        cache: 'no-cache'
    })
    .then(response => response.json())
    .then(data => {
        if (data.items && data.items.length > 0) {
            const subscriberCount = data.items[0].statistics.subscriberCount;
            document.getElementById(elementId).textContent = subscriberCount.toLocaleString();
        } else {
            document.getElementById(elementId).textContent = 'Error fetching data';
        }
    })
    .catch(error => {
        console.error('Error fetching subscriber count:', error);
        document.getElementById(elementId).textContent = 'Error fetching data';
    });
}

// Poll every 60 seconds (60000 milliseconds)
setInterval(() => {
    fetchSubscriberCount(channelIds.channel1, 'count1');
    fetchSubscriberCount(channelIds.channel2, 'count2');
}, 1000);

// Initial fetch
document.addEventListener('DOMContentLoaded', () => {
    fetchSubscriberCount(channelIds.channel1, 'count1');
    fetchSubscriberCount(channelIds.channel2, 'count2');
});

