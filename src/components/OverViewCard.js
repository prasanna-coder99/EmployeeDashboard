import React from "react";

const cards = [
  { title: "Pharetra", value: "56 (+8)", change: "+18%", color: "text-green-500" },
  { title: "Vulputate", value: "$128", change: "+15%", color: "text-green-500" },
  { title: "Dictum", value: "$87", change: "-8%", color: "text-red-500" },
];

const OverViewCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, i) => (
        <div key={i} className="bg-white shadow rounded-lg p-6">
          <h3 className="text-gray-500 text-sm">{card.title}</h3>
          <div className="text-2xl font-bold mt-2">{card.value}</div>
          <p className={`text-sm mt-1 ${card.color}`}>{card.change}</p>
        </div>
      ))}
    </div>
  );
};

export default OverViewCard;
