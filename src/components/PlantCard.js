function PlantCard({ plant, onToggleSoldOut }) {
  const { id, name, image, price, soldOut } = plant;

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {soldOut ? (
        <button className="primary">Out of Stock</button>
      ) : (
        <button onClick={() => onToggleSoldOut(id)}>In Stock</button>
      )}
    </li>
  );
}

export default PlantCard;