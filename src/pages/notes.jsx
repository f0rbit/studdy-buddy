import { useContext, useState } from "react";
import { AppData } from "../App";

import { BlockTypeSelect, BoldItalicUnderlineToggles, CodeToggle, InsertTable, InsertThematicBreak, ListsToggle, MDXEditor } from '@mdxeditor/editor'
import { headingsPlugin, toolbarPlugin, linkPlugin, linkDialogPlugin, imagePlugin, tablePlugin, thematicBreakPlugin, listsPlugin, quotePlugin } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'


// notes page

export default function Notes() {
  const { notes, selected_course, selected_note, setPage } = useContext(AppData);

  const using_notes = notes.filter((note) => note.course_id === selected_course);

  const editing_note = using_notes.find((note) => note.id === selected_note) ?? null;

  return (
    <div>
      <a style={{ position: "absolute", left: "5px", top: "5px" }} role="button" onClick={() => setPage('dashboard')}>Back</a>
      <div style={{ marginBottom: "50px" }} />
      <Editor note={editing_note} />
    </div>
  );
}
function Editor({ note }) {
  const { updateNote } = useContext(AppData);
  const [edit_title, setEditTitle] = useState(false);
  const [title_text, setTitleText] = useState(note?.title || "");

  if (!note) {
    return <p>Select a note to edit</p>;
  }

  const handleTitleChange = (e) => {
    setTitleText(e.target.value);
  };

  const handleTitleSave = () => {
    setEditTitle(false);
    updateNote(note.id, { title: title_text });
  };


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
        markdown={note.text}
        onChange={(value) => updateNote(note.id, { text: value })}
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
