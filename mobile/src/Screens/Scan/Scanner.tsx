import React, { useState } from 'react';
import {
    Dimensions,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Modal,
    Button,
    TouchableWithoutFeedback,
} from 'react-native';
import { Camera } from 'expo-camera';
import { Colors } from '../../Theme/Variables';
import { RootScreens } from '..';
import { Header } from '@/Components/header';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

interface ResultPopupProps {
    isVisible: boolean;
    result: string | null;
    onClose: () => void;
}

interface InputPopupProps {
    isVisible: boolean;
    onClose: () => void;
}

const ResultPopup: React.FC<ResultPopupProps> = ({ isVisible, result, onClose }) => {
    return (
        <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>Result: {result}</Text>
                        <Button color={Colors.PRIMARY} title="CLOSE" onPress={onClose} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const InputPopup: React.FC<InputPopupProps> = ({ isVisible, onClose }) => {
    return (
        <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.label}>Student ID:</Text>
                        <TextInput placeholder="Type Student ID to check in/out" style={styles.input} />
                        <Button color={Colors.PRIMARY} title="OK" onPress={onClose} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export const Scanner = (props: { onNavigate: (string: RootScreens) => void }) => {
    const [hasPermission, setHasPermission] = Camera.useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [showInputPopup, setShowInputPopup] = useState(false);

    const handleBarCodeScanned = ({ data }: { data: string }) => {
        setScanned(true);
        setResult(data);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setScanned(false);
        setResult(null);
        setShowPopup(false);
    };

    const handleCloseInputPopup = () => {
        setShowInputPopup(false);
    }

    return (
        <View style={styles.container}>
            <View>
                <Header title="Scan" />
            </View>
            <Camera
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={styles.camera}
            >
                <View>
                </View>
            </Camera>
            <View style={styles.inputcontainer}>
                <TouchableOpacity onPress={() => setShowInputPopup(true)} style={styles.button}>
                    <Text style={styles.buttontext}>Add Record</Text>
                </TouchableOpacity>
            </View>
            {showInputPopup && <InputPopup isVisible={showInputPopup} onClose={handleCloseInputPopup} />}
            {showPopup && <ResultPopup isVisible={showPopup} result={result} onClose={handleClosePopup} />}
        </View >
    );
};


const styles = StyleSheet.create({
    container: {
        height: screenHeight,
        backgroundColor: Colors.WHITE,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    camera:
    {
        height: '70%',
        alignSelf: 'center',
        width: screenWidth,
    }
    ,
    modalContent: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        elevation: 5,
        width: 0.8 * screenWidth,
    },
    button: {
        backgroundColor: Colors.PRIMARY,
        padding: 10,
        borderRadius: 5,
    },
    buttontext: {
        color: Colors.WHITE
    },
    input: {
        padding: 4,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    inputcontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        fontFamily: "Poppins_400Regular"
    },
    label: {
        fontFamily: "Poppins_600SemiBold"
    }
});
