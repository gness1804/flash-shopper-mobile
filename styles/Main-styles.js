import { StyleSheet } from 'react-native'
import editableView from './editableView';
import commonElements from './CommonElements';

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
  },
  cartIcon: {
    height: 30,
    marginLeft: 30,
    width: 30,
  },
  deleteIcon: {
    height: 30,
    marginRight: 30,
    width: 30,
  },
  eachItemButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 30,
  },
  eachItemContainer: {
    backgroundColor: '#ffffff',
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 20,
  },
  editViewContainer: {
    alignItems: editableView.container.alignItems,
    backgroundColor: editableView.container.backgroundColor,
    flex: editableView.container.flex,
  },
  editViewButtonCancel: {
    backgroundColor: editableView.cancelButton.backgroundColor,
    borderWidth: editableView.cancelButton.borderWidth,
    color: editableView.cancelButton.color,
    fontSize: editableView.cancelButton.fontSize,
    marginRight: editableView.cancelButton.marginRight,
    padding: editableView.cancelButton.padding,
  },
  editViewButtonContainer: {
    flexDirection: editableView.buttonContainer.flexDirection,
    marginTop: editableView.buttonContainer.marginTop,
  },
  editViewButtonSave: {
    backgroundColor: editableView.saveButton.backgroundColor,
    borderWidth: editableView.saveButton.borderWidth,
    color: editableView.saveButton.color,
    fontSize: editableView.saveButton.fontSize,
    marginRight: editableView.saveButton.marginRight,
    padding: editableView.saveButton.padding,
  },
  editViewHeadline: {
    fontSize: editableView.headline.fontSize,
    marginBottom: editableView.headline.marginBottom,
    marginTop: editableView.headline.marginTop,
  },
  inputField: {
    borderColor: commonElements.inputField.borderColor,
    borderWidth: commonElements.inputField.borderWidth,
    height: commonElements.inputField.height,
    margin: commonElements.inputField.margin,
    padding: commonElements.inputField.padding,
    width: commonElements.inputField.width,
  },
  itemsDisplayContainer: {
    marginBottom: 30,
  },
  name: {
    fontWeight: '700',
    marginTop: 10,
    textAlign: 'center',
  },
  nameInCart: {
    color: '#E6E4E4',
    fontWeight: '700',
    marginTop: 10,
    textAlign: 'center',
    textDecorationLine: 'line-through',
  },
  pencilIcon: {
    height: 30,
    width: 30,
  },
  text: {
    marginTop: 10,
    textAlign: 'center',
  },
  textInCart: {
    color: '#E6E4E4',
    marginTop: 10,
    textAlign: 'center',
    textDecorationLine: 'line-through',
  },
})

export default styles
