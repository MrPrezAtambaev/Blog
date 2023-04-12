import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Blog } from "@/utils/types/Blog";
import { baseAxios } from "@/utils/baseAxios";

type CreateBlogArg = {
	data: Omit<Blog, "id">;
};

const createBlog = async (arg: CreateBlogArg) => {
	const { data } = await baseAxios.post("/blog", arg.data);
	return data;
};

export const useCreateBlog = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: createBlog,
		onSettled() {
			queryClient.invalidateQueries({
				predicate(query) {
					return query.queryKey?.[0] === "blog";
				},
			});
		},
	});

	return [mutation.mutateAsync, mutation] as const;
};
