import { StyleSheet } from 'react-native';
import commonElements from './CommonElements'

const styles = StyleSheet.create({
  button: {
    marginBottom: 30,
    width: 80,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    fontSize: 30,
    marginBottom: 10,
    marginTop: 30,
  },
  inputField: {
    alignSelf: commonElements.inputField.alignSelf,
    borderColor: commonElements.inputField.borderColor,
    borderWidth: commonElements.inputField.borderWidth,
    height: commonElements.inputField.height,
    margin: commonElements.inputField.margin,
    padding: commonElements.inputField.padding,
    width: commonElements.inputField.width,
  },
})

export default styles
