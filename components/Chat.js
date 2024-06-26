import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const Chat = ({ route, navigation, db, isConnected, storage }) => {
    // passed from start screen
    const { username, background, userID } = route.params;
    const [messages, setMessages] = useState([]);
    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0]);
    };
    // customize colors of sender and receiver chat bubbles
    const renderBubble = (props) => {
        return <Bubble
            {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: "#000"
                },
                left: {
                    backgroundColor: "#FFF"
                }
            }}
        />    
    }
    const renderInputToolbar = (props) => {
        if (isConnected) return <InputToolbar {...props} />;
        else return null;
    }
    // declared here to avoid being only accessible within if block
    let unsubMessages;
    useEffect(() => {
        if (isConnected === true) {
            // unregister current onSnapshot() listener to avoid registering multiple listeners when useEffect code is reexecuted
            if (unsubMessages) unsubMessages();
            unsubMessages = null;
            navigation.setOptions({ title: username });
            // create a query to get the "messages" collection from the Firestore database
            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
            // this function will be called whenever there are changes in the collection
            unsubMessages = onSnapshot(q, (documentsSnapshot) => {
                let newMessages = [];
                documentsSnapshot.forEach(doc => {
                    newMessages.push({ id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis())})
                });
                cacheMessages(newMessages);
                setMessages(newMessages);
            });
        } else loadCachedMessages();
        // clean up code
        return () => {
            if (unsubMessages) unsubMessages();
        }
    }, [isConnected]);
    // create cache messages
    const cacheMessages = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem(
                "messages",
                JSON.stringify(messagesToCache)
            );
        } catch (error) {
            console.log(error.message);
        }
    }
    // load cached messages from storage
    const loadCachedMessages = async () => {
        const cachedMessages = await AsyncStorage.getItem("messages") || [];
        setMessages(JSON.parse(cachedMessages));
    }

    const renderCustomActions = (props) => {
        return <CustomActions storage={storage} {...props} />;
    };
    // custom view for geolocation
    const renderCustomView = (props) => {
        const { currentMessage } = props;
        if (currentMessage.location) {
            return (
                <MapView
                    style={{
                        width: 150,
                        height: 100,
                        borderRadius:13,
                        margin: 3
                    }}
                    region={{
                        latitude: currentMessage.location.latitude,
                        longitude: currentMessage.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            );
        }
        return null;
    }

    return (
        <View style={[styles.container, { backgroundColor: background }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                onSend={messages => onSend(messages)}
                renderActions={renderCustomActions}
                renderCustomView={renderCustomView}
                user={{
                    _id: userID,
                    name: username,
                }}
            />
            { Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null }
            { Platform.OS === 'ios' ? <KeyboardAvoidingView behavior='padding' /> : null }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

export default Chat;