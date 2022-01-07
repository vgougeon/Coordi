import orderService from "../services/order.service";

export default function OkButton({id}: {id: number}) {
    return(
        <button onClick={() => orderService.getOrder(id).pressOk()}
        className="h-12 px-8 bg-white border border-gray-200 hover:border-blue-500 hover:bg-gray-50">
            OK
        </button>
    )
}