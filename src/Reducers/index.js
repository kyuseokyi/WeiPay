import { combineReducers } from "redux";
import CounterReducer from "./counterReducer";
import NavigationReducer from "./navigationReducer";
import CoinReducer from './CoinReducer';
import TokenReducer from './TokenReducer';
import CoinSelectionReducer from './CoinSelectionReducer';
import NewWalletSetup from './NewWalletSetup';
import Portfolio from './PortfolioReducer';
import language from './languageReducer'

const AppReducer = combineReducers({
  CounterReducer,
  NavigationReducer,
  coins: CoinReducer,
  tokens: TokenReducer,
  PortfolioCoins: Portfolio,
  selectedCoins: CoinSelectionReducer,
  newWallet: NewWalletSetup,
  language
});

export default AppReducer;
