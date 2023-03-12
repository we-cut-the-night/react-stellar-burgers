import PropTypes from 'prop-types'

export const ingredientPropType = PropTypes.shape({
  _id: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  calories: PropTypes.number,
  carbohydrates: PropTypes.number,
  proteins: PropTypes.number,
  fat: PropTypes.number,
})
