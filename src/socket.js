import {createConnection, subscribeEntities, createLongLivedTokenAuth} from "home-assistant-js-websocket";

export default class Socket {

	constructor() {
		this.baseUrl = "http://192.168.50.169:8123";
		this.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkM2YwNWM2YjI5ZmU0OTk4OWJkYWZmNDg5N2ViMDQzMiIsImlhdCI6MTU5Mzc5MDM1MywiZXhwIjoxOTA5MTUwMzUzfQ.qOtlB8qSkaJ-HTpnaueb8m5OwpCrQBuenQ-l2db5bZE";
	}

	/**
	 *
	 * @return {Promise<Auth>}
	 */
	async auth() {
		return await createLongLivedTokenAuth(
			this.baseUrl,
			this.token
		);
	}

	/**
	 *
	 * @return {Promise<{auth: Auth}>}
	 */
	async connectionOptions() {
		return {
			auth: await this.auth()
		};
	}

	/**
	 *
	 * @return {Promise<Socket>}
	 */
	connect() {
		return this.connectionOptions()
			.then(config => createConnection(config))
			.then(connection => {
				this.connection = connection;

				return Promise.resolve(connection);
			})
			.then(() => Promise.resolve(this))
			.catch((e) => console.log(e));
	}

	subscribe(callback) {
		return subscribeEntities(this.connection, callback);
	}

}