import { StyleSheet } from 'react-native';
import editableView from './editableView';
import commonElements from './CommonElements';

const smallIcon = {
  height: 30,
  marginLeft: 60,
  width: 30,
}

const styles = StyleSheet.create({
  addIconLarge: {
    alignSelf: 'flex-end',
    height: 80,
    marginBottom: 20,
    width: 80,
  },
  addIconSmall: {
    height: smallIcon.height,
    width: smallIcon.width,
    marginLeft: smallIcon.marginLeft,
  },
  addItemButtonCancel: {
    backgroundColor: editableView.cancelButton.backgroundColor,
    borderWidth: editableView.cancelButton.borderWidth,
    color: editableView.cancelButton.color,
    fontSize: editableView.cancelButton.fontSize,
    marginRight: editableView.cancelButton.marginRight,
    padding: editableView.cancelButton.padding,
  },
  addItemButtonSave: {
    backgroundColor: editableView.saveButton.backgroundColor,
    borderWidth: editableView.saveButton.borderWidth,
    color: editableView.saveButton.color,
    fontSize: editableView.saveButton.fontSize,
    marginRight: editableView.saveButton.marginRight,
    padding: editableView.saveButton.padding,
  },
  addItemView: {
    alignItems: editableView.container.alignItems,
    backgroundColor: editableView.container.backgroundColor,
    flex: editableView.container.flex,
  },
  addItemViewButtonContainer: {
    flexDirection: editableView.buttonContainer.flexDirection,
    marginTop: editableView.buttonContainer.marginTop,
  },
  addItemViewHeadline: {
    fontSize: editableView.headline.fontSize,
    marginBottom: editableView.headline.marginBottom,
    marginTop: editableView.headline.marginTop,
  },
  backIcon: {
    alignSelf: 'flex-start',
    height: 80,
    marginBottom: 20,
    marginRight: 120,
    width: 80,
  },
  bottomIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(200, 240, 240)',
  },
  deleteIconSmall: {
    height: smallIcon.height,
    marginLeft: smallIcon.marginLeft,
    width: smallIcon.width,
  },
  editIconSmall: {
    height: smallIcon.height,
    marginLeft: smallIcon.marginLeft,
    width: smallIcon.width,
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
  headline: {
    fontSize: 36,
    marginTop: 20,
    textAlign: 'center',
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
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  itemList: {
    marginTop: 60,
  },
  name: {
    marginRight: 20,
  },
  searchIcon: {
    height: 40,
    marginTop: 20,
    width: 40,
  },
})

export default styles
