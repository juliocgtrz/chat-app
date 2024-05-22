import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
    const { username, background } = route.params;

    useEffect(() => {
        navigation.setOptions({ title: username });
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: background }]}>
            <Text>Hello!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Chat;