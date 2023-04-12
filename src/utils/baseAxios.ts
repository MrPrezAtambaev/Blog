import axios from "axios";
import { API_URLS } from "./constants";

export const baseAxios = axios.create({
	baseURL: API_URLS,
});
