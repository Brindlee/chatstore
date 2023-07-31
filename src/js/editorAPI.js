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
            var headersObj = {
                "Content-Type": "multipart/form-data"
            }
            formDt.append("metadata", metadata)
            const response = await axios.put(url,formDt)
            console.log(response);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}