"use client";
import React, { useState } from "react";

interface Tryout {
  id: number;
  name: string;
  description: string;
  end_time: string;
  isactive: boolean;
}

interface TryoutListProps {
  handleOpen: (mode: "add" | "update", tryout?: Tryout) => void;
  tryouts: Tryout[];
  setTryouts: React.Dispatch<React.SetStateAction<Tryout[]>>;
  search: string;
}

const TryoutList: React.FC<TryoutListProps> = ({
  handleOpen,
  tryouts,
  setTryouts,
  search,
}) => {
  const [error, setError] = useState<string | null>(null);

  // Filter data berdasarkan search
  const filteredData = tryouts.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tryout?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:3001/api/tryout/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Failed to delete tryout");

      setTryouts((prev) => prev.filter((tryout) => tryout.id !== id));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred"
      );
    }
  };

  return (
    <div className="px-8 overflow-x-auto mt-7">
      {error && <p className="text-red-500 text-center">{error}</p>}
      {filteredData.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Nama</th>
              <th>Deskripsi</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item.id}>
                <th>{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td className="space-x-2">
                  <button
                    className={`btn rounded-full w-20 ${
                      item.isactive
                        ? `btn-soft btn-success`
                        : `btn btn-disabled`
                    }`}
                  >
                    {item.isactive ? "Open" : "Closed"}
                  </button>
                  <button
                    onClick={() => handleOpen("update", item)}
                    className="btn btn-soft btn-info"
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-soft btn-error"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No tryouts found.</p>
      )}
    </div>
  );
};

export default TryoutList;
