// Firebase Config (use your Firebase config here)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase Auth and Firestore
const auth = firebase.auth();
const db = firebase.firestore();

// Handling User Login/Register
document.getElementById('auth-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        alert('Login successful!');
        // Redirect to user dashboard or homepage
    } catch (error) {
        alert(error.message);
    }
});

// Toggle between Login and Register
function toggleRegister() {
    // Toggle logic for switching to a Register form if needed
}

// Search Bus Location by Source and Destination
document.getElementById('bus-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const source = document.getElementById('source').value;
    const destination = document.getElementById('destination').value;

    try {
        const busRef = db.collection('buses').where("source", "==", source).where("destination", "==", destination);
        const busSnapshot = await busRef.get();

        if (busSnapshot.empty) {
            document.getElementById('bus-details').innerHTML = 'No buses found!';
        } else {
            let busDetails = '';
            busSnapshot.forEach(doc => {
                const bus = doc.data();
                busDetails += `<p>Bus Name: ${bus.name}<br>Type: ${bus.type}<br>Arrival Time: ${bus.arrivalTime}</p>`;
            });
            document.getElementById('bus-details').innerHTML = busDetails;
        }
    } catch (error) {
        alert(error.message);
    }
});

