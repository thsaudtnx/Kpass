import AsyncStorage from "@react-native-async-storage/async-storage";

const logsStorage = {
  async clearAll(){
    AsyncStorage.clear();
  },

  async getUpdatedAt(){
    try{
      const updatedAt = await AsyncStorage.getItem('updatedAt');
      const parsed = JSON.parse(updatedAt);
      return parsed;
    } catch(err){
      throw new Error('Failed to load logs of updated date');
    }
  },

  async getData() {
    try {
      const raw = await AsyncStorage.getItem('data');
      const parsed = JSON.parse(raw);
      return parsed;
    } catch(err){
      throw new Error('Failed to load logs data');
    }
  },

  async setData(data){
    try{
      await AsyncStorage.setItem('data' , JSON.stringify(data));
      console.log('data has been saved in localStorage')
    } catch (err){
      throw new Error('Failed to save logs');
    }
  },

  async setUpdatedAt(){
    try {
      await AsyncStorage.setItem('updatedAt', JSON.stringify(new Date()));
      console.log('updated Date has been saved in localStorage')
    } catch (err){
      throw new Error('Failed to save updatedAt');
    }
  }
};

export default logsStorage;