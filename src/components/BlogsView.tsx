import { useFetchBlog } from "@/services/fetchBlog";
import { Tabs } from "@mantine/core";
import BlogGridView from "./BlogGridView";
import BlogListView from "./BlogListView";
import {
	IconAlignJustified,
	IconLayoutGrid,
	IconList,
} from "@tabler/icons-react";

const BlogsView = () => {
	const [blogs] = useFetchBlog();
	// filters: {
	// 	_sort: "id",
	// 	_order: "desc",
	// },);

	return (
		<Tabs defaultValue="grid">
			<Tabs.List position="right">
				<Tabs.Tab value="grid" icon={<IconLayoutGrid size="1rem" />}></Tabs.Tab>
				<Tabs.Tab value="list" icon={<IconList size="1rem" />}></Tabs.Tab>
			</Tabs.List>

			<Tabs.Panel value="grid" pt="xs">
				<BlogGridView data={blogs} />
			</Tabs.Panel>
			<Tabs.Panel value="list" pt="xs">
				<BlogListView data={blogs} />
			</Tabs.Panel>
		</Tabs>
	);
};

export default BlogsView;
