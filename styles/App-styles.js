import { StyleSheet } from 'react-native'

const headerIcon = {
  height: 60,
  marginRight: 30,
  width: 60,
}

const styles = StyleSheet.create({
  button: {
    marginRight: 20,
  },
  cartNumberMessage: {
    fontSize: 20,
    fontStyle: 'italic',
    marginBottom: 30,
    marginTop: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(134, 148, 247)',
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
  itemNumberMessage: {
    fontSize: 20,
    fontStyle: 'italic',
    marginBottom: 30,
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
