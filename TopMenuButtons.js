import { useState, useEffect, useRef, React } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	TextInput,
} from "react-native";

import * as Speech from "expo-speech";

import { WordData } from "./WordData.js";

const TopMenuButtons = ({
	displayText,
	setDisplayText,
	showKeyboard, // Receive showKeyboard prop
	setKeyboardInput, // Receive setKeyboardInput
	keyboardInput, // Receive keyboardInput
	inputRef, // Receive inputRef
   setButtonLayout,
   buttonWidth,
   buttonHeight,
}) => {

	const dictateText = () => {
		Speech.speak(displayText);
	};

	const handleHomeButtonPress = () => {
		setButtonLayout(WordData);
		console.log([WordData]);
	};

	const handleHelloButtonPress = (word) => {
		setDisplayText((prevText) => {
			return prevText + " Hi, I am Andy.";
		});
		Speech.speak(" Hi, I'm Andy.");
   };
   
   // const dynamicStyles = {
	// 		menuButton: {
	// 			...styles.menuButton,
	// 			width: buttonWidth,
	// 		},
	// 	};

	const getDynamicFontSize = (text) => {
		const wordCount = text.split(" ").length + 2;
		if (wordCount <= 1) return 80;
		if (wordCount <= 3) return 100;
		if (wordCount <= 5) return 60;
		if (wordCount <= 7) return 50;
		if (wordCount <= 9) return 40;
		return 25;
	};

	const deleteLastWord = () => {
		setDisplayText((prevText) => {
			const words = prevText.trim().split(" ");
			if (words.length <= 1) return "";
			words.pop();
			return words.join(" ");
		});
	};

	const clearDisplayText = () => {
		setDisplayText("");
	};

	return (
		<View style={styles.xStack}>
			<TouchableOpacity
				onPress={handleHomeButtonPress}
				style={[
					styles.menuButton,
					{ width: buttonWidth, height: buttonHeight },
				]}
			>
				<Text style={styles.buttonText}>🏠</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={[
					styles.menuButton,
					{ width: buttonWidth, height: buttonHeight },
				]}
				onPress={handleHelloButtonPress}
			>
				<Text style={styles.buttonText}>👋🏼</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={[
					styles.displayStyle,
					{ height: buttonHeight },
				]}
				onPress={dictateText}
			>
				<TextInput
					ref={inputRef}
					style={[
						{
							fontSize: getDynamicFontSize(
								showKeyboard ? keyboardInput : displayText
							),
							height: buttonHeight,
						},
					]}
					value={showKeyboard ? keyboardInput : displayText}
					onChangeText={(text) => {
						if (showKeyboard) {
							setKeyboardInput(text);
						} else {
							setDisplayText(text);
						}
					}}
				/>
			</TouchableOpacity>

			<TouchableOpacity
				style={[
					styles.menuButton,
					{ width: buttonWidth, height: buttonHeight },
				]}
				onPress={deleteLastWord}
			>
				<Text style={styles.buttonText}>⬅️</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={[
					styles.menuButton,
					{ width: buttonWidth, height: buttonHeight },
				]}
				onPress={clearDisplayText}
			>
				<Text style={styles.buttonText}>X</Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={handleHomeButtonPress}
				style={[
					styles.menuButton,
					{ width: buttonWidth, height: buttonHeight },
				]}
			>
				<Text style={styles.buttonText}>🏠</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	xStack: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 2,
		margin: 1,
		marginBottom: 0,
		backgroundColor: "#2e3a43",
	},
	menuButton: {
		justifyContent: "center",
		alignItems: "center",
		margin: 1,
		padding: 0,
		height: 80,
		// width: buttonWidth,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "black",
		backgroundColor: "#636f6f",
	},
	buttonText: {
		fontSize: 15,
		justifyContent: "center",
	},
	displayStyle: {
		justifyContent: "center",
		alignItems: "center",
		// height: 80,
		backgroundColor: "#F0EFEB",
      marginLeft: 3,
      marginRight: 3,
		marginBottom: 1,
		width: "57.9%",
      borderRadius: 10,
      borderColor: "black",
      borderWidth: 1,
	},
});

export default TopMenuButtons;