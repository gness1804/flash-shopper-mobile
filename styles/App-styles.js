import { StyleSheet } from 'react-native'
import commonElements from './CommonElements';

const headerIcon = {
  height: 40,
  marginRight: 20,
  width: 40,
}

const styles = StyleSheet.create({
  button: {
    marginRight: 20,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: commonElements.core.backgroundColor,
  },
  deleteDBIcon: {
    height: headerIcon.height,
    marginRight: headerIcon.marginRight,
    width: headerIcon.width,
  },
  deleteCartIcon: {
    height: headerIcon.height,
    marginRight: headerIcon.marginRight,
    width: headerIcon.width,
  },
  headerButtonsContainer: {
    flexDirection: 'row',
  },
  headline: {
    fontSize: 42,
    marginBottom: 10,
    marginTop: 30,
  },
  header: {
    // position: 'relative',
    // top: -60,
  },
  itemNumberMessage: {
    fontSize: 20,
    fontStyle: 'italic',
    marginBottom: 50,
    marginTop: 30,
    textAlign: 'center',
  },
  pantryButton: {
    marginTop: 30,
  },
  plusIconHeader: {
    height: headerIcon.height,
    marginRight: headerIcon.marginRight,
    width: headerIcon.width,
  },
  upperMessageContainer: {
    flexDirection: 'row',
  },
});

export default styles
