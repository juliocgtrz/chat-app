import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity } from 'react-native';

const Start = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [background, setBackground] = useState('');
    
    const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

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
                        style={styles.chatButton}
                        onPress={() => navigation.navigate('Chat', {username: username, background: background})}
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