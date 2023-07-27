import React, { useCallback } from "react";
import axios from "axios";

export const onInsert = (newData) => {
  console.log(newData, 'inserted')
};

export const onRemove = (id) => {
  console.log(id, 'removed')
};

export const onEdit = (editedData) => {
  console.log(editedData, 'edited')
};