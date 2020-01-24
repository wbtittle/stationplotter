import { createStore } from 'vuex';
import throttle from 'lodash/throttle';
import gameApp from './reducers';
import { loadState, saveState } from './localStorage';


const configureStore = () => {
	const persistedState = loadState();

	console.log("PERSISTED STATE :", persistedState);
	const store = createStore(gameApp, persistedState);
	store.subscribe(throttle(()=>{
		saveState({
			dice: store.getState().dice,
			tallies: store.getState().tallies,
			scores: store.getState().scores,
			rolls: store.getState().rolls,
			startingPoints: store.getState().startingPoints
		})
	}, 1000));

	console.log("LOADING STATE", store.getState());
	return store;
}

export default configureStore;
