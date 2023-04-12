import { Blog } from "@/utils/types/Blog";
import { Stack } from "@mantine/core";
import React from "react";
import BlogListItem from "./BlogListItem";

type Props = {
	data: Blog[];
};

const BlogListView = ({ data }: Props) => {
	return (
		<Stack>
			{data.map((blog) => (
				<BlogListItem blog={blog} key={blog.id} />
			))}
		</Stack>
	);
};

export default BlogListView;
