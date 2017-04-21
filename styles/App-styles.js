import { StyleSheet, Dimensions } from 'react-native'
import commonElements from './CommonElements';

const { width } = Dimensions.get('screen')

let iconRightMargin
if (width < 600) {
  iconRightMargin = 5
} else {
  iconRightMargin = 20
}

let buttonRightMargin
if (width < 600) {
  buttonRightMargin = 5
} else {
  buttonRightMargin = 20
}

const headerIcon = {
  height: 50,
  marginRight: iconRightMargin,
  width: 50,
}

const styles = StyleSheet.create({
  button: {
    marginRight: buttonRightMargin,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  pantryButton: {
    alignSelf: 'center',
    marginTop: 30,
    width: '40%',
  },
  plusIconHeader: {
    alignSelf: 'center',
    height: 70,
    marginBottom: 30,
    width: 70,
  },
  toggleButtonViewIcon: {
    height: 50,
    marginTop: 20,
    width: 50,
  },
  upperMessageContainer: {
    flexDirection: 'row',
  },
});

export default styles
