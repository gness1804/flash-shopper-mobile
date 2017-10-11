import { StyleSheet } from 'react-native'
import commonElements from './CommonElements';

const styles = StyleSheet.create({
  addIconSmall: {
    height: commonElements.smallIcon.height,
    width: commonElements.smallIcon.width,
    marginLeft: commonElements.smallIcon.marginLeft,
  },
  deleteIconSmall: {
    height: commonElements.smallIcon.height,
    marginLeft: commonElements.smallIcon.marginLeft,
    width: commonElements.smallIcon.width,
  },
  editIconSmall: {
    height: commonElements.smallIcon.height,
    marginLeft: commonElements.smallIcon.marginLeft,
    width: commonElements.smallIcon.width,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  name: {
    marginRight: 20,
  },
});

export default styles;
