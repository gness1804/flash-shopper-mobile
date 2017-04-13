import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  addIcon: {
    alignSelf: 'flex-end',
    height: 80,
    marginBottom: 20,
    width: 80,
  },
  backIcon: {
    alignSelf: 'flex-start',
    height: 80,
    marginBottom: 20,
    marginRight: 120,
    width: 80,
  },
  bottonIconContainer: {
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
  },
})

export default styles
