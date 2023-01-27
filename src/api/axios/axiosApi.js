import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// get data from api 
const getData = async (url, params = {}) => {
    const val = await getUserTokenData();
    // console.log(val);
    const res = await axios.get(url, {
        params,
        // auth: {
        //     Token: val.toString(),
        // }
        // auth: {
        //     username: 'ck_06c35b09db8d7b4fb0bd91d99ce337d38c533795',
        //     password: 'cs_83d0adc0cdcc037b5d96ec401091f33ac6364cae',
        // }
        headers: { Authorization: `Bearer ${val}` }
    }).catch(err => {
        console.log(err, 'error');
        return err;
    });
    return res.data
}

// post data from api 
const postData = async (url, data) => {

    const res = await axios.post(url, data,
        {
            headers: { 'Content-Type': 'application/json', },

        }

    ).catch(err => {
        console.log(err, 'error');
        return err;
    });
    return res.data;
}

const postDataSecond = async (url, data) => {
    const val = await getUserTokenData();
    const res = await axios.post(url, data,
        {
            headers: { Authorization: `Bearer ${val}` }
        }

    ).catch(err => {
        console.log(err, 'error');
        return err;
    });
    return res.data;
}

// delete data from api 
const deleteData = async (url, data) => {
    const val = await getUserTokenData();
    const res = await axios.delete(url,
        {
            headers: { Authorization: `Bearer ${val}` }
        }
    ).catch(err => {
        console.log(err, 'error');
        return err;
    });
    return res;
}
//put data api

const putData = async (url, data) => {
    const val = await getUserTokenData();
    const res = await axios.put(url, data,
        {
            headers: { Authorization: `Bearer ${val}` }
        }
    ).catch(err => {
        console.log(err, 'error');
        return err;
    });
    return res;
}

const getUserTokenData = async () => {
    try {
        const value = await AsyncStorage.getItem('userToken')
        // console.log(value);
        return value;
    } catch (e) {
        console.log(e);
    }
}

export { getData, postData, deleteData, postDataSecond, putData };