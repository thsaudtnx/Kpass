import client from "./client";
import logsStorage from "../storages/logsStorage";

const dateFormatter = (date) => {
  return date.getFullYear() + "-" +
  ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
  ("00" + date.getDate()).slice(-2) + " " +
  ("00" + date.getHours()).slice(-2) + ":" +
  ("00" + date.getMinutes()).slice(-2) + ":" +
  ("00" + date.getSeconds()).slice(-2);
}

export async function getBusiness() {
  let data = [];

  const updatedAt = await logsStorage.getUpdatedAt();
  if (updatedAt) {
    console.log(`The device is last updated at ${updatedAt}`);
    let storageData = await logsStorage.getData();
    const serverData = await client.get('/mobile', {
      params : {
        updatedAt : updatedAt
      }
    });
    console.log('Updated server data : ', serverData.data);
    if (serverData.data.length!==0){
      let newData = [...storageData];
      serverData.data.forEach(servd => {
        flag = false;
        storageData.forEach(stord => {
          if (servd.id===stord.id){
            flag = true;
            if (servd.deletedAt) newData = newData.filter(d => d.id!==servd.id);
            else if (servd.createdAt !== servd.updatedAt) newData = newData.map(d => d.id===servd.id ? servd : d);
          }
        });
        if (!flag) newData = [...newData, servd];
      })
      data = [...newData];
      logsStorage.setData(newData);
      logsStorage.setUpdatedAt(dateFormatter(new Date()));
      console.log({updatedAt : dateFormatter(new Date()), data : newData});
    } else {
      data = [...storageData];
    }
  } else {
    console.log(`The device is new`);
    const serverData = await client.get('/mobile');
    console.log('서버 데이터 : ', serverData.data);
    data = serverData.data
    logsStorage.setData(serverData.data);
    logsStorage.setUpdatedAt(dateFormatter(new Date()));
    console.log({updatedAt : dateFormatter(new Date()), data : serverData.data});
  }
  return data;
}