import axios from 'axios'
import pinia from "@/stores/store.js";
import {useCodeStore} from '@/stores/code'


const codeStore = useCodeStore(pinia);

//default export
export default {
    deployWorkerToCloudeflare  : async function deployWorkerToCloudeflare() {
        var url = '/api/deploycloudflareworker'
        try {
            const blob = new Blob([codeStore.code], {type : "application/javascript+module"})
            const formDt = new FormData();
            formDt.append("worker.js", blob, "worker.js")
            const metadata = {
                "main_module" : "worker.js"
            }
            formDt.append("metadata", JSON.stringify(metadata))
            const response = await axios.put(url,formDt)
            console.log(response);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    saveFileToR2 : async function saveFileToR2() {
        var url = '/api/saveFileToR2'
        try {
            const blob = new Blob([codeStore.code], {type : "application/javascript+module"})
            const formDt = new FormData();
            formDt.append('file', blob, codeStore.name+".js")
            //formDt.append("filename", codeStore.name+".js")
            const response = await axios.put(url,formDt)
            console.log(response);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    getR2Object : async function getR2Object() {
        var url = '/api/getR2Object'
        try {
            var fileDetails = {
                selectedFile : codeStore.selectedFile,
            }
            const response = await axios.post(url,JSON.stringify(fileDetails))
            console.log(response);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    listR2Objects : async function getR2File() {
        var url = '/api/listR2Objects'
       
            /*const s3 = new S3({
                endpoint: `https://${import.meta.env.VITE_R2_ACCOUNT_KEY}.r2.cloudflarestorage.com`,
                accessKeyId: `${import.meta.env.VITE_R2_AUTH_KEY_ID}`,
                secretAccessKey: `${import.meta.env.VITE_R2_AUTH_KEY_SECRET}`,
                signatureVersion: 'v4'
            });*/
            const response = await axios.post(url,JSON.stringify({}));

            return response;
        
        
    }
}