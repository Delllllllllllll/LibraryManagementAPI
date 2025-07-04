document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent page reload

    const email = form.email.value;
    const pwd = form.pwd.value;

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pwd }),
        credentials: "include", // include cookie if refresh token is set
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      const accessToken = data.accessToken;
      console.log("Access Token:", accessToken);

      localStorage.setItem("accessToken", accessToken);
      await fetchUsers(accessToken);
    } catch (err) {
      console.error("Login Error:", err);
    }
  });

  async function fetchUsers(accessToken) {
    try {
      const response = await fetch("/api/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      data.forEach((user) => console.log(user));
    } catch (err) {
      console.error("FETCHING USERS ERROR");
    }
  }

  //   (async () => {
  //     const accessToken = localStorage.getItem("accessToken");
  //     await fetchUsers(accessToken);
  //   });
});
