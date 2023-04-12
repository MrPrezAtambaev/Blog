import React from "react";
import { useDeleteBlog } from "@/services/deleteBlog";
import {
	ActionIcon,
	Card,
	Group,
	Text,
	TypographyStylesProvider,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { Blog } from "@/utils/types/Blog";
import { openContextModal } from "@mantine/modals";
import { useRouter } from "next/router";

type Props = {
	blog: Blog;
};

const BlogCard = ({ blog }: Props) => {
	const router = useRouter();
	const [deleteBlog] = useDeleteBlog();

	const handleOpenDetails = () => {
		openContextModal({
			modal: "updateModal",
			innerProps: {
				blogId: blog.id,
			},
		});
	};

	return (
		<Group spacing={"xl"} position="center">
			<Card>
				<Card.Section onClick={() => router.push(`/blog/${blog.id}`)}>
					<img src={blog.image} alt={blog.title} height={200} width={250} />
				</Card.Section>

				<Card.Section mt={0}>
					<Group position="apart" mt={10}>
						<Text fz="lg" fw={500} w={200}>
							{blog.title}
						</Text>
					</Group>
					{/* <TypographyStylesProvider w={250} h={100} mt={10} mb={0}>
						<div dangerouslySetInnerHTML={{ __html: blog.description ?? "" }} />
					</TypographyStylesProvider> */}
				</Card.Section>
				<Group mt={0}>
					<ActionIcon
						variant="light"
						radius="md"
						size={36}
						color="red"
						onClick={() => deleteBlog({ id: blog.id })}
					>
						<IconTrash style={{ cursor: "pointer" }} />
					</ActionIcon>
					<ActionIcon
						variant="light"
						radius="md"
						size={36}
						color="green"
						onClick={handleOpenDetails}
					>
						<IconPencil size="1.1rem" stroke={1.5} />
					</ActionIcon>
				</Group>
			</Card>
		</Group>
	);
};

export default BlogCard;
