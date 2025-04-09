function addToCart(itemId, type) {
    let item;
    
    if (type === "medicine") {
        item = medicines.find(med => med.id === itemId);
    } else if (type === "food") {
        item = foodItems.find(food => food.id === itemId);
    } else if (type === "accessories") {
        item = accessoriesItems.find(acc => acc.id === itemId);
    }

    if (!item) return alert("Item not found!");

    const quantity = parseInt(document.getElementById(`quantity-${itemId}`).value) || 1;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...item, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${quantity} of ${item.name} added to cart!`);
}
