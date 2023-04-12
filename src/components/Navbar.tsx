import {
	ActionIcon,
	Button,
	Container,
	Group,
	Header,
	useMantineColorScheme,
} from "@mantine/core";
import { openContextModal } from "@mantine/modals";
import { IconBrandApple, IconMoonStars, IconSun } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
	const openCreateTodoModal = () => {
		openContextModal({
			title: "Создать задачу",
			modal: "createModal",
			innerProps: {},
		});
	};
	//! Dark Theme
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const dark = colorScheme === "dark";

	return (
		<Header height={58} mb={120}>
			<Container>
				<Group py="sm" position="apart">
					<Link href={"/"}>
						<IconBrandApple size={44} style={{ cursor: "pointer" }} />
					</Link>
					<Button
						onClick={openCreateTodoModal}
						variant="light"
						color="violet"
						radius="sm"
						size="md"
					>
						Создать
					</Button>
					<ActionIcon
						variant="outline"
						color={dark ? "yellow" : "violet"}
						onClick={() => toggleColorScheme()}
						title="Dark & Light theme"
					>
						{dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
					</ActionIcon>
				</Group>
			</Container>
		</Header>
	);
};

export default Navbar;
