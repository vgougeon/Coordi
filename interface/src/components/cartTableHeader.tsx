export function CartTableHeader() {
    return (
        <thead style={{ overflowY: 'hidden'}} className="bg-gray-50">
            <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantité
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prix
                </th>
                <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Retour</span>
                </th>
            </tr>
        </thead>
    )
}