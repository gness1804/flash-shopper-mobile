import { StyleSheet } from 'react-native';

const addItemViewButton = {
  borderWidth: 1,
  color: '#FFF',
  fontSize: 24,
  marginRight: 30,
  padding: 10,
}

const styles = StyleSheet.create({
  addIconLarge: {
    alignSelf: 'flex-end',
    height: 80,
    marginBottom: 20,
    width: 80,
  },
  addIconSmall: {
    height: 30,
    width: 30,
  },
  addItemButtonCancel: {
    borderWidth: addItemViewButton.borderWidth,
    backgroundColor: 'rgb(215, 78, 65)',
    color: addItemViewButton.color,
    fontSize: addItemViewButton.fontSize,
    marginRight: addItemViewButton.marginRight,
    padding: addItemViewButton.padding,
  },
  addItemButtonSave: {
    borderWidth: addItemViewButton.borderWidth,
    backgroundColor: 'rgb(71, 170, 47)',
    color: addItemViewButton.color,
    fontSize: addItemViewButton.fontSize,
    marginRight: addItemViewButton.marginRight,
    padding: addItemViewButton.padding,
  },
  addItemView: {
    backgroundColor: 'rgb(189, 228, 232)',
    flex: 1,
    alignItems: 'center',
  },
  addItemViewButtonContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  addItemViewHeadline: {
    fontSize: 30,
    marginBottom: 30,
    marginTop: 30,
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
  headline: {
    fontSize: 36,
    marginTop: 20,
    textAlign: 'center',
  },
  inputField: {
    borderColor: 'black',
    borderWidth: 1,
    height: 50,
    margin: 10,
    padding: 10,
    width: 250,
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
})

export default styles
