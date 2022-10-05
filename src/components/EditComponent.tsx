import React, { FormEvent, useState } from 'react';

interface Props {
  editHandler:(val1: FormEvent, val2:string, val3: string ) => void,
  name: string,
  id: string,
}

export const EditComponent: React.FC<Props> = (props) => {
  const {
    editHandler,
    name,
    id,
  } = props;
  const [rename, setRename] = useState(name);

  return  (
    <form onSubmit={(e) => editHandler(e, id, rename)}>
      <input
        type="text"
        style={{width: '120px'}}
        className="input is-primary"
        placeholder='Rename please'
        value={rename}
        onChange={(event) => setRename(event.target.value)}
      />
    </form>
  )
}