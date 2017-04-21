import { StyleSheet } from 'react-native';
import { height } from '../helpers/Dimensions';

let cartTopMargin
let textTopMargin

if (height < 900) {
  cartTopMargin = 20
} else {
  cartTopMargin = 100
}

if (height < 900) {
  textTopMargin = 10
} else {
  textTopMargin = 60
}

const styles = StyleSheet.create({
  cart: {
    alignSelf: 'center',
    height: 150,
    marginTop: cartTopMargin,
    width: 150,
  },
  text: {
    fontSize: 20,
    fontStyle: 'italic',
    marginTop: textTopMargin,
    textAlign: 'center',
  },
})

export default styles
