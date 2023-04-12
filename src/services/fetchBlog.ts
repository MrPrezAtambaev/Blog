import { useQuery } from "@tanstack/react-query";
import { Blog } from "@/utils/types/Blog";
import { baseAxios } from "@/utils/baseAxios";

type FiltersBlog = {
	_sort?: keyof Blog;
	_order?: "asc" | "desc";
};

type FetchBlogArg = {
	filters?: FiltersBlog;
};

const fetchBlog = async (arg: FetchBlogArg) => {
	const { data } = await baseAxios.get<Blog[]>("/blog", {
		params: arg.filters,
	});

	return data;
};

export const useFetchBlog = (arg: FetchBlogArg = {}) => {
	const query = useQuery({
		queryFn: () => fetchBlog(arg),
		queryKey: ["blog"],
		initialData: [],
	});

	return [query.data, query] as const;
};
