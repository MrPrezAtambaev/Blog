import { ContextModalProps } from "@mantine/modals";
import { Skeleton, Title } from "@mantine/core";
import BlogForm, { BlogFormValues } from "../BlogForm";
import { useUpdateBlog } from "@/services/updateBlog";
import { useFetchBlogById } from "@/services/fetchBlogById";
import UpdateForm from "../UpdateForm";

type Props = ContextModalProps<{
	blogId: string;
}>;

const UpdateModal = ({ context, id, innerProps }: Props) => {
	const [blog, { isLoading, isError }] = useFetchBlogById({
		id: innerProps.blogId,
	});

	const [updateBlog] = useUpdateBlog();

	const handleSubmit = (data: BlogFormValues) => {
		updateBlog({ data, id: innerProps.blogId });
		context.closeModal(id);
	};

	if (isLoading)
		return <Skeleton height={15} mt={6} width="100%" radius="xl" />;
	if (isError) return <Title color="red">Error!!</Title>;
	if (!blog) return <Title color="red">Not found!!</Title>;

	return (
		<UpdateForm
			defaultValues={{
				title: blog.title,
				description: blog.description,
				image: blog.image,
			}}
			onSubmit={handleSubmit}
		/>
	);
};

export default UpdateModal;
