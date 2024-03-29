import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { RestaurantTypes } from '../Redux/RestaurantRedux';

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getRestaurants } from "./RestaurantSagas";

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    // some sagas receive extra parameters in addition to an action
    takeLatest(RestaurantTypes.RESTAURANT_REQUEST, getRestaurants, api)
  ])
}
