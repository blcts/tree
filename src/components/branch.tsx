import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { Tree } from '../types/Tree';

interface Props{
  branch: Tree,
  branches: Tree[]
}

export const Branch: React.FC<Props> = (props) => {
  const { branch, branches } = props;
  const [ isCNenuOpen, setIsCMenuOpen ] = useState(false);
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);
  const [isShowKids, setIsShowKids] = useState(true);
  const kids = branches.filter(selectedBranch => branch.childId.map(id => id === selectedBranch.id))

  const handleContextMenu = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      setAnchorPoint({ x: event.pageX, y: event.pageY });
      setShow(true);
    },
    [setAnchorPoint]
  );

  const handleClick = useCallback(() => (show ? setShow(false) : null), [show]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  });

  return ( 
    <> 
      <span
        key={branch.id}
        data-cy="TreeName"
        className="tree__name"
        onContextMenu={() => setIsCMenuOpen(true)}
      >
        {branch.name}
      </span>
        {kids.length > 0 && isShowKids && <>
          <button
            type="button"
            className="tree__show"
            data-cy="TreeTogglerButton"
            onClick={() => (setIsShowKids(false))}
          >
            {isShowKids
              ? '-'
              : '+'
            }
          </button>
          <ul>
            { kids.map(kid => 
              <li>
                <Branch branch={kid} branches={branches}/>
              </li>
            )}
          </ul> 
        </>
      }
    </>
  );
};
