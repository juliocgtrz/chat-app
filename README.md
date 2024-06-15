<h1>Chat App with React Native</h1>
To build a chat app for mobile devices using React Native. The app will provide users with a chat interface and options to share images and their location.

<h2>Key Features</h2>
<ul>
  <li>A page where users can enter their name and choose a background color for the chat screen before joining the chat.</li>
  <li>A page displaying the conversation, as well as an input field and submit button.</li>
  <li>The chat must provide users with two additional communication features: sending images and location data.</li>
  <li>Data gets stored online and offline.</li>
</ul>

<h2>Technologies</h2>
<ul>
  <li>React Native</li>
  <li>Expo</li>
  <li>Google Firebase</li>
  <li>Android Studio</li>
</ul>

<h2>Dependencies</h2>
<ul>
  <li>@react-native-async-storage/async-storage: 1.23.1</li>
  <li>@react-native-community/netinfo: 11.3.1</li>
  <li>@react-navigation/native: ^6.1.17</li>
  <li>@react-navigation/native-stack: ^6.9.26</li>
  <li>expo: ~51.0.8</li>
  <li>expo-image-picker: ^15.0.5</li>
  <li>expo-location: ^17.0.1</li>
  <li>expo-status-bar: ~1.12.1</li>
  <li>firebase: ^10.3.1</li>
  <li>react: 18.2.0</li>
  <li>react-native: 0.74.1</li>
  <li>react-native-gifted-chat: ^2.4.0</li>
  <li>react-native-maps: ^1.15.4</li>
  <li>react-native-safe-area-context: 4.10.1</li>
  <li>react-native-screens: 3.31.1</li>
</ul>

<h2>Getting Started</h2>

<h3>Prerequisites</h3>
<ul>
  <li>Run: $nvm install 16.19.0</li>
  <li>Run: $nvm use 16.19.0</li>
  <li>Run: $nvm alias default 16.19.0</li>
</ul>

<h3>Google Firestore / Firebase</h3>
<ul>
  <li>Create an account and a new project</li>
  <li>Obtain the configuration code and add it to App.js</li>
  <li>Set up the database under build -> Firestore Database</li>
  <li>Acivate storage</li>
  <li>Change rules to: allow read, write: if true</li>
  <li>For database and storage, activate anonymous authentication</li>
</ul>

<h3>Installation</h3>
<ol>
  <li>Clone this repository</li>
  <li>Navigate to the project directory</li>
  <li>Install dependencies; see list above</li>
  <li>Start the Expo project: $npm expo start</li>
  <li>Test with the Expo Go app on your phone or Android Studio (Android) or Xcode (iOS)</li>
</ol>
