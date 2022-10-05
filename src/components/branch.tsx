import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { Tree } from '../types/Tree';
import { ContextMenu } from './ContextMenu';
import { EditComponent } from './EditComponent';

interface Props{
  branch: Tree,
  branches: Tree[]
  onSetBranches: React.Dispatch<React.SetStateAction<Tree[]>>
  mainTree: Tree[],
  onSetIsEditorOpen?: (v:boolean) => void,
  isEditorOpen?: boolean,
}

export const Branch: React.FC<Props> = (props) => {
  const { 
    branch, 
    branches,
    onSetBranches,
    mainTree
  } = props;
  const [ isCMenuOpen, setIsCMenuOpen ] = useState(false);
  const [isShowKids, setIsShowKids] = useState(true);
  const [showCMenu, setShowCMenu] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const handleContextMenu = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();

      setShowCMenu(true);
    },
    [setShowCMenu]
  );
  const handleClick = useCallback(() => (
    showCMenu 
    ? setShowCMenu(false) 
    : null
  ), [showCMenu, setShowCMenu]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  },[]);

  const kids = branches.filter(({id}) => branch.childId.includes(id));

  const editHandler = (event: FormEvent, id: string, rename: string) => {
    event.preventDefault();

    const renamedBranch = branches.find(selectedBranch=> selectedBranch.id === id)

    if (renamedBranch !== undefined) {
        renamedBranch.name === rename
          ? renamedBranch
          : renamedBranch.name = rename || renamedBranch.id
    }
    setIsEditorOpen(false);
  };
  
  return ( 
    <> 
      <span
        key={branch.id}
        className="mr-3"
        onContextMenu={() => setIsCMenuOpen(true)}
      >
        { isEditorOpen 
          ? <EditComponent 
              editHandler={editHandler} 
              id={branch.id}
              name={branch.name}
            />
          : <div className='is-flex'>
              {branch.name}
              {branch.childId.length > 0 
                && !isEditorOpen 
                && <button
                  type="button"
                  className="button is-warning is-small ml-2 "
                  data-cy="TreeTogglerButton"
                  onClick={() => (setIsShowKids(!isShowKids))}
                >
                  {isShowKids 
                    ? '-'
                    : '+'
                  }
                </button>
              }
              {showCMenu && isCMenuOpen &&
                <ContextMenu 
                  tree={branch}
                  onSetIsEditorOpen={setIsEditorOpen}
                  isEditorOpen={isEditorOpen}
                  onSetIsCMenuOpen={setIsCMenuOpen}
                  onSetBranches={onSetBranches}
                  branches={branches}
                />
              }
            </div>
          }
        </span>
        {kids.length > 0 && isShowKids && <>
          <ul className="menu"style={{listStyle: 'none'}}>
            { kids.map(kid => 
              <li key={kid.id} className="menu-list">
                <Branch 
                  branch={kid} 
                  mainTree={mainTree}
                  branches={branches}
                  onSetBranches={onSetBranches}
                  onSetIsEditorOpen={setIsEditorOpen}
                  isEditorOpen={isEditorOpen}
                />
              </li>
            )}
          </ul> 
        </>
      }
    </>
  );
};
