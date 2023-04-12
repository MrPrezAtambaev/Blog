import { useDeleteBlog } from "@/services/deleteBlog";
import { baseAxios } from "@/utils/baseAxios";
import { Blog } from "@/utils/types/Blog";
import {
	ActionIcon,
	Card,
	Group,
	Text,
	TypographyStylesProvider,
} from "@mantine/core";
import { openContextModal } from "@mantine/modals";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { GetServerSideProps } from "next";
import React from "react";

type Props = {
	data: Blog;
};

const BlogDetails = ({ data }: Props) => {
	const [deleteBlog] = useDeleteBlog();

	const handleOpenDetails = () => {
		openContextModal({
			modal: "updateModal",
			innerProps: {
				blogId: data.id,
			},
		});
	};
	return (
		<Group spacing={"xl"} position="center">
			<Card>
				<Card.Section>
					<img src={data.image} alt={data.title} height={200} width={250} />
				</Card.Section>
				<Card.Section mt={0}>
					<Group position="apart" mt={10}>
						<Text fz="lg" fw={500} w={200}>
							{data.title}
						</Text>
					</Group>
					<TypographyStylesProvider w={250} h={100} mt={10} mb={0}>
						<div dangerouslySetInnerHTML={{ __html: data.description ?? "" }} />
					</TypographyStylesProvider>
				</Card.Section>
				<Group mt={0}>
					<ActionIcon
						variant="light"
						radius="md"
						size={36}
						color="red"
						onClick={() => deleteBlog({ id: data.id })}
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

export default BlogDetails;

export const getServerSideProps: GetServerSideProps<
	Props,
	{ blogId: string }
> = async (ctx) => {
	const id = ctx.params?.blogId;
	if (!id) {
		return {
			notFound: true,
		};
	}

	try {
		const { data } = await baseAxios.get<Blog>(`/blog/${id}`);

		return {
			props: {
				data,
			},
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};
