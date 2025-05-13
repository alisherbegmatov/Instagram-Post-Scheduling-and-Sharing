let accessToken = '';
let userId = '';

// Initialize the Facebook SDK
window.fbAsyncInit = function() {
    FB.init({
        appId      : 'YOUR_APP_ID', // Replace with your Facebook App ID
        cookie     : true,
        xfbml      : true,
        version    : 'v15.0'
    });

    FB.AppEvents.logPageView();   
};

// Load Facebook SDK
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Login with Instagram (Facebook SDK)
function loginWithInstagram() {
    FB.login(function(response) {
        if (response.authResponse) {
            accessToken = response.authResponse.accessToken;
            getInstagramUserId();
        } else {
            console.log('User canceled login');
        }
    }, { scope: 'instagram_basic,pages_show_list,pages_read_engagement' });
}

// Fetch Instagram User ID
function getInstagramUserId() {
    FB.api('/me/accounts', function(response) {
        if (response && response.data) {
            userId = response.data[0].id; // Get the first account
            document.getElementById('loginBtn').style.display = 'none';
            document.getElementById('postForm').classList.remove('hidden');
        }
    });
}

// Function to schedule a post
function schedulePost() {
    const caption = document.getElementById('caption').value;
    const image = document.getElementById('imageInput').files[0];

    if (!image || !caption) {
        alert('Please provide both an image and a caption.');
        return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('caption', caption);

    uploadImage(formData);
}

// Function to upload the image to Instagram
function uploadImage(formData) {
    const url = `https://graph.facebook.com/${userId}/media?access_token=${accessToken}`;
    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.id) {
            createInstagramPost(data.id);
        } else {
            console.error('Error uploading media');
        }
    })
    .catch(error => console.error('Error:', error));
}

// Create Instagram post
function createInstagramPost(mediaId) {
    const url = `https://graph.facebook.com/${userId}/media_publish?access_token=${accessToken}`;
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            creation_id: mediaId
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.id) {
            alert('Post scheduled successfully!');
            displayScheduledPost(data.id);
        } else {
            console.error('Error publishing media');
        }
    })
    .catch(error => console.error('Error:', error));
}

// Display scheduled post in the UI
function displayScheduledPost(postId) {
    const listItem = document.createElement('li');
    listItem.textContent = `Post ID: ${postId} has been scheduled.`;
    document.getElementById('scheduledList').appendChild(listItem);
}
