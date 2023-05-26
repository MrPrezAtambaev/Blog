import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Blog } from "@/utils/types/Blog";
import { baseAxios } from "@/utils/baseAxios";

type UpdateBlogArg = {
	id: string;
	data: Partial<Omit<Blog, "id">>;
};

const updateBlog = async (arg: UpdateBlogArg) => {
	const { data } = await baseAxios.put(`/blog/${arg.id}/`, arg.data);
	return data;
};

export const useUpdateBlog = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: updateBlog,
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
