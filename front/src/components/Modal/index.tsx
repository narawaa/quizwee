"use client";

import React, { useEffect, useRef, useState } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  mode: "update" | "add";
  onSubmit: (data: {
    name: string;
    description: string;
    end_time: string;
    isactive: boolean;
  }) => void;
  selectedTryout?: {
    id: number;
    name: string;
    description: string;
    end_time: string;
    isactive: boolean;
  } | null;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  mode,
  onSubmit,
  selectedTryout,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [datetime, setDatetime] = useState("");
  const [isactive, setIsactive] = useState(true);

  // Reset atau isi input berdasarkan mode
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();

      if (mode === "update" && selectedTryout) {
        setName(selectedTryout.name);
        setDescription(selectedTryout.description);
        setDatetime(
          selectedTryout.end_time.replace(" ", "T").slice(0, 16)
        ); // Format ke datetime-local
        setIsactive(selectedTryout.isactive);
      } else {
        setName("");
        setDescription("");
        setDatetime("");
        setIsactive(true);
      }
    } else {
      modalRef.current?.close();
    }
  }, [isOpen, mode, selectedTryout]);

  const handleSubmit = () => {
    if (!datetime) {
      alert("Tanggal dan waktu tidak boleh kosong!");
      return;
    }

    const formattedTime = datetime.replace("T", " ") + ":00";

    onSubmit({
      name,
      description,
      end_time: formattedTime,
      isactive,
    });
    onClose();
  };

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg py-4">
          {mode === "update" ? "Update Tryout" : "Add New Tryout"}
        </h3>

        <label className="flex flex-col my-4 w-full">
          <span className="mb-1">Nama</span>
          <input
            type="text"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="flex flex-col my-4 w-full">
          <span className="mb-1">Deskripsi</span>
          <input
            type="text"
            className="input input-bordered w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <div className="flex gap-4 my-4">
          <label className="flex flex-col w-1/2">
            <span className="mb-1">Berakhir Pada</span>
            <input
              type="datetime-local"
              className="input input-bordered w-full"
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}
            />
          </label>

          <label className="flex flex-col w-1/2">
            <span className="mb-1">Status</span>
            <select
              className="select select-bordered w-full"
              value={isactive ? "Open" : "Closed"}
              onChange={(e) => setIsactive(e.target.value === "Open")}
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="btn btn-success text-white"
            onClick={() => {
              handleSubmit();
              onClose();
            }}
          >
            {mode === "update" ? "Save Changes" : "Add Tryout"}
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>Close</button>
      </form>
    </dialog>
  );
};

export default Modal;
