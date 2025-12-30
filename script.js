import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// urls?
const SUPABASE_URL = "https://cvdntzupvqzlejhwbjhn.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2ZG50enVwdnF6bGVqaHdiamhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwODA4NjEsImV4cCI6MjA4MjY1Njg2MX0.CphjDsvz5pp-JJowmICqztFFz_gNWD1VKkPUt_nd8Y4";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const form = document.getElementById("entryForm");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const now = new Date();

  const data = {
    name: name.value,
    grade: grade.value,
    entry_date: now.toISOString().split("T")[0],
    entry_time: now.toTimeString().split(" ")[0],
    day: now.toLocaleDateString("en-US", { weekday: "long" }),
    body: body.value
  };

  const { error } = await supabase
    .from("entries")
    .insert([data]);

  if (error) {
    status.textContent = "Error 💀";
    console.error(error);
  } else {
    status.textContent = "Stored 🔥";
    form.reset();
  }
});
