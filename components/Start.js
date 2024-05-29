import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";
// create navigation
const Start = ({ navigation }) => {
    // states to update username and select background color
    const [username, setUsername] = useState('');
    const [background, setBackground] = useState('');
    
    const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

    const auth = getAuth();
    const signInUser = () => {
        signInAnonymously(auth).then(result => {
                navigation.navigate("Chat", {userID: result.user.uid, username: username, background: background});
                Alert.alert("Signed in successfully!");
            })
            .catch((error) => {
                Alert.alert("Unable to sign in, try again later.");
            })
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../img/bg-image.png")}
                style={styles.imageBackground}
            >
                <Text style={styles.title}>Chat App</Text>
                <View style={styles.box}>
                    {/* text box for user to type in their username */}
                    <TextInput
                        style={styles.textInput}
                        value={username}
                        onChangeText={setUsername}
                        placeholder='Your Username'
                    />
                    <Text style={styles.chooseBgColor}>Choose Background Color</Text>
                    {/* circles for background color options */}
                    <View style={styles.colorOptionContainer}>
                        {colors.map((color, index) => (
                            <TouchableOpacity
                                accessible={true}
                                accessibilityLabel='background color options buttons'
                                accessibilityHint='Allows you to choose a background color for the chat screen'
                                accessibilityRole='button'
                                key={index}
                                style={[
                                    styles.colorButton,
                                    { backgroundColor: color },
                                    background === color && styles.selectedColor,
                                ]}
                                onPress={() => setBackground(color)}
                            ></TouchableOpacity>
                        ))}
                    </View>
                    {/* button to take user to chat screen */}
                    <TouchableOpacity
                        accessible={true}
                        accessibilityLabel='start chatting'
                        accessibilityHint='Button that takes you to the chat screen'
                        accessibilityRole='button'
                        style={styles.chatButton}
                        onPress={signInUser}
                    >
                        <Text style={styles.chatButtonText}>Start Chatting</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    title: {
        flex: 1,
        fontSize: 45,
        fontWeight: '600',
        color: '#FFFFFF',
        margin: 25
    },
    box: {
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        width: '88%',
        height: "44%",
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 20
    },
    textInput: {
        width: '88%',
        padding: 15,
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 15
    },
    chooseBgColor: {
        color: '#757083',
        fontSize: 16,
        fontWeight: '300',
        opacity: 100
    },
    colorOptionContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    colorButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 5
    },
    selectedColor: {
        borderColor: '#FFFFFF',
        borderWidth: 3,
    },
    chatButton: {
        alignItems: 'center',
        backgroundColor: '#757083',
        borderRadius: 4,
        height: '20%',
        width: '88%',
        justifyContent: 'center',
        padding: 10
    },
    chatButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF'
    }
});

export default Start;