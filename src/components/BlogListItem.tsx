import React from "react";
import { useDeleteBlog } from "@/services/deleteBlog";
import {
	ActionIcon,
	Card,
	Grid,
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

const BlogListItem = ({ blog }: Props) => {
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
		<Card>
			<Grid>
				<Grid.Col md={4} onClick={() => router.push(`/blog/${blog.id}`)}>
					<img src={blog.image} alt={blog.title} height={200} width={250} />
				</Grid.Col>
				<Grid.Col md={8}>
					<Group position="apart" mt={10}>
						<Text fz="lg" fw={500} w={200}>
							{blog.title}
						</Text>
					</Group>
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
				</Grid.Col>
			</Grid>
		</Card>
	);
};

export default BlogListItem;
