import React from 'react';
import {IconButton} from "Components/Button/Button";

import addsvg from 'Assets/add.svg';
import cancelsvg from 'Assets/cancel.svg';
import deletesvg from 'Assets/delete.svg';
import duplicatesvg from 'Assets/duplicate.svg';
import savesvg from 'Assets/save.svg';

const AddButton = (props) => <IconButton src={addsvg} {...props}/>;
const CancelButton = (props) => <IconButton src={cancelsvg} {...props}/>;
const DeleteButton = (props) => <IconButton src={deletesvg} {...props}/>;
const DuplicateButton = (props) => <IconButton src={duplicatesvg} {...props}/>;
const SaveButton = (props) => <IconButton src={savesvg} {...props}/>;

export { AddButton, CancelButton, DeleteButton, DuplicateButton, SaveButton }
