import { ContextModalProps } from "@mantine/modals";
import BlogForm, { BlogFormValues } from "../BlogForm";
import { useCreateBlog } from "@/services/createBlog";

type Props = ContextModalProps<{}>;

const CreateModal = ({ context, id, innerProps }: Props) => {
	const [createBlog] = useCreateBlog();

	const handleSubmit = (data: BlogFormValues) => {
		createBlog({ data });
		context.closeModal(id);
	};

	return <BlogForm onSubmit={handleSubmit} />;
};

export default CreateModal;
