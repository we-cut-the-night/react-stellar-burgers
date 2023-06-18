export const BASE_URL = 'https://norma.nomoreparties.space/api'

export const ingridientTypes = [
  {
    title: 'Булки',
    type: 'bun',
  },
  {
    title: 'Соусы',
    type: 'sauce',
  },
  {
    title: 'Начинки',
    type: 'main',
  },
]

export const urls = {
  constructor: "/",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  profile: "/profile",
  orders: "/profile/orders",
  ordersId: "/profile/orders/:id",
  ingredientsId: "/ingredients/:id",
  notFound: "*",
}
// Иван Иванович
// ivanthecreator@gmail.com
// 1q2w3e4r

// Петр Петрович
// piterthecreator@gmail.com
// 1q2w3e4r
