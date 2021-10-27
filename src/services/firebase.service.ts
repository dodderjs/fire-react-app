import { initializeApp } from "firebase/app";
import { getFirestore, query, orderBy, limit, collection, getDocs, QuerySnapshot, Query, DocumentData, QueryDocumentSnapshot, startAfter } from "firebase/firestore";
import env from '../environments/environment';
import {Movie} from '../movie';
import {Singleton} from '../decorators/signleton';



const isItOnToday = (date:Date):boolean => {
	const today:Date = new Date();
	return date.getFullYear() === today.getFullYear() &&  date.getMonth() === today.getMonth() &&  (date.getDay() === today.getDay() ||  date.getDay() === today.getDay()-1);
}


@Singleton
class FireService {
	static _instance:FireService;
	private static app = initializeApp(env.firebase);
	static database = getFirestore();
	static moviesdb = collection(FireService.database, "movies");
	lastVisible:QueryDocumentSnapshot<DocumentData>|undefined;

	public async onlineMovies(page:number = 1, pageSize:number = 25):Promise<Movie[]> {
		const q:Query<DocumentData> = page !== 1 && this.lastVisible ?
					query(FireService.moviesdb, orderBy('lastUploadedAt', 'desc'), startAfter(this.lastVisible), limit(pageSize)) :
					query(FireService.moviesdb, orderBy('lastUploadedAt', 'desc'), limit(pageSize));

		const querySnapshot:QuerySnapshot<DocumentData> = await getDocs(q);
		this.lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];

		return querySnapshot.docs.map((doc:DocumentData) => {
			const data:any = doc.data();
			const lastUploadedAt = new Date(data.lastUploadedAt.seconds*1000);

			return (<Movie>{
				...data,
				id: doc.id,
				poster_path: /image\.tmdb\.org\/t\/p\/original\//.test(data.image) ? data.image.replace("image.tmdb.org/t/p/original/", "image.tmdb.org/t/p/w300/") : data.image,
				overview: data.plot,
				release_date: data.release_date && new Date(data.release_date.seconds*1000) || null,
				lastUploadedAt: lastUploadedAt,
				is_new: isItOnToday(lastUploadedAt)
				});
			});
		}
}
export default new FireService();
