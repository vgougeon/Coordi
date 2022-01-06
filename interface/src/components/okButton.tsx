import api from "../api";

export default function OkButton() {
    return(
        <button onClick={() => api.pressOk()}
        className="h-12 px-8 bg-white border border-gray-200 hover:border-blue-500 hover:bg-gray-50">
            OK
        </button>
    )
}