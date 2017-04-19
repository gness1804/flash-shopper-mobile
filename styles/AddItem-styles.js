import { StyleSheet } from 'react-native';
import editableView from './editableView';
import commonElements from './CommonElements';

const styles = StyleSheet.create({
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
  editViewContainer: {
    alignItems: editableView.container.alignItems,
    backgroundColor: editableView.container.backgroundColor,
    flex: editableView.container.flex,
  },
  editViewHeadline: {
    fontSize: editableView.headline.fontSize,
    marginBottom: editableView.headline.marginBottom,
    marginTop: editableView.headline.marginTop,
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
