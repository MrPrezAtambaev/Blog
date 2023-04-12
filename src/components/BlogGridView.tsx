import { Blog } from "@/utils/types/Blog";
import { Grid } from "@mantine/core";
import React from "react";
import BlogCard from "./BlogCard";

type Props = {
	data: Blog[];
};

const BlogGridView = ({ data }: Props) => {
	return (
		<Grid>
			{data.map((blog) => (
				<Grid.Col sm={6} md={4} lg={3} key={blog.id}>
					<BlogCard blog={blog} />
				</Grid.Col>
			))}
		</Grid>
	);
};

export default BlogGridView;
