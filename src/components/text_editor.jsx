import { useContext, useState, useEffect } from "react";
import { AppData } from "../App";

import { BlockTypeSelect, BoldItalicUnderlineToggles, CodeToggle, InsertTable, InsertThematicBreak, ListsToggle, MDXEditor } from '@mdxeditor/editor'
import { headingsPlugin, toolbarPlugin, linkPlugin, tablePlugin, thematicBreakPlugin, listsPlugin, quotePlugin } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'

export function TextEditor({ note }) {
  const { updateNote, addNote, selected_course } = useContext(AppData);
  const [edit_title, setEditTitle] = useState(false);
  const [title_text, setTitleText] = useState(note?.title ?? "");
  const [edit_text, setEditText] = useState(note?.text ?? "");

  useEffect(() => {
    setTitleText(note?.title ?? "");
    setEditTitle(false);
	setEditText(note?.text ?? "");
  }, [note]);

  if (!note) {
    return <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
      <p>This course has no notes yet</p>
      <button className="sidebar__add-button" onClick={() => addNote(selected_course)}>+ Add Note</button>

    </div>
  }

  const handleTitleChange = (e) => {
    setTitleText(e.target.value);
  };

  const handleTitleSave = () => {
    setEditTitle(false);
    updateNote(note.id, { title: title_text });
  };

  console.log(edit_text);

  return (
    <div className="notes-editor">
      <div className="note-title">
        {edit_title ? (
          <input
            type="text"
            value={title_text}
            onChange={handleTitleChange}
            onBlur={handleTitleSave}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleTitleSave();
              }
            }}
            autoFocus
          />
        ) : (
          <h1 style={{ cursor: "pointer" }} onClick={() => setEditTitle(true)}
          >
            {title_text}
          </h1>
        )}
      </div>

      {/* Note Text */}
      <MDXEditor
        markdown={edit_text}
        onChange={(value) => setEditText(value)}
        plugins={[
          headingsPlugin(),
          toolbarPlugin({
            toolbarContents: () =>
              <>
                <BlockTypeSelect />
                <BoldItalicUnderlineToggles />
                <InsertThematicBreak />
                {" "}
                <CodeToggle />
                <InsertTable />
                <ListsToggle />
              </>
          }),
          listsPlugin(),
          quotePlugin(),
          headingsPlugin(),
          linkPlugin(),
          tablePlugin(),
          thematicBreakPlugin(),
        ]}
        className="dark-theme"
      />
    </div>
  );
}
