import { useQuery } from "@tanstack/react-query";
import { Blog } from "@/utils/types/Blog";
import { baseAxios } from "@/utils/baseAxios";

// type FiltersBlog = {
// 	_sort?: keyof Blog;
// 	_order?: "asc" | "desc";
// };

// type FetchBlogArg = {
// 	filters?: FiltersBlog;
// };

const fetchBlog = async () => {
	const { data } = await baseAxios.get<Blog[]>("/blog");

	return data;
};

export const useFetchBlog = () => {
	const query = useQuery({
		queryFn: () => fetchBlog(),
		queryKey: ["blog"],
		initialData: [],
	});

	return [query.data, query] as const;
};
