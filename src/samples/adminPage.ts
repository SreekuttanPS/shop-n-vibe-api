export const adminPage = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Admin Login</title>
    <style>
      body {
        background: #f4f4f4;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        font-family: sans-serif;
      }

      .login-box {
        background: #fff;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        width: 300px;
      }

      h2 {
        text-align: center;
        margin-bottom: 1.5rem;
      }

      input {
        width: 100%;
        padding: 0.75rem;
        margin-bottom: 1rem;
        border: 1px solid #ccc;
        border-radius: 5px;
      }

      button {
        width: 100%;
        padding: 0.75rem;
        background: #007bff;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }

      button:hover {
        background: #0056b3;
      }
    </style>
  </head>
  <body>
    <div class="login-box">
      <h2>Admin Login</h2>
      <form method="POST" action="/admin/admin-login">
        <input type="text" name="username" placeholder="Username" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Login</button>
        <br />
        <br />
        <br />
        Not an admin? <a href="/admin/admin-create"> Be an admin</a>
      </form>
    </div>
  </body>
</html>
`