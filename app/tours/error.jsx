"use client";

export default function Error({ error}) {
  console.error(error);

  return (
    <div>
      <h2>There was an error{error.message}.</h2>
     
    </div>
  );
}
