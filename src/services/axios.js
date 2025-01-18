import axios from "axios";

export const API = (url, data) => {
	post: async (url, data) => {
		try {
			const response = await axios.post(url, data)
			return response.data
		} catch (error) {
			console.error('Ошибка при отправке данных:', error);
      throw error;
		}
	}
}