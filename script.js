// Initialize variables to store access token and user ID
let accessToken = '';
let userId = '';

// Initialize the Facebook SDK
window.fbAsyncInit = function() {
    FB.init({
        appId      : 'YOUR_APP_ID', // Replace with your Facebook App ID
        cookie     : true,           // Enable cookies to allow the server to access session
        xfbml      : true,           // Enable XFBML (Facebook Markup Language) for embedding
        version    : 'v15.0'         // Set the API version to use (latest version is v15.0)
    });

    FB.AppEvents.logPageView();      // Log page view for tracking purposes (for Facebook analytics)
};

// Load the Facebook SDK script asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;  // If the SDK is already loaded, skip loading it again
    js = d.createElement(s); js.id = id;  // Create a new script element with the ID 'facebook-jssdk'
    js.src = 'https://connect.facebook.net/en_US/sdk.js';  // Set the source for the Facebook SDK script
    fjs.parentNode.insertBefore(js, fjs);  // Insert the script element before the first script tag in the document
}(document, 'script', 'facebook-jssdk'));

// Login with Instagram using Facebook SDK
function loginWithInstagram() {
    FB.login(function(response) {
        if (response.authResponse) {
            accessToken = response.authResponse.accessToken;  // Save the access token for future requests
            getInstagramUserId();  // Call function to get the Instagram user ID
        } else {
            console.log('User canceled login');  // Log message if the user cancels login
        }
    }, { scope: 'instagram_basic,pages_show_list,pages_read_engagement' });  // Request permissions for Instagram and pages
}

// Fetch Instagram User ID from Facebook API
function getInstagramUserId() {
    FB.api('/me/accounts', function(response) {
        if (response && response.data) {
            userId = response.data[0].id;  // Retrieve the first account's ID (this should be the Instagram account)
            document.getElementById('loginBtn').style.display = 'none';  // Hide the login button after successful login
            document.getElementById('postForm').classList.remove('hidden');  // Show the post form
        }
    });
}

// Function to schedule a post on Instagram
function schedulePost() {
    const caption = document.getElementById('caption').value;  // Get the caption from the input field
    const image = document.getElementById('imageInput').files[0];  // Get the image file from the file input field

    // Check if both image and caption are provided
    if (!image || !caption) {
        alert('Please provide both an image and a caption.');
        return;
    }

    const formData = new FormData();  // Create a FormData object to hold the image and caption
    formData.append('image', image);  // Append the image to the FormData object
    formData.append('caption', caption);  // Append the caption to the FormData object

    uploadImage(formData);  // Call the function to upload the image
}

// Function to upload the image to Instagram
function uploadImage(formData) {
    const url = `https://graph.facebook.com/${userId}/media?access_token=${accessToken}`;  // Instagram Graph API endpoint for media upload
    fetch(url, {
        method: 'POST',
        body: formData  // Send the FormData (image and caption) in the request body
    })
    .then(response => response.json())  // Parse the JSON response from the API
    .then(data => {
        if (data.id) {
            createInstagramPost(data.id);  // If the media upload is successful, call the function to create a post
        } else {
            console.error('Error uploading media');  // Log an error if media upload fails
        }
    })
    .catch(error => console.error('Error:', error));  // Log any errors that occur during the upload process
}

// Function to create an Instagram post after uploading the media
function createInstagramPost(mediaId) {
    const url = `https://graph.facebook.com/${userId}/media_publish?access_token=${accessToken}`;  // Instagram Graph API endpoint to publish media
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            creation_id: mediaId  // Pass the media ID to publish the post
        })
    })
    .then(response => response.json())  // Parse the JSON response from the API
    .then(data => {
        if (data.id) {
            alert('Post scheduled successfully!');  // Show success message if the post is scheduled successfully
            displayScheduledPost(data.id);  // Call function to display the scheduled post ID in the UI
        } else {
            console.error('Error publishing media');  // Log an error if media publishing fails
        }
    })
    .catch(error => console.error('Error:', error));  // Log any errors that occur during the post creation process
}

// Function to display the scheduled post's ID in the UI
function displayScheduledPost(postId) {
    const listItem = document.createElement('li');  // Create a new list item element
    listItem.textContent = `Post ID: ${postId} has been scheduled.`;  // Set the text of the list item
    document.getElementById('scheduledList').appendChild(listItem);  // Append the list item to the scheduled posts list in the UI
}
