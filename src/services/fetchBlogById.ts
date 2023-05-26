import { useQuery } from "@tanstack/react-query";
import { Blog } from "@/utils/types/Blog";
import { baseAxios } from "@/utils/baseAxios";
import { type } from "os";

export type FetchBlogByIdArg = {
	id: string;
};

const fetchBlogById = async (arg: FetchBlogByIdArg) => {
	const { data } = await baseAxios.get<Blog>(`/blog/${arg.id}/`);
	return data;
};

export const useFetchBlogById = (arg: FetchBlogByIdArg) => {
	const query = useQuery({
		queryFn: () => fetchBlogById(arg),
		queryKey: ["blog", arg],
	});

	return [query.data, query] as const;
};
