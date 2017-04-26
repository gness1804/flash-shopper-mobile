import { StyleSheet } from 'react-native';
import commonElements from './CommonElements'

const styles = StyleSheet.create({
  button: {
    marginBottom: 30,
    marginRight: 20,
    width: 80,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 40,
  },
  container: {
    alignItems: 'center',
    backgroundColor: commonElements.core.backgroundColor,
    flex: 1,
  },
  headline: {
    fontSize: 30,
    marginBottom: 40,
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
