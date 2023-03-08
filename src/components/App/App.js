import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingridients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import {data} from '../../utils/data'
import './App.css';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <BurgerIngredients ingridients={data} />
      <BurgerConstructor />
    </div>
  );
}

export default App;
