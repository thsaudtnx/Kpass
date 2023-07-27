import React, { useCallback } from "react";
import axios from "axios";
import { server } from "./serverURL";

export const onFetch = async () => {
  try {
    const result = await axios.get(`${server}/field`);
    return result.data.filterList;
  } catch(err){
    console.error(err);
  }
};


export const onInsert = async (newData) => {
  await axios.post(`${server}/field`, newData)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.error(err);
    });
};

export const onRemove = async (id) => {
  await axios.delete(`${server}/field/${id}`)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.error(err);
    });
};

export const onEdit = async (editedData) => {
  console.log(editedData);
  await axios.patch(`${server}/field/${editedData.id}`, {
    english : editedData.english,
    korean : editedData.korean,
  }).then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.error(err);
    });
};