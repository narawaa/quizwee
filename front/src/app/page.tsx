"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TryoutList from "@/modules/TryoutModule";
import Modal from "@/components/Modal";

interface Tryout {
  id: number;
  name: string;
  description: string;
  end_time: string;
  isactive: boolean;
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState<"add" | "update">("add");
  const [tryouts, setTryouts] = useState<Tryout[]>([]);
  const [search, setSearch] = useState("");
  const [selectedTryout, setSelectedTryout] = useState<Tryout | null>(
    null
  );

  const fetchTryouts = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/tryout");
      const data = await res.json();
      if (res.ok) setTryouts(data.data);
    } catch (err) {
      console.error("Error fetching tryouts:", err);
    }
  };

  useEffect(() => {
    fetchTryouts();
  }, []);

  const handleOpen = (mode: "add" | "update", tryout?: Tryout) => {
    setModal(mode);
    setSelectedTryout(mode === "update" && tryout ? tryout : null);
    setIsOpen(true);
  };

  const handleSubmit = async (formData: {
    id?: number;
    name: string;
    description: string;
    end_time: string;
    isactive: boolean;
  }) => {
    try {
      const url =
        modal === "add"
          ? "http://localhost:3001/api/tryout"
          : `http://localhost:3001/api/tryout/${selectedTryout?.id}`;

      const options = {
        method: modal === "add" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      };

      const res = await fetch(url, options);
      const data = await res.json();
      if (res.ok) {
        fetchTryouts();
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error("Error saving tryout:", err);
    }
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onOpen={() => handleOpen("add")} onSearch={setSearch} />

      <main className="flex-grow">
        <h1 className="text-center font-bold pt-5">List Tryout</h1>

        <button
          onClick={() => handleOpen("add")}
          className="mx-8 btn btn-accent"
        >
          Add New Tryout
        </button>

        <TryoutList
          handleOpen={handleOpen}
          tryouts={tryouts}
          setTryouts={setTryouts}
          search={search}
        />

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          mode={modal}
          selectedTryout={selectedTryout}
          onSubmit={handleSubmit}
        />
      </main>

      <Footer />
    </div>
  );
}
