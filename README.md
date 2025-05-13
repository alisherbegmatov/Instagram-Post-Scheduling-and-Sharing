# Instagram Post Scheduling and Sharing

This project allows users to log in with their Instagram account, create posts, and schedule them via the Instagram Graph API and SDK. It integrates Instagram's authentication system (OAuth 2.0) and utilizes the Instagram Graph API to upload and manage media.

### **Key Features**

- **Login with Instagram** using the Instagram/Facebook SDK.
- **Create Posts**: Upload images with captions directly to Instagram.
- **Scheduled Posts**: Simulate scheduling posts, allowing the user to schedule content for future publication.
- **Frontend**: Developed using HTML, CSS, and JavaScript.
- **Backend (Optional)**: To truly schedule posts for a future time, backend logic is needed. This current version provides a simulated "scheduling" feature.

## **Technologies Used**

- **Instagram Graph API**: For posting media to Instagram and retrieving user data.
- **Instagram SDK**: For user authentication and token management.
- **JavaScript**: For the frontend logic and API interaction.
- **HTML/CSS**: For building the frontend interface.
- **Facebook SDK**: Used for handling Instagram OAuth 2.0 authentication.

## **Project Structure**

```bash
instagram-post-scheduler/
├── index.html # The main HTML file for the user interface
├── styles.css # Stylesheet for the front-end interface
└── script.js # Main JavaScript file for API interaction and post scheduling
```

## **Setup and Installation**

### 1. **Facebook Developer Account**

To use the Instagram Graph API and SDK, you need to register your app with Facebook:

- Go to [Facebook Developer Portal](https://developers.facebook.com/) and create a new app.
- Once created, navigate to **Instagram Basic Display** in your app settings and configure it. You’ll need an **App ID** and **App Secret** for API calls.
- In the **Facebook App Dashboard**, ensure you've enabled the **Instagram Basic** product to be able to use Instagram features.

### 2. **Clone the Repository**

```bash
git clone https://github.com/alisherbegmatov/instagram-post-scheduler.git
cd instagram-post-scheduler
```

### 3. Replace Facebook App ID in `script.js`

In the `script.js` file, replace the following line with your own **Facebook App ID**:

```bash
appId: 'YOUR_APP_ID',  // Replace with your Facebook App ID
```

### 4. Install Dependencies

Currently, this is a client-side application. All dependencies are loaded from the web, including the Facebook SDK for JavaScript.

If backend functionality is added, you'll need technologies like Node.js or Python.

### 5. Run the Application

To run the app, open the index.html file in your browser:

```bash
open index.html     # macOS
start index.html    # Windows
```

Alternatively, use a local server:

```bash
python3 -m http.server  # For Python 3.x
```

Then go to http://localhost:8000.

### Usage

Login with Instagram
Click the Login with Instagram button.

Log in via the Facebook login page (Instagram is owned by Facebook).

After login, the app will retrieve an access token and display the post creation form.

Create and Schedule a Post
Upload an image file.

Enter a caption.

Click Schedule Post to simulate uploading and scheduling.

The Instagram Graph API is used to upload the media.

A simulated schedule confirmation is displayed.

Viewing Scheduled Posts
Successfully uploaded posts appear in the Scheduled Posts section with post ID and status.

### How It Works

Instagram OAuth Authentication
User clicks Login with Instagram, which triggers the Facebook SDK.

After login, an access token is received.

This token is used to authenticate and interact with the Instagram Graph API.

Instagram Graph API Integration
Once authenticated, media and captions are uploaded via the Graph API.

For this demo, media is published immediately (true scheduling needs backend support).

### Limitations

Actual Scheduling: No true future scheduling. Backend logic (e.g., cron jobs) is needed.

API Limitations: Instagram Graph API has rate limits—avoid excessive requests.

### Further Improvements

Backend Integration for Real Scheduling
Use Node.js, Python Flask, etc., to manage scheduled posts.

Trigger scheduled posts using cron jobs or task libraries.

Add Support for More Platforms
Extend to Facebook, Twitter, LinkedIn, etc.

User Profile Management
Enable viewing and managing profile data and post analytics.

### Contributions

Feel free to open issues, fork the repository, and submit pull requests for features or fixes.

### Disclaimer

This project uses the Instagram Graph API and Facebook SDK, subject to their respective terms. Ensure compliance with all relevant policies.

### Contact

For any questions or feedback, contact: [LinkedIn](https://www.linkedin.com/in/alisherbegmatov)
