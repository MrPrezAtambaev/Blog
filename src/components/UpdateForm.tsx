import React from "react";
import z from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { Button, FocusTrap, Stack, TextInput } from "@mantine/core";
// import { openContextModal } from "@mantine/modals";
// import { useUpdateBlog } from "@/services/updateBlog";
// import { useFetchBlog } from "@/services/fetchBlog";
// import { Blog } from "@/utils/types/Blog";
//? tiptap Word Editor
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";

type Props = {
	onSubmit(values: BlogFormValues): void;
	defaultValues?: Partial<BlogFormValues>;
};

const blogFormSchema = z.object({
	title: z.string().min(1, "Это поле обязательно!"),
	description: z.string().min(1, "Напишите что нибудь"),
	image: z.string().min(1, "Поля для изображение не должно быть пустым"),
});

export type BlogFormValues = z.infer<typeof blogFormSchema>;

const UpdateForm = ({ onSubmit, defaultValues = {} }: Props) => {
	const form = useForm<BlogFormValues>({
		initialValues: {
			title: "",
			description: "",
			image: "",
			...defaultValues,
		},
		validate: zodResolver(blogFormSchema),
	});

	const handleSubmit = (values: BlogFormValues) => {
		onSubmit({
			...values,
			description: editor?.getHTML() ?? "",
		});
		form.reset();
	};

	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Link,
			Superscript,
			SubScript,
			Highlight,
			TextAlign.configure({ types: ["heading", "paragraph"] }),
		],
		content: defaultValues.description ?? "",
	});

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<Stack>
				<TextInput label="Введите имя блога" {...form.getInputProps("title")} />

				<RichTextEditor editor={editor}>
					<RichTextEditor.Toolbar sticky stickyOffset={60}>
						<RichTextEditor.ControlsGroup>
							<RichTextEditor.Bold />
							<RichTextEditor.Italic />
							<RichTextEditor.Underline />
							<RichTextEditor.Strikethrough />
							<RichTextEditor.ClearFormatting />
							<RichTextEditor.Highlight />
							<RichTextEditor.Code />
						</RichTextEditor.ControlsGroup>

						<RichTextEditor.ControlsGroup>
							<RichTextEditor.H1 />
							<RichTextEditor.H2 />
							<RichTextEditor.H3 />
							<RichTextEditor.H4 />
						</RichTextEditor.ControlsGroup>

						<RichTextEditor.ControlsGroup>
							<RichTextEditor.Blockquote />
							<RichTextEditor.Hr />
							<RichTextEditor.BulletList />
							<RichTextEditor.OrderedList />
							<RichTextEditor.Subscript />
							<RichTextEditor.Superscript />
						</RichTextEditor.ControlsGroup>

						<RichTextEditor.ControlsGroup>
							<RichTextEditor.Link />
							<RichTextEditor.Unlink />
						</RichTextEditor.ControlsGroup>

						<RichTextEditor.ControlsGroup>
							<RichTextEditor.AlignLeft />
							<RichTextEditor.AlignCenter />
							<RichTextEditor.AlignJustify />
							<RichTextEditor.AlignRight />
						</RichTextEditor.ControlsGroup>
					</RichTextEditor.Toolbar>

					<RichTextEditor.Content />
				</RichTextEditor>
				<TextInput
					label="Введите фотографию блога"
					{...form.getInputProps("image")}
				/>
				<Button type="submit">Сохранить</Button>
			</Stack>
		</form>
	);
};

export default UpdateForm;
