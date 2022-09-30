import React, { FormEvent } from 'react';

interface Props {
  editHandler:(v: FormEvent) => void,
  ref: React.RefObject<HTMLInputElement>,
  editedName: string,
  onSetEditedName:(v:string) => void,
}

export const EditComponent: React.FC<Props> = (props) => {
  const {
    editHandler,
    ref,
    editedName,
    onSetEditedName
  } = props;

  return  (
    <form onBlur={editHandler}>
      <input
        ref={ref}
        data-cy="TreeNameField"
        type="text"
        className="tree__name-field"
        placeholder='Rename please'
        value={editedName}
        onChange={(event) => onSetEditedName(event.target.value)}
      />
    </form>
  )
}