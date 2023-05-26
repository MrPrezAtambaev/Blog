import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseAxios } from "@/utils/baseAxios";

type DeleteBlogArg = {
	id: string;
};

const deleteBlog = async (arg: DeleteBlogArg) => {
	const { id } = arg;
	await baseAxios.delete(`/blog/${id}/`);
};

export const useDeleteBlog = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: deleteBlog,
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
