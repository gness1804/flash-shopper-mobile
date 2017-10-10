import { StyleSheet } from 'react-native';
import editableView from './editableView';
import commonElements from './CommonElements';

const styles = StyleSheet.create({
  backIcon: {
    alignSelf: 'flex-start',
    height: 80,
    marginBottom: 20,
    marginRight: 120,
    width: 80,
  },
  bottomIconContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
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
});

export default styles;
