import { initializeApp } from "firebase/app";
import { getAuth, Auth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAnalytics, logEvent, Analytics } from 'firebase/analytics';
import { getFirestore, query, orderBy, limit, collection, getDocs, QuerySnapshot, Query, DocumentData, QueryDocumentSnapshot, startAfter, where, documentId } from "firebase/firestore";
import env from '../environments/environment';
import {Movie} from '../movie';
import { Singleton } from '../decorators/signleton';


@Singleton
export class FireService {
	static _instance:FireService;
	private static app = initializeApp(env.firebase);
	private static  analytics:Analytics = getAnalytics(FireService.app);
	static auth:Auth = getAuth(FireService.app);

	static database = getFirestore();

	static moviesdb = collection(FireService.database, "movies");
	lastVisible:QueryDocumentSnapshot<DocumentData>|undefined;

	public async moviesByMap(idMap:string[], pageSize = 25):Promise<Movie[]> {
		const q:Query<DocumentData> = query(FireService.moviesdb,
			//orderBy('lastUploadedAt', 'desc'),
			where(documentId(), "in", idMap));
		const querySnapshot:QuerySnapshot<DocumentData> = await getDocs(q);
		return this.convertDocs(querySnapshot);
	}

	public async onlineMovies(page = 1, pageSize = 25):Promise<Movie[]> {
		const q:Query<DocumentData> = page !== 1 && this.lastVisible ?
					query(FireService.moviesdb, orderBy('lastUploadedAt', 'desc'), startAfter(this.lastVisible), limit(pageSize)) :
					query(FireService.moviesdb, orderBy('lastUploadedAt', 'desc'), limit(pageSize));

		const querySnapshot:QuerySnapshot<DocumentData> = await getDocs(q);
		this.lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];

		return this.convertDocs(querySnapshot);
	}

	private convertDocs(snapshot:QuerySnapshot<DocumentData>) {
		return snapshot.docs.map((doc:DocumentData) => {
			const data:any = doc.data();
			const lastUploadedAt = (data.lastUploadedAt && new Date(data.lastUploadedAt.seconds*1000)) || null;

			return ({
				...data,
				id: doc.id,
				image: /image\.tmdb\.org\/t\/p\/original\//.test(data.image) ? data.image.replace("image.tmdb.org/t/p/original/", "image.tmdb.org/t/p/w300/") : data.image,
				plot: data.plot,
				release_date: (data.release_date && new Date(data.release_date.seconds*1000)) || null,
				lastUploadedAt: lastUploadedAt
				} as Movie);
			});
	}

	public log(eventName: string, ...data:any[]): void {
		return logEvent(FireService.analytics, eventName, ...data);
	}

	private static authProvider = (() => {
		const provider = new GoogleAuthProvider();
		provider.setCustomParameters({ prompt: 'select_account' });
		return provider;
	})()

	public signIn(provider = 'google') {
		return signInWithPopup(FireService.auth, FireService.authProvider);
	}

	public signOut() {
		FireService.auth.signOut();
	}
}
export default new FireService();
