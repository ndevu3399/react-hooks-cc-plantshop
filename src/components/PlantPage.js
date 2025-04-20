import { useState, useEffect } from "react";
import PlantCard from "./PlantCard";
import NewPlantForm from "./NewPlantForm";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => res.json())
      .then((data) => {
        const plantsWithSoldOut = data.map((plant) => ({
          ...plant,
          soldOut: false,
        }));
        setPlants(plantsWithSoldOut);
      });
  }, []);

  const handleAddPlant = (newPlant) => {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({
        ...newPlant,
        price: newPlant.price.toString()
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPlants([...plants, { ...data, soldOut: false }]);
      });
  };

  const handleToggleSoldOut = (plantId) => {
    setPlants(
      plants.map((plant) =>
        plant.id === plantId ? { ...plant, soldOut: !plant.soldOut } : plant
      )
    );
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <NewPlantForm onAddPlant={handleAddPlant} />
      <ul className="cards">
        {filteredPlants.map((plant) => (
          <PlantCard
            key={plant.id}
            plant={plant}
            onToggleSoldOut={handleToggleSoldOut}
          />
        ))}
      </ul>
    </main>
  );
}

export default PlantPage;