import { StyleSheet } from 'react-native'
import commonElements from './CommonElements';
import { width, height } from '../helpers/Dimensions';

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

let iconsContainerMargin

if (height < 900) {
  iconsContainerMargin = 0
} else {
  iconsContainerMargin = 30
}

const headerIcon = {
  height: 50,
  marginRight: iconRightMargin,
  width: 50,
}

const styles = StyleSheet.create({
  authContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20,
  },
  button: {
    marginRight: buttonRightMargin,
  },
  cartButtonsMasterContainer: {
    flexDirection: 'row',
    marginBottom: iconsContainerMargin,
    marginTop: iconsContainerMargin,
  },
  cartCounterButton: {
    height: 40,
    marginRight: 15,
    width: 40,
  },
  cartCounterButtonContainer: {
    flexDirection: 'row',
    marginRight: 30,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: commonElements.core.backgroundColor,
  },
  deleteCartButton: {
    height: 40,
    width: 40,
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
  loggedInAsText: {
    marginRight: 15,
  },
  loggedInAsTextSpan: {
    fontWeight: 'bold',
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
