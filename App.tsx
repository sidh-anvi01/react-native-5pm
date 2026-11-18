
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import React, { useState } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

const App = () => {

  const [image, setImage] = useState(null)

  // Gallery Function
  const selectImage = () => {

    const options = {
      mediaType: 'photo',
      selectionLimit: 1,
    }

    launchImageLibrary(options, (response) => {

      if (response.didCancel) {
        console.log("User cancelled image picker")
      }
      else if (response.errorCode) {
        console.log("Gallery Error:", response.errorMessage)
      }
      else if (response.assets?.length > 0) {
        setImage(response.assets[0].uri)
      }

    })
  }

  // Camera Function
  const openCamera = () => {

    const options = {
      mediaType: 'photo',
      cameraType: 'back',
      saveToPhotos: true,
    }

    launchCamera(options, (response) => {

      if (response.didCancel) {
        console.log("User cancelled camera")
      }
      else if (response.errorCode) {
        console.log("Camera Error:", response.errorMessage)
      }
      else if (response.assets?.length > 0) {
        setImage(response.assets[0].uri)
      }

    })
  }

  // Remove Image
  const removeImage = () => {
    setImage(null)
  }

  return (

    <View style={styles.container}>

      <Text style={styles.heading}>
        Image Picker App
      </Text>

      <Button
        title="Upload Image"
        onPress={selectImage}
      />

      <View style={styles.spacing} />

      <Button
        title="Open Camera"
        onPress={openCamera}
      />

      {image && (
        <>
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="cover"
          />

          <Button
            title="Remove Image"
            onPress={removeImage}
            color="red"
          />
        </>
      )}

    </View>
  )
}

export default App

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  heading: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },

  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    marginBottom: 15,
    borderRadius: 10,
  },

  spacing: {
    height: 15,
  }

})
