import axios from 'axios';

class ApiResponse {

	constructor(res) {
		this._original = res;
		this.isError = false;

		if(res instanceof Error) {
			this.isError = true;
		}

	}

	data() {
		if(this.isError) {
			return this._original.response.data;
		}

		return this._original.data;
	}

}

export default class Api {


	constructor() {
		this.baseUrl = "/api/v1";

		this.client = axios.create({
			baseURL: this.baseUrl,
			timeout: 1000,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	/**
	 * @param path
	 * @param query
	 * @param config
	 * @returns {Promise<ApiResponse>}
	 */
	async get(path, query = {}, config = {}) {
		return await this.response(
			await this.client.get(path, {
				params: query,
				...config
			})
		);
	}

	async delete(path, query = {}, config = {}) {
		return await this.response(
			await this.client.delete(path, {
				params: query,
				...config
			})
		);
	}

	async post(path, data = {}, config = {}) {
		return await this.response(
			await this.client.post(path, data, config)
		);
	}

	async patch(path, data = {}, config = {}) {
		return await this.response(
			await this.client.patch(path, data, config)
		);
	}

	async check() {
		try {
			return await this.get('/');
		}
		catch (e) {
			console.dir(e);

			throw e;
		}
	}

	async response(res) {
		return new ApiResponse(res);
	}

	async boards() {
		return await this.get('boards');
	}

	async createBoard() {
		return await this.post('board');
	}

	async updateBoard(board) {
		return await this.patch(`board/${board.id}`, board.toJSON());
	}

	async deleteBoard(board) {
		return await this.delete(`board/${board.id}`);
	}

	/**
	 *
	 * @param board
	 * @returns {Promise<ApiResponse>}
	 */
	async pages(board) {
		return await this.get(`pages`, {boardId: board.id});
	}

	async createPage(board) {
		return await this.post('page', {boardId: board.id});
	}

	async updatePage(page) {
		return await this.patch(`page/${page.id}`, page.toJSON());
	}

	async deletePage(page) {
		return await this.delete(`page/${page.id}`);
	}

	/**
	 *
	 * @param page
	 * @returns {Promise<ApiResponse>}
	 */
	async groups(page) {
		return await this.get(`groups`, {pageId: page.id});
	}

	async createGroup(page) {
		return await this.post('group', {pageId: page.id});
	}

	async updateGroup(group) {
		return await this.patch(`group/${group.id}`, group.toJSON());
	}

	async deleteGroup(group) {
		return await this.delete(`group/${group.id}`);
	}

	/**
	 *
	 * @param group
	 * @returns {Promise<ApiResponse>}
	 */
	async tiles(group) {
		return await this.get(`tiles`, {groupId: group.id});
	}

	async createTile(group) {
		return await this.post('tile', {groupId: group.id});
	}

	async updateTile(tile) {
		return await this.patch(`tile/${tile.id}`, tile.toJSON());
	}

	async deleteTile(tile) {
		return await this.delete(`tile/${tile.id}`);
	}

}