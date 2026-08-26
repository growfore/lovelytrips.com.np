const baseUrl = process.env.EMAIL_TEST_BASE_URL || "http://localhost:3000";
const response = await fetch(`${baseUrl}/api/email/send`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({}),
});

if (response.status !== 400) {
  throw new Error(`Expected 400 for invalid email request, got ${response.status}`);
}

console.log("Email route rejects invalid requests");
