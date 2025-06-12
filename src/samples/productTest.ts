export const productPage = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Create Product</title>
    <style>
      body {
        font-family: sans-serif;
        max-width: 600px;
        margin: 2rem auto;
        padding: 1rem;
        background: #f9f9f9;
        border-radius: 8px;
      }

      label {
        font-weight: bold;
        display: block;
        margin-top: 1rem;
      }

      input[type="text"],
      input[type="number"],
      textarea,
      select {
        width: 100%;
        padding: 0.5rem;
        margin-top: 0.25rem;
      }

      input[type="file"] {
        margin-top: 0.25rem;
      }

      .checkbox-group {
        margin-top: 0.5rem;
      }

      .checkbox-group label {
        font-weight: normal;
        display: inline-block;
        margin-right: 1rem;
      }

      button {
        margin-top: 2rem;
        padding: 0.75rem 1.5rem;
        background-color: #333;
        color: white;
        border: none;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <h2>Create a Product</h2>
    <form action="/admin/create-product" method="POST" enctype="multipart/form-data">
      <label for="name">Product Name</label>
      <input type="text" id="name" name="name" required />

      <label for="description">Description</label>
      <textarea id="description" name="description" rows="3" required></textarea>

      <label for="price">Price ($)</label>
      <input type="number" id="price" name="price" min="0" step="0.01" required />

      <label for="image">Upload Image</label>
      <input type="file" id="image" name="image" accept="image/*" required />

      <label for="category">Category</label>
      <select id="category" name="category" required>
        <option value="">-- Select Category --</option>
        <option value="clothing_men">Men's Clothing</option>
        <option value="clothing_women">Women's Clothing</option>
        <option value="electronics">Electronics</option>
        <option value="accessories_men">Men's Accessories</option>
        <option value="accessories_women">Women's Accessories</option>
        <option value="furnitures">Furnitures</option>
        <option value="others">Others</option>
      </select>

      <label for="stock">Stock Quantity</label>
      <input type="number" id="stock" name="stock" min="0" required />

      <label>Tags</label>
      <div class="checkbox-group">
        <label><input type="checkbox" name="tags" value="new_arrival" /> New Arrival</label>
        <label><input type="checkbox" name="tags" value="sale" /> Sale</label>
        <label><input type="checkbox" name="tags" value="popular" /> Popular</label>
        <label><input type="checkbox" name="tags" value="limited_edition" /> Limited Edition</label>
        <label><input type="checkbox" name="tags" value="mobile" />Mobile</label>
        <label><input type="checkbox" name="tags" value="electronics" />Electronics</label>
        <label><input type="checkbox" name="tags" value="chains" />Chains</label>
        <label><input type="checkbox" name="tags" value="shirts" />Shirts</label>
        <label><input type="checkbox" name="tags" value="pants" />Pants</label>
        <label><input type="checkbox" name="tags" value="tops" />Tops</label>
        <label><input type="checkbox" name="tags" value="bottoms" />Bottoms</label>
        <label><input type="checkbox" name="tags" value="premium" />Premium</label>
      </div>

      <label>
        <input type="checkbox" name="isAvailable" />
        Is Available
      </label>

      <button type="submit">Submit Product</button>
    </form>
  </body>
</html>`