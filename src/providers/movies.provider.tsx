import { useEffect, ReactNode, createContext, SetStateAction, Dispatch, useReducer, useCallback } from "react";
import { storeService } from "../services/store.service";
import { Movie } from "../movie";
import { uniqBy } from "lodash";

export const MoviesContext = createContext<{ filter: string, movies: Movie[], loading: boolean, setFilter:Dispatch<SetStateAction<string>>, nextPage:any, pageSize:number }>(null!);

type Props = {
	children: ReactNode
}

const pageSize = storeService.pageSize;
const initState = { loading: false, page: 1, movies: [], filter: '', pageSize };
const contentReducer = (state:any, {type, payload}:{type:string, payload?:any}) => {
	switch(type) {
		case 'FILTER':
			return {
				...state,
				page: 1,
				filter: payload,
				loading: true
			}

		case 'GET_NEXT_PAGE':
			return {
				...state,
				page: state.page + 1,
				loading: true
			}

		case 'ATTACH_NEXT_PAGE':
			return {
				...state,
				movies: uniqBy([
					...state.movies,
					...payload
				], 'id'),
				loading: false
			}

		case 'RESET':
			return initState;
		default:
			return state;
	}
}
const MoviesProvider = ({ children }:Props ) => {
	const [state, dispatch] = useReducer(contentReducer, initState);
	const getMovies = useCallback(storeService.getOnlineMovies.bind(storeService), [state.filter, state.page]);

	useEffect(() => {
		getMovies(state.filter, state.page).then((result:Movie[]) => {
			dispatch({type: "ATTACH_NEXT_PAGE", payload: result });
		});
	}, [state.filter, state.page]);

	return (
		<MoviesContext.Provider value={{...state, setFilter: (f) => dispatch({ type: 'FILTER', payload: f}), nextPage: () => dispatch({ type: 'GET_NEXT_PAGE'})}}>
			{children}
		</MoviesContext.Provider>
	);
};
export default MoviesProvider;
