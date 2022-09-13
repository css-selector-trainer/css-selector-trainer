import { MutableRefObject, useEffect, useRef } from 'react';
// codemirror
import { EditorState } from '@codemirror/state';
import { basicSetup, EditorView } from 'codemirror';
import { html } from '@codemirror/lang-html';
// material
import { Paper, styled } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? '#1A2027' : '#FFF',
  padding: theme.spacing(1),
  minHeight: '700px',
  display: 'flex'
}));

function CodeMirror({ value }: { value: string}) {

  const editor: MutableRefObject<HTMLDivElement> = useRef() as React.MutableRefObject<HTMLDivElement>;

  const initialState: EditorState = EditorState.create({
    doc: value,
    extensions: [
      basicSetup,
      EditorView.editable.of(false),
      html(),
      EditorView.theme({
        '&.cm-editor': {
          width: '100%'
        }
      })
    ]
  });

  useEffect(() => {
    const view: EditorView = new EditorView({
      state: initialState,
      parent: editor.current
    });
    return () => view?.destroy();
  }, [value]);
  
  return <Item sx={{ p: 2 }} ref={ editor }></Item>;
}

export default CodeMirror;