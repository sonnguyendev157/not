import { EditorView, keymap } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import {
  defaultKeymap,
  historyKeymap,
  history,
  indentWithTab,
} from "@codemirror/commands";
import { markdown } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import {
  defaultHighlightStyle,
  syntaxHighlighting,
} from "@codemirror/language";

// ── Debounce helper ───────────────────────────────────────
function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number,
) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ── Auto-save ─────────────────────────────────────────────
const saveNote = debounce((content: string) => {
  console.log("saving...", content.slice(0, 30));
  // Phần này sẽ gọi IPC sang main để lưu file
  // window.electronAPI.saveNote(content)  ← implement sau
}, 500);

// ── Setup CodeMirror ──────────────────────────────────────
const systemTheme = EditorView.theme({
  "&": {
    background: "transparent",
    color: "CanvasText",
  },
  "&.cm-focused": {
    outline: "none",
  },
  ".cm-content": {
    caretColor: "CanvasText",
    padding: "16px",
  },
});

const darkModeSync = EditorView.theme({
  "&": { colorScheme: "light dark" },
});

const state = EditorState.create({
  doc: "",
  extensions: [
    systemTheme,
    darkModeSync,

    history(), // undo/redo
    keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]), // shortcuts

    markdown({ codeLanguages: languages }),
    syntaxHighlighting(defaultHighlightStyle),
    EditorView.lineWrapping,
    EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        saveNote(update.state.doc.toString());
      }
    }),
  ],
});

const view = new EditorView({
  state,
  parent: document.getElementById("editor"),
});

view.focus();
