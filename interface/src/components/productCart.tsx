import { Props, useState } from "react"
import api from '../api'
import { ProductCart } from "../api/src/classes/productCart"

export default function ProductCartItem({ p }: { p: ProductCart }) {
    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={p.product.image} alt="" />
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                            {p.product.name}
                        </div>
                        <div className="text-sm italic text-gray-500">
                            Code produit : {p.product.code}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">Quantité</div>
                <div className="text-sm text-gray-500">{p.quantity}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-4 py-2 inline-flex leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {p.getPrice().toFixed(2)}€
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href="#" className="text-indigo-600 hover:text-indigo-900">Retour</a>
            </td>
        </tr>
    )
}