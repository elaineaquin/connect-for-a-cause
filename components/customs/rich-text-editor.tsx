import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Strikethrough, Italic, List, ListOrdered } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import { useEffect, useRef } from "react";

const RichTextEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] h-auto overflow-hidden w-full rounded-md rounded-br-none rounded-bl-none border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    extensions: [
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-4",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-4",
          },
        },
      }),
    ],
    content: value, // Set the initial content with the provided value
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()); // Call the onChange callback with the updated HTML content
    },
  });

  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (editorRef.current) {
        // Temporarily set height to auto to measure content
        editorRef.current.style.height = "auto";
        // Set height to scrollHeight (the height of the content)
        editorRef.current.style.height = `${editorRef.current.scrollHeight}px`;
      }
    };
    if (editor) {
      updateHeight(); // Initial height update
      editor.on("update", updateHeight);
    }

    return () => {
      if (editor) {
        editor.off("update", updateHeight);
      }
    };
  }, [editor]);

  return (
    <>
      <div className="min-h-[150px] h-auto overflow-hidden" ref={editorRef}>
        <EditorContent editor={editor} />
      </div>
      {editor ? <RichTextEditorToolbar editor={editor} /> : null}
    </>
  );
};

const RichTextEditorToolbar = ({ editor }: { editor: Editor }) => {
  return (
    <div className="border border-input bg-transparent rounded-br-md rounded-bl-md p-1 flex flex-row items-center gap-1">
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="w-[1px] h-8" />
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
    </div>
  );
};

export default RichTextEditor;
