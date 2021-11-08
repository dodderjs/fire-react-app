import {Singleton} from '../decorators/signleton';
import moment from 'moment';


@Singleton
class UserService {
	private _lastVisit:Date = new Date();

	constructor() {
		this.lastVisit = moment(window.localStorage.getItem('user.lastVisit')).toDate();
	}

	get lastVisit():Date {
		return this._lastVisit;
	}
	set lastVisit(lv:Date) {
		if (!moment(lv).isSame(this._lastVisit, 'date')) {
			window.localStorage.setItem('user.lastVisit', moment().toString());
		}
		this._lastVisit = lv;
	}

	public isItNew(date:Date|undefined):boolean {
		const twoDaysAgo = moment().subtract(2, 'days').startOf('day');
		return moment(date).isAfter(this.lastVisit) || moment(date).isAfter(twoDaysAgo);
	}
}
export default new UserService();
