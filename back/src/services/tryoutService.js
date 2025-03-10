import { query } from "../db.js";

export const getTryout = async () => {
  const { rows } = await query(
    "SELECT * FROM tryout_db ORDER BY isActive ASC"
  );

  if (!rows) {
    return { status: 404, message: "Tryout not found" };
  }

  return {
    status: 200,
    message: "Tryout retrieved successfully",
    data: rows,
  };
};

export const createTryout = async (tryoutData) => {
  const { name, description, end_time, isactive } = tryoutData;
  const { rows } = await query(
    `INSERT INTO tryout_db (name, description, end_time, isactive) 
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [name, description, end_time, isactive]
  );

  return {
    status: 201,
    message: "Tryout created successfully",
    data: rows[0],
  };
};

export const updateTryout = async (tryoutId, tryoutData) => {
  const { name, description, end_time, isactive } = tryoutData;

  const { rows } = await query(
    `UPDATE tryout_db SET name = $1, description = $2, end_time = $3, isactive = $4 
     WHERE id = $5 RETURNING *`,
    [name, description, end_time, isactive, tryoutId]
  );

  if (!rows[0]) {
    return { status: 404, message: "Tryout not found" };
  }

  return {
    status: 200,
    message: "Tryout updated successfully",
    data: rows[0],
  };
};

export const deleteTryout = async (tryoutId) => {
  const { rowCount } = await query(
    `DELETE FROM tryout_db WHERE id = $1`,
    [tryoutId]
  );

  if (rowCount === 0) {
    return { status: 404, message: "Tryout not found" };
  }

  return { status: 200, message: "Tryout deleted successfully" };
};

export const searchTryouts = async (searchTerm) => {
  const { rows } = await query(
    `SELECT * FROM tryout_db WHERE name ILIKE $1`,
    [`%${searchTerm}%`]
  );

  return {
    status: 200,
    message: "Search results retrieved",
    data: rows,
  };
};
