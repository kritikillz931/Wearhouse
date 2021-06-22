



export const Inventory = ({inventoryProp}) => (
    <section className="inventory">
        <div className="inventory__brand">{inventoryProp.brand}</div>
        <div className="inventory__name">{inventoryProp.name}</div>
        <div className="inventory__size">{inventoryProp.size}</div>
        <div className="inventory__price">{inventoryProp.price}</div>
        <div className="inventory__marketValue">{inventoryProp.marketValue}</div>
        <div className="inventory__quantity">{inventoryProp.quantity}</div>
        </section>
)