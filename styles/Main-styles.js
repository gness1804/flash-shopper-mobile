import { StyleSheet } from 'react-native'

const editViewButton = {
  borderWidth: 1,
  color: '#FFF',
  fontSize: 24,
  marginRight: 30,
  padding: 10,
}

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
  },
  eachItemContainer: {
    backgroundColor: '#ffffff',
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 20,
  },
  editViewContainer: {
    backgroundColor: 'rgb(189, 228, 232)',
    flex: 1,
    alignItems: 'center',
  },
  editViewButtonCancel: {
    borderWidth: editViewButton.borderWidth,
    backgroundColor: 'rgb(215, 78, 65)',
    color: editViewButton.color,
    fontSize: editViewButton.fontSize,
    marginRight: editViewButton.marginRight,
    padding: editViewButton.padding,
  },
  editViewButtonContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  editViewButtonSave: {
    borderWidth: editViewButton.borderWidth,
    backgroundColor: 'rgb(71, 170, 47)',
    color: editViewButton.color,
    fontSize: editViewButton.fontSize,
    marginRight: editViewButton.marginRight,
    padding: editViewButton.padding,
  },
  editViewHeadline: {
    fontSize: 30,
    marginBottom: 30,
    marginTop: 30,
  },
  inputField: {
    borderColor: 'black',
    borderWidth: 1,
    height: 50,
    margin: 10,
    padding: 10,
    width: 250,
  },
  name: {
    fontWeight: '700',
    marginTop: 10,
    textAlign: 'center',
  },
  text: {
    marginTop: 10,
    textAlign: 'center',
  },
})

export default styles
