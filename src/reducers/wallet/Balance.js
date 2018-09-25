import {
  FETCHING_COIN_DATA,
  FETCHING_COIN_DATA_SUCCESS,
  FETCHING_COIN_DATA_FAIL,
  FETCHING_ETH_PRICE_DATA,
  FETCHING_ETH_PRICE_DATA_SUCCESS,
  FETCHING_ETH_PRICE_DATA_FAIL,
  SET_WALLET_TOKENS_BALANCES,
  CALCULATE_WALLET_BALANCE,
} from '../../actions/ActionTypes';

/**
 * 0 index of price array represents the 1-1 ETH price -> the other currencies are relative to ETH
 * [  { 'USD' : [  Relative Eth Price, # of Eth, # of Altcoin ..etc ] }, .... ]
 */
const initialState = {
  isFetching: null,
  data: [],
  hasError: false,
  errorMessage: null,
  currentPriceStruct: [
    { 'USD': [0] }, //index relative to walletTokens
    { 'CAD': [0] },
    { 'EUR': [0] },
    { 'ETH': [0] },
    { 'BTC': [0] },
  ],
  initialBalance: 2,
  currencyOptions: ['USD, CAD, EUR, BTC, ETH'],
  walletTokens: [], //holds [ {type: "ETH", amount: "0.95954711315492517"}, ... ]
  apiTokenString: '',  //holds ETH,TokenName,TokenName...ETC  -> for API call
  tokenConversions: [], //  { ETH: {USD: 209.5, CAD: 285.32, ETH: 1, BTC: 0.03264, EUR: 178.06} SUB: {USD: 0.112, CAD: 0.1535, ETH: 0.000534, BTC: 0.00001743, EUR: 0.09506} }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCHING_COIN_DATA:
      return {
        ...state, isFetching: true, hasError: false, errorMessage: null,
      };
    case FETCHING_COIN_DATA_SUCCESS:
      console.log("fetching coin data success");
      console.log(action.payload);
      return {
        ...state, isFetching: false, hasError: false, errorMessage: null, tokenConversions: action.payload,
      };
    case FETCHING_COIN_DATA_FAIL:
      return {
        ...state, isFetching: false, hasError: true, errorMessage: action.err,
      };
    case FETCHING_ETH_PRICE_DATA:
      return {
        ...state, isFetching: true, data: null, hasError: false, errorMessage: null,
      };
    /**
    * This will load any app initially with the current API price matrix relative to ETH.
    * Call this at any time to refresh the balance of the wallet.
    */
    case FETCHING_ETH_PRICE_DATA_SUCCESS:             
      const oldPriceMatrix = state.currentPriceStruct;           
      for (let i = 0; i < state.currencyOptions.length; i++) {
        const key = Object.keys(oldPriceMatrix[i]);
        oldPriceMatrix[i][key] = action.payload[key];
      }         
      return { ...state, currentPriceStruct: oldPriceMatrix };
    case FETCHING_ETH_PRICE_DATA_FAIL: 
      return Object.assign({}, state, {
        isFetching: false,
        data: action.payload,
        hasError: true,
        errorMessage: action.err
      });
    case SET_WALLET_TOKENS_BALANCES:  
      console.log("set wallet tokens balance ");
      console.log(action.payload);
      return { ...state, walletTokens: action.payload };
    case CALCULATE_WALLET_BALANCE:
      const key = Object.keys(state.walletTokens[0]); 
      let quant = state.walletTokens[0][key[1]];
      console.log(quant);
      let usdPrice = state.tokenConversions["ETH"].USD;
      console.log("USDPRICE", usdPrice);
      let total = quant*usdPrice;
      return { ...state, initialBalance: total };      
    default:
      return state;
  }

}